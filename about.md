---
layout: default
title: About & Contact - Fatboy Financial Planner
description: Learn about Fatboy Financial Planner and get in touch with us. Contact our team with questions, feedback, or support requests.
keywords: about fatboy software, retirement planning team, contact us, customer support, software feedback
---

<picture>
  <source srcset="/assets/images/optimized/Fatboy_Software_Logo.webp" type="image/webp">
  <img src="/assets/images/optimized/Fatboy_Software_Logo.png"
       alt="Fatboy Software Logo"
       loading="eager"
       style="max-width: 160px; height: auto;">
</picture>

# About & Contact

---

## Who We Are

Fatboy Financial Planner is named after a favorite cat, and built by developers that were frustrated with expensive subscription-based retirement planning software. We believe powerful financial planning tools should be accessible without recurring fees. Data is data the underlying calculations will only differ slightly between sites. Fatboy Financial Planner gives you access to all of the inputs available not just the ones the will our maximize lifecycle revenue.

<div style="display: flex; gap: 20px; flex-wrap: wrap; margin: 30px 0;">
  <div style="flex: 1; min-width: 250px;">
    <picture>
      <source srcset="/assets/images/optimized/Fatboy.webp" type="image/webp">
      <img src="/assets/images/optimized/Fatboy.png"
           alt="Fatboy Financial Planner Team"
           title="Fatboy"
           loading="lazy"
           style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    </picture>
  </div>
  <div style="flex: 1; min-width: 250px;">
    <picture>
      <source srcset="/assets/images/optimized/Bigboy.webp" type="image/webp">
      <img src="/assets/images/optimized/Bigboy.png"
           alt="Fatboy Software Development"
           title="Bigboy"
           loading="lazy"
           style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    </picture>
  </div>
</div>

### Our Mission

We're dedicated to creating retirement planning software that:

- **You Own** - One-time purchase, no subscriptions - one and done!
- **Respects Your Privacy** - Your data stays on your computer
- **Actually Works** - Built by people who use it themselves
- **Stays Affordable** - Especially for Founding Members

We're currently rolling the app out. Our first 200 users will be our Founding Members, and we're actively incorporating feedback to make the software better every day.

---

## Contact Us

Have a question? Need support? Want to share feedback? We'd love to hear from you.

<form id="contactForm" style="max-width: 600px; margin: 20px 0;">
  <div style="margin-bottom: 20px;">
    <label for="contactName" style="display: block; margin-bottom: 8px; font-weight: bold;">Name (optional)</label>
    <input type="text" id="contactName" name="name" placeholder="Your name"
           style="width: 100%; padding: 10px; font-size: 16px; border: 1px solid #444; background-color: #2a2a2a; color: #fff; border-radius: 4px; box-sizing: border-box;">
  </div>

  <div style="margin-bottom: 20px;">
    <label for="contactEmail" style="display: block; margin-bottom: 8px; font-weight: bold;">
      Email <span style="color: #d33;">*</span>
    </label>
    <input type="email" id="contactEmail" name="email" required placeholder="you@example.com"
           style="width: 100%; padding: 10px; font-size: 16px; border: 1px solid #444; background-color: #2a2a2a; color: #fff; border-radius: 4px; box-sizing: border-box;">
  </div>

  <div style="margin-bottom: 20px;">
    <label for="subject" style="display: block; margin-bottom: 8px; font-weight: bold;">
      What is your inquiry about? <span style="color: #d33;">*</span>
    </label>
    <select id="subject" name="subject" required
            style="width: 100%; padding: 10px; font-size: 16px; border: 1px solid #444; background-color: #2a2a2a; color: #fff; border-radius: 4px;">
      <option value="">-- Please Select --</option>
      <option value="General Question">General Question</option>
      <option value="Technical Support">Technical Support</option>
      <option value="Sales / Pricing">Sales / Pricing</option>
      <option value="Feature Request">Feature Request</option>
      <option value="Bug Report">Bug Report</option>
      <option value="Founding Member Inquiry">Founding Member Inquiry</option>
      <option value="Other">Other</option>
    </select>
  </div>

  <div style="margin-bottom: 20px;">
    <label for="message" style="display: block; margin-bottom: 8px; font-weight: bold;">
      Your Message <span style="color: #d33;">*</span>
    </label>
    <textarea id="message" name="message" rows="8" required
              placeholder="Please include as much detail as possible..."
              style="width: 100%; padding: 10px; font-size: 16px; border: 1px solid #444; background-color: #2a2a2a; color: #fff; border-radius: 4px; font-family: inherit; resize: vertical;"></textarea>
  </div>

  <div id="formStatus" style="margin-bottom: 16px; font-size: 14px;"></div>

  <button type="submit" id="submitBtn"
          style="background-color: #0066cc; color: white; padding: 12px 30px; font-size: 16px; font-weight: bold; border: none; border-radius: 4px; cursor: pointer; transition: background-color 0.3s;">
    Send Message
  </button>
</form>

<script>
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value.trim();
  const statusEl = document.getElementById('formStatus');
  const btn = document.getElementById('submitBtn');

  if (!email || !subject || !message) {
    statusEl.textContent = 'Please fill in all required fields.';
    statusEl.style.color = '#d33';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Sending…';
  statusEl.textContent = '';

  try {
    const res = await fetch('https://fatboy-license-server-oc13.vercel.app/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message: '[' + subject + '] ' + message, source: 'about_page' })
    });

    if (res.ok) {
      statusEl.textContent = '✓ Message sent! We\'ll get back to you within 1-2 business days.';
      statusEl.style.color = '#16a34a';
      e.target.reset();
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    statusEl.textContent = 'Something went wrong. Please email us directly at fbfinancialplanner@gmail.com';
    statusEl.style.color = '#d33';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send Message';
  }
});
</script>

### Other Ways to Reach Us

**Email:** [fbfinancialplanner@gmail.com](mailto:fbfinancialplanner@gmail.com)

**Download Links:**
- <a href="#" class="auto-download-installer" data-version="">Free Version</a>
- [Pro Version - Founding Member](https://buy.stripe.com/4gM8wI92w9i98r95sSawo00)

### Response Time

We typically respond to inquiries within 1-2 business days. Founding Members receive priority support.

---

[Back to Home](/) | [View Pricing](/pricing) | [See Screenshots](/screenshots)
