const Stripe = require('stripe');
const { buffer } = require('micro');
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

      // Store license in a simple JSON file (for basic storage)
      // For production, you'd want to use a database like Vercel Postgres, Supabase, or Airtable
      await storeLicense(licenseInfo);

      // Get the latest download URL from GitHub
      const downloadUrl = 'https://fatboyfinancialplanner.com/thank-you#download';

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
      // Get customer email from billing details or receipt email
      const customerEmail = charge.billing_details?.email || charge.receipt_email;
      const customerName = charge.billing_details?.name || '';
      const chargeId = charge.id;
      const amountTotal = charge.amount;

      if (!customerEmail) {
        console.log('No customer email found in charge, skipping license generation');
        return res.status(200).json({ received: true, note: 'No email found' });
      }

      console.log('Processing purchase from charge for:', customerEmail);

      // Generate license key
      const licenseInfo = generateLicenseKey(customerEmail, chargeId);
      console.log('Generated license key:', licenseInfo.licenseKey);

      // Store license
      await storeLicense(licenseInfo);

      // Get download URL
      const downloadUrl = 'https://fatboyfinancialplanner.com/thank-you#download';

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
 * Store license information
 *
 * IMPORTANT: This is a basic implementation using filesystem storage.
 * For production, replace this with a proper database:
 * - Vercel Postgres
 * - Supabase
 * - Airtable
 * - MongoDB Atlas
 * - Firebase
 *
 * @param {Object} licenseInfo - License information to store
 */
async function storeLicense(licenseInfo) {
  // For now, just log to console
  // In production, you'd store this in a database
  console.log('License to store:', JSON.stringify(licenseInfo, null, 2));

  // Example for future database integration:
  /*
  // Using Vercel Postgres:
  const { sql } = require('@vercel/postgres');
  await sql`
    INSERT INTO licenses (license_key, email, stripe_session_id, generated_at, product, version, hash)
    VALUES (${licenseInfo.licenseKey}, ${licenseInfo.email}, ${licenseInfo.stripeSessionId},
            ${licenseInfo.generatedAt}, ${licenseInfo.product}, ${licenseInfo.version}, ${licenseInfo.hash})
  `;

  // Using Airtable:
  const Airtable = require('airtable');
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
  await base('Licenses').create([
    {
      fields: {
        'License Key': licenseInfo.licenseKey,
        'Email': licenseInfo.email,
        'Stripe Session ID': licenseInfo.stripeSessionId,
        'Generated At': licenseInfo.generatedAt,
        'Product': licenseInfo.product,
        'Version': licenseInfo.version,
        'Hash': licenseInfo.hash
      }
    }
  ]);
  */

  return true;
}

// Vercel config - disable body parsing to get raw body for Stripe signature verification
module.exports = handler;
module.exports.config = {
  api: {
    bodyParser: false,
  },
};
