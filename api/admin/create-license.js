const { sql } = require('@vercel/postgres');
const { generateLicenseKey } = require('../utils/license-generator');
const { sendLicenseEmail } = require('../utils/email-sender');

/**
 * Admin endpoint to manually create license keys
 * POST /api/admin/create-license
 * Headers: { "x-admin-key": "your-admin-secret" }
 * Body: {
 *   email: "user@example.com",
 *   customerName: "John Doe",
 *   reason: "comp" | "reviewer" | "influencer" | "employee" | "test",
 *   notes: "Optional notes about this license",
 *   sendEmail: true | false (optional, defaults to true)
 * }
 */
const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify admin authentication
    const adminKey = req.headers['x-admin-key'];
    if (!adminKey || adminKey !== process.env.ADMIN_API_KEY) {
      console.warn('Unauthorized manual license creation attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { email, customerName, reason, notes, sendEmail = true } = body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Validate reason
    const validReasons = ['comp', 'reviewer', 'influencer', 'employee', 'test'];
    if (reason && !validReasons.includes(reason)) {
      return res.status(400).json({
        error: 'Invalid reason. Must be one of: comp, reviewer, influencer, employee, test'
      });
    }

    console.log(`Creating manual license for: ${email} (${reason || 'manual'})`);

    // Generate license key using the same logic as Stripe webhook
    const manualSessionId = `manual_${reason || 'custom'}_${Date.now()}`;
    const licenseInfo = generateLicenseKey(email, manualSessionId);

    // Store in database
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
        ${email},
        ${customerName || null},
        ${manualSessionId},
        ${reason ? `manual_${reason}` : 'manual'},
        ${0},
        ${licenseInfo.generatedAt},
        ${licenseInfo.product},
        ${licenseInfo.version},
        'active'
      )
      RETURNING id, license_key, email, status, generated_at
    `;

    const license = result.rows[0];

    // Add notes if provided (stored in a comment/log)
    if (notes) {
      console.log(`License ${license.license_key} notes:`, notes);
    }

    console.log(`Manual license created successfully:`, license);

    // Send email if requested
    let emailSent = false;
    if (sendEmail) {
      try {
        await sendLicenseEmail({
          to: email,
          customerName: customerName || email,
          licenseKey: license.license_key,
          downloadUrl: 'https://fatboysoftware.com/thank-you',
          orderId: manualSessionId
        });
        emailSent = true;
        console.log(`License email sent to: ${email}`);
      } catch (emailError) {
        console.error('Failed to send license email:', emailError);
        // Don't fail the whole request if email fails
      }
    }

    return res.status(200).json({
      success: true,
      message: 'License created successfully',
      license: {
        id: license.id,
        key: license.license_key,
        email: license.email,
        status: license.status,
        generatedAt: license.generated_at,
        reason: reason || 'manual',
        emailSent: emailSent
      },
      notes: notes || null
    });

  } catch (error) {
    console.error('Error creating manual license:', error);

    // Handle duplicate email (user already has a license)
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        error: 'A license already exists for this email address'
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to create license'
    });
  }
};

module.exports = handler;
