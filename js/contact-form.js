/**
 * ==========================================================================
 * GS SOWMIYA BUILDERS — REUSABLE CONTACT FORM HANDLER
 * File: js/contact-form.js
 * Single Source of Truth for Form Validation, Accessibility & Submission
 * Used by: Home Page (#project-enquiry-form) & Contact Page (#contact-enquiry-form)
 * ==========================================================================
 */

import { SITE_CONFIG } from '/js/config.js';

// Configurable backend API endpoint (points to /backend/api/contact.php)
const CONTACT_FORM_ENDPOINT = (typeof window !== 'undefined' && window.GS_CONTACT_API_ENDPOINT)
  ? window.GS_CONTACT_API_ENDPOINT
  : "/backend/api/contact.php";

/**
 * Initializes validation, accessibility, and submit behavior for any contact form
 * @param {string|HTMLElement} formTarget - Selector string or HTMLFormElement
 * @param {Object} options - Configuration overrides (defaultSource: 'home' | 'contact')
 */
export function initContactFormHandler(formTarget, options = {}) {
  const form = typeof formTarget === 'string' ? document.querySelector(formTarget) : formTarget;
  if (!form) return;

  const defaultSource = options.source || (form.id.includes('home') ? 'home' : 'contact');

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
      group.appendChild(errorEl);
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

    item.el.addEventListener('input', () => {
      if (item.group && item.group.classList.contains('has-error')) {
        item.group.classList.remove('has-error');
        item.el.removeAttribute('aria-invalid');
        if (item.errorEl) item.errorEl.textContent = '';
      }
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

  // Handle Form Submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Prevent double submission if already sending
    if (submitBtn && submitBtn.disabled) return;

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

    // Fetch reCAPTCHA v3 token if configured
    let recaptchaToken = '';
    const siteKey = (typeof window !== 'undefined') ? (window.RECAPTCHA_SITE_KEY || '') : '';
    if (typeof window !== 'undefined' && window.grecaptcha && siteKey) {
      try {
        await new Promise((resolve) => window.grecaptcha.ready(resolve));
        recaptchaToken = await window.grecaptcha.execute(siteKey, { action: 'submit_enquiry' });
      } catch (rcErr) {
        console.warn('reCAPTCHA execution note:', rcErr);
      }
    }

    // Construct submission payload
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
        const errorMsg = resData?.message || (response.status === 429
          ? "Too many enquiries submitted from this network. Please wait a few minutes."
          : "Unable to submit your enquiry at this moment. Please call us directly.");
        throw new Error(errorMsg);
      }

      // Success State Transition
      form.style.display = 'none';
      if (statusBox) {
        statusBox.className = 'form-status-box is-success';
        if (statusTitle) statusTitle.textContent = "THANK YOU";
        if (statusDesc) {
          const leadRef = resData.lead_id ? ` (Reference ID: ${resData.lead_id})` : '';
          statusDesc.textContent = (resData.message || "Your enquiry has been received. Our team will review your requirements and get in touch with you soon.") + leadRef;
        }
        statusBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

    } catch (submitErr) {
      console.error('Submission error:', submitErr);
      if (statusBox) {
        statusBox.className = 'form-status-box is-error';
        if (statusTitle) statusTitle.textContent = "SUBMISSION NOTICE";
        if (statusDesc) {
          const phoneNum = SITE_CONFIG?.contact?.phone || '+91 90431 56670';
          const defaultErr = `We encountered a temporary network issue. Please call us directly at ${phoneNum} or contact us via WhatsApp.`;
          statusDesc.textContent = (submitErr instanceof Error && submitErr.message) ? submitErr.message : defaultErr;
        }
        statusBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = initialBtnHTML;
      }
    }
  });

  // Reset Form Action
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      if (statusBox) statusBox.className = 'form-status-box';
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
