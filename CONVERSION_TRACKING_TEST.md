# Conversion Tracking Verification Guide

Complete guide to verify your Google Ads conversion tracking is working correctly.

---

## Understanding Conversion Attribution

### Why Direct Clicks Don't Show in Google Ads:

**Google Ads ONLY tracks conversions from:**
1. Clicks on your Google Ads
2. Impressions of your Google Ads (view-through conversions)
3. URLs with `gclid` parameter (which Google Ads adds automatically)

**Google Ads does NOT track:**
- Direct traffic to your website
- Organic search traffic
- Traffic from other sources (email, social, etc.)
- Clicks without GCLID parameter

**All events are sent to GA4**, but only GCLID-tagged events are attributed to Google Ads.

---

## Step-by-Step Verification Tests

### Test 1: GA4 Event Tracking (Basic Test)

**What this tests:** Your website is sending events to GA4

**How to test:**

1. **Open GA4 Realtime:**
   - Go to: [https://analytics.google.com](https://analytics.google.com)
   - Click **Reports** → **Realtime**
   - Keep this tab open

2. **Visit your website:**
   - Go to: [https://fatboysoftware.com](https://fatboysoftware.com)
   - Open browser console (F12) to see debug logs

3. **Click "Download Free Version" button**

4. **Check GA4 Realtime (within 10 seconds):**
   - Look for event: `download_app`
   - Event count should increase
   - You should see yourself as "1 user right now"

**Expected Result:**
```
✅ Event "download_app" appears in GA4 Realtime
✅ Event count increases
✅ Console shows: "Download Event Fired" (if debugging is on)
```

**If this fails:** GA4 tracking is broken. Check:
- Is gtag.js loading? (Check browser console for errors)
- Is GA4 measurement ID correct in `_config.yml`?
- Is ad blocker preventing gtag.js?

---

### Test 2: GCLID Parameter Test (Simulated Google Ads Click)

**What this tests:** Events with GCLID are being sent to Google Ads

**How to test:**

1. **Add GCLID to URL:**
   ```
   https://fatboysoftware.com/?gclid=test_conversion_123
   ```

2. **Copy and paste this URL into your browser**
   - You're simulating a Google Ads click
   - The `gclid` parameter tells Google this came from an ad

3. **Click "Download Free Version" button**

4. **Check GA4 Realtime:**
   - Should see `download_app` event
   - Should see the event has gclid associated with it

5. **Check Google Ads (24-48 hours later):**
   - Go to: Google Ads → **Tools** → **Conversions**
   - Click on `www.fatboysoftware.com (web) download_app`
   - Click **"All conversions"** to see details
   - Look for a conversion with source containing "test"

**Expected Result:**
```
✅ Immediate: Event appears in GA4 Realtime
✅ 24-48 hours: Conversion appears in Google Ads with test gclid
```

**If GA4 works but Google Ads doesn't receive it:**
- Wait 48 hours (Google Ads has delay)
- Check if GA4 → Google Ads link is active
- Verify auto-tagging is enabled in Google Ads

---

### Test 3: Real Google Ads Click Test

**What this tests:** Actual ads are driving conversions

**How to test:**

**Option A: Click Your Own Ad (Not Recommended - Can Skew Data)**
1. Search for your keywords on Google
2. Click your actual ad (costs you money!)
3. Click download button
4. Wait 24-48 hours
5. Check Google Ads conversions

**Option B: Use Google Ads Preview Tool (Recommended)**
1. Go to Google Ads → **Tools** → **Ad Preview and Diagnosis**
2. Enter your keyword (e.g., "roth conversion calculator")
3. See if your ad appears (doesn't cost you or count as impression)
4. You can't click from preview tool, but you can verify ad is showing

**Option C: Wait for Real Traffic**
1. Launch your campaigns
2. Wait 7 days
3. Check if conversions are coming in from real users

**Expected Result:**
```
✅ Conversions appear in Google Ads after real users click ads
✅ Conversion source shows as "Google Ads"
✅ Attribution data shows which campaign/ad group drove conversion
```

---

### Test 4: End-to-End Browser Console Test

**What this tests:** Complete tracking flow with debugging

**How to test:**

1. **Open browser console:**
   - Press F12 (Windows) or Cmd+Option+J (Mac)
   - Go to **Console** tab

2. **Visit your site with GCLID:**
   ```
   https://fatboysoftware.com/?gclid=debug_test_456
   ```

3. **Check console for GA4 initialization:**
   ```
   Look for messages like:
   - "GA4 custom event tracking is ready"
   - "Tip: run testGA4() from console..."
   ```

4. **Test GA4 manually in console:**
   ```javascript
   testGA4()
   ```

   You should see:
   ```
   ✅ test_event sent to GA4 Realtime > Events
   ```

5. **Click download button and watch console:**

   You should see (if your code has debug logs):
   ```
   📥 Download Event Fired: {
     platform: "windows",
     download_version: "...",
     download_url: "..."
   }
   ```

6. **Check Network tab:**
   - Go to **Network** tab in DevTools
   - Filter: `google-analytics` or `collect`
   - Click download button
   - You should see network request to `google-analytics.com/g/collect`
   - Click the request → **Payload** tab
   - Look for event parameters

**Expected Result:**
```
✅ testGA4() sends event successfully
✅ Download click triggers network request to GA4
✅ Payload contains event_name: "download_app"
✅ Payload contains platform, version, URL parameters
```

---

## Common Issues & Fixes

### Issue 1: "No recent conversions" in Google Ads

**Possible causes:**
1. **No traffic with GCLID** - You haven't gotten any clicks from Google Ads yet
2. **Conversion window too short** - Conversion happened outside attribution window
3. **Link not active** - GA4 → Google Ads link not properly configured
4. **Auto-tagging disabled** - GCLID not being added to URLs

**How to fix:**
1. Wait for real Google Ads traffic (7+ days after launch)
2. Test with GCLID parameter manually (see Test 2)
3. Check link: Google Ads → Tools → Linked Accounts → GA4 (should show "Linked")
4. Check auto-tagging: Google Ads → Settings → Account Settings → Auto-tagging (should be ON)

---

### Issue 2: Events in GA4 but not in Google Ads

**Possible causes:**
1. **GA4 → Google Ads link not working** - Data not flowing
2. **Conversion not marked as "key event"** in GA4
3. **48-hour delay** - Google Ads takes time to sync
4. **Event name mismatch** - Google Ads listening for wrong event

**How to fix:**
1. Verify link: GA4 → Admin → Google Ads Links (should show active link)
2. Verify key event: GA4 → Admin → Events → Look for `download_app` with filled star ⭐
3. Wait 48 hours after test
4. Check event name matches exactly in both systems

---

### Issue 3: Download button not triggering events

**Possible causes:**
1. **Button ID mismatch** - Code looking for wrong button ID
2. **JavaScript error** - Code not loading properly
3. **Ad blocker** - Blocking gtag.js

**How to fix:**

1. **Check button ID in HTML:**
   - View page source of fatboysoftware.com
   - Search for: `id="download-free-version"`
   - Verify it exists

2. **Check JavaScript console for errors:**
   - Press F12 → Console
   - Look for red error messages
   - Common: "gtag is not defined" = GA4 not loading

3. **Disable ad blockers:**
   - Ad blockers prevent gtag.js from loading
   - Test in incognito mode with extensions disabled

---

### Issue 4: Conversions showing but wrong count

**Possible causes:**
1. **Count setting wrong** - Set to "Every" instead of "One"
2. **Multiple events per session** - User clicking multiple times
3. **Test conversions polluting data** - Your own test clicks counting

**How to fix:**
1. Change Count to "One": Google Ads → Conversions → Edit conversion → Count = "One"
2. This is expected if user clicks multiple download links (Windows + Linux)
3. Exclude your own IP: Google Ads → Settings → IP Exclusions

---

## Verification Checklist

Use this checklist to verify everything is working:

### GA4 Setup ✅
- [ ] GA4 Measurement ID in `_config.yml` is correct (G-5RWQHBCC99)
- [ ] gtag.js loads on every page (check browser console)
- [ ] `download_app` is marked as key event (filled star in GA4)
- [ ] Events appear in GA4 Realtime when you test

### Google Ads Setup ✅
- [ ] GA4 linked to Google Ads (Google Ads → Linked Accounts)
- [ ] Auto-tagging enabled (Google Ads → Settings)
- [ ] `download_app` conversion imported from GA4
- [ ] Conversion marked as "Primary" for Sign-ups goal
- [ ] Count set to "One" (not "Every")

### Event Tracking ✅
- [ ] Download button has id="download-free-version"
- [ ] ga4-download-tracking.js is loading
- [ ] Clicking download fires event in GA4 Realtime
- [ ] Console shows no JavaScript errors

### Attribution Testing ✅
- [ ] Test with GCLID parameter shows event in GA4
- [ ] After 48 hours, test conversion appears in Google Ads
- [ ] Real ad clicks (once campaigns launch) show conversions

---

## What "Good" Looks Like

### Immediately After Click:
1. **GA4 Realtime shows:**
   - Event: `download_app`
   - 1 user right now
   - Event count increases

2. **Browser console shows (if debug enabled):**
   ```
   📥 Download Event Fired
   ✅ Event sent to Google Analytics
   ```

### 5-30 Seconds After Click:
1. **GA4 Realtime updates:**
   - Event count reflects your click
   - User session shows active

### 24-48 Hours After Click (with GCLID):
1. **Google Ads Conversions page shows:**
   - Conversion: `www.fatboysoftware.com (web) download_app`
   - Conversion count: 1 (or more)
   - Status: "Recording conversions" ✅

### After Real Campaign Launch (7+ days):
1. **Google Ads shows:**
   - Conversions from real users
   - Cost per conversion data
   - Conversion rate percentage

---

## Testing Timeline

**Day 1 (Today):**
- Test GA4 event tracking (Test 1) ✅
- Test with GCLID parameter (Test 2) ✅

**Day 2-3:**
- Check if GCLID test conversion appears in Google Ads ⏳

**Day 7-14 (After launch):**
- Check if real conversions are coming in from campaigns 📊

**Day 30:**
- Review conversion data, optimize campaigns 📈

---

## Quick Diagnostic Commands

Run these in your browser console to diagnose issues:

### Check if gtag is loaded:
```javascript
typeof gtag === 'function' ? "✅ gtag loaded" : "❌ gtag not loaded"
```

### Check GA4 Measurement ID:
```javascript
console.log(window.GA_MEASUREMENT_ID || "Not set")
// Should show: G-5RWQHBCC99
```

### Send test event manually:
```javascript
testGA4()
// Should send test event to GA4
```

### Check download button exists:
```javascript
document.getElementById('download-free-version') ? "✅ Button found" : "❌ Button not found"
```

---

## Getting Help

If conversions still aren't tracking after following this guide:

**Check these first:**
1. Wait 48 hours after GCLID test
2. Verify GA4 shows events in Realtime
3. Check browser console for JavaScript errors
4. Disable ad blockers and test again

**If still stuck, check:**
1. Google Ads → Recommendations (Google may flag issues)
2. GA4 → Admin → Events → `download_app` (verify it exists)
3. Google Ads → Tools → Conversions → Status column

---

**Remember:** The most common issue is simply waiting for real Google Ads traffic with GCLID parameters. If your campaigns haven't launched yet or aren't getting clicks, you won't see conversions in Google Ads!
