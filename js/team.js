/**
 * ==========================================================================
 * GS SOWMIYA BUILDERS — TEAM PAGE JAVASCRIPT
 * File: asset/js/team.js
 * Scoped strictly to the Team Page.
 * Handles:
 * 1. Global Component Loading (Navbar with ABOUT dropdown, Footer, Floating Actions)
 * 2. Department Filtering & Section Smooth-Scroll Navigation
 * 3. GSAP ScrollTrigger Animations & Visual Reveals
 * 4. Architectural Hover Micro-Interactions
 * ==========================================================================
 */

import { loadGlobalComponents } from '/js/components.js';
import { initCardTilt, initCounterAnimation, initScrollReveal } from '/js/animations.js';

// Respect user accessibility preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Team Directory Data Repository
 * Organized strictly by verified departments.
 * Authentic verified leadership from the company archives;
 * other departments represent standardized technical placeholders per project instructions.
 */
export const TEAM_MEMBERS = [
    // ----------------------------------------------------------------------
    // 1. LEADERSHIP (Verified Company Directors & Mentorship)
    // ----------------------------------------------------------------------
    {
        id: 1,
        name: "Er. Suresh Kumar",
        designation: "Founder & Managing Director",
        department: "leadership",
        departmentLabel: "Leadership",
        qualifications: "Civil Engineering Graduate | Managing Director",
        description: "Founder leading GS Sowmiya Builders Private Limited. Directs on-site structural execution, stage-by-stage quality audits, client coordination, and company growth across Chennai with an emphasis on making quality dream homes accessible.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        isLead: true,
        stats: [
            { num: "30+", label: "Years Mentorship Heritage" },
            { num: "200+", label: "Chennai Projects Guided" },
            { num: "100%", label: "Structural Compliance" }
        ]
    },
    {
        id: 2,
        name: "Mr. Gurusamy",
        designation: "Founder Mentor & Senior Advisor",
        department: "leadership",
        departmentLabel: "Leadership",
        qualifications: "30+ Years Field Contracting Mastery | 200+ Projects",
        description: "Respected veteran building contractor who guided over 200 residential projects across Chennai, providing time-tested craft wisdom and construction standards.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
        isLead: false
    },
    {
        id: 3,
        name: "Er. V. Karthik",
        designation: "Senior Site & Structural Engineer",
        department: "leadership",
        departmentLabel: "Leadership",
        qualifications: "B.E. Civil Engineering | RCC Specialist",
        description: "Oversees on-site reinforcement binding, concrete cube sampling, slump verification, and daily structural drawing compliance.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
        isLead: false
    },
    {
        id: 4,
        name: "Ar. S. Meenakshi",
        designation: "Architectural & Planning Consultant",
        department: "leadership",
        departmentLabel: "Leadership",
        qualifications: "B.Arch | Vaastu & CMDA Liaison",
        description: "Designs contemporary residential floor plans, 3D elevation renderings, and guides CMDA/DTCP municipal building plan sanctions.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
        isLead: false
    },

    // ----------------------------------------------------------------------
    // 2. MANAGEMENT TEAM
    // ----------------------------------------------------------------------
    {
        id: 5,
        name: "TEAM MEMBER NAME",
        designation: "General Project Coordinator",
        department: "management",
        departmentLabel: "Management Team",
        description: "Responsible for cross-departmental coordination, client liaising, statutory approval tracking, and inter-team workflow synchronization.",
        imagePlaceholder: true
    },
    {
        id: 6,
        name: "TEAM MEMBER NAME",
        designation: "Estimation & Contracts Lead",
        department: "management",
        departmentLabel: "Management Team",
        description: "Oversees detailed bill of quantities (BOQ), rate analysis, sub-contractor vendor negotiations, and project budgetary monitoring.",
        imagePlaceholder: true
    },
    {
        id: 7,
        name: "TEAM MEMBER NAME",
        designation: "Client Relations & Procurement Manager",
        department: "management",
        departmentLabel: "Management Team",
        description: "Coordinates timely material procurement schedules, client milestone reporting, and quality certification handovers.",
        imagePlaceholder: true
    },

    // ----------------------------------------------------------------------
    // 3. ENGINEERING TEAM
    // ----------------------------------------------------------------------
    {
        id: 8,
        name: "TEAM MEMBER NAME",
        designation: "Senior Structural Engineer",
        department: "engineering",
        departmentLabel: "Engineering Team",
        description: "Calculates structural load analysis, ETABS / STAAD.Pro finite element modeling, foundation design, and cantilever deflection checks.",
        imagePlaceholder: true
    },
    {
        id: 9,
        name: "TEAM MEMBER NAME",
        designation: "Geotechnical & Foundation Specialist",
        department: "engineering",
        departmentLabel: "Engineering Team",
        description: "Specializes in soil mechanics testing, safe bearing capacity (SBC) verifications, pile foundation design, and water table stabilization.",
        imagePlaceholder: true
    },
    {
        id: 10,
        name: "TEAM MEMBER NAME",
        designation: "MEP & Electrical Systems Engineer",
        department: "engineering",
        departmentLabel: "Engineering Team",
        description: "Engineers centralized power distribution, solar grid tie-ins, conduit routing, fire suppression systems, and HVAC airflow channels.",
        imagePlaceholder: true
    },

    // ----------------------------------------------------------------------
    // 4. PROJECT MANAGEMENT
    // ----------------------------------------------------------------------
    {
        id: 11,
        name: "TEAM MEMBER NAME",
        designation: "Senior Project Manager (Residential)",
        department: "project-management",
        departmentLabel: "Project Management",
        description: "Directs master construction schedules, CPM/PERT milestone tracking, and daily labor allocation for luxury villa communities.",
        imagePlaceholder: true
    },
    {
        id: 12,
        name: "TEAM MEMBER NAME",
        designation: "Commercial Turnkey Manager",
        department: "project-management",
        departmentLabel: "Project Management",
        description: "Leads commercial building execution, fast-track glass facade mounting, elevators, and acoustic interior fitting schedules.",
        imagePlaceholder: true
    },
    {
        id: 13,
        name: "TEAM MEMBER NAME",
        designation: "Scheduling & Logistics Coordinator",
        department: "project-management",
        departmentLabel: "Project Management",
        description: "Manages ready-mix concrete dispatching, steel delivery pipelines, tower crane operations, and on-site material inventories.",
        imagePlaceholder: true
    },

    // ----------------------------------------------------------------------
    // 5. TECHNICAL TEAM
    // ----------------------------------------------------------------------
    {
        id: 14,
        name: "TEAM MEMBER NAME",
        designation: "BIM 3D/4D Modeling Specialist",
        department: "technical",
        departmentLabel: "Technical Team",
        description: "Develops clash-free architectural Revit models, detailed working shop drawings, reinforcement bending schedules, and visual mockups.",
        imagePlaceholder: true
    },
    {
        id: 15,
        name: "TEAM MEMBER NAME",
        designation: "QA/QC Materials & Testing Lead",
        department: "technical",
        departmentLabel: "Technical Team",
        description: "Conducts on-site concrete cube crushing tests, rebound hammer audits, ultrasonic pulse velocity checks, and steel tensile validations.",
        imagePlaceholder: true
    },
    {
        id: 16,
        name: "TEAM MEMBER NAME",
        designation: "Quantity Surveyor & Billing Engineer",
        department: "technical",
        departmentLabel: "Technical Team",
        description: "Conducts site measurement verifications, physical stock verifications, contractor billing verifications, and progress reconciliations.",
        imagePlaceholder: true
    },

    // ----------------------------------------------------------------------
    // 6. SITE TEAM
    // ----------------------------------------------------------------------
    {
        id: 17,
        name: "TEAM MEMBER NAME",
        designation: "Chief Site Superintendent",
        department: "site",
        departmentLabel: "Site Team",
        description: "On-the-ground commander overseeing formwork alignment, concrete vibration, shuttering safety, and masonry craftsmanship standards.",
        imagePlaceholder: true
    },
    {
        id: 18,
        name: "TEAM MEMBER NAME",
        designation: "Field Safety & Compliance Officer",
        department: "site",
        departmentLabel: "Site Team",
        description: "Enforces 100% PPE compliance, scaffolding harness protocols, fire safety drills, and zero-accident occupational safety protocols.",
        imagePlaceholder: true
    },
    {
        id: 19,
        name: "TEAM MEMBER NAME",
        designation: "Senior Civil Works Supervisor",
        department: "site",
        departmentLabel: "Site Team",
        description: "Supervises line-dori level markings, bar bending placements, waterproof membrane applications, and exterior plastering finishes.",
        imagePlaceholder: true
    }
];

/**
 * Helper to ensure all team cards and section items are fully visible
 */
function ensureAllItemsVisible() {
    const allCards = document.querySelectorAll(
        '.team-card, .team-card-engineering, .team-card-site, .team-placeholder-card, .team-pm-row-card, .team-culture-card, .team-leader-hero-card, .team-section-header, .final-cta-section, .cta-content-box, .final-cta-section [data-reveal]'
    );
    allCards.forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.transform = 'none';
        el.classList.add('is-revealed');
    });
}

/**
 * Initializes Interactive Department Filter Bar
 * Displays all section items when "ALL" is active,
 * or focuses/filters to the selected department section smoothly.
 */
function initDepartmentFilter() {
    const filterButtons = document.querySelectorAll('.team-filter-btn');
    const sections = {
        'leadership': document.getElementById('leadership-section'),
        'management': document.getElementById('management-section'),
        'engineering': document.getElementById('engineering-section'),
        'project-management': document.getElementById('pm-section'),
        'technical': document.getElementById('technical-section'),
        'site': document.getElementById('site-section')
    };

    function applyFilter(targetDept) {
        // Update active class & accessibility attributes
        filterButtons.forEach(btn => {
            const isMatch = (btn.getAttribute('data-dept') === targetDept);
            btn.classList.toggle('active', isMatch);
            btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
        });

        if (targetDept === 'all') {
            // Show all sections
            Object.values(sections).forEach(sec => {
                if (sec) {
                    sec.style.display = '';
                    sec.style.opacity = '1';
                    sec.style.visibility = 'visible';
                }
            });
            ensureAllItemsVisible();
        } else {
            // Show only target department section
            Object.entries(sections).forEach(([dept, sec]) => {
                if (sec) {
                    if (dept === targetDept) {
                        sec.style.display = '';
                        sec.style.opacity = '1';
                        sec.style.visibility = 'visible';
                    } else {
                        sec.style.display = 'none';
                    }
                }
            });
            ensureAllItemsVisible();
        }
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetDept = btn.getAttribute('data-dept') || 'all';
            applyFilter(targetDept);

            if (targetDept === 'all') {
                const introSection = document.getElementById('team-intro');
                if (introSection) {
                    const offset = introSection.offsetTop - 120;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            } else {
                const targetSec = sections[targetDept];
                if (targetSec) {
                    const offset = targetSec.offsetTop - 120;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            }
        });
    });

    // Default to 'all' to ensure every section and item is visible on initial load
    applyFilter('all');
}

/**
 * Initializes GSAP Animations & ScrollTriggers safely
 * Uses clearProps and checks visibility so no cards are ever left hidden or at opacity: 0
 */
function initTeamAnimations() {
    // 1. Immediately guarantee all elements are visible
    ensureAllItemsVisible();

    if (prefersReducedMotion || typeof window.gsap === 'undefined') {
        return;
    }

    const { gsap, ScrollTrigger } = window;
    if (ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.refresh();
    }

    // Hero Text Entrance with clearProps
    gsap.fromTo('.team-hero-content > *', 
        { y: 24, opacity: 0.3 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            clearProps: 'opacity,transform'
        }
    );

    // Section headings reveal
    const headers = document.querySelectorAll('.team-section-header');
    headers.forEach(header => {
        const rect = header.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            header.style.opacity = '1';
            return;
        }

        if (ScrollTrigger) {
            gsap.fromTo(header,
                { y: 20, opacity: 0.5 },
                {
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 92%',
                        once: true,
                        toggleActions: 'play none none none'
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                    clearProps: 'opacity,transform'
                }
            );
        }
    });

    // Safe card reveals with clearProps (never leave cards at opacity 0)
    const cardSelectors = [
        '.team-leadership-grid .team-card',
        '.team-grid-3 .team-card-engineering',
        '.team-grid-3 .team-placeholder-card',
        '.team-site-grid .team-card-site',
        '.team-culture-grid .team-culture-card',
        '.team-pm-list .team-pm-row-card'
    ];

    cardSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.95) {
                el.style.opacity = '1';
                return;
            }

            if (ScrollTrigger) {
                gsap.fromTo(el,
                    { y: 20, opacity: 0.6 },
                    {
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 94%',
                            once: true,
                            toggleActions: 'play none none none'
                        },
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        ease: 'power2.out',
                        clearProps: 'opacity,transform'
                    }
                );
            }
        });
    });

    // Hero Leader Card reveal
    const leaderHeroCard = document.querySelector('.team-leader-hero-card');
    if (leaderHeroCard) {
        const rect = leaderHeroCard.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            leaderHeroCard.style.opacity = '1';
        } else if (ScrollTrigger) {
            gsap.fromTo(leaderHeroCard,
                { y: 24, opacity: 0.5 },
                {
                    scrollTrigger: {
                        trigger: leaderHeroCard,
                        start: 'top 90%',
                        once: true,
                        toggleActions: 'play none none none'
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: 'power2.out',
                    clearProps: 'opacity,transform'
                }
            );
        }
    }

    // Safety fallback: ensure complete visibility after animations settle
    setTimeout(() => {
        ensureAllItemsVisible();
        if (ScrollTrigger) {
            ScrollTrigger.refresh();
        }
    }, 500);
}

/**
 * Main DOM Ready Lifecycle
 */
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Ensure all items visible immediately
    ensureAllItemsVisible();

    // 2. Load centralized global components (common Navbar with ABOUT dropdown active, Footer, Floating Actions)
    await loadGlobalComponents({
        activeNav: 'team',
        banner: null // Team page uses its custom cinematic architectural hero
    });

    // 3. Initialize Department Filter Bar (all items visible by default)
    initDepartmentFilter();

    // 4. Initialize GSAP Scroll Reveals & 3D Pointer Tilt
    initScrollReveal();
    initTeamAnimations();
    initCounterAnimation();
    initCardTilt();
    ensureAllItemsVisible();
});

