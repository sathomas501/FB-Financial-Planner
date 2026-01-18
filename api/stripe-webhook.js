const Stripe = require('stripe');
const { buffer } = require('micro');
const { sql } = require('@vercel/postgres');
const { generateLicenseKey } = require('./utils/license-generator');
const { sendLicenseEmail, sendAdminNotification } = require('./utils/email-sender');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Vercel serverless function to handle Stripe webhook events
 * Processes successful checkouts and sends license keys
 */
const handler = async (req, res) => {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Read raw body as buffer (required for Stripe signature verification)
    const rawBody = await buffer(req);

    // Verify webhook signature to ensure it's from Stripe
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      endpointSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  console.log('Received Stripe event:', event.type, 'ID:', event.id);

  // Handle both checkout.session.completed AND charge.succeeded events
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      // Extract customer information
      const customerEmail = session.customer_details?.email || session.customer_email;
      const customerName = session.customer_details?.name || '';
      const sessionId = session.id;
      const amountTotal = session.amount_total;

      if (!customerEmail) {
        throw new Error('No customer email found in checkout session');
      }

      console.log('Processing purchase for:', customerEmail);

      // Generate license key
      const licenseInfo = generateLicenseKey(customerEmail, sessionId);
      console.log('Generated license key:', licenseInfo.licenseKey);

      // Store license in database
      await storeLicense(licenseInfo, {
        name: customerName,
        customerId: session.customer,
        amount: amountTotal
      });

      // Get the download URL - point to thank you page with auto-download
      const downloadUrl = 'https://fatboysoftware.com/thank-you';

      // Send license email to customer
      await sendLicenseEmail({
        to: customerEmail,
        customerName: customerName,
        licenseKey: licenseInfo.licenseKey,
        downloadUrl: downloadUrl,
        orderId: sessionId
      });

      console.log('License email sent to:', customerEmail);

      // Wait 1 second to avoid Resend rate limit (2 requests/second)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Send admin notification (optional)
      await sendAdminNotification({
        customerEmail: customerEmail,
        customerName: customerName,
        licenseKey: licenseInfo.licenseKey,
        orderId: sessionId,
        amount: amountTotal
      });

      console.log('Admin notification sent');

      // Return success response
      return res.status(200).json({
        success: true,
        message: 'License generated and sent',
        licenseKey: licenseInfo.licenseKey,
        email: customerEmail
      });

    } catch (error) {
      console.error('Error processing checkout:', error);

      // Even if there's an error, return 200 to Stripe so it doesn't retry
      // But log the error for manual follow-up
      return res.status(200).json({
        received: true,
        error: error.message,
        note: 'Error logged, manual follow-up required'
      });
    }
  }

  // Handle charge.succeeded event (for Payment Links that trigger this instead)
  if (event.type === 'charge.succeeded') {
    const charge = event.data.object;

    try {
      let customerEmail = charge.billing_details?.email || charge.receipt_email;
      let customerName = charge.billing_details?.name || '';
      const chargeId = charge.id;
      const amountTotal = charge.amount;

      // If no email in charge, try to get it from the customer object
      if (!customerEmail && charge.customer) {
        try {
          console.log('Fetching customer details from Stripe:', charge.customer);
          const customer = await stripe.customers.retrieve(charge.customer);
          customerEmail = customer.email;
          customerName = customer.name || '';
        } catch (customerError) {
          console.log('Could not retrieve customer:', customerError.message);
          // For test events, use a fallback email if available
          if (charge.receipt_email) {
            customerEmail = charge.receipt_email;
          }
        }
      }

      if (!customerEmail) {
        console.log('No customer email found in charge or customer object, skipping license generation');
        return res.status(200).json({ received: true, note: 'No email found' });
      }

      console.log('Processing purchase from charge for:', customerEmail);

      // Generate license key
      const licenseInfo = generateLicenseKey(customerEmail, chargeId);
      console.log('Generated license key:', licenseInfo.licenseKey);

      // Store license in database
      await storeLicense(licenseInfo, {
        name: customerName,
        customerId: charge.customer,
        amount: amountTotal
      });

      // Get download URL - point to thank you page with auto-download
      const downloadUrl = 'https://fatboysoftware.com/thank-you';

      // Send license email to customer
      await sendLicenseEmail({
        to: customerEmail,
        customerName: customerName,
        licenseKey: licenseInfo.licenseKey,
        downloadUrl: downloadUrl,
        orderId: chargeId
      });

      console.log('License email sent to:', customerEmail);

      // Wait 1 second to avoid Resend rate limit (2 requests/second)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Send admin notification
      await sendAdminNotification({
        customerEmail: customerEmail,
        customerName: customerName,
        licenseKey: licenseInfo.licenseKey,
        orderId: chargeId,
        amount: amountTotal
      });

      console.log('Admin notification sent');

      // Return success response
      return res.status(200).json({
        success: true,
        message: 'License generated and sent',
        licenseKey: licenseInfo.licenseKey,
        email: customerEmail
      });

    } catch (error) {
      console.error('Error processing charge:', error);

      return res.status(200).json({
        received: true,
        error: error.message,
        note: 'Error logged, manual follow-up required'
      });
    }
  }

  // Handle other event types if needed
  // For now, just acknowledge receipt
  return res.status(200).json({ received: true });
};

/**
 * Store license information in Vercel Postgres database
 *
 * @param {Object} licenseInfo - License information to store
 * @param {Object} customerInfo - Additional customer information from Stripe
 */
async function storeLicense(licenseInfo, customerInfo = {}) {
  try {
    console.log('Storing license in database:', licenseInfo.licenseKey);

    const result = await sql`
      INSERT INTO licenses (
        license_key,
        hash,
        email,
        customer_name,
        stripe_session_id,
        stripe_customer_id,
        amount_paid,
        generated_at,
        product,
        version,
        status
      ) VALUES (
        ${licenseInfo.licenseKey},
        ${licenseInfo.hash},
        ${licenseInfo.email},
        ${customerInfo.name || null},
        ${licenseInfo.stripeSessionId},
        ${customerInfo.customerId || null},
        ${customerInfo.amount || null},
        ${licenseInfo.generatedAt},
        ${licenseInfo.product},
        ${licenseInfo.version},
        'active'
      )
      RETURNING id, license_key, status
    `;

    console.log('License stored successfully:', result.rows[0]);
    return { success: true, id: result.rows[0].id };

  } catch (error) {
    // Handle duplicate key errors (Stripe webhook retries)
    if (error.code === '23505') {
      console.log('Duplicate license key detected (likely webhook retry)');
      return { success: true, duplicate: true };
    }

    console.error('Error storing license:', error);
    // Don't throw - prevents Stripe retries and duplicate emails
    return { success: false, error: error.message };
  }
}

// Vercel config - disable body parsing to get raw body for Stripe signature verification
module.exports = handler;
module.exports.config = {
  api: {
    bodyParser: false,
  },
};
