# GA4 Event Tracking - Testing Guide

Your GA4 setup now includes **automatic debugging** that logs all events to the browser console. Here's how to test and verify everything is working.

---

## Quick Test (30 seconds)

### Test Locally

1. **Start Jekyll server:**
   ```bash
   bundle exec jekyll serve
   ```

2. **Open your site:**
   - Go to: `http://localhost:4000`

3. **Open Browser Console:**
   - Press `F12` (Windows/Linux) or `Cmd+Option+J` (Mac)
   - Click the **Console** tab

4. **Check for startup messages:**
   You should see:
   ```
   🔍 Analytics Events: Initializing...
   ✅ Analytics Events: gtag is loaded and ready
   ✅ Download button event listener attached
   🎉 Analytics Events: Setup complete!
   💡 Tip: Type testGA4() in console to send a test event
   ```

5. **Click "Download Free Version" button**
   You should see:
   ```
   📥 Download Event Fired: {
     event: "download_app",
     category: "engagement",
     label: "Free Version v3.3",
     url: "https://github.com/..."
   }
   ✅ Event sent to Google Analytics
   ```

---

## Manual Test Event

Type this in the browser console:
```javascript
testGA4()
```

You should see:
```
🧪 Testing GA4...
✅ Test event sent! Check GA4 Realtime > Events
```

Then check **Google Analytics** → **Realtime** → **Events** and you should see `test_event` appear.

---

## Verify in Google Analytics (Production)

### Step 1: Deploy to GitHub Pages

```bash
git add .
git commit -m "Add GA4 event tracking with debugging"
git push origin main
```

Wait 1-2 minutes for GitHub Pages to rebuild.

### Step 2: Test on Live Site

1. Visit: `https://fatboysoftware.com`
2. Open browser console (F12)
3. You should see the startup messages
4. Click "Download Free Version"
5. Check console for the download event log

### Step 3: Check GA4 Realtime

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Click **Reports** → **Realtime**
4. You should see:
   - **1 user right now** (you)
   - Under **Event count by Event name**, look for `download_app`

### Step 4: Click the Download Button

1. Click "Download Free Version" on your live site
2. Within 5-10 seconds, you should see the event appear in **Realtime > Events**
3. Click on the event name to see details (category, label, etc.)

---

## Understanding the Console Messages

### ✅ Success Messages

| Message | Meaning |
|---------|---------|
| `✅ Analytics Events: gtag is loaded and ready` | GA4 tracking code loaded successfully |
| `✅ Download button event listener attached` | Download button is being tracked |
| `📥 Download Event Fired` | User clicked download button |
| `✅ Event sent to Google Analytics` | Event successfully sent to GA4 |

### ⚠️ Warning Messages

| Message | What It Means | Fix |
|---------|---------------|-----|
| `⚠️ Download button (#download-free-version) not found` | You're on a page without the download button | Normal on other pages (only appears on homepage) |

### ❌ Error Messages

| Message | What It Means | Fix |
|---------|---------------|-----|
| `❌ gtag is not defined` | GA4 script didn't load | Check `google_analytics` in `_config.yml` or disable ad blocker |

---

## Troubleshooting

### Problem: No console messages appear

**Likely causes:**
- Jekyll didn't rebuild the site
- Browser cache is stale
- Wrong page (try homepage)

**Fix:**
```bash
# Stop Jekyll server (Ctrl+C)
# Clear Jekyll cache
bundle exec jekyll clean

# Rebuild and serve
bundle exec jekyll serve

# Hard refresh browser
# Windows/Linux: Ctrl+Shift+R
# Mac: Cmd+Shift+R
```

### Problem: "gtag is not defined"

**Cause:** GA4 tracking script didn't load

**Fix:**
1. Check `_config.yml` has: `google_analytics: G-5RWQHBCC99`
2. Verify `_includes/google-analytics.html` exists
3. Check `_layouts/default.html` loads:
   - `{% include google-analytics.html %}`
   - `assets/js/ga4-events.js`
   - `assets/js/ga4-download-tracking.js`
4. Disable ad blockers (they block gtag.js)

### Problem: Events in console but not in GA4 Realtime

**Cause:** Events are being sent but GA4 isn't receiving them

**Possible reasons:**
1. **Ad blocker** - blocking the network request to GA4
2. **Wrong Measurement ID** - check `_config.yml`
3. **Delay** - can take 5-30 seconds to appear in Realtime
4. **Privacy mode** - some browsers block analytics by default

**Fix:**
1. Disable ad blockers
2. Try in incognito/private mode
3. Wait up to 60 seconds
4. Check Network tab in DevTools for requests to `google-analytics.com`

### Problem: Download button click doesn't log anything

**Cause:** Event listener not attached

**Fix:**
1. Check console for: `✅ Download button event listener attached`
2. If missing, verify you're on the homepage (`index.md`)
3. Check the download link has `id="download-free-version"`
4. Rebuild Jekyll and hard refresh

---

## Testing Checklist

Use this checklist to verify everything works:

### Local Testing
- [ ] Jekyll serves without errors
- [ ] Console shows: "Analytics Events: Setup complete!"
- [ ] Console shows: "gtag is loaded and ready"
- [ ] `testGA4()` command works in console
- [ ] Clicking download button logs event in console

### Production Testing
- [ ] Deployed to GitHub Pages successfully
- [ ] Live site shows console messages
- [ ] GA4 Realtime shows your visit
- [ ] Clicking download sends event to GA4 Realtime
- [ ] Event appears in Realtime within 30 seconds
- [ ] Event details show correct category/label

---

## Event Tracking Details

### Download Free Version Event

**Event Name:** `download_app`

**Parameters:**
- `event_category`: `engagement`
- `event_label`: `Free Version v3.3` (or current version)
- `value`: `0`
- `download_url`: Full GitHub download URL

**Triggered When:**
- User clicks the "Download Free Version" link on homepage

### Purchase Event (Thank You Page)

**Event Name:** `purchase`

**Parameters:**
- `transaction_id`: Stripe session ID or generated ID
- `value`: `149.00`
- `currency`: `USD`
- `items`: Product details

**Triggered When:**
- User lands on `/thank-you` page after purchase

---

## Advanced Testing

### Test with Network Tab

1. Open DevTools (F12)
2. Go to **Network** tab
3. Filter: `google-analytics`
4. Click download button
5. You should see a request to `google-analytics.com/g/collect`
6. Click the request → **Payload** tab
7. Look for your event parameters

### Test All Pages

Run this in console to see which page you're on:
```javascript
console.log('Current page:', window.location.pathname);
```

Download button only appears on homepage (`/` or `/index.html`).

---

## Monitoring in GA4

### View Events (Last 30 minutes)

1. **Google Analytics** → **Reports** → **Realtime** → **Events**
2. Shows all events as they happen
3. Click event name to see details

### View Events (Historical)

1. **Google Analytics** → **Reports** → **Engagement** → **Events**
2. Shows events from past 7/30/90 days
3. Can filter by event name, date range, etc.

### Create Custom Report

1. **Google Analytics** → **Explore**
2. Create new report
3. Add dimension: `Event name`
4. Add metric: `Event count`
5. Filter: `download_app`

---

## Tips

### Console Always Open
When testing locally, keep the browser console open so you can see events fire in real-time.

### Use Incognito Mode
Test in incognito/private browsing to avoid:
- Browser extensions interfering
- Cached versions of your site
- Ad blockers (usually disabled in incognito)

### Clear Jekyll Cache
If changes don't appear:
```bash
bundle exec jekyll clean
bundle exec jekyll serve
```

### Hard Refresh
Always hard refresh after deploying:
- Windows/Linux: `Ctrl+Shift+R`
- Mac: `Cmd+Shift+R`

---

## What's Next?

Once you've confirmed events are working:

1. **Mark events as Conversions in GA4:**
   - Go to **Admin** → **Events**
   - Find `download_app` and mark as conversion
   - Find `purchase` and mark as conversion

2. **Set up custom reports** to track:
   - Download conversion rate
   - Purchase conversion rate
   - User journey from homepage → download → purchase

3. **Remove debugging** (optional):
   - Once confirmed working, you can remove `console.log()` statements
   - Or leave them - they're helpful for troubleshooting

---

## Quick Reference

| What | Where | What to Look For |
|------|-------|------------------|
| **Local test** | `http://localhost:4000` + Console | Startup messages + event logs |
| **Manual test** | Console → `testGA4()` | Test event in GA4 Realtime |
| **Live test** | `https://fatboysoftware.com` | Click download, check Realtime |
| **GA4 Realtime** | GA4 → Reports → Realtime | See `download_app` event |
| **GA4 Events** | GA4 → Reports → Engagement → Events | Historical event data |

---

**Need Help?**
- Check console for error messages
- Verify `_config.yml` has correct Measurement ID
- Disable ad blockers when testing
- Wait 30-60 seconds for events to appear in GA4 Realtime
