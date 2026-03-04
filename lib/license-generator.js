const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

/**
 * Generates a unique license key for Fatboy Financial Planner
 * Format: XXXX-XXXX-XXXX-XXXX (16 characters, grouped for readability)
 *
 * @param {string} email - Customer email address
 * @param {string} stripeSessionId - Stripe checkout session ID
 * @returns {Object} License information
 */
function generateLicenseKey(email, stripeSessionId) {
  // Generate a UUID-based license key
  const uuid = uuidv4().replace(/-/g, '').toUpperCase();

  // Format as XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX (32 chars with dashes)
  // Or use a shorter format: XXXX-XXXX-XXXX-XXXX (16 chars)
  const shortKey = uuid.substring(0, 16);
  const formattedKey = shortKey.match(/.{1,4}/g).join('-');

  // Create a hash for validation (optional - for future license validation in your app)
  const hash = crypto
    .createHash('sha256')
    .update(`${email}-${formattedKey}-${process.env.LICENSE_SECRET || 'fatboy-secret-key'}`)
    .digest('hex')
    .substring(0, 8);

  return {
    licenseKey: formattedKey,
    hash: hash,
    email: email,
    generatedAt: new Date().toISOString(),
    stripeSessionId: stripeSessionId,
    product: 'Fatboy Financial Planner Pro',
    version: 'founding-member'
  };
}

/**
 * Validates a license key format (basic client-side validation)
 * For full validation, you'd check against your database
 *
 * @param {string} licenseKey - License key to validate
 * @returns {boolean} Whether the format is valid
 */
function validateLicenseKeyFormat(licenseKey) {
  // Check format: XXXX-XXXX-XXXX-XXXX
  const pattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return pattern.test(licenseKey);
}

module.exports = {
  generateLicenseKey,
  validateLicenseKeyFormat
};
