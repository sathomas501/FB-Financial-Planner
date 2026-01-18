const { sql } = require('@vercel/postgres');

/**
 * License validation endpoint for desktop app
 * POST /api/validate-license
 * Body: { licenseKey: "XXXX-XXXX-XXXX-XXXX", email: "user@example.com" }
 */
const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { licenseKey, email } = body;

    // Validate inputs
    if (!licenseKey || !email) {
      return res.status(400).json({
        valid: false,
        error: 'Missing required fields: licenseKey and email'
      });
    }

    const licensePattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    if (!licensePattern.test(licenseKey)) {
      return res.status(400).json({
        valid: false,
        error: 'Invalid license key format'
      });
    }

    console.log(`Validating license: ${licenseKey} for ${email}`);

    // Query database
    const result = await sql`
      SELECT id, license_key, email, status, product, version,
             generated_at, activated_at, revoked_at, revoked_reason
      FROM licenses
      WHERE license_key = ${licenseKey}
      LIMIT 1
    `;

    // License not found
    if (result.rows.length === 0) {
      console.log(`License not found: ${licenseKey}`);
      return res.status(404).json({
        valid: false,
        error: 'License key not found'
      });
    }

    const license = result.rows[0];

    // Check email match (case-insensitive)
    if (license.email.toLowerCase() !== email.toLowerCase()) {
      console.log(`Email mismatch for license: ${licenseKey}`);
      return res.status(403).json({
        valid: false,
        error: 'License key does not match email address'
      });
    }

    // Check if revoked
    if (license.status === 'revoked') {
      console.log(`License revoked: ${licenseKey}`);
      return res.status(403).json({
        valid: false,
        error: 'License has been revoked',
        reason: license.revoked_reason || 'No reason provided',
        revokedAt: license.revoked_at
      });
    }

    // Valid license - update timestamps
    const now = new Date().toISOString();
    await sql`
      UPDATE licenses
      SET activated_at = COALESCE(activated_at, ${now}),
          last_validated_at = ${now}
      WHERE id = ${license.id}
    `;

    console.log(`License validated successfully: ${licenseKey}`);

    return res.status(200).json({
      valid: true,
      license: {
        key: license.license_key,
        email: license.email,
        product: license.product,
        version: license.version,
        issuedAt: license.generated_at,
        activatedAt: license.activated_at || now
      }
    });

  } catch (error) {
    console.error('Error validating license:', error);
    return res.status(500).json({
      valid: false,
      error: 'Unable to validate license. Please try again later.'
    });
  }
};

module.exports = handler;
