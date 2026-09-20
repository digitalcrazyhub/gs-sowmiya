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
    // 1. LEADERSHIP (Verified Company Directors & Department Heads)
    // ----------------------------------------------------------------------
    {
        id: 1,
        name: "Er. G. Sowmiya, M.E.",
        designation: "Managing Director & Chief Structural Engineer",
        department: "leadership",
        departmentLabel: "Leadership",
        qualifications: "M.E. Structural Engineering (Anna Univ) | M.I.E. Chartered Engineer",
        description: "Over 15 years of civil and structural engineering mastery. Pioneer in seismic-resistant RCC frameworks, post-tensioned slabs, and luxury residential estates with 250+ delivered landmarks across Tamil Nadu.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        isLead: true,
        stats: [
            { num: "15+", label: "Years Mastery" },
            { num: "250+", label: "Projects Delivered" },
            { num: "100%", label: "Structural Compliance" }
        ]
    },
    {
        id: 2,
        name: "Ar. Priya Ramanathan",
        designation: "Principal Design Architect",
        department: "leadership",
        departmentLabel: "Leadership",
        qualifications: "B.Arch, COA Registered | LEED Accredited Professional",
        description: "Leading the architectural design team in contemporary biophilic planning, luxury residences, natural illumination optimization, and climate-responsive courtyard ventilation.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
        isLead: false
    },
    {
        id: 3,
        name: "Er. K. V. Balasubramanian",
        designation: "Chief of Construction Operations",
        department: "leadership",
        departmentLabel: "Leadership",
        qualifications: "M.Tech Construction Tech & Management | 22+ Years Field Veteran",
        description: "Supervising on-ground engineering coordination, heavy concrete pumping schedules, high-rise structural compliance, and site safety audits.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
        isLead: false
    },
    {
        id: 4,
        name: "Ar. Dinesh Kumar",
        designation: "Director of Turnkey & MEP",
        department: "leadership",
        departmentLabel: "Leadership",
        qualifications: "M.Plan, B.Arch | BIM 4D Infrastructure Specialist",
        description: "Directing turnkey interior execution, comprehensive MEP integration (HVAC, plumbing, electrical grid), and 3D clash detection models.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
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
 * Initializes Interactive Department Filter Bar
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

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetDept = btn.getAttribute('data-dept') || 'all';

            // Update active state on buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (targetDept === 'all') {
                // Show all sections
                Object.values(sections).forEach(sec => {
                    if (sec) {
                        sec.style.display = '';
                    }
                });
                // Smooth scroll to top of directory
                const introSection = document.getElementById('team-intro');
                if (introSection) {
                    const offset = introSection.offsetTop - 120;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            } else {
                // Scroll smoothly to target section
                const targetSec = sections[targetDept];
                if (targetSec) {
                    const offset = targetSec.offsetTop - 120;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            }
        });
    });

    // Update active filter button on scroll
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 160;
        let currentDept = 'all';

        for (const [dept, section] of Object.entries(sections)) {
            if (section) {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    currentDept = dept;
                    break;
                }
            }
        }

        if (currentDept !== 'all') {
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-dept') === currentDept) {
                    btn.classList.add('active');
                } else if (btn.getAttribute('data-dept') !== 'all') {
                    btn.classList.remove('active');
                }
            });
        }
    }, { passive: true });
}

/**
 * Initializes GSAP Animations & ScrollTriggers
 */
function initTeamAnimations() {
    if (prefersReducedMotion || typeof window.gsap === 'undefined') {
        return;
    }

    const { gsap, ScrollTrigger } = window;
    if (ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Hero Text Entrance
    gsap.from('.team-hero-content > *', {
        y: 35,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.1
    });

    // Animate section headings on scroll
    const headers = document.querySelectorAll('.team-section-header');
    headers.forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Staggered card reveals in grids
    const cardGrids = [
        '.team-leadership-grid .team-card',
        '.team-grid-3 .team-card-engineering',
        '.team-grid-3 .team-placeholder-card',
        '.team-site-grid .team-card-site',
        '.team-culture-grid .team-culture-card',
        '.team-pm-list .team-pm-row-card'
    ];

    cardGrids.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            gsap.from(elements, {
                scrollTrigger: {
                    trigger: elements[0].parentElement,
                    start: 'top 82%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                duration: 0.75,
                stagger: 0.12,
                ease: 'power2.out'
            });
        }
    });

    // Hero Leader Card reveal
    const leaderHeroCard = document.querySelector('.team-leader-hero-card');
    if (leaderHeroCard) {
        gsap.from(leaderHeroCard, {
            scrollTrigger: {
                trigger: leaderHeroCard,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out'
        });
    }
}

/**
 * Main DOM Ready Lifecycle
 */
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Load centralized global components (common Navbar with ABOUT dropdown active, Footer, Floating Actions)
    await loadGlobalComponents({
        activeNav: 'team',
        banner: null // Team page uses its custom cinematic architectural hero
    });

    // 2. Initialize Department Filter Bar
    initDepartmentFilter();

    // 3. Initialize GSAP Scroll Reveals
    initTeamAnimations();
});
