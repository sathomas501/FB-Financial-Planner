// api/user-count.js
// Vercel serverless function — returns live Founding Member count from Neon
// Called by the marketing site on page load to update scarcity messaging

const { neon } = require('@neondatabase/serverless');

const FOUNDING_MEMBER_LIMIT = 200;

module.exports = async function handler(req, res) {
  // CORS — allow the marketing site to call this from the browser
  res.setHeader('Access-Control-Allow-Origin', 'https://fatboysoftware.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate'); // cache 5 min at CDN edge

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    // Count licenses that have been activated (adjust table/column names to match your schema)
    // Common variations shown — uncomment the one that matches your Neon schema:

    // Option A: if you have a 'licenses' table with a 'created_at' column
    const result = await sql`
      SELECT COUNT(*) as count
      FROM licenses
      WHERE status = 'active'
         OR status IS NULL
    `;

    // Option B: if your table uses 'validated' or 'activated' flag
    // const result = await sql`
    //   SELECT COUNT(*) as count FROM licenses WHERE activated = true
    // `;

    // Option C: count all rows if every row is a valid purchase
    // const result = await sql`SELECT COUNT(*) as count FROM licenses`;

    const count = parseInt(result[0].count, 10);
    const remaining = Math.max(0, FOUNDING_MEMBER_LIMIT - count);
    const isSoldOut = count >= FOUNDING_MEMBER_LIMIT;

    return res.status(200).json({
      count,
      remaining,
      limit: FOUNDING_MEMBER_LIMIT,
      isSoldOut,
      regularPrice: 249,
      foundingPrice: 149,
    });

  } catch (error) {
    console.error('user-count error:', error);

    // On error, return a safe fallback so the page still renders correctly
    // — don't expose the real count or break the page
    return res.status(200).json({
      count: null,
      remaining: null,
      limit: FOUNDING_MEMBER_LIMIT,
      isSoldOut: false,
      regularPrice: 249,
      foundingPrice: 149,
      error: true,
    });
  }
};
