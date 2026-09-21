/**
 * ==========================================================================
 * GS SOWMIYA BUILDERS — CONTACT PAGE LOGIC
 * File: assets/js/contact.js
 * Handles:
 * 1. Global Component Initialization (Navbar, Footer, Floating Actions)
 * 2. Real-time Form Validation (Accessible inline errors)
 * 3. Configurable Submission Handling (REST / Local / Formspree)
 * 4. Interactive Office Directions & WhatsApp Connect
 * ==========================================================================
 */

import { loadGlobalComponents } from '/assets/js/components.js';
import { SITE_CONFIG } from '/assets/js/config.js';
import { initScrollReveal, initCardTilt } from '/assets/js/animations.js';

// Configure a real server-side endpoint before enabling production submissions.
const CONTACT_FORM_ENDPOINT = window.GSSB_CONTACT_FORM_ENDPOINT?.trim() || "";

/**
 * Initialize page components and interactions
 */
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Load Navbar, Footer, and Floating Action Buttons
    try {
        await loadGlobalComponents({
        activeNav: 'contact',
        banner: {
            eyebrow: 'GET IN TOUCH',
            title: "LET'S BUILD<br>SOMETHING STRONGER<br>TOGETHER.",
            breadcrumb: 'CONTACT',
            desc: "Have a construction project in mind? Let's discuss your requirements and explore how we can move your project forward with engineering precision and architectural integrity.",
            bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85'
        }
    });
    } catch (err) {
        console.warn('Component auto-loader notice:', err);
    }

    // 2. Initialize Enquiry Form System
    initEnquiryForm();

    // 3. Initialize Interactive Triggers & Smooth Scrolling
    initInteractionTriggers();

    // 4. Scroll Reveals & 3D Card Tilt
    initScrollReveal();
    initCardTilt();
});

/**
 * Robust, accessible form validation and submission
 */
function initEnquiryForm() {
    const form = document.getElementById('contact-enquiry-form');
    if (!form) return;

    const fields = {
        name: {
            el: document.getElementById('contact-name'),
            errorEl: document.getElementById('contact-name-error'),
            validate: (val) => {
                if (!val.trim()) return "Please enter your full name.";
                if (val.trim().length < 2) return "Name must be at least 2 characters.";
                return "";
            }
        },
        phone: {
            el: document.getElementById('contact-phone'),
            errorEl: document.getElementById('contact-phone-error'),
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
            el: document.getElementById('contact-email'),
            errorEl: document.getElementById('contact-email-error'),
            validate: (val) => {
                if (!val.trim()) return "Please provide your email address.";
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(val.trim())) return "Please enter a valid email address.";
                return "";
            }
        },
        location: {
            el: document.getElementById('contact-location'),
            errorEl: document.getElementById('contact-location-error'),
            validate: (val) => {
                if (!val.trim()) return "Please enter project location / city.";
                if (val.trim().length < 2) return "Location must be at least 2 characters.";
                return "";
            }
        },
        service: {
            el: document.getElementById('contact-service'),
            errorEl: document.getElementById('contact-service-error'),
            validate: (val) => {
                if (!val || val === "Select a Service" || val === "") {
                    return "Please select a construction service.";
                }
                return "";
            }
        },
        message: {
            el: document.getElementById('contact-message'),
            errorEl: document.getElementById('contact-message-error'),
            validate: (val) => {
                if (!val.trim()) return "Please describe your project requirements.";
                if (val.trim().length < 10) return "Please provide at least 10 characters detailing your scope.";
                return "";
            }
        }
    };

    const submitBtn = form.querySelector('.form-submit-btn');
    const submitText = submitBtn?.querySelector('.submit-btn-text');
    const statusBox = document.getElementById('form-status-box');
    const statusTitle = document.getElementById('form-status-title');
    const statusDesc = document.getElementById('form-status-desc');
    const resetBtn = document.getElementById('form-reset-btn');

    // Attach real-time clear on input
    Object.keys(fields).forEach((key) => {
        const item = fields[key];
        if (!item.el) return;

        item.el.addEventListener('input', () => {
            const group = item.el.closest('.form-field-group');
            if (group && group.classList.contains('has-error')) {
                group.classList.remove('has-error');
                item.el.removeAttribute('aria-invalid');
                if (item.errorEl) item.errorEl.textContent = '';
            }
        });

        item.el.addEventListener('blur', () => {
            const error = item.validate(item.el.value);
            const group = item.el.closest('.form-field-group');
            if (error && group) {
                group.classList.add('has-error');
                item.el.setAttribute('aria-invalid', 'true');
                if (item.errorEl) item.errorEl.textContent = error;
            }
        });
    });

    // Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        let hasErrors = false;
        let firstInvalidField = null;

        Object.keys(fields).forEach((key) => {
            const item = fields[key];
            if (!item.el) return;

            const error = item.validate(item.el.value);
            const group = item.el.closest('.form-field-group');

            if (error) {
                hasErrors = true;
                if (!firstInvalidField) firstInvalidField = item.el;
                if (group) {
                    group.classList.add('has-error');
                    item.el.setAttribute('aria-invalid', 'true');
                    if (item.errorEl) item.errorEl.textContent = error;
                }
            } else if (group) {
                group.classList.remove('has-error');
                item.el.removeAttribute('aria-invalid');
                if (item.errorEl) item.errorEl.textContent = '';
            }
        });

        if (hasErrors) {
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
            return;
        }

        // Preparation for submission
        const formData = {
            name: fields.name.el.value.trim(),
            phone: fields.phone.el.value.trim(),
            email: fields.email.el.value.trim(),
            location: fields.location.el.value.trim(),
            service: fields.service.el.value,
            message: fields.message.el.value.trim(),
            timestamp: new Date().toISOString()
        };

        // Loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            if (submitText) submitText.textContent = "SENDING ENQUIRY...";
        }

        try {
            if (CONTACT_FORM_ENDPOINT) {
                const response = await fetch(CONTACT_FORM_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if (!response.ok) throw new Error("Failed to submit enquiry.");
            } else {
                throw new Error('Contact form endpoint is not configured.');
            }

            // Success Transition
            form.style.display = 'none';
            if (statusBox) {
                statusBox.className = 'form-status-box is-success';
                window.gssbTrack?.('generate_lead', { form_name: 'project_enquiry' });
                if (statusTitle) statusTitle.textContent = "THANK YOU";
                if (statusDesc) {
                    statusDesc.textContent = "Your enquiry has been received. Our team will review your requirements and get in touch with you soon.";
                }
                statusBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

        } catch (submitErr) {
            if (CONTACT_FORM_ENDPOINT) {
                console.error('Submission error:', submitErr);
            } else {
                console.warn('Contact form endpoint is not configured.');
            }
            if (statusBox) {
                statusBox.className = 'form-status-box is-error';
                if (statusTitle) statusTitle.textContent = "SUBMISSION NOTICE";
                if (statusDesc) {
                    statusDesc.textContent = `Online submission is not configured yet. Please call us directly at ${SITE_CONFIG.contact.phone} or contact us via WhatsApp.`;
                }
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                if (submitText) submitText.textContent = "SUBMIT ENQUIRY";
            }
        }
    });

    // Reset Form button
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            form.reset();
            form.style.display = 'block';
            if (statusBox) statusBox.className = 'form-status-box';
            Object.keys(fields).forEach((key) => {
                const item = fields[key];
                const group = item.el?.closest('.form-field-group');
                if (group) group.classList.remove('has-error');
                if (item.el) item.el.removeAttribute('aria-invalid');
            });
            fields.name.el?.focus();
        });
    }
}

/**
 * Interactive triggers: smooth scrolling to form, direct call/whatsapp shortcuts
 */
function initInteractionTriggers() {
    // Scroll to form trigger
    const scrollToFormBtns = document.querySelectorAll('[data-action="scroll-to-enquiry"]');
    const formSection = document.getElementById('enquiry-section');

    scrollToFormBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth' });
                const nameInput = document.getElementById('contact-name');
                if (nameInput) {
                    setTimeout(() => nameInput.focus(), 600);
                }
            }
        });
    });

    // WhatsApp action links
    const waButtons = document.querySelectorAll('[data-action="open-whatsapp"]');
    waButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const phone = SITE_CONFIG.contact.whatsappRaw || "917010517729";
            const text = encodeURIComponent("Hello GS Sowmiya Builders, I would like to enquire about an upcoming construction / joint venture project in Chennai.");
            window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
        });
    });
}
