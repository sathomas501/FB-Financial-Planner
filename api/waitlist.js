const { Resend } = require('resend');
const { neon } = require('@neondatabase/serverless');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body || {};

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const sanitizedEmail = email.trim().toLowerCase().slice(0, 254);

  try {
    // Save to contacts DB — fire and forget, don't fail the request if this errors
    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);
      sql`INSERT INTO contacts (email, source) VALUES (${sanitizedEmail}, 'waitlist')`.catch(
        (err) => console.error('Waitlist DB insert failed:', err)
      );
    }

    const fromAddress = process.env.FROM_EMAIL || 'Fatboy Financial Planner <hello@fatboysoftware.com>';
    const adminEmail = process.env.ADMIN_EMAIL;

    await resend.emails.send({
      from: fromAddress,
      to: sanitizedEmail,
      subject: "You're on the waitlist - Fatboy Financial Planner",
      text: [
        "You're on the list!",
        "",
        "Thanks for signing up. We'll email you when the Fatboy Financial Planner web version is ready.",
        "",
        "In the meantime, the full desktop app is available for Windows and Linux:",
        "https://fatboysoftware.com",
        "",
        "— The Fatboy Software Team"
      ].join('\n'),
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:500px;margin:0 auto;padding:2rem;color:#111;">
          <h1 style="margin-top:0;color:#16a34a;font-size:1.5rem;">You're on the list!</h1>
          <p>Thanks for signing up. We'll email you when the Fatboy Financial Planner web version is ready.</p>
          <p>In the meantime, the full desktop app is available for Windows and Linux:</p>
          <p><a href="https://fatboysoftware.com" style="color:#16a34a;font-weight:600;">fatboysoftware.com</a></p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:1.5rem 0;">
          <p style="color:#6b7280;font-size:0.875rem;margin:0;">
            You signed up at fatboysoftware.com/landing. Reply to this email if you have questions.
          </p>
        </div>
      `,
      tags: [{ name: 'category', value: 'waitlist' }]
    });

    if (adminEmail) {
      await resend.emails.send({
        from: fromAddress,
        to: adminEmail,
        subject: `Waitlist signup: ${sanitizedEmail}`,
        text: `New mobile waitlist signup: ${sanitizedEmail}\nTime: ${new Date().toISOString()}`
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error);
    return res.status(500).json({ error: 'Failed to process signup' });
  }
};
