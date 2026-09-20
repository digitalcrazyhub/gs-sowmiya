/**
 * GS SOWMIYA BUILDERS - ARCHITECTURAL PROJECT CASE STUDY MODAL
 * Displays in-depth structural details, material grades, engineering highlights,
 * and seamless inquiry connection.
 */

import { FEATURED_PROJECTS, SITE_CONFIG } from './config.js';

export function initProjectModal() {
    let modalOverlay = document.getElementById('project-case-modal');
    
    // If modal HTML does not exist, inject it
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'project-case-modal';
        modalOverlay.className = 'modal-overlay project-modal-overlay';
        modalOverlay.setAttribute('role', 'dialog');
        modalOverlay.setAttribute('aria-modal', 'true');
        modalOverlay.setAttribute('aria-label', 'Project Case Study Details');
        modalOverlay.innerHTML = `
            <div class="project-modal-dialog">
                <button class="modal-close-btn project-modal-close" type="button" aria-label="Close Project Details">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div class="project-modal-body" id="project-modal-content">
                    <!-- Injected dynamically -->
                </div>
            </div>
        `;
        document.body.appendChild(modalOverlay);
    }

    const modalContent = document.getElementById('project-modal-content');
    const closeBtn = modalOverlay.querySelector('.project-modal-close');

    function closeModal() {
        modalOverlay.classList.remove('is-active');
        document.body.style.overflow = '';
    }

    closeBtn?.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
            closeModal();
        }
    });

    // Function to open project details
    window.openProjectDetails = function(projectId) {
        const proj = FEATURED_PROJECTS.find(p => p.id === projectId) || FEATURED_PROJECTS[0];
        if (!proj) return;

        const highlightsHtml = (proj.highlights || [
            "Engineered seismic resilience conforming to IS 1893:2016",
            "High-density thermal acoustic floor dampening",
            "Climate-responsive architectural fenestration"
        ]).map(h => `
            <li class="modal-highlight-item">
                <span class="highlight-bullet"></span>
                <span>${h}</span>
            </li>
        `).join('');

        modalContent.innerHTML = `
            <div class="project-modal-grid">
                <!-- Left: Visual & Quick Stats -->
                <div class="modal-visual-col">
                    <div class="modal-img-wrap">
                        <img src="${proj.image}" alt="${proj.name}" class="modal-main-img" loading="eager">
                        <span class="modal-tag-badge">${proj.tag}</span>
                    </div>
                    <div class="modal-spec-cards-grid">
                        <div class="modal-spec-card">
                            <span class="spec-card-lbl">BUILT-UP AREA</span>
                            <strong class="spec-card-val">${proj.area}</strong>
                        </div>
                        <div class="modal-spec-card">
                            <span class="spec-card-lbl">LOCATION</span>
                            <strong class="spec-card-val">${proj.location}</strong>
                        </div>
                        <div class="modal-spec-card">
                            <span class="spec-card-lbl">CATEGORY</span>
                            <strong class="spec-card-val">${proj.category}</strong>
                        </div>
                        <div class="modal-spec-card">
                            <span class="spec-card-lbl">COMPLETION</span>
                            <strong class="spec-card-val">${proj.year} Handover</strong>
                        </div>
                    </div>
                </div>

                <!-- Right: Detailed Architectural & Structural Specs -->
                <div class="modal-info-col">
                    <div class="modal-header-meta">
                        <span class="section-eyebrow" style="margin-bottom: 4px;">Architectural Case Study</span>
                        <h2 class="modal-project-title">${proj.name}</h2>
                        <p class="modal-client-line"><strong>Client:</strong> ${proj.client || 'Private Client'}</p>
                    </div>

                    <p class="modal-extended-desc">${proj.extendedDesc || proj.description}</p>

                    <div class="modal-eng-box">
                        <h4 class="modal-subheading">STRUCTURAL ENGINEERING BENCHMARKS</h4>
                        <div class="eng-spec-table">
                            <div class="eng-spec-row">
                                <span class="eng-spec-key">Structural System</span>
                                <span class="eng-spec-val">${proj.structuralSystem || 'Post-Tensioned Monolithic Frame'}</span>
                            </div>
                            <div class="eng-spec-row">
                                <span class="eng-spec-key">Concrete Specification</span>
                                <span class="eng-spec-val">${proj.concreteGrade || 'M35 / M40 Ready-Mix'}</span>
                            </div>
                            <div class="eng-spec-row">
                                <span class="eng-spec-key">Steel Grade</span>
                                <span class="eng-spec-val">${proj.steelGrade || 'Fe-550D High-Ductility TMT'}</span>
                            </div>
                            <div class="eng-spec-row">
                                <span class="eng-spec-key">Execution Duration</span>
                                <span class="eng-spec-val">${proj.completionTime || 'On-Schedule Delivery'}</span>
                            </div>
                        </div>
                    </div>

                    <div class="modal-highlights-box">
                        <h4 class="modal-subheading">ARCHITECTURAL HIGHLIGHTS</h4>
                        <ul class="modal-highlights-list">
                            ${highlightsHtml}
                        </ul>
                    </div>

                    <div class="modal-actions-row">
                        <button type="button" class="btn btn-burgundy modal-enquire-btn" data-project-name="${proj.name}" data-category="${proj.category}">
                            <span>ENQUIRE FOR SIMILAR PROJECT</span>
                            <span class="btn-icon-circle">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                            </span>
                        </button>
                        <a href="https://wa.me/${SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20GS%20Sowmiya%20Builders,%20I%20am%20interested%20in%20discussing%20architecture%20similar%20to%20${encodeURIComponent(proj.name)}" class="btn btn-outline modal-whatsapp-btn" target="_blank" rel="noopener noreferrer">
                            <span>WhatsApp Discussion</span>
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Connect Enquire button to form
        const enquireBtn = modalContent.querySelector('.modal-enquire-btn');
        enquireBtn?.addEventListener('click', () => {
            closeModal();
            const projectTypeSelect = document.getElementById('project-type');
            const messageTextarea = document.getElementById('project-message');
            const contactSection = document.getElementById('contact');

            if (projectTypeSelect) {
                if (proj.category.toLowerCase().includes('res')) {
                    projectTypeSelect.value = 'Residential Villa / Estate';
                } else if (proj.category.toLowerCase().includes('com')) {
                    projectTypeSelect.value = 'Commercial Office / Hub';
                } else {
                    projectTypeSelect.value = 'Turnkey Construction';
                }
            }

            if (messageTextarea && !messageTextarea.value.includes(proj.name)) {
                messageTextarea.value = `I would like to enquire about a project similar in scale and architectural styling to ${proj.name} (${proj.area}, ${proj.location}).\n\n`;
            }

            contactSection?.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                const nameInput = document.getElementById('client-name');
                nameInput?.focus();
            }, 600);
        });

        modalOverlay.classList.add('is-active');
        document.body.style.overflow = 'hidden';
    };
}
