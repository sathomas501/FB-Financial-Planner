const { sql } = require('@vercel/postgres');

/**
 * Admin endpoint to list licenses
 * GET /api/admin/list-licenses?status=active&email=user@example.com&limit=50&offset=0
 * Headers: { "x-admin-key": "your-admin-secret" }
 */
const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify admin authentication
    const adminKey = req.headers['x-admin-key'];
    if (!adminKey || adminKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { status, email, limit = '50', offset = '0' } = req.query;

    // Build base query
    let conditions = [];
    let params = [];

    if (status) {
      conditions.push(`status = $${params.length + 1}`);
      params.push(status);
    }
    if (email) {
      conditions.push(`email ILIKE $${params.length + 1}`);
      params.push(`%${email}%`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Execute query
    const query = `
      SELECT
        id,
        license_key,
        email,
        customer_name,
        status,
        product,
        version,
        generated_at,
        activated_at,
        last_validated_at,
        stripe_session_id,
        amount_paid,
        revoked_at,
        revoked_reason
      FROM licenses
      ${whereClause}
      ORDER BY generated_at DESC
      LIMIT $${params.length + 1}
      OFFSET $${params.length + 2}
    `;

    params.push(parseInt(limit), parseInt(offset));

    const result = await sql.query(query, params);

    return res.status(200).json({
      success: true,
      count: result.rows.length,
      licenses: result.rows
    });

  } catch (error) {
    console.error('Error listing licenses:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to list licenses'
    });
  }
};

module.exports = handler;
