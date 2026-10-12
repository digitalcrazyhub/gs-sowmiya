/**
 * ==========================================================================
 * GS SOWMIYA BUILDERS — REUSABLE CONTACT FORM HANDLER
 * File: js/contact-form.js
 * Single Source of Truth for Form Validation, Accessibility & Submission
 * Used by: Home Page (#project-enquiry-form) & Contact Page (#contact-enquiry-form)
 * ==========================================================================
 */

import { SITE_CONFIG } from './config.js';
import { resolveSitePath } from './site-paths.js';

// Configurable backend API endpoint (points to /backend/api/contact.php)
const CONTACT_FORM_ENDPOINT = (typeof window !== 'undefined' && window.GS_CONTACT_API_ENDPOINT)
  ? window.GS_CONTACT_API_ENDPOINT
  : resolveSitePath('/backend/api/contact.php');

/**
 * Initializes validation, accessibility, and submit behavior for any contact form
 * @param {string|HTMLElement} formTarget - Selector string or HTMLFormElement
 * @param {Object} options - Configuration overrides (defaultSource: 'home' | 'contact')
 */
export function initContactFormHandler(formTarget, options = {}) {
  const form = typeof formTarget === 'string' ? document.querySelector(formTarget) : formTarget;
  if (!form) return;

  // Prevent duplicate initialization on the same form element
  if (form.dataset.contactFormInitialized === 'true') {
    return;
  }
  form.dataset.contactFormInitialized = 'true';

  const defaultSource = options.source || (form.id.includes('home') ? 'homepage_contact' : 'contact_page');

  // Locate or create hidden source input
  let sourceInput = form.querySelector('input[name="source"]');
  if (!sourceInput) {
    sourceInput = document.createElement('input');
    sourceInput.type = 'hidden';
    sourceInput.name = 'source';
    sourceInput.value = defaultSource;
    form.appendChild(sourceInput);
  } else if (!sourceInput.value) {
    sourceInput.value = defaultSource;
  }

  // Field mapping with validation rules
  const getField = (nameList, idList) => {
    for (const name of nameList) {
      const el = form.querySelector(`[name="${name}"]`);
      if (el) return el;
    }
    for (const id of idList) {
      const el = form.querySelector(`#${id}`);
      if (el) return el;
    }
    return null;
  };

  const fields = {
    name: {
      el: getField(['name'], ['contact-name', 'client-name']),
      validate: (val) => {
        if (!val.trim()) return "Please enter your full name.";
        if (val.trim().length < 2) return "Name must be at least 2 characters.";
        return "";
      }
    },
    phone: {
      el: getField(['phone'], ['contact-phone', 'client-phone']),
      validate: (val) => {
        const cleaned = val.replace(/[\s\-\(\)\+]/g, '');
        if (!cleaned) return "Please provide a valid contact number.";
        if (cleaned.length < 8 || cleaned.length > 15 || !/^\d+$/.test(cleaned)) {
          return "Please enter a valid phone number (8-15 digits).";
        }
        return "";
      }
    },
    email: {
      el: getField(['email'], ['contact-email', 'client-email']),
      validate: (val) => {
        if (!val.trim()) return "Please provide your email address.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val.trim())) return "Please enter a valid email address.";
        return "";
      }
    },
    location: {
      el: getField(['location'], ['contact-location', 'project-location']),
      validate: (val) => {
        if (!val.trim()) return "Please enter project location / city.";
        if (val.trim().length < 2) return "Location must be at least 2 characters.";
        return "";
      }
    },
    service: {
      el: getField(['service', 'projectType'], ['contact-service', 'project-type']),
      validate: (val) => {
        if (!val || val === "Select a Service" || val === "Select Category" || val === "") {
          return "Please select a construction service.";
        }
        return "";
      }
    },
    message: {
      el: getField(['message'], ['contact-message', 'project-message']),
      validate: (val) => {
        if (!val.trim()) return "Please describe your project requirements.";
        if (val.trim().length < 10) return "Please provide at least 10 characters detailing your scope.";
        return "";
      }
    }
  };

  // Locate error message element inside parent group or create it
  Object.keys(fields).forEach((key) => {
    const item = fields[key];
    if (!item.el) return;

    const group = item.el.closest('.form-field-group, .form-group') || item.el.parentElement;
    let errorEl = group?.querySelector('.form-error-msg');

    if (!errorEl && group) {
      errorEl = document.createElement('span');
      errorEl.className = 'form-error-msg';
      errorEl.setAttribute('role', 'alert');
      if (item.el.id) {
        errorEl.id = `${item.el.id}-error`;
      }
      group.appendChild(errorEl);
    }

    if (errorEl && errorEl.id && !item.el.hasAttribute('aria-describedby')) {
      item.el.setAttribute('aria-describedby', errorEl.id);
    }

    item.errorEl = errorEl;
    item.group = group;
  });

  const submitBtn = form.querySelector('button[type="submit"]');
  const submitText = submitBtn?.querySelector('.submit-btn-text, span');
  const initialBtnHTML = submitBtn ? submitBtn.innerHTML : 'SEND ENQUIRY';

  // Locate or reference status box
  const cardContainer = form.closest('.enquiry-form-card, .contact-form-card') || form.parentElement;
  let statusBox = cardContainer?.querySelector('.form-status-box');

  if (!statusBox && cardContainer) {
    statusBox = document.createElement('div');
    statusBox.className = 'form-status-box';
    statusBox.setAttribute('role', 'status');
    statusBox.setAttribute('aria-live', 'polite');
    statusBox.innerHTML = `
      <h3 class="form-status-title">Thank You</h3>
      <p class="form-status-desc">Your enquiry has been received. Our team will get in touch with you soon.</p>
      <button type="button" class="btn-reset-form"><span>← BACK TO FORM</span></button>
    `;
    cardContainer.appendChild(statusBox);
  }

  const statusTitle = statusBox?.querySelector('.form-status-title');
  const statusDesc = statusBox?.querySelector('.form-status-desc');
  const resetBtn = statusBox?.querySelector('.btn-reset-form');

  // Real-time input handling & validation clear
  Object.keys(fields).forEach((key) => {
    const item = fields[key];
    if (!item.el) return;

    const clearFieldError = () => {
      if (item.group && item.group.classList.contains('has-error')) {
        item.group.classList.remove('has-error');
        item.el.removeAttribute('aria-invalid');
        if (item.errorEl) item.errorEl.textContent = '';
      }
      // If error status box was active, hide it as user edits
      if (statusBox && statusBox.classList.contains('is-error')) {
        statusBox.className = 'form-status-box';
        statusBox.style.display = 'none';
      }
    };

    ['input', 'change'].forEach((evt) => {
      item.el.addEventListener(evt, clearFieldError);
    });

    item.el.addEventListener('blur', () => {
      const error = item.validate(item.el.value);
      if (error && item.group) {
        item.group.classList.add('has-error');
        item.el.setAttribute('aria-invalid', 'true');
        if (item.errorEl) item.errorEl.textContent = error;
      }
    });
  });

  let isSubmitting = false;

  // Handle Form Submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions if already submitting or disabled
    if (isSubmitting || (submitBtn && submitBtn.disabled)) return;

    // Reset any previous status box state
    if (statusBox) {
      statusBox.className = 'form-status-box';
      statusBox.style.display = 'none';
    }

    let hasErrors = false;
    let firstInvalidField = null;

    Object.keys(fields).forEach((key) => {
      const item = fields[key];
      if (!item.el) return;

      const error = item.validate(item.el.value);

      if (error) {
        hasErrors = true;
        if (!firstInvalidField) firstInvalidField = item.el;
        if (item.group) {
          item.group.classList.add('has-error');
          item.el.setAttribute('aria-invalid', 'true');
          if (item.errorEl) item.errorEl.textContent = error;
        }
      } else if (item.group) {
        item.group.classList.remove('has-error');
        item.el.removeAttribute('aria-invalid');
        if (item.errorEl) item.errorEl.textContent = '';
      }
    });

    if (hasErrors) {
      if (firstInvalidField) firstInvalidField.focus();
      return;
    }

    isSubmitting = true;

    // Fetch reCAPTCHA v3 token if configured
    let recaptchaToken = '';
    const siteKey = (typeof window !== 'undefined' && window.RECAPTCHA_SITE_KEY)
      ? window.RECAPTCHA_SITE_KEY
      : (SITE_CONFIG?.recaptcha?.siteKey || '');
    if (typeof window !== 'undefined' && !window.RECAPTCHA_SITE_KEY && siteKey) {
      window.RECAPTCHA_SITE_KEY = siteKey;
    }
    if (typeof window !== 'undefined' && siteKey) {
      if (!window.grecaptcha) {
        const existingScript = document.querySelector('script[src*="recaptcha/api.js"]');
        if (!existingScript) {
          const rcScript = document.createElement('script');
          rcScript.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
          rcScript.async = true;
          document.head.appendChild(rcScript);
          await new Promise((resolve) => {
            rcScript.onload = resolve;
            rcScript.onerror = resolve;
            setTimeout(resolve, 3000);
          });
        }
      }
      if (window.grecaptcha) {
        try {
          await new Promise((resolve) => window.grecaptcha.ready(resolve));
          recaptchaToken = await window.grecaptcha.execute(siteKey, { action: 'submit_enquiry' });
        } catch (rcErr) {
          console.warn('reCAPTCHA execution note:', rcErr);
        }
      }
    }

    // Construct standardized submission payload
    const formData = {
      name: fields.name.el?.value.trim() || '',
      phone: fields.phone.el?.value.trim() || '',
      email: fields.email.el?.value.trim() || '',
      location: fields.location.el?.value.trim() || '',
      service: fields.service.el?.value || '',
      message: fields.message.el?.value.trim() || '',
      source: sourceInput ? sourceInput.value : defaultSource,
      recaptcha_token: recaptchaToken,
      timestamp: new Date().toISOString()
    };

    // Apply loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      if (submitText) {
        submitText.textContent = "SENDING ENQUIRY...";
      } else {
        submitBtn.textContent = "SENDING ENQUIRY...";
      }
    }

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const resData = await response.json().catch(() => null);

      if (!response.ok || !resData || !resData.success) {
        // If server provided field-level validation errors, show them on the fields
        if (resData?.errors && typeof resData.errors === 'object') {
          let firstServerErrorField = null;
          Object.keys(resData.errors).forEach((errKey) => {
            const item = fields[errKey];
            if (item && item.group) {
              item.group.classList.add('has-error');
              item.el?.setAttribute('aria-invalid', 'true');
              if (item.errorEl) item.errorEl.textContent = resData.errors[errKey];
              if (!firstServerErrorField && item.el) firstServerErrorField = item.el;
            }
          });
          if (firstServerErrorField) {
            firstServerErrorField.focus();
          }
        }

        const errorMsg = resData?.message || (response.status === 429
          ? "Too many enquiries submitted from this network. Please wait a few minutes."
          : "Unable to submit your enquiry at this moment. Please call us directly.");
        throw new Error(errorMsg);
      }

      // Success State Transition: Hide form, display success status box
      form.style.display = 'none';
      if (statusBox) {
        statusBox.style.display = '';
        statusBox.className = 'form-status-box is-success';
        if (statusTitle) statusTitle.textContent = "THANK YOU";
        if (statusDesc) {
          statusDesc.textContent = resData.message || "Your enquiry has been received. Our team will review your requirements and get in touch with you soon.";
        }
        if (resetBtn) resetBtn.style.display = 'inline-flex';
        statusBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

    } catch (submitErr) {
      console.error('Submission error:', submitErr);
      // On failure: Keep form visible so user can adjust and retry!
      if (statusBox) {
        statusBox.style.display = '';
        statusBox.className = 'form-status-box is-error';
        if (statusTitle) statusTitle.textContent = "SUBMISSION NOTICE";
        if (statusDesc) {
          const phoneNum = SITE_CONFIG?.contact?.phone || '+91 90431 56670';
          const defaultErr = `We encountered a temporary network issue. Please call us directly at ${phoneNum} or contact us via WhatsApp.`;
          statusDesc.textContent = (submitErr instanceof Error && submitErr.message) ? submitErr.message : defaultErr;
        }
        // Hide reset button on error so user doesn't accidentally erase inputs
        if (resetBtn) resetBtn.style.display = 'none';
        statusBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } finally {
      isSubmitting = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = initialBtnHTML;
      }
    }
  });

  // Reset Form Action (Used only after success to allow submitting another enquiry)
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      if (statusBox) {
        statusBox.className = 'form-status-box';
        statusBox.style.display = 'none';
      }
      Object.keys(fields).forEach((key) => {
        const item = fields[key];
        if (item.group) item.group.classList.remove('has-error');
        if (item.el) item.el.removeAttribute('aria-invalid');
        if (item.errorEl) item.errorEl.textContent = '';
      });
      fields.name.el?.focus();
    });
  }
}
