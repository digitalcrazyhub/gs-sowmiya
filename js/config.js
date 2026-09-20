/**
 * GS SOWMIYA BUILDERS - CENTRAL SITE CONFIGURATION & DATA REPOSITORY
 * Luxury Architectural + Modern Engineering + Premium Construction
 * 
 * Centralized data ensures maintainability, clean architecture, and easy content updates.
 */

export const SITE_CONFIG = {
    brand: {
        name: "GS SOWMIYA BUILDERS",
        tagline: "Luxury Architectural & Modern Engineering Construction",
        shortDesc: "Premier construction and architectural engineering studio delivering high-end residential, commercial, and turnkey infrastructure with surgical precision.",
        established: "2011",
        experienceYears: 15,
        projectsCompleted: 250,
        happyClients: 300,
        locationsServed: 6,
    },
    contact: {
        phone: "+91 98400 12345",
        phoneDisplay: "+91 98400 12345",
        whatsapp: "+91 98400 12345",
        whatsappMessage: "Hello GS Sowmiya Builders, I would like to discuss an upcoming construction project.",
        email: "contact@gssowmiyabuilders.com",
        officeAddress: "Plot No. 42, Architectural Avenue, Anna Nagar, Chennai, Tamil Nadu 600040",
        coordinates: { lat: 13.0827, lng: 80.2707 },
        workingHours: "Mon - Sat: 9:00 AM – 7:00 PM IST"
    },
    socials: {
        instagram: "https://instagram.com",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com",
        youtube: "https://youtube.com"
    }
};

export const HERO_SLIDES = [
    {
        id: "01",
        category: "VISION",
        title: "BUILDING<br>THE FUTURE",
        subtitle: "Engineering precision. Architectural excellence.",
        description: "Pioneering luxury construction where bespoke architectural design converges with structural mastery.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85",
        featuredCard: {
            tag: "Flagship Residential",
            title: "Villa in Thirukalukundram",
            specs: "5,200 Sq.Ft · 5 Bedrooms · Private Courtyard",
            status: "Completed Project",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
        },
        buttons: [
            { text: "EXPLORE OUR PROJECTS", href: "#projects", primary: true },
            { text: "GET A QUOTE", href: "#contact", primary: false }
        ]
    },
    {
        id: "02",
        category: "RESIDENTIAL",
        title: "SPACES<br>MADE FOR LIVING",
        subtitle: "Thoughtfully designed spaces built around modern living.",
        description: "Private sanctuaries and contemporary estates designed to inspire tranquility, permanence, and refined comfort.",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85",
        featuredCard: {
            tag: "Custom Villa",
            title: "The Glass House, Ooty",
            specs: "4,800 Sq.Ft · Mountain View · Biophilic",
            status: "Award Winner 2024",
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80"
        },
        buttons: [
            { text: "EXPLORE RESIDENTIAL", href: "#projects", primary: true },
            { text: "START YOUR RESIDENCE", href: "#contact", primary: false }
        ]
    },
    {
        id: "03",
        category: "COMMERCIAL",
        title: "BUILT<br>FOR BUSINESS",
        subtitle: "High-performance commercial spaces designed for growth.",
        description: "Iconic enterprise campuses, tech parks, and corporate headquarters engineered for seamless scalability.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85",
        featuredCard: {
            tag: "Corporate Tower",
            title: "TVS Avenue Commercial",
            specs: "120,000 Sq.Ft · Grade-A Office · Chennai",
            status: "Handed Over",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
        },
        buttons: [
            { text: "VIEW COMMERCIAL PROJECTS", href: "#projects", primary: true },
            { text: "COMMERCIAL CONSULTATION", href: "#contact", primary: false }
        ]
    },
    {
        id: "04",
        category: "COMPLETE SOLUTIONS",
        title: "FROM VISION<br>TO REALITY",
        subtitle: "From planning and engineering to execution and completion.",
        description: "Full-spectrum turnkey delivery: land feasibility, structural modeling, MEP coordination, and immaculate handoff.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=85",
        featuredCard: {
            tag: "Turnkey Development",
            title: "Vaibhavam Grande",
            specs: "55,000 Sq.Ft · Mixed Development",
            status: "Turnkey Execution",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
        },
        buttons: [
            { text: "OUR SERVICES", href: "#services", primary: true },
            { text: "START YOUR PROJECT", href: "#contact", primary: false }
        ]
    }
];

export const CORE_SERVICES = [
    {
        number: "01",
        title: "Residential Construction",
        category: "Living Spaces",
        description: "Custom bespoke villas, luxury estates, and gated community residences engineered with monolithic durability.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        features: ["Bespoke Architecture", "Seismic Structural Design", "Acoustic Insulation"]
    },
    {
        number: "02",
        title: "Commercial Construction",
        category: "Corporate",
        description: "Grade-A office towers, retail complexes, and modern business hubs built for peak occupant density and efficiency.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        features: ["Post-Tensioned Slabs", "High-Speed Core Planning", "LEED Compliant"]
    },
    {
        number: "03",
        title: "Industrial Construction",
        category: "Manufacturing",
        description: "Heavy engineering plants, smart logistics warehouses, and cleanrooms adhering to global safety and load tolerances.",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        features: ["Heavy Load Flooring", "Pre-Engineered Buildings", "Ventilation Engineering"]
    },
    {
        number: "04",
        title: "Infrastructure Development",
        category: "Civil Works",
        description: "Urban access roads, drainage civil works, bridges, and foundation infrastructure connecting communities.",
        image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f9?auto=format&fit=crop&w=800&q=80",
        features: ["Deep Piling", "Culvert Engineering", "Geo-technical Stabilization"]
    },
    {
        number: "05",
        title: "Renovation & Remodeling",
        category: "Adaptive Reuse",
        description: "High-end structural retrofitting, historic restoration, and contemporary space modernization with zero structural risk.",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
        features: ["Structural Retrofit", "Facade Recladding", "Space Reconfiguration"]
    },
    {
        number: "06",
        title: "Turnkey Construction",
        category: "End-to-End",
        description: "Single-point responsibility encompassing architectural design, sanction approvals, procurement, and final interior keys.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
        features: ["Total Budget Guarantee", "Single Point of Contact", "Schedule Predictability"]
    },
    {
        number: "07",
        title: "Structural Works",
        category: "Engineering",
        description: "Advanced reinforced concrete frames, composite steel frameworks, and critical load-bearing engineering.",
        image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80",
        features: ["FEA Stress Analysis", "Thermal Crack Control", "NDT Testing"]
    },
    {
        number: "08",
        title: "Project Management",
        category: "Consultancy",
        description: "Rigorous quality audits, digital 4D BIM progress monitoring, schedule enforcement, and stringent cost control.",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
        features: ["BIM 4D Tracking", "Transparent Billing", "Zero-Accident Safety"]
    }
];

export const FEATURED_PROJECTS = [
    {
        id: "p1",
        name: "Vaibhavam Grande",
        location: "Thirukalukundram",
        category: "Residential",
        area: "55,000 Sq.Ft.",
        year: "2024",
        status: "Completed",
        tag: "Flagship Estate",
        description: "A sprawling contemporary gated residential enclave balancing climate-responsive ventilation and private green courtyards.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
        client: "Vaibhavam Enclave Development",
        structuralSystem: "Post-Tensioned Flat Slabs & Shear Walls",
        concreteGrade: "M35 & M40 Self-Compacting Concrete",
        steelGrade: "Fe-550D TMT Rebars (Primary Producers)",
        completionTime: "18 Months (2 Weeks Ahead of Schedule)",
        highlights: [
            "Thermal-break double glazed fenestration minimizing solar heat gain by 32%",
            "Sub-surface rainwater harvesting tank with 250,000-liter capacity",
            "Central courtyard with monolithic exposed teak pergolas"
        ],
        extendedDesc: "Executed on a 3.5-acre site in Thirukalukundram, this residential masterpiece demanded high seismic resilience and climate-adaptive airflow. Our engineering team deployed post-tensioned beam systems to maximize internal clear heights to 11.5 feet while eliminating unnecessary interior load-bearing walls."
    },
    {
        id: "p2",
        name: "TVS Avenue",
        location: "Chennai",
        category: "Commercial",
        area: "120,000 Sq.Ft.",
        year: "2023",
        status: "Completed",
        tag: "Corporate Hub",
        description: "A modern glass-and-composite commercial landmark featuring double-height atrium reception and expansive column-free floor plates.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
        client: "TVS Commercial Holdings",
        structuralSystem: "Composite Steel-Concrete Framed High-Rise",
        concreteGrade: "M45 High-Performance Concrete",
        steelGrade: "Fe-550D Corrosion-Resistant Rebars",
        completionTime: "22 Months",
        highlights: [
            "Column-free office plates offering 88% net floor-space efficiency",
            "LEED Gold certified energy envelope with low-E insulated glass facade",
            "Fully automated variable refrigerant volume (VRV) HVAC system"
        ],
        extendedDesc: "A Grade-A corporate tower in prime Chennai. We engineered high-density mat foundations with continuous 36-hour monolithic pours, backed by real-time thermal monitoring to eliminate thermal cracking in mass concrete."
    },
    {
        id: "p3",
        name: "Nolumbur Green Woods",
        location: "Chennai",
        category: "Residential",
        area: "42,000 Sq.Ft.",
        year: "2024",
        status: "Completed",
        tag: "Luxury Living",
        description: "Harmonious biophilic apartment community engineered with solar-harvesting canopies and expansive perimeter gardens.",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
        client: "Green Woods Estates",
        structuralSystem: "Cast-in-place Reinforced Concrete Frame",
        concreteGrade: "M30 Quality Controlled Ready-Mix",
        steelGrade: "Fe-500D Thermo-Mechanically Treated Steel",
        completionTime: "16 Months",
        highlights: [
            "Integrated rooftop 65kW solar photovoltaic canopy",
            "Acoustic floor underlays dampening inter-unit noise to <40dB",
            "Biophilic green pockets on every floor terrace"
        ],
        extendedDesc: "Designed for discerning families seeking sanctuary in urban Chennai. Every residence features 3-sided ventilation, double-height balconies, and sustainable wastewater recycling for landscaping."
    },
    {
        id: "p4",
        name: "Perambur Bharath House",
        location: "Chennai",
        category: "Residential",
        area: "18,500 Sq.Ft.",
        year: "2023",
        status: "Completed",
        tag: "Private Villa",
        description: "A private architectural masterpiece crafted with exposed textured concrete, teakwood louvers, and private reflecting pools.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
        client: "Private Industrialist Family",
        structuralSystem: "Exposed Architectural Concrete & Steel Hybrid",
        concreteGrade: "Custom Board-Formed Architectural M35",
        steelGrade: "Fe-550D TMT Rebars",
        completionTime: "14 Months",
        highlights: [
            "Handcrafted board-formed exposed concrete exterior walls",
            "Floating cantilever staircase with invisible structural stringers",
            "Private internal reflecting pool cooled by prevailing breeze"
        ],
        extendedDesc: "A signature private villa reflecting architectural purity. Our master formwork carpenters and concrete chemists achieved defect-free fair-faced concrete with zero surface plaster, creating an enduring brutalist-luxury aesthetic."
    },
    {
        id: "p5",
        name: "OOTY Love Dale",
        location: "Ooty",
        category: "Residential",
        area: "12,000 Sq.Ft.",
        year: "2024",
        status: "Completed",
        tag: "Hill Estate",
        description: "Perched along the scenic slopes of the Nilgiris, built with reinforced retaining soil mechanics and panoramic glass facades.",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85",
        client: "Private Residential Estate",
        structuralSystem: "Reinforced Terraced Foundation with Soil Nails",
        concreteGrade: "M35 High-Durability Cold-Weather Mix",
        steelGrade: "Fe-550D Corrosion-Resistant Rebars",
        completionTime: "15 Months",
        highlights: [
            "Engineered retaining structures preserving 100% of native slope ecology",
            "Triple-glazed argon-filled panoramic windows with thermal breaks",
            "Geothermal underfloor radiant heating throughout living wings"
        ],
        extendedDesc: "Built on a 35-degree slope in the Nilgiris. We performed deep micro-piling and soil-nail reinforcement before executing a floating steel-and-timber cantilever terrace overlooking the tea plantations."
    },
    {
        id: "p6",
        name: "Mogappair Skywood",
        location: "Chennai",
        category: "Residential",
        area: "85,000 Sq.Ft.",
        year: "2025",
        status: "In Finishing",
        tag: "Premium High-Rise",
        description: "Vertical living redefined with high-grade seismic dampening, cantilevered infinity sky decks, and thermal-barrier fenestration.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
        client: "Skywood Living Private Ltd",
        structuralSystem: "Seismic Zone III Compliant Ductile Shear Core",
        concreteGrade: "M45 Self-Compacting High-Rise Mix",
        steelGrade: "Fe-550D Primary Steel",
        completionTime: "In Advanced Finishing",
        highlights: [
            "Tuned mass liquid dampener reducing wind oscillation on upper floors",
            "Cantilevered 14th-floor infinity pool structure with acrylic observation floor",
            "Central high-speed passenger elevators with regenerative braking"
        ],
        extendedDesc: "Currently undergoing final architectural detailing and landscape finishing. A showcase of modern high-rise engineering, integrating BIM 4D scheduling to maintain precision across 18 storeys."
    }
];

export const ABOUT_DATA = {
    legacy: {
        title: "FIFTEEN YEARS OF ARCHITECTURAL MASTERY",
        subtitle: "From a focused structural design practice to one of Tamil Nadu's premier architectural construction companies.",
        story: [
            "Established in 2011 by Er. G. Sowmiya, GS Sowmiya Builders was founded on a singular conviction: that true luxury in construction is not mere cosmetic adornment, but the mathematical harmony of structural rigor, material integrity, and architectural poetry.",
            "Over 15 years, our studio has expanded from bespoke residential engineering into full-spectrum turnkey developments, luxury estate compounds, modern corporate headquarters, and high-tolerance industrial complexes.",
            "Today, with 250+ completed landmarks and over 1.8 million square feet constructed, we maintain an uncompromising standard: zero hidden escalation clauses, direct principal supervision on every job site, and enduring value that outlasts generations."
        ]
    },
    milestones: [
        {
            year: "2011",
            title: "Founding in Chennai",
            desc: "Er. G. Sowmiya establishes the company with core civil and structural engineering consulting."
        },
        {
            year: "2014",
            title: "First Landmark Turnkey Enclave",
            desc: "Completed an 18-villa gated community in Thirukalukundram, delivered 14 days ahead of scheduled handover."
        },
        {
            year: "2017",
            title: "Commercial & High-Rise Expansion",
            desc: "Commissioned the flagship TVS Avenue Commercial Hub and attained ISO 9001:2015 Quality Management certification."
        },
        {
            year: "2020",
            title: "BIM 4D Digital Integration",
            desc: "Pioneered integrated 3D/4D digital building information modeling for collision-free MEP and structural synchronization."
        },
        {
            year: "2023",
            title: "Structural Excellence Award",
            desc: "Honored at the Regional Architecture & Engineering Forum for our pioneering post-tensioned cantilever designs."
        },
        {
            year: "2026",
            title: "250+ Delivered Landmarks",
            desc: "Over 1.8 million square feet built across Tamil Nadu with a 100% zero-accident safety record."
        }
    ],
    values: [
        {
            number: "01",
            title: "Structural Integrity",
            desc: "We exclusively specify primary producer Fe-550D TMT steel and certified Grade-53 cement. Every batch is tested in our quality control lab."
        },
        {
            number: "02",
            title: "Architectural Soul",
            desc: "We believe space shapes spirit. Our designs prioritize spatial proportions, natural cross-ventilation, and climate-responsive daylight."
        },
        {
            number: "03",
            title: "Fidelity & Transparency",
            desc: "Clear itemized BOQs, digital progress logs, milestone-linked payments, and zero surprise escalation costs."
        },
        {
            number: "04",
            title: "Zero-Accident Safety",
            desc: "Mandatory PPE on every site, certified safety supervisors, and strict alignment with OSHA and National Safety Council protocols."
        }
    ],
    leadership: [
        {
            name: "Er. G. Sowmiya, M.E.",
            role: "Founder & Managing Director",
            specialty: "Structural Engineering & Earthquake Dynamics",
            bio: "Over 20 years of hands-on civil engineering leadership. Supervised structural design and execution across 250+ residential and commercial projects.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
        },
        {
            name: "Ar. Priya Ramanathan",
            role: "Principal Design Architect",
            specialty: "Luxury Residential & Biophilic Architecture",
            bio: "Graduate of Anna University Architecture with master's in Sustainable Design. Leads architectural conceptualization and spatial layouts.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
        },
        {
            name: "Er. K. V. Balasubramanian",
            role: "Chief of Construction Operations",
            specialty: "High-Rise Execution & Quality Control",
            bio: "Chartered Civil Engineer with 18+ years directing heavy equipment logistics, ready-mix batching, and on-site concrete curing.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
        },
        {
            name: "Ar. Dinesh Kumar",
            role: "Director of Turnkey & MEP",
            specialty: "BIM 4D Modeling & Building Services",
            bio: "Specialist in integrating mechanical, electrical, and plumbing engineering seamlessly within architectural form.",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
        }
    ],
    equipmentFleet: [
        { name: "Automated Batching Plants", count: "4 Units", desc: "45 m³/hour computerized mix calibration" },
        { name: "Transit Concrete Mixers", count: "12 Units", desc: "Equipped with telemetry and slump control" },
        { name: "Stationary Boom Placers", count: "6 Units", desc: "36-meter high-reach pour capacity" },
        { name: "Laser Total Stations", count: "8 Sets", desc: "Sub-millimeter Leica geospatial alignment" }
    ],
    qaProcedures: [
        { test: "Compressive Strength (Cube Test)", standard: "IS 516 / IS 456", interval: "Every 50m³ of concrete pour (7 & 28 Days)" },
        { test: "Ultrasonic Pulse Velocity (UPV)", standard: "IS 13311 (Part 1)", interval: "Non-destructive testing of all primary columns" },
        { test: "Rebar Tensile & Yield Testing", standard: "IS 1786 / IS 1608", interval: "Every mill batch certificate & lab pull test" },
        { test: "Hydrostatic Ponding Test", standard: "IS 3370", interval: "72-hour continuous test on all slabs & basements" }
    ]
};

export const INDUSTRIES = [
    {
        id: "ind-res",
        title: "Residential",
        tagline: "Sanctuaries of permanence",
        description: "Luxury villas, custom estates, and bespoke penthouses designed around human rhythm and natural light.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
        stats: "160+ Homes Delivered"
    },
    {
        id: "ind-com",
        title: "Commercial",
        tagline: "Dynamic enterprise spaces",
        description: "Corporate office towers, retail malls, and innovation centers built for high performance and agile scalability.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
        stats: "45+ Corporate Projects"
    },
    {
        id: "ind-ind",
        title: "Industrial",
        tagline: "Heavy-duty engineering",
        description: "High-bay warehousing, fabrication units, and automated manufacturing facilities built with precision engineering.",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
        stats: "25+ Industrial Plants"
    },
    {
        id: "ind-inf",
        title: "Infrastructure",
        tagline: "Connecting foundations",
        description: "Deep foundation civil works, arterial bridges, and community utility corridors built for generations.",
        image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f9?auto=format&fit=crop&w=1000&q=80",
        stats: "15+ Public Infrastructure Works"
    },
    {
        id: "ind-hea",
        title: "Healthcare",
        tagline: "Sterile, life-saving spaces",
        description: "Specialized multi-specialty hospitals, cleanroom labs, and diagnostic centers with redundant utility engineering.",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
        stats: "8+ Healthcare Facilities"
    },
    {
        id: "ind-hos",
        title: "Hospitality",
        tagline: "Sensory resort environments",
        description: "Boutique hotels, hillside resorts, and private clubs crafted to deliver an unforgettable luxury guest experience.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
        stats: "12+ Hospitality Resorts"
    }
];

export const PROCESS_STAGES = [
    {
        step: "01",
        name: "Consultation",
        phase: "Blueprint Phase",
        title: "Vision & Site Feasibility",
        description: "In-depth discovery session assessing client aspirations, structural site conditions, zoning bylaws, and financial planning.",
        icon: "compass"
    },
    {
        step: "02",
        name: "Planning",
        phase: "Foundation Phase",
        title: "BIM & Master Schedule",
        description: "Comprehensive 3D architectural modeling, soil strata analysis, statutory sanction approvals, and milestone mapping.",
        icon: "layout"
    },
    {
        step: "03",
        name: "Design & Engineering",
        phase: "Structure Phase",
        title: "Structural Calculation & MEP",
        description: "Earthquake-resistant structural detailing, integrated MEP design, material specifications, and energy efficiency audits.",
        icon: "layers"
    },
    {
        step: "04",
        name: "Execution",
        phase: "Superstructure Phase",
        title: "Precision Construction",
        description: "On-site execution driven by laser-leveling, automated batching, daily digital progress tracking, and zero safety tolerance.",
        icon: "tool"
    },
    {
        step: "05",
        name: "Quality Inspection",
        phase: "Finishing Phase",
        title: "180-Point Quality Audit",
        description: "Non-destructive testing, acoustic dampening validation, waterproofing pressure tests, and snag-list rectification.",
        icon: "shield-check"
    },
    {
        step: "06",
        name: "Handover",
        phase: "Completed Project",
        title: "Commissioning & Key Delivery",
        description: "Comprehensive as-built blueprints, warranty documentation, maintenance schedule briefing, and celebratory key handover.",
        icon: "key"
    }
];

export const CERTIFICATIONS = [
    {
        badge: "ISO 9001:2015",
        title: "Quality Management System",
        issuer: "Bureau of International Standards",
        desc: "Certified for stringent architectural engineering standards, material sourcing integrity, and precision project delivery."
    },
    {
        badge: "IGBC GOLD",
        title: "Green Building Council",
        issuer: "Indian Green Building Council",
        desc: "Accredited builder for sustainable construction methods, rainwater harvesting, and thermal envelope efficiency."
    },
    {
        badge: "SAFETY FIRST",
        title: "National Safety Council Standard",
        issuer: "Occupational Health & Safety",
        desc: "Zero-accident site policy with mandatory PPE protocols, hazard audits, and certified safety personnel."
    },
    {
        badge: "CREDAI",
        title: "Allied Builder Member",
        issuer: "Confederation of Real Estate Developers",
        desc: "Adherence to the highest ethical codes of consumer transparency, milestone fidelity, and construction law."
    },
    {
        badge: "EXCELLENCE",
        title: "Structural Engineering Award",
        issuer: "Regional Architecture Forum 2024",
        desc: "Recognized for innovative post-tensioned slab design and complex architectural cantilever execution."
    }
];

export const CLIENT_LOGOS = [
    { name: "Apex Infrastructure Group", code: "APEX" },
    { name: "Marina Heritage Developers", code: "MARINA" },
    { name: "Synergy Tech Parks", code: "SYNERGY" },
    { name: "Vertex Commercials", code: "VERTEX" },
    { name: "Southern Capital Enclave", code: "SOUTHERN" },
    { name: "Zenith Industrial Logistics", code: "ZENITH" },
    { name: "Equinox Healthcare Group", code: "EQUINOX" },
    { name: "Nilgiri Eco Resorts", code: "NILGIRI" }
];

export const TESTIMONIALS = [
    {
        id: "t1",
        quote: "GS Sowmiya Builders transformed our vision into an architectural wonder. Their structural engineering team executed our 55,000 sq.ft. complex ahead of schedule with immaculate attention to every millimeter of concrete finish.",
        author: "Er. K. Senthil Nathan",
        role: "Managing Director",
        company: "Vaibhavam Enclave Development",
        project: "Vaibhavam Grande, Thirukalukundram",
        rating: 5
    },
    {
        id: "t2",
        quote: "In commercial construction, delays are fatal. GS Sowmiya Builders delivered our corporate headquarters with flawless MEP coordination and LEED Gold compliance. Their daily digital reporting gave us complete peace of mind.",
        author: "M. Raghavan",
        role: "VP Operations",
        company: "TVS Avenue Enterprises",
        project: "TVS Commercial Hub, Chennai",
        rating: 5
    },
    {
        id: "t3",
        quote: "Building our private residence in Ooty was structurally demanding due to the steep terrain. GS Sowmiya Builders engineered a rock-solid cantilever foundation while preserving the natural pines. True architectural craftsmanship.",
        author: "Dr. Ananya & Rajesh Varma",
        role: "Homeowners",
        company: "Private Residence",
        project: "Love Dale Villa, Ooty",
        rating: 5
    },
    {
        id: "t4",
        quote: "Their turnkey execution is unmatched. From architectural sanctions to final key handover, there was not a single hidden surprise. The quality of their structural framework is something you can literally feel.",
        author: "A. P. Chandrasekhar",
        role: "Chairman",
        company: "Nolumbur Living",
        project: "Nolumbur Green Woods, Chennai",
        rating: 5
    }
];
