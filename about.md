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

Fatboy Financial Planner was built by people who were frustrated with expensive subscription-based retirement planning software. We believe powerful financial planning tools should be accessible without recurring fees.

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

- **You Own** - One-time purchase, no subscriptions
- **Respects Your Privacy** - Your data stays on your computer
- **Actually Works** - Built by people who use it themselves
- **Stays Affordable** - Especially for Founding Members

We're currently in beta with our first 200 Founding Members, and we're actively incorporating feedback to make the software better every day.

---

## Contact Us

Have a question? Need support? Want to share feedback? We'd love to hear from you.

<form id="contactForm" style="max-width: 600px; margin: 20px 0;">
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

  <div style="margin-bottom: 20px; font-size: 14px; color: #aaa;">
    <strong>Note:</strong> Clicking "Send Message" will open your default email client. Please make sure to include your contact information in your message so we can respond.
  </div>

  <button type="submit"
          style="background-color: #0066cc; color: white; padding: 12px 30px; font-size: 16px; font-weight: bold; border: none; border-radius: 4px; cursor: pointer; transition: background-color 0.3s;">
    Send Message
  </button>
</form>

<script>
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // Validate
  if (!subject || !message) {
    alert('Please fill in all required fields.');
    return;
  }

  // Create mailto link
  const email = 'fatboy501@gmail.com';
  const mailtoSubject = encodeURIComponent('[Contact Form] ' + subject);
  const mailtoBody = encodeURIComponent(message);
  const mailtoLink = `mailto:${email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  // Open email client
  window.location.href = mailtoLink;
});

// Add hover effect to button
const submitBtn = document.querySelector('button[type="submit"]');
submitBtn.addEventListener('mouseenter', function() {
  this.style.backgroundColor = '#0052a3';
});
submitBtn.addEventListener('mouseleave', function() {
  this.style.backgroundColor = '#0066cc';
});
</script>

### Other Ways to Reach Us

**Email:** [fatboy501@gmail.com](mailto:fatboy501@gmail.com)

**Download Links:**
- [Free Version](mailto:fatboy501@gmail.com?subject=Download%20Fatboy%20Financial%20Planner%20Free)
- [Pro Version - Founding Member](https://buy.stripe.com/4gM8wI92w9i98r95sSawo00)

### Response Time

We typically respond to inquiries within 1-2 business days. Founding Members receive priority support.

---

[Back to Home](/) | [View Pricing](/pricing) | [See Screenshots](/screenshots)
