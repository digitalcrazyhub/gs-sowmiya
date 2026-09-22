/**
 * GS SOWMIYA BUILDERS PRIVATE LIMITED - CENTRAL SITE CONFIGURATION & DATA REPOSITORY
 * Source of Truth: Verified via ROC MCA (CIN: U43299TN2023PTC161774), Official Website, and Verified Project Records.
 * 
 * "Built on Trust. Driven by Quality."
 * Mission: To make dream homes accessible to all classes of people.
 */

export const SITE_CONFIG = {
    brand: {
        name: "GS SOWMIYA BUILDERS",
        legalName: "GS Sowmiya Builders Private Limited",
        cin: "U43299TN2023PTC161774",
        tagline: "Built on Trust. Driven by Quality.",
        shortDesc: "Second-generation builders in Chennai delivering quality residential construction, joint ventures, turnkey contracts, and modern home renovations with transparent pricing.",
        established: "2023",
        heritageYears: "15+",
        heritageNote: "Backed by 15+ years of dedicated building contracting excellence",
        companyExperience: "15+ Year",
        projectsDelivered: "200+",
        happyFamilies: "200+",
        locationsServed: "Chennai & Chengalpattu",
    },
    contact: {
        phone: "+91 90431 56670",
        phoneSecondary: "+91 70105 17729",
        phoneDisplay: "+91 90431 56670",
        whatsapp: "+91 70105 17729",
        whatsappRaw: "917010517729",
        whatsappMessage: "Hello GS Sowmiya Builders, I would like to enquire about construction / joint venture / apartment projects.",
        email: "md@sowmiyabuilders.com",
        officeAddress: "No 106, Nallasamy Tower, Velachery Main Road, Pallikaranai, Chennai - 600 100.",
        shortAddress: "No 106, Nallasamy Tower, Velachery Main Rd, Pallikaranai, Chennai 600 100",
        landmark: "Nallasamy Tower, Velachery Main Road, Pallikaranai",
        mapUrl: "https://maps.app.goo.gl/HmbHVh8q1EZVrsqi7",
        website: "https://gssowmiyabuilders.com",
        coordinates: { lat: 12.9366, lng: 80.2087 },
        workingHours: "Mon - Sat: 9:00 AM – 7:00 PM IST | Sun: By Appointment"
    },
    socials: {
        facebook: "https://www.facebook.com/share/1A3vYczzvJ/",
        instagram: "https://www.instagram.com/gs_sowmiya_builders?igsi=eG1oNDJhcjAxN2hq",
        youtube: "https://youtube.com/@sowmiyaconstruction6689?si=HtmzhtXbHHGSQuVm",
        whatsapp: "https://wa.me/917010517729",
        website: "https://gssowmiyabuilders.com",
        officeLocation: "https://maps.app.goo.gl/HmbHVh8q1EZVrsqi7"
    }
};

export const HERO_SLIDES = [
    {
        id: "01",
        label: "Residential Construction",
        category: "CONSTRUCTION SERVICES",
        title: "Reliable Construction<br>Services",
        subtitle: "Making dream homes accessible to all classes of people across Chennai",
        description: "We provide reliable, high-quality residential construction and turnkey solutions to keep your dream home durable, safe, and built to last always.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
        buttons: [
            { text: "Our Services »", href: "#services", primary: true }
        ]
    },
    {
        id: "02",
        label: "Living Spaces & Homes",
        category: "CUSTOM HOMES",
        title: "Spaces Made<br>For Living",
        subtitle: "Custom residential homes and turnkey villas built on your land",
        description: "Custom residential homes and turnkey villas built on your land with second-generation craftsmanship, branded materials, and earthquake-resistant RCC frames.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85",
        buttons: [
            { text: "Our Services »", href: "/services/residential-construction.html", primary: true }
        ]
    },
    {
        id: "03",
        label: "Joint Ventures",
        category: "LAND & COMMERCIAL",
        title: "Equitable<br>Joint Ventures",
        subtitle: "Maximize your plot's true value with an equitable partnership",
        description: "Partnering with landowners and plot owners across South Chennai with transparent CMDA/DTCP sanctions, clear legal agreements, and maximum land value.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85",
        buttons: [
            { text: "Our Services »", href: "/services.html", primary: true }
        ]
    },
    {
        id: "04",
        label: "Turnkey Solutions",
        category: "COMPLETE SOLUTIONS",
        title: "From Vision<br>To Reality",
        subtitle: "From plan approvals and foundation to interior handover",
        description: "From architectural planning and structural engineering to turnkey interior handover, delivered on schedule with direct principal site supervision.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=85",
        buttons: [
            { text: "Our Services »", href: "/contact.html", primary: true }
        ]
    }
];

export const CORE_SERVICES = [
    {
        number: "01",
        title: "Residential Construction",
        category: "Living Spaces",
        description: "Individual houses, duplex villas, and residential apartment buildings built with earthquake-resistant RCC frames and quality branded materials.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        features: ["Vaastu-Compliant Architecture", "Earthquake-Resistant RCC Framing", "Branded Material Specifications"],
        link: "/services/residential-construction.html"
    },
    {
        number: "02",
        title: "Joint Venture Development",
        category: "Land Partnerships",
        description: "Equitable joint venture partnerships with landowners across South Chennai, providing complete funding, approvals, and timely construction.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        features: ["Transparent Ratio Sharing", "CMDA / DTCP Sanctions", "Active Projects in Vengaivasal & Vignarajapuram"],
        link: "/services.html"
    },
    {
        number: "03",
        title: "Turnkey Building Contracts",
        category: "End-to-End Contracting",
        description: "Complete single-point contracting from soil testing to final key handover. Detailed BOQs, milestone-linked payments, and zero hidden costs.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
        features: ["Clear Itemized BOQ", "Weekly Digital Progress Updates", "Proven Turnkey Contracts in Chennai"],
        link: "/services.html"
    },
    {
        number: "04",
        title: "Renovation & Remodeling",
        category: "Home Improvement",
        description: "Comprehensive home makeovers, floor additions, structural strengthening, terrace waterproofing, and modern space reconfigurations.",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
        features: ["Vertical Floor Extensions", "Terrace Waterproofing", "Kitchen & Bathroom Overhauls"],
        link: "/services/renovation-remodeling.html"
    },
    {
        number: "05",
        title: "Interior Design & Decoration",
        category: "Interior Works",
        description: "Modern modular kitchens, customized bedroom wardrobes, aesthetic false ceilings, ambient lighting, and high-quality woodwork.",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
        features: ["Factory-Finish Modular Kitchens", "Full-Height Wardrobes", "Designer False Ceilings"],
        link: "/services.html"
    },
    {
        number: "06",
        title: "Commercial & Retail Buildings",
        category: "Commercial",
        description: "Neighborhood commercial buildings, retail shop complexes, and commercial floors built for durable business operations and strong rental returns.",
        image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f9?auto=format&fit=crop&w=800&q=80",
        features: ["Optimized Retail Floor Plates", "Heavy-Duty Flooring & Shutters", "Commercial Municipal Sanctions"],
        link: "/services/commercial-construction.html"
    }
];

export const FEATURED_PROJECTS = [
    {
        id: "p1",
        name: "GS Sowmiya Elite Enclave",
        location: "Medavakkam, Chennai",
        category: "Residential Apartments",
        area: "2 BHK Apartments (916 Sq.Ft.)",
        year: "2024 - 2025",
        status: "In Finishing / Possession July 2025",
        tag: "Flagship Project",
        description: "A premier residential apartment project in Medavakkam offering well-ventilated 2 BHK homes with covered car parking and modern amenities.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
        client: "Apartment Buyers & Homeowners",
        structuralSystem: "Seismic Zone III Compliant RCC Framed Structure",
        concreteGrade: "M20 / M25 Quality Controlled Mix",
        steelGrade: "Fe-550 TMT Corrosion-Resistant Rebars",
        completionTime: "Estimated Possession July 2025",
        highlights: [
            "RERA-approved residential development in Medavakkam",
            "Optimal 2 BHK unit layout of 916 Sq.Ft. with maximum carpet area efficiency",
            "Covered parking, dedicated elevator, and 24/7 water supply infrastructure",
            "Strategic access to Medavakkam junction, Velachery, and OMR IT Corridor"
        ],
        extendedDesc: "GS Sowmiya Elite Enclave in Medavakkam represents our commitment to providing accessible, high-quality residential apartments for families in Chennai. Built on solid foundation engineering with strict structural controls, each home offers ample daylight, cross-ventilation, and durable finishes starting from ₹62.75 Lacs."
    },
    {
        id: "p2",
        name: "Vengaivasal Custom Residences",
        location: "Ponni Amman Koil St, Vengaivasal, Chennai",
        category: "Individual Homes & Contracts",
        area: "1,400 to 2,600 Sq.Ft.",
        year: "2023 - 2024",
        status: "Completed & Handed Over",
        tag: "Custom Villas",
        description: "Bespoke residential independent houses and duplex residences built with custom floor plans, teakwood main doors, and anti-termite foundation treatment.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
        client: "Private Homeowner Families",
        structuralSystem: "Reinforced Concrete Frame with Wire-cut Brick Masonry",
        concreteGrade: "M20 Ready-Mix & On-site Controlled Concrete",
        steelGrade: "Fe-500D / Fe-550 TMT Rebars",
        completionTime: "Delivered on Schedule",
        highlights: [
            "Tailored architectural layouts designed in close consultation with the family",
            "Full anti-termite chemical soil barrier and damp-proof course (DPC)",
            "Celebrated housewarming ceremony with enthusiastic client satisfaction",
            "High-grade vitrified tiles, modular switches, and branded bathroom fixtures"
        ],
        extendedDesc: "Located in our home base of Vengaivasal, Chennai 600126, these residences showcase our core philosophy: personal, hands-on attention from the builder's leadership team on site every single day."
    },
    {
        id: "p3",
        name: "Manivakkam Turnkey Enclave",
        location: "Manivakkam, Chennai (Tambaram Sector)",
        category: "Turnkey Residential",
        area: "1,200 to 2,200 Sq.Ft.",
        year: "2023 - 2024",
        status: "Completed & Occupied",
        tag: "Turnkey Contract",
        description: "End-to-end residential construction contracts executed with stage-wise milestone billing, quality material checks, and timely handovers.",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
        client: "Manivakkam Resident Families",
        structuralSystem: "RCC Column & Beam Structure with Plinth Beam Tie",
        concreteGrade: "M20 Standard Mix",
        steelGrade: "Fe-500D TMT Rebars",
        completionTime: "Completed with Client Commendations",
        highlights: [
            "Complete civil contracting from soil testing to interior painting and fixtures",
            "Transparent material specifications with zero budget escalations",
            "Commended by homeowners and extended family during the housewarming ceremony",
            "Rainwater harvesting sump and overhead storage integrated seamlessly"
        ],
        extendedDesc: "Executed for families in Manivakkam, this project received warm praise from clients and relatives for punctual handover, courteous coordination, and superior construction finish."
    },
    {
        id: "p4",
        name: "Vignarajapuram Joint Venture",
        location: "Vignarajapuram, Medavakkam Sector, Chennai",
        category: "Joint Venture Development",
        area: "Residential Development",
        year: "2024 - 2025",
        status: "Planning & Land Approval in Progress",
        tag: "Joint Venture",
        description: "A planned residential development executed in partnership with the landowner, delivering modern living units with clear title verification.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
        client: "Landowner Partnership",
        structuralSystem: "Modern RCC Framed Construction",
        concreteGrade: "M25 High-Durability Mix",
        steelGrade: "Fe-550 Primary Steel",
        completionTime: "Under Planning & Sanctions",
        highlights: [
            "Equitable joint venture agreement safeguarding landowner interests",
            "Full statutory liaison for municipal sanctions and planning permits",
            "Convenient access to Medavakkam, Santhosapuram, and Camp Road Tambaram",
            "Designed for young professionals and growing families"
        ],
        extendedDesc: "Currently undergoing statutory planning and land sanctions, this project reflects our active joint venture model where landowners gain maximum value with zero construction headaches."
    },
    {
        id: "p5",
        name: "Kamarajapuram Turnkey Contracts",
        location: "Kamarajapuram, Chennai",
        category: "Residential Contracts",
        area: "1,500 to 2,400 Sq.Ft.",
        year: "2024 - 2025",
        status: "Under Construction",
        tag: "Turnkey Project",
        description: "Scheduled turnkey home construction projects with stringent quality inspections, branded plumbing/electrical lines, and regular progress updates.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
        client: "Private Residential Clients",
        structuralSystem: "Reinforced Concrete Frame with Fly Ash Brickwork",
        concreteGrade: "M20 / M25 Mix",
        steelGrade: "Fe-550 TMT Rebars",
        completionTime: "Under Scheduled Execution",
        highlights: [
            "Stage-by-stage photo documentation for transparent client monitoring",
            "Stringent cube testing and slump verification during slab casts",
            "Personalized interior layout provisions before MEP rough-ins"
        ],
        extendedDesc: "Continuing our residential contract footprint across suburban Chennai, ensuring home builders receive professional engineering supervision without paying inflated builder premiums."
    }
];

export const ABOUT_DATA = {
    legacy: {
        title: "SECOND-GENERATION CRAFTSMANSHIP & ENGINEERING RIGOR",
        subtitle: "From decades of trusted building contracting to a modern private limited construction company.",
        story: [
            "GS Sowmiya Builders Private Limited was incorporated in 2023 with a clear and heartfelt mission: to make dream homes accessible to all classes of people without compromising on structural safety or finish quality.",
            "As second-generation builders, our foundation rests on over 30 years of on-site building contracting experience established by Mr. Gurusamy, a well-known contractor who contributed to more than 200 projects across Chennai through earlier real estate and contracting works.",
            "Today, under the leadership of engineering graduate Er. Suresh Kumar, GS Sowmiya Builders blends that invaluable field heritage with modern structural engineering standards, RERA compliance, transparent BOQs, and direct on-site supervision.",
            "Whether executing our flagship residential apartment project 'GS Sowmiya Elite Enclave' in Medavakkam, building custom independent villas in Vengaivasal and Manivakkam, or partnering with landowners on joint ventures in Vignarajapuram, we stand by our core promise: Built on Trust. Driven by Quality."
        ]
    },
    milestones: [
        {
            year: "Decades Past",
            title: "Contracting Roots in Chennai",
            desc: "Mr. Gurusamy establishes a respected reputation across Chennai as a trusted building contractor, guiding over 200 home construction projects."
        },
        {
            year: "July 2023",
            title: "Private Limited Incorporation",
            desc: "GS Sowmiya Builders Private Limited is officially incorporated under ROC Chennai (CIN: U43299TN2023PTC161774) with founder Er. Suresh Kumar."
        },
        {
            year: "2023 - 2024",
            title: "Successful Turnkey Deliveries",
            desc: "Completed independent home projects in Manivakkam and Vengaivasal, celebrated with warm client reviews and housewarming ceremonies."
        },
        {
            year: "2024",
            title: "Launch of Elite Enclave, Medavakkam",
            desc: "Commenced construction of the flagship 'GS Sowmiya Elite Enclave' offering RERA-approved 2 BHK apartments in Medavakkam, Chennai."
        },
        {
            year: "2024 - 2025",
            title: "Joint Venture Expansion",
            desc: "Expanded into landowner joint ventures in Vengaivasal and Vignarajapuram, alongside new turnkey residential contracts in Kamarajapuram."
        }
    ],
    values: [
        {
            number: "01",
            title: "Accessible Dream Homes",
            desc: "We believe quality housing should be within reach for all families. Transparent square-foot pricing, clear specifications, and no hidden surprises."
        },
        {
            number: "02",
            title: "Structural Safety First",
            desc: "Strict adherence to Indian Standards (IS 456 for concrete, IS 1786 for TMT steel). Earthquake-resistant RCC frames and quality brick masonry."
        },
        {
            number: "03",
            title: "Total Transparency",
            desc: "Itemized Bill of Quantities (BOQ), clear legal agreements, stage-linked milestone payments, and verified RERA compliance."
        },
        {
            number: "04",
            title: "Direct Principal Supervision",
            desc: "Our directors and engineering graduates are directly involved on-site, supervising mix ratios, bar bending, and finishing details."
        }
    ],
    leadership: [
        {
            name: "Mr. Gurusamy",
            role: "Director & Senior Mentor",
            specialty: "Three Decades of Building Contracting Mastery",
            bio: "A veteran building contractor who has shaped more than 200 projects across Chennai. Brings 15+ years of deep practical construction wisdom, artisan relationships, and material sourcing knowledge.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
        },
        {
            name: "Er. Suresh Kumar",
            role: "Founder & Managing Director",
            specialty: "Civil Engineering, Planning & Project Execution",
            bio: "Engineering graduate carrying forward the family building tradition. Leads GS Sowmiya Builders with modern structural engineering standards, digital tracking, and a customer-first approach.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
        }
    ],
    qaProcedures: [
        { test: "Concrete Compressive Strength", standard: "IS 516 / IS 456", interval: "Tested for every roof and foundation slab pour (7 & 28 Days)" },
        { test: "TMT Rebar Quality Verification", standard: "IS 1786", interval: "Sourcing primary Fe-500D / Fe-550 TMT steel with test certificates" },
        { test: "Anti-Termite Soil Treatment", standard: "IS 6313 (Part 2)", interval: "Multi-stage chemical barrier at plinth and foundation excavation" },
        { test: "Terrace Waterproofing Ponding", standard: "IS 3370", interval: "48 to 72-hour continuous water-standing test on all terrace slabs" }
    ]
};

export const PROCESS_STAGES = [
    {
        step: "01",
        name: "Discovery & Site Review",
        phase: "Consultation Phase",
        title: "Requirements & Plot Feasibility",
        description: "We meet to understand your family's budget, lifestyle needs, plot dimensions, soil conditions, and Vaastu considerations.",
        icon: "compass"
    },
    {
        step: "02",
        name: "Planning & Sanctions",
        phase: "Design & Approvals",
        title: "Floor Plans & Building Sanction",
        description: "Preparation of architectural 2D/3D layouts, structural calculation drawings, and coordination for CMDA/DTCP municipal sanctions.",
        icon: "layout"
    },
    {
        step: "03",
        name: "Transparent Estimate",
        phase: "Budgeting Phase",
        title: "Detailed Itemized BOQ",
        description: "Clear, transparent schedule of rates with specific material brands (cement, steel, tiles, fittings) and milestone-linked payment schedules.",
        icon: "layers"
    },
    {
        step: "04",
        name: "Structured Execution",
        phase: "Construction Phase",
        title: "Foundation to Superstructure",
        description: "On-site construction with rigorous concrete curing, anti-termite treatment, plinth beam tying, and regular photo updates sent to you.",
        icon: "tool"
    },
    {
        step: "05",
        name: "Finishing & Inspection",
        phase: "Finishing Phase",
        title: "Plumbing, Electrical & Painting",
        description: "Precision installation of tiles, concealed electrical wiring, sanitaryware, doors, windows, and waterproofing checks.",
        icon: "shield-check"
    },
    {
        step: "06",
        name: "Key Handover",
        phase: "Completed Project",
        title: "Celebrating Your Housewarming",
        description: "Comprehensive site cleaning, pre-handover walkthrough, documentation handover, and celebrating your dream home milestone.",
        icon: "key"
    }
];

export const CERTIFICATIONS = [
    {
        badge: "RERA COMPLIANT",
        title: "RERA Registered Projects",
        issuer: "Tamil Nadu Real Estate Regulatory Authority",
        desc: "Developing approved residential apartment projects like GS Sowmiya Elite Enclave with full legal title clarity."
    },
    {
        badge: "MCA ACTIVE",
        title: "Registered Private Limited",
        issuer: "Ministry of Corporate Affairs, India",
        desc: "Incorporated under ROC Chennai (CIN: U43299TN2023PTC161774) ensuring formal corporate accountability."
    },
    {
        badge: "IS STANDARDS",
        title: "Bureau of Indian Standards Compliant",
        issuer: "IS 456 & IS 1786 Structural Codes",
        desc: "All structural designs engineered strictly to earthquake-resistant codes using tested Fe-550 TMT rebars."
    },
    {
        badge: "SANCTION READY",
        title: "CMDA & DTCP Approval Liaison",
        issuer: "Chennai Metropolitan Development Authority",
        desc: "Expertise in local municipal building rules, setback regulations, and regularized property sanctions."
    }
];

export const BRANDED_MATERIALS = [
    { name: "Tata Tiscon / JSW", type: "Fe-550 TMT Steel" },
    { name: "UltraTech / Coromandel", type: "Grade 53 Cement" },
    { name: "Kajaria / Somany", type: "Vitrified Tile Flooring" },
    { name: "Asian Paints", type: "Apex & Royale Emulsions" },
    { name: "Finolex / Havells", type: "FRLS Copper Wiring" },
    { name: "Parryware / Hindware", type: "Sanitaryware & CP Fittings" },
    { name: "Ashirvad / Astral", type: "CPVC & UPVC Plumbing Lines" }
];

export const TESTIMONIALS = [
    {
        id: "t1",
        quote: "We booked our 2 BHK at GS Sowmiya Elite Enclave in Medavakkam. The team has been completely transparent with construction milestones, material brands, and delivery timelines. Truly making dream homes accessible!",
        author: "Homebuyer",
        role: "Resident",
        company: "GS Sowmiya Elite Enclave",
        project: "Elite Enclave, Medavakkam",
        rating: 5
    },
    {
        id: "t2",
        quote: "GS Sowmiya Builders constructed our independent home in Manivakkam. During the housewarming, all our relatives admired the finishing and solid structural strength. Er. Suresh Kumar and his team monitored the work closely.",
        author: "Homeowner",
        role: "Client",
        company: "Private Residence",
        project: "Manivakkam Turnkey Home",
        rating: 5
    },
    {
        id: "t3",
        quote: "Finding an honest builder in Chennai who gives you a clear BOQ without unexpected cost hikes is rare. They built our house in Vengaivasal with genuine quality materials and handed it over on schedule.",
        author: "Homeowner Family",
        role: "Client",
        company: "Residential Homeowner",
        project: "Vengaivasal Custom House",
        rating: 5
    },
    {
        id: "t4",
        quote: "We partnered with GS Sowmiya Builders for a joint venture project. Their legal transparency, clear documentation, and ethical approach gave our family immense confidence. Highly recommended.",
        author: "Landowner Partner",
        role: "Joint Venture Partner",
        company: "Property Owner",
        project: "Vignarajapuram Development",
        rating: 5
    }
];
