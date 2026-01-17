# Google Ads Conversion Tracking Setup Guide

Complete guide to connect GA4 with Google Ads and optimize conversion tracking for Fatboy Financial Planner.

---

## Table of Contents
1. [Link GA4 to Google Ads](#step-1-link-ga4-to-google-ads)
2. [Import GA4 Conversions](#step-2-import-ga4-conversions-to-google-ads)
3. [Set Conversion Values](#step-3-configure-conversion-values)
4. [Verify Tracking](#step-4-verify-tracking-is-working)
5. [Enable Enhanced Conversions](#step-5-optional-enable-enhanced-conversions)
6. [Check Connection Status](#how-to-check-if-youre-already-connected)

---

## Quick Reference

**Your GA4 Measurement ID:** `G-5RWQHBCC99`

**Priority Conversions to Import:**
1. `download_app` (Primary) - Free software downloads
2. `begin_checkout` - Purchase intent ($149 value)
3. `purchase` (Primary) - Completed purchases ($149)
4. `generate_lead` - Email list signups

---

## How to Check If You're Already Connected

Before starting, check if GA4 is already linked to Google Ads:

### In Google Ads:
1. Go to [Google Ads](https://ads.google.com/)
2. Click **Tools & Settings** (wrench icon, top right)
3. Under **Setup**, click **Linked accounts**
4. Look for **Google Analytics (GA4) & Firebase**
5. If you see your GA4 property listed with status "Linked" → **You're already connected! Skip to Step 2**
6. If not listed → Continue with Step 1 below

### In GA4:
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon, bottom left)
3. Under **Product Links**, click **Google Ads Links**
4. If you see active links → **Already connected! Skip to Step 2**
5. If empty → Continue with Step 1 below

---

## Step 1: Link GA4 to Google Ads

### Option A: Link from GA4 (Recommended)

1. **Go to Google Analytics**
   - Visit [analytics.google.com](https://analytics.google.com/)
   - Select your property (Fatboy Financial Planner)

2. **Navigate to Google Ads Links**
   - Click **Admin** (gear icon, bottom left)
   - In the **Property** column, click **Google Ads Links**

3. **Create a New Link**
   - Click **Link** button
   - Select your Google Ads account from the list
   - Click **Next**

4. **Configure Link Settings**
   - **Enable personalized advertising:** Toggle ON (recommended for remarketing)
   - **Enable auto-tagging:** Toggle ON (CRITICAL - required for conversion tracking)
   - Click **Next**

5. **Choose Data Streams**
   - Select your website data stream
   - Click **Next**

6. **Review and Submit**
   - Review settings
   - Click **Submit**

**Status:** Link is now active. Data sharing may take 24 hours to fully sync.

---

### Option B: Link from Google Ads

1. **Go to Google Ads**
   - Visit [ads.google.com](https://ads.google.com/)

2. **Access Linked Accounts**
   - Click **Tools & Settings** (wrench icon)
   - Under **Setup**, click **Linked accounts**

3. **Find Google Analytics**
   - Click **Google Analytics (GA4) & Firebase**
   - Click **Details**

4. **Link Your Property**
   - Find your GA4 property in the list
   - Click **Link**
   - Enable **Personalized advertising** and **Auto-tagging**
   - Click **Link**

---

## Step 2: Import GA4 Conversions to Google Ads

Once GA4 and Google Ads are linked, import your events as conversions.

### 2.1 Access Conversions in Google Ads

1. Go to [Google Ads](https://ads.google.com/)
2. Click **Tools & Settings** (wrench icon)
3. Under **Measurement**, click **Conversions**

### 2.2 Import GA4 Events

1. Click **+ New conversion action**
2. Select **Import**
3. Choose **Google Analytics 4 properties**
4. Click **Continue**

### 2.3 Select Events to Import

You'll see a list of GA4 events. **Select these priority events:**

#### **Primary Conversions** (Most Important)
- ✅ `download_app` - Free software downloads
- ✅ `purchase` - Pro version purchases ($149)

#### **Secondary Conversions** (For Optimization)
- ✅ `begin_checkout` - Purchase intent clicks
- ✅ `generate_lead` - Email signups (if/when implemented)

Click **Import and continue**

---

## Step 3: Configure Conversion Values

After importing, you need to configure each conversion's settings.

### 3.1 Configure `download_app` Conversion

1. In Google Ads → **Conversions**, find `download_app`
2. Click on it to edit
3. Configure:

| Setting | Value | Why |
|---------|-------|-----|
| **Goal** | Submit lead form | Tracks user signups/downloads |
| **Value** | Use different values for each conversion | Already set in GA4 (value: 0) |
| **Count** | One | Only count first download per user |
| **Click-through conversion window** | 30 days | Standard for software downloads |
| **Engagement conversion window** | 1 day | Conservative estimate |
| **Attribution model** | Data-driven (recommended) | Uses machine learning for attribution |
| **Primary action for bidding** | ✅ YES | This is your primary conversion goal |

4. Click **Save**

---

### 3.2 Configure `purchase` Conversion

1. In Google Ads → **Conversions**, find `purchase`
2. Click on it to edit
3. Configure:

| Setting | Value | Why |
|---------|-------|-----|
| **Goal** | Purchase | Tracks completed sales |
| **Value** | Use different values for each conversion | Already set in GA4 (value: 149) |
| **Count** | One | Only count first purchase per user |
| **Click-through conversion window** | 90 days | Longer consideration cycle |
| **Engagement conversion window** | 1 day | View-through conversions |
| **Attribution model** | Data-driven | Optimizes based on actual data |
| **Primary action for bidding** | ✅ YES | Revenue-generating conversion |

4. Click **Save**

---

### 3.3 Configure `begin_checkout` Conversion

1. In Google Ads → **Conversions**, find `begin_checkout`
2. Click on it to edit
3. Configure:

| Setting | Value | Why |
|---------|-------|-----|
| **Goal** | Other | Mid-funnel event |
| **Value** | Use different values for each conversion | Already set in GA4 (value: 149) |
| **Count** | Every | Track multiple clicks to purchase |
| **Click-through conversion window** | 30 days | Standard window |
| **Engagement conversion window** | 1 day | Conservative |
| **Attribution model** | Data-driven | Optimizes bidding |
| **Primary action for bidding** | ❌ NO | Secondary signal only |

4. Click **Save**

**Note:** This is a secondary conversion - use for reporting, not primary bidding.

---

## Step 4: Verify Tracking Is Working

### 4.1 Test in Real-Time

1. **Visit your website:** [https://fatboysoftware.com](https://fatboysoftware.com)
2. **Add GCLID parameter** to URL (simulates Google Ads click):
   ```
   https://fatboysoftware.com/?gclid=test123
   ```
3. **Perform conversion actions:**
   - Click "Download Free Version" button
   - Click "Buy Pro Version" button (Stripe link)

4. **Check GA4 Realtime:**
   - Go to GA4 → **Reports** → **Realtime** → **Events**
   - You should see `download_app` or `begin_checkout` events

5. **Check Google Ads (24-48 hours later):**
   - Go to Google Ads → **Reports** → **Conversions**
   - Filter by last 30 days
   - Look for imported conversions appearing in the report

---

### 4.2 Verify Auto-Tagging

Auto-tagging adds `gclid` parameters to your URLs when users click Google Ads.

**Check if enabled:**
1. Google Ads → **Settings** → **Account settings**
2. Scroll to **Auto-tagging**
3. Ensure **Tag the URL that people click through from my ad** is **ON**

**Test it works:**
1. Click one of your live ads (if running)
2. Check if URL includes `?gclid=...` parameter
3. This parameter connects ad clicks to conversions

---

### 4.3 Check Conversion Tracking Status

1. Go to Google Ads → **Tools** → **Conversions**
2. Look at the **Status** column for each conversion:

| Status | Meaning | Action |
|--------|---------|--------|
| **Recording conversions** ✅ | Working perfectly | No action needed |
| **No recent conversions** ⚠️ | Setup complete, waiting for data | Wait 7 days, drive test traffic |
| **Unverified** ⚠️ | Not firing yet | Check GA4 events are firing |
| **Inactive** ❌ | Not set up correctly | Re-import or troubleshoot |

---

## Step 5 (Optional): Enable Enhanced Conversions

Enhanced conversions improve accuracy by sending hashed customer data (email, name) to Google.

### Why Use It?
- Increases conversion tracking accuracy by 5-15%
- Helps recover conversions lost to cookie blocking
- Required for some advanced bidding strategies

### How to Enable (Quick Method - Tag Manager Not Required)

Since you're using gtag.js directly, you can enable enhanced conversions with code:

1. **Enable in Google Ads:**
   - Go to **Tools** → **Conversions**
   - Click on `purchase` conversion
   - Click **Edit settings**
   - Scroll to **Enhanced conversions**
   - Select **Use Google Tag Manager, gtag.js, or Google Ads API**
   - Click **Save**

2. **Update your purchase event code** (on thank-you page):

```javascript
// When purchase happens, send enhanced conversion data
gtag('event', 'purchase', {
  currency: 'USD',
  value: 149,
  transaction_id: 'TRANSACTION_ID_HERE',
  // Enhanced conversion data (hashed automatically by gtag)
  email: 'customer@example.com', // From Stripe webhook
  phone_number: '+1234567890',   // Optional
  address: {
    first_name: 'John',
    last_name: 'Doe',
    city: 'New York',
    region: 'NY',
    postal_code: '10001',
    country: 'US'
  }
});
```

**Important:** Only send this data on the purchase confirmation page, never on page load for all users.

---

## Troubleshooting

### Problem: "No recent conversions" after 7+ days

**Causes:**
- Not enough traffic clicking through Google Ads
- Auto-tagging disabled
- Ad blocker preventing gtag from loading
- Events firing but not attributed to ads

**Fixes:**
1. Verify auto-tagging is ON in Google Ads settings
2. Check GA4 Realtime shows events firing
3. Test with `?gclid=test123` parameter in URL
4. Wait 30 days for sufficient data (Google Ads needs volume)

---

### Problem: Conversions in GA4 but not in Google Ads

**Cause:** Link not properly configured or auto-tagging disabled

**Fixes:**
1. Check link status: Google Ads → Tools → Linked accounts
2. Ensure auto-tagging is enabled
3. Re-import conversions: Google Ads → Conversions → Import
4. Wait 24-48 hours for data sync

---

### Problem: Conversion count is much lower than expected

**Cause:** Attribution windows too short or ad blockers

**Fixes:**
1. Increase conversion windows (30-90 days)
2. Enable enhanced conversions to recover blocked data
3. Check if most traffic is direct/organic (won't attribute to ads)

---

### Problem: "Inactive" status on conversion

**Cause:** Event not firing or wrong event name

**Fixes:**
1. Test event in GA4 Realtime
2. Check event name matches exactly (case-sensitive)
3. Verify gtag.js is loading (check console: `typeof gtag`)
4. Re-import event from GA4

---

## Conversion Tracking Checklist

Use this to verify your setup:

### Link Setup
- [ ] GA4 linked to Google Ads (verified in both platforms)
- [ ] Auto-tagging enabled in Google Ads
- [ ] Personalized advertising enabled

### Conversions Imported
- [ ] `download_app` imported and configured
- [ ] `purchase` imported and configured
- [ ] `begin_checkout` imported and configured
- [ ] Primary conversions marked for bidding

### Verification
- [ ] Test event sent from GA4 (use `testGA4()`)
- [ ] Test download click tracked in GA4 Realtime
- [ ] GCLID parameter test completed
- [ ] Conversions show "Recording conversions" or "No recent conversions"

### Optimization (Optional)
- [ ] Enhanced conversions enabled for `purchase`
- [ ] Customer data passed on thank-you page
- [ ] Conversion values match expected ($0 for download, $149 for purchase)

---

## Advanced: Custom Conversion Events

If you want to create additional conversion goals:

### Create Micro-Conversions in GA4 First

Add new events to your GA4 tracking (edit `assets/js/ga4-events.js`):

```javascript
// Example: Track pricing page engagement
function trackPricingEngagement() {
  trackEvent('pricing_engagement', {
    event_category: 'engagement',
    value: 5
  });
}
```

Then import the new event to Google Ads following Step 2 above.

---

## Optimization Tips for Google Ads

Once conversions are tracking:

### 1. Use Conversion-Based Bidding
- Switch to **Maximize Conversions** bid strategy
- Or use **Target CPA** (Cost Per Acquisition)
- Set target CPA around $30-50 for `download_app`
- Set target ROAS for `purchase` campaigns

### 2. Create Conversion-Specific Campaigns
- **Campaign 1:** Free Download Focus
  - Optimize for `download_app`
  - Lower CPC bids
  - Broad targeting

- **Campaign 2:** Purchase Focus
  - Optimize for `purchase`
  - Higher CPC bids acceptable
  - Tighter targeting (Roth conversion, tax planning keywords)

### 3. Use Observation Mode for Secondary Conversions
- Set `begin_checkout` to observation mode
- Google Ads will report it but not optimize for it
- Useful for understanding funnel drop-off

### 4. Review Attribution Reports
- Google Ads → **Reports** → **Attribution**
- See which keywords drive `download_app` vs `purchase`
- Adjust bids based on actual conversion paths

---

## Next Steps

1. ✅ Complete Steps 1-4 above
2. ✅ Wait 7 days for data to accumulate
3. ✅ Review conversion performance in Google Ads
4. Consider creating dedicated landing pages for ad groups:
   - `/roth-conversion` for Roth conversion ads
   - `/tcja-2026` for tax law change ads
   - `/advisor-alternative` for fee comparison ads
5. Set up Google Ads remarketing audiences based on converters
6. Create custom conversion funnels in GA4 Explore

---

## Support Resources

- **Google Ads Help:** [Link GA4 to Google Ads](https://support.google.com/google-ads/answer/10447530)
- **GA4 Help:** [About Google Ads Links](https://support.google.com/analytics/answer/9379420)
- **Enhanced Conversions:** [Set up enhanced conversions](https://support.google.com/google-ads/answer/11062876)
- **Your GA4 Property:** [analytics.google.com](https://analytics.google.com/)
- **Your Google Ads:** [ads.google.com](https://ads.google.com/)

---

**Setup Time:** 15-30 minutes
**Data Delay:** 24-48 hours for first conversions
**Optimization Ready:** 7-14 days (need conversion data)

Once complete, you'll have full visibility into which Google Ads drive downloads and purchases, enabling data-driven optimization.
