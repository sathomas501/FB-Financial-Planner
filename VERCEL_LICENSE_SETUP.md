# Vercel License Distribution Setup Guide

This guide walks you through setting up automated license key distribution for Fatboy Financial Planner using Vercel serverless functions, Stripe webhooks, and Resend email service.

## Overview

When a customer purchases Fatboy Financial Planner through Stripe:
1. Stripe sends a webhook to your Vercel function
2. The function generates a unique license key
3. The license key is sent to the customer via email
4. (Optional) Admin receives a notification

## Prerequisites

- [x] Stripe account with Payment Link configured
- [ ] Vercel account (free tier works)
- [ ] Resend account (free tier works - 100 emails/day, 3,000/month)
- [ ] Domain configured in Resend for sending emails

---

## Step 1: Install Dependencies

Run this command in your project directory:

```bash
npm install
```

This installs:
- `stripe` - Stripe SDK for webhook verification
- `resend` - Email service for sending license keys
- `uuid` - License key generation

---

## Step 2: Set Up Resend Email Service

### 2.1 Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email

### 2.2 Add Your Domain
1. Go to [Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain: `fatboyfinancialplanner.com`
4. Add the DNS records Resend provides to your domain registrar:
   - SPF record
   - DKIM record
   - DMARC record (optional but recommended)
5. Wait for verification (usually 5-15 minutes)

### 2.3 Get API Key
1. Go to [API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Name it: "Fatboy Financial Planner - License Distribution"
4. Copy the API key (starts with `re_`)
5. Save it securely - you'll need it for Vercel

**Alternative for Testing:**
- Resend allows sending to your own email without domain verification
- Use your verified email address for testing

---

## Step 3: Configure Stripe Webhook

### 3.1 Get Stripe Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Secret key** (starts with `sk_test_` for test mode)
3. Save it securely

### 3.2 Create Webhook Endpoint (After Vercel Deployment)
You'll do this in Step 5 after deploying to Vercel.

---

## Step 4: Deploy to Vercel

### 4.1 Install Vercel CLI (Optional but Recommended)
```bash
npm install -g vercel
```

### 4.2 Deploy via Vercel CLI

1. **Login to Vercel:**
   ```bash
   vercel login
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (first time)
   - Project name? `fatboy-financial-planner` (or keep default)
   - Directory? `.` (current directory)
   - Override settings? **N**

4. **Note your deployment URL:**
   - Example: `https://fatboy-financial-planner-abc123.vercel.app`
   - Your webhook URL will be: `https://your-domain.vercel.app/api/stripe-webhook`

### 4.3 Alternative: Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: **Other**
   - Build Command: (leave empty)
   - Output Directory: `_site`
4. Click "Deploy"

---

## Step 5: Configure Environment Variables in Vercel

### 5.1 Add Environment Variables
1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add the following variables:

| Variable Name | Value | Where to Get It |
|---------------|-------|-----------------|
| `STRIPE_SECRET_KEY` | `sk_test_...` or `sk_live_...` | [Stripe API Keys](https://dashboard.stripe.com/apikeys) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Created in next step |
| `RESEND_API_KEY` | `re_...` | [Resend API Keys](https://resend.com/api-keys) |
| `FROM_EMAIL` | `Fatboy Financial Planner <noreply@fatboyfinancialplanner.com>` | Your verified Resend domain |
| `ADMIN_EMAIL` | `your-email@example.com` | Your email for notifications |
| `LICENSE_SECRET` | `random-secret-string-here` | Generate a random string |

**Important:** Make sure to add these for **Production** environment.

### 5.2 Generate a License Secret
```bash
# On Mac/Linux:
openssl rand -base64 32

# Or use any random string generator
```

---

## Step 6: Create Stripe Webhook

### 6.1 Add Webhook Endpoint
1. Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. **Endpoint URL:** `https://your-vercel-url.vercel.app/api/stripe-webhook`
   - Example: `https://fatboy-financial-planner.vercel.app/api/stripe-webhook`
4. **Description:** "License Distribution - Fatboy Financial Planner"
5. **Events to send:** Click "Select events"
   - Search for: `checkout.session.completed`
   - Select it
6. Click **Add endpoint**

### 6.2 Get Webhook Secret
1. Click on your newly created webhook
2. Click **Reveal** under "Signing secret"
3. Copy the webhook secret (starts with `whsec_`)
4. Go back to Vercel → Settings → Environment Variables
5. Add/Update `STRIPE_WEBHOOK_SECRET` with this value
6. Redeploy if needed: `vercel --prod`

---

## Step 7: Test the Integration

### 7.1 Test with Stripe CLI (Recommended)

1. **Install Stripe CLI:**
   ```bash
   # Mac:
   brew install stripe/stripe-cli/stripe

   # Windows:
   scoop install stripe

   # Or download from: https://stripe.com/docs/stripe-cli
   ```

2. **Login:**
   ```bash
   stripe login
   ```

3. **Forward webhooks to your local endpoint:**
   ```bash
   stripe listen --forward-to https://your-vercel-url.vercel.app/api/stripe-webhook
   ```

4. **Trigger a test checkout event:**
   ```bash
   stripe trigger checkout.session.completed
   ```

5. **Check logs:**
   - Watch the Stripe CLI output
   - Check Vercel function logs: `vercel logs`
   - Check your email inbox

### 7.2 Test with Real Payment (Test Mode)

1. Go to your Stripe Payment Link (test mode)
2. Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code
3. Complete the checkout
4. Check your email for the license key
5. Check Vercel logs for any errors

### 7.3 Verify in Stripe Dashboard
1. Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Click on your webhook
3. Check "Recent deliveries"
4. Verify status is "Succeeded" (green checkmark)

---

## Step 8: Switch to Production

### 8.1 Switch Stripe to Live Mode
1. Get your **live mode** secret key from [Stripe](https://dashboard.stripe.com/apikeys)
2. Update `STRIPE_SECRET_KEY` in Vercel environment variables
3. Create a new webhook endpoint for **live mode**:
   - Use the same URL: `https://your-vercel-url.vercel.app/api/stripe-webhook`
   - Select `checkout.session.completed` event
4. Update `STRIPE_WEBHOOK_SECRET` in Vercel with the new live mode webhook secret

### 8.2 Update Payment Link
- Make sure your website links to the **live mode** Stripe Payment Link
- Currently in your site: `https://buy.stripe.com/4gM8wI92w9i98r95sSawo00`
- Verify this is a live mode link (check in Stripe dashboard)

### 8.3 Redeploy
```bash
vercel --prod
```

---

## Step 9: Add Database Storage (Optional but Recommended)

Currently, licenses are only logged. For production, add database storage:

### Option A: Vercel Postgres (Recommended)

1. **Add Vercel Postgres to your project:**
   - Go to Vercel Dashboard → Storage → Create Database
   - Select "Postgres"
   - Click "Create"

2. **Install SDK:**
   ```bash
   npm install @vercel/postgres
   ```

3. **Update webhook handler:**
   ```javascript
   const { sql } = require('@vercel/postgres');

   async function storeLicense(licenseInfo) {
     await sql`
       INSERT INTO licenses (license_key, email, stripe_session_id, generated_at, product, version, hash)
       VALUES (${licenseInfo.licenseKey}, ${licenseInfo.email}, ${licenseInfo.stripeSessionId},
               ${licenseInfo.generatedAt}, ${licenseInfo.product}, ${licenseInfo.version}, ${licenseInfo.hash})
     `;
   }
   ```

### Option B: Airtable (No-Code Database)

1. **Create Airtable base:**
   - Go to [airtable.com](https://airtable.com)
   - Create a new base: "Fatboy Licenses"
   - Create table with fields:
     - License Key (Single line text)
     - Email (Email)
     - Stripe Session ID (Single line text)
     - Generated At (Date)
     - Product (Single line text)
     - Version (Single line text)
     - Hash (Single line text)

2. **Get API credentials:**
   - Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
   - Create a personal access token
   - Get your base ID from the API documentation

3. **Install SDK:**
   ```bash
   npm install airtable
   ```

4. **Add environment variables:**
   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID`

---

## Troubleshooting

### License emails not sending

**Check:**
1. Resend API key is correct in Vercel
2. Domain is verified in Resend
3. `FROM_EMAIL` matches your verified domain
4. Check Resend logs: [resend.com/emails](https://resend.com/emails)
5. Check Vercel function logs: `vercel logs`

### Webhook not receiving events

**Check:**
1. Webhook URL is correct: `https://your-domain.vercel.app/api/stripe-webhook`
2. Webhook secret is correct in Vercel environment variables
3. Event `checkout.session.completed` is selected in Stripe
4. Check Stripe webhook logs for delivery attempts
5. Verify function is deployed: visit `https://your-domain.vercel.app/api/stripe-webhook` (should return "Method not allowed")

### Webhook signature verification failed

**Check:**
1. `STRIPE_WEBHOOK_SECRET` is correct (should start with `whsec_`)
2. Secret matches the webhook endpoint (test vs. live mode)
3. Redeploy after adding environment variables

### Customer not receiving email

**Check:**
1. Email is in spam folder
2. Resend logs show successful delivery
3. Customer email is correct in Stripe checkout
4. Check Vercel function logs for errors

---

## Monitoring

### Vercel Function Logs
```bash
vercel logs --follow
```

### Resend Email Logs
- [resend.com/emails](https://resend.com/emails)

### Stripe Webhook Logs
- [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)

---

## Cost Estimate

### Free Tier (Recommended for Starting)
- **Vercel:** 100GB bandwidth, 100k function invocations/month - **$0**
- **Resend:** 3,000 emails/month - **$0**
- **Stripe:** 2.9% + $0.30 per transaction

### At 100 sales/month:
- Vercel: Free tier
- Resend: Free tier (100 sales = 200 emails with admin notifications)
- **Total cost: $0** (plus Stripe fees)

### At 1,000 sales/month:
- Vercel: Free tier (still within limits)
- Resend: ~$10/month (need paid tier for 3,000+ emails)
- **Total cost: ~$10/month** (plus Stripe fees)

---

## Security Considerations

1. **Never commit secrets:** Ensure `.env` is in `.gitignore`
2. **Use environment variables:** All sensitive data in Vercel environment variables
3. **Webhook signature verification:** Already implemented in the webhook handler
4. **HTTPS only:** Vercel automatically provides HTTPS
5. **License validation:** Consider adding server-side license validation in your app

---

## Next Steps

After setup is complete:

1. [ ] Test with a real purchase (test mode)
2. [ ] Verify email delivery
3. [ ] Add database storage for licenses
4. [ ] Implement license validation in your desktop app
5. [ ] Set up monitoring/alerts for failed webhook deliveries
6. [ ] Consider adding a customer portal for license recovery

---

## Support

If you run into issues:

1. Check Vercel function logs: `vercel logs`
2. Check Stripe webhook logs: [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
3. Check Resend email logs: [resend.com/emails](https://resend.com/emails)
4. Review this documentation again
5. Check Vercel, Stripe, and Resend documentation

---

## File Structure

```
fatboy-financial-planner/
├── api/
│   ├── stripe-webhook.js          # Main webhook handler
│   └── utils/
│       ├── license-generator.js   # License key generation
│       └── email-sender.js        # Email templates and sending
├── vercel.json                    # Vercel configuration
├── package.json                   # Dependencies
├── .env.example                   # Environment variable template
└── VERCEL_LICENSE_SETUP.md       # This file
```

---

## License Key Format

Generated keys follow this format:
- **Format:** `XXXX-XXXX-XXXX-XXXX`
- **Example:** `A1B2-C3D4-E5F6-G7H8`
- **Character set:** A-Z, 0-9 (uppercase)
- **Length:** 16 characters (19 with dashes)

Each license includes:
- Unique UUID-based key
- SHA-256 hash for validation
- Email association
- Stripe session ID
- Generation timestamp

---

Made with ❤️ for Fatboy Financial Planner
