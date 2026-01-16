const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends license key email to customer after successful purchase
 *
 * @param {Object} params - Email parameters
 * @param {string} params.to - Customer email address
 * @param {string} params.customerName - Customer name
 * @param {string} params.licenseKey - Generated license key
 * @param {string} params.downloadUrl - URL to download the software
 * @param {string} params.orderId - Stripe order/session ID
 * @returns {Promise<Object>} Email send result
 */
async function sendLicenseEmail({ to, customerName, licenseKey, downloadUrl, orderId }) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Fatboy Financial Planner License Key</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #0066cc 0%, #004c99 100%);
          color: white;
          padding: 30px 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background: #f9f9f9;
          padding: 30px 20px;
          border: 1px solid #e0e0e0;
        }
        .license-box {
          background: white;
          border: 2px dashed #0066cc;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
          border-radius: 4px;
        }
        .license-key {
          font-size: 24px;
          font-weight: bold;
          color: #0066cc;
          letter-spacing: 2px;
          font-family: 'Courier New', monospace;
          margin: 10px 0;
          user-select: all;
        }
        .download-button {
          display: inline-block;
          background: #0066cc;
          color: white;
          padding: 14px 28px;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
          margin: 20px 0;
        }
        .instructions {
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          padding: 20px;
          color: #666;
          font-size: 12px;
          border-top: 1px solid #e0e0e0;
          margin-top: 20px;
        }
        .order-details {
          background: white;
          padding: 15px;
          border-radius: 4px;
          margin: 15px 0;
          font-size: 14px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎉 Thank You for Your Purchase!</h1>
        <p>Welcome to Fatboy Financial Planner Pro - Founding Member</p>
      </div>

      <div class="content">
        <p>Hi ${customerName || 'there'},</p>

        <p>Thank you for becoming a Founding Member of Fatboy Financial Planner! Your support means the world to us.</p>

        <div class="license-box">
          <p style="margin-top: 0; color: #666; font-size: 14px;">Your License Key:</p>
          <div class="license-key">${licenseKey}</div>
          <p style="margin-bottom: 0; color: #999; font-size: 12px;">Click to copy • Keep this email for your records</p>
        </div>

        <div class="instructions">
          <h3 style="margin-top: 0;">📋 Next Steps:</h3>
          <ol style="margin-bottom: 0; padding-left: 20px;">
            <li><strong>Download</strong> the software using the button below</li>
            <li><strong>Install</strong> Fatboy Financial Planner on your computer</li>
            <li><strong>Enter your license key</strong> when you first launch the app</li>
            <li><strong>Start planning</strong> your financial future!</li>
          </ol>
        </div>

        <div style="text-align: center;">
          <a href="${downloadUrl}" class="download-button">Download Fatboy Financial Planner</a>
        </div>

        <div class="order-details">
          <strong>Order Details:</strong><br>
          Product: Fatboy Financial Planner Pro - Founding Member<br>
          Order ID: ${orderId}<br>
          License Type: Lifetime License<br>
          Price: $149.00 USD
        </div>

        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">

        <h3>💡 Need Help?</h3>
        <p>If you have any questions or need assistance:</p>
        <ul>
          <li>Visit our FAQ: <a href="https://fatboyfinancialplanner.com/thank-you#faq">fatboyfinancialplanner.com/thank-you#faq</a></li>
          <li>Check installation guide: <a href="https://fatboyfinancialplanner.com/thank-you#getting-started">Getting Started Guide</a></li>
          <li>Contact support: Reply to this email</li>
        </ul>

        <p style="margin-top: 30px;">
          <strong>Thank you for being a Founding Member!</strong><br>
          Your support helps us build better financial planning tools for everyone.
        </p>

        <p>Best regards,<br>
        <strong>The Fatboy Financial Planner Team</strong></p>
      </div>

      <div class="footer">
        <p>This email was sent because you purchased Fatboy Financial Planner Pro.<br>
        Keep this email for your records - you'll need your license key to activate the software.</p>
        <p>&copy; ${new Date().getFullYear()} Fatboy Financial Planner. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;

  const emailText = `
Thank You for Your Purchase!

Hi ${customerName || 'there'},

Thank you for becoming a Founding Member of Fatboy Financial Planner!

YOUR LICENSE KEY: ${licenseKey}

Next Steps:
1. Download the software from: ${downloadUrl}
2. Install Fatboy Financial Planner on your computer
3. Enter your license key when you first launch the app
4. Start planning your financial future!

Order Details:
- Product: Fatboy Financial Planner Pro - Founding Member
- Order ID: ${orderId}
- License Type: Lifetime License
- Price: $149.00 USD

Need Help?
- FAQ: https://fatboyfinancialplanner.com/thank-you#faq
- Getting Started: https://fatboyfinancialplanner.com/thank-you#getting-started
- Support: Reply to this email

Thank you for being a Founding Member!

Best regards,
The Fatboy Financial Planner Team
  `;

  try {
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Fatboy Financial Planner <onboarding@fatboyfinancialplanner.com>',
      to: to,
      subject: '🎉 Your Fatboy Financial Planner License Key',
      html: emailHtml,
      text: emailText,
      tags: [
        { name: 'category', value: 'license-delivery' },
        { name: 'order_id', value: orderId }
      ]
    });

    console.log('License email sent successfully:', result);
    return { success: true, messageId: result.id };
  } catch (error) {
    console.error('Error sending license email:', error);
    throw new Error(`Failed to send license email: ${error.message}`);
  }
}

/**
 * Sends a notification email to admin when a purchase is made
 *
 * @param {Object} params - Notification parameters
 * @param {string} params.customerEmail - Customer email
 * @param {string} params.customerName - Customer name
 * @param {string} params.licenseKey - Generated license key
 * @param {string} params.orderId - Stripe order/session ID
 * @param {number} params.amount - Purchase amount in cents
 * @returns {Promise<Object>} Email send result
 */
async function sendAdminNotification({ customerEmail, customerName, licenseKey, orderId, amount }) {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.log('No admin email configured, skipping notification');
    return { success: false, reason: 'No admin email configured' };
  }

  const emailHtml = `
    <h2>New Fatboy Financial Planner Purchase</h2>
    <p><strong>Customer:</strong> ${customerName || 'N/A'} (${customerEmail})</p>
    <p><strong>License Key:</strong> <code>${licenseKey}</code></p>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Amount:</strong> $${(amount / 100).toFixed(2)} USD</p>
    <p><strong>Time:</strong> ${new Date().toISOString()}</p>
  `;

  try {
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Fatboy Financial Planner <notifications@fatboyfinancialplanner.com>',
      to: adminEmail,
      subject: `New Purchase: ${customerEmail} - $${(amount / 100).toFixed(2)}`,
      html: emailHtml,
      tags: [
        { name: 'category', value: 'admin-notification' }
      ]
    });

    console.log('Admin notification sent successfully:', result);
    return { success: true, messageId: result.id };
  } catch (error) {
    console.error('Error sending admin notification:', error);
    // Don't throw - admin notification failure shouldn't break the flow
    return { success: false, error: error.message };
  }
}

module.exports = {
  sendLicenseEmail,
  sendAdminNotification
};
