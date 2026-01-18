---
layout: default
title: Thank You - Fatboy Financial Planner
description: Thank you for your purchase! Here's what happens next.
---

<!-- Google Analytics Purchase Conversion Tracking -->
<script>
  // Track purchase conversion when page loads
  window.addEventListener('load', function() {
    // Get session_id from URL if available (requires Stripe redirect URL with {CHECKOUT_SESSION_ID})
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    // Track purchase event in Google Analytics (GA4)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'purchase', {
        transaction_id: sessionId || 'ffp-' + Date.now(), // Use session_id or generate unique ID
        value: 149.00,
        currency: 'USD',
        tax: 0,
        shipping: 0,
        items: [{
          item_id: 'ffp-pro-founding-member',
          item_name: 'Fatboy Financial Planner Pro - Founding Member',
          item_brand: 'Fatboy Software',
          item_category: 'Software',
          item_category2: 'Financial Planning',
          item_variant: 'One-time Purchase',
          price: 149.00,
          quantity: 1
        }]
      });

      console.log('Google Analytics purchase event tracked:', sessionId || 'no session_id');
    } else {
      console.warn('Google Analytics (gtag) not found. Make sure GA4 is installed.');
    }

    // Optional: Track in Universal Analytics (older GA) if still using it
    if (typeof ga !== 'undefined') {
      ga('ecommerce:addTransaction', {
        id: sessionId || 'ffp-' + Date.now(),
        revenue: '149.00',
        currency: 'USD'
      });
      ga('ecommerce:addItem', {
        id: sessionId || 'ffp-' + Date.now(),
        name: 'Fatboy Financial Planner Pro - Founding Member',
        sku: 'ffp-pro-founding-member',
        category: 'Software',
        price: '149.00',
        quantity: '1'
      });
      ga('ecommerce:send');
    }
  });
</script>

<!-- Optional: Meta Pixel (Facebook) Purchase Tracking -->
<!-- Uncomment and add your pixel ID when ready -->
<!--
<script>
  window.addEventListener('load', function() {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Purchase', {
        value: 149.00,
        currency: 'USD',
        content_name: 'Fatboy Financial Planner Pro - Founding Member',
        content_type: 'product',
        content_ids: ['ffp-pro-founding-member']
      });
      console.log('Meta Pixel purchase event tracked');
    }
  });
</script>
-->

<picture>
  <source srcset="/assets/images/optimized/Fatboy_Software_Logo.webp" type="image/webp">
  <img src="/assets/images/optimized/Fatboy_Software_Logo.png"
       alt="Fatboy Software Logo"
       loading="eager"
       style="max-width: 160px; height: auto;">
</picture>

# 🎉 Welcome to Fatboy Financial Planner!

Thank you for becoming a Founding Member. You've just secured the best price we'll ever offer.

---

## What Happens Next

### 1. Check Your Email ✉️

Within the next **5-10 minutes**, you'll receive:
- **Order confirmation** from Stripe
- **License key** for activation
- **Getting started guide**

**Don't see it?** Check your spam folder or [contact us](mailto:fbfinancialplanner@gmail.com).

### 2. Download & Install 💾

If you need a new download:

<a href="#" id="download-free-version" data-version="" style="display: inline-block; padding: 12px 24px; background: #0066cc; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Download Free Version (Windows)</a>

<a href="#" id="download-linux" data-version="" style="display: inline-block; padding: 12px 24px; background: #0066cc; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; margin-left: 10px;">Download Free Version (Linux)</a>

Once you receive your email:
1. Go to the app
2. Click "Help" on the top menu
3. Select "Activate Pro License"
3. Enter your license key when prompted
4. Start planning your retirement!

**System Requirements:**
- Windows 10/11 (fully supported)
- Linux (experimental)
- macOS (coming soon)

---

## Your Founding Member Benefits

As one of our first 200 users, you get:

✅ **$149 locked in forever** - No future price increases
✅ **Free major updates** - All future features included
✅ **Priority support** - Direct line to the development team
✅ **Shape the roadmap** - Your feedback matters

---

## Need Help?

### Support
- **Email:** [fbfinancialplanner@gmail.com](mailto:fbfinancialplanner@gmail.com)
- **Response time:** Usually within 24 hours
- **GitHub Issues:** [Report bugs](https://github.com/sathomas501/FB-Financial-Planner/issues)

### Common Questions

**Q: How do I activate my license?**
A: Enter the license key from your email in the "Help" menu of the app.

**Q: Can I install on multiple computers?**
A: Yes! Your license allows installation on all your personal devices.

**Q: What if I need help getting started?**
A: Email us directly - we're here to help you succeed.

**Q: Will I be charged again?**
A: No! This is a one-time payment. No subscriptions, ever.

---

## Join the Community

Stay connected and help shape the future:

- **Email updates:** [Subscribe to our newsletter](#) *(coming soon)*
- **Feature requests:** [Tell us what you need](mailto:fbfinancialplanner@gmail.com)
- **Beta testing:** Get early access to new features

---

## Track Your Order

**Order Details:**
- Date: {{ "now" | date: "%B %d, %Y" }}
- Product: Fatboy Financial Planner Pro (Founding Member)
- Price: $149 (one-time)

**Receipt:** Check your email for the full receipt from Stripe.

---

## What Our Users Are Saying

> "Finally, retirement planning software that doesn't treat me like I need a financial advisor."
> — *Early Beta Tester*

> "The Roth conversion optimizer alone is worth the price."
> — *Founding Member*

> "No subscriptions. No cloud. Just planning software that works."
> — *Founding Member*

---

## Start Planning Today

Your download link is waiting in your email. Let's get started!

[Back to Home](/) | [See Screenshots](/screenshots) | [Contact Support](mailto:fbfinancialplanner@gmail.com)

---

<small>**Having issues?** Contact us at [fbfinancialplanner@gmail.com](mailto:fbfinancialplanner@gmail.com) - we're here to help!</small>
