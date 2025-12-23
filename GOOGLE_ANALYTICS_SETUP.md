# Google Analytics Setup Guide

This site is configured for Google Analytics 4 (GA4) tracking.

## Quick Setup (3 Steps)

### Step 1: Get Your Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new **GA4 Property** (if you don't have one):
   - Click **Admin** (gear icon, bottom left)
   - Click **Create Property**
   - Enter property name: "Fatboy Financial Planner"
   - Select timezone and currency
   - Click **Create**
3. Go to **Admin** → **Data Streams** → **Web**
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 2: Add Measurement ID to Config

Edit `_config.yml` and replace the placeholder:

```yaml
# Google Analytics
google_analytics: G-XXXXXXXXXX  # Replace with your actual ID
```

**Example:**
```yaml
google_analytics: G-ABC123DEF4
```

### Step 3: Deploy and Test

```bash
# Commit your changes
git add _config.yml _layouts/ _includes/
git commit -m "Configure Google Analytics with measurement ID"
git push origin main
```

**Test it works:**
1. Visit your live site: https://fatboysoftware.com
2. Open browser console (F12)
3. Should see: `gtag` function defined
4. Go to GA4 → **Reports** → **Realtime**
5. You should see your visit!

---

## What Was Installed

### Files Created

1. **`_includes/google-analytics.html`**
   - Contains the GA4 tracking code
   - Only loads if `google_analytics` is set in config

2. **`_layouts/default.html`**
   - Custom layout that overrides theme
   - Includes Google Analytics in `<head>`
   - Maintains all jekyll-theme-slate styling

3. **`_config.yml`** (updated)
   - Added `google_analytics` configuration

### How It Works

1. Jekyll reads `google_analytics` from `_config.yml`
2. The custom layout includes `google-analytics.html`
3. If Measurement ID is set, GA4 code is added to every page
4. Tracking starts automatically on page load

---

## Verify Installation

### Local Testing

```bash
# Build and serve locally
bundle exec jekyll serve

# Visit http://localhost:4000
# Open browser console (F12)
# Type: gtag
# Should see: function gtag()
```

### Production Testing

1. Deploy to GitHub Pages (or your host)
2. Visit your live site
3. Open **Google Analytics** → **Realtime** → **Overview**
4. Should see "1 user right now"
5. Click around - events should appear

---

## What Gets Tracked

### Automatic Events

GA4 tracks these automatically:
- **Page views** - Every page visit
- **Scroll depth** - How far users scroll
- **Outbound clicks** - Links to external sites
- **File downloads** - PDF, ZIP, etc.
- **Video engagement** - YouTube embeds

### Custom Events

Your **Thank You page** tracks:
- `purchase` event with transaction details
- Captured automatically on page load
- Includes value ($149), product info, session ID

---

## View Your Data

### Realtime Reports
- **Admin** → **Reports** → **Realtime**
- See visitors currently on your site
- See pages they're viewing

### E-commerce Reports
- **Admin** → **Reports** → **Monetization**
- See purchase events from thank-you page
- Track total revenue, transactions

### Conversion Tracking
- **Admin** → **Reports** → **Conversions**
- Mark `purchase` as key conversion
- Track conversion rate

---

## Privacy & GDPR

### Current Setup
- ✅ No cookies until consent (if you add cookie banner)
- ✅ Analytics.js loaded asynchronously
- ✅ No personally identifiable information (PII) sent

### Optional: Add Cookie Consent

If you want GDPR compliance:

```html
<!-- Add to _includes/cookie-consent.html -->
<div id="cookie-banner" style="display:none">
  <p>We use cookies to improve your experience.</p>
  <button onclick="acceptCookies()">Accept</button>
</div>

<script>
  function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
    // Initialize GA after consent
    gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }

  // Show banner if not accepted
  if (!localStorage.getItem('cookieConsent')) {
    document.getElementById('cookie-banner').style.display = 'block';
  }
</script>
```

---

## Troubleshooting

### GA Not Loading

**Issue:** Console shows "gtag is not defined"

**Fix:**
1. Check `_config.yml` has correct Measurement ID
2. Verify format: `G-XXXXXXXXXX` (starts with G-)
3. Rebuild Jekyll: `bundle exec jekyll serve`
4. Hard refresh browser: Ctrl+Shift+R

### No Data in GA4

**Issue:** Realtime shows 0 users

**Fix:**
1. Wait 24-48 hours for data to process
2. Check Realtime (shows immediately)
3. Verify Measurement ID is correct
4. Disable ad blockers
5. Check browser console for errors

### Purchase Events Not Tracking

**Issue:** Thank-you page not sending purchase events

**Fix:**
1. Visit: `/thank-you?session_id=test123`
2. Open browser console
3. Should see: "Google Analytics purchase event tracked"
4. If not, check GA4 is loaded before thank-you page script

---

## Next Steps

1. ✅ Replace `G-XXXXXXXXXX` with your real Measurement ID
2. ✅ Deploy to production
3. ✅ Test in Realtime reports
4. ✅ Mark `purchase` as conversion in GA4
5. ✅ Set up custom reports/dashboards
6. ✅ Configure Stripe redirect with `session_id` parameter

---

## Support

- **GA4 Help:** https://support.google.com/analytics
- **Jekyll Docs:** https://jekyllrb.com/docs/
- **This setup:** Check `_includes/google-analytics.html`

---

**Ready!** Just add your Measurement ID and push to production. 🚀
