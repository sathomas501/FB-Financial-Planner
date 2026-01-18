const { sql } = require('@vercel/postgres');

/**
 * Admin endpoint to revoke a license
 * POST /api/admin/revoke-license
 * Headers: { "x-admin-key": "your-admin-secret" }
 * Body: {
 *   licenseKey: "XXXX-XXXX-XXXX-XXXX",
 *   reason: "Chargeback",
 *   adminEmail: "admin@example.com"
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
      console.warn('Unauthorized revocation attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { licenseKey, reason, adminEmail } = body;

    if (!licenseKey) {
      return res.status(400).json({ error: 'License key required' });
    }

    console.log(`Revoking license: ${licenseKey} by ${adminEmail}`);

    const result = await sql`
      UPDATE licenses
      SET status = 'revoked',
          revoked_at = NOW(),
          revoked_reason = ${reason || 'No reason provided'},
          revoked_by = ${adminEmail || 'Unknown'}
      WHERE license_key = ${licenseKey}
      RETURNING id, license_key, email, status
    `;

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'License not found'
      });
    }

    const license = result.rows[0];
    console.log(`License revoked successfully:`, license);

    return res.status(200).json({
      success: true,
      message: 'License revoked successfully',
      license: {
        key: license.license_key,
        email: license.email,
        status: license.status
      }
    });

  } catch (error) {
    console.error('Error revoking license:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to revoke license'
    });
  }
};

module.exports = handler;
