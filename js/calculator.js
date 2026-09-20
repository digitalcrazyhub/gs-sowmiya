/**
 * GS SOWMIYA BUILDERS - CONSTRUCTION COST & ENGINEERING ESTIMATOR
 * Instant preliminary budget, structural bill-of-quantities approximation,
 * and project timeline calculation for residential & commercial builds in Tamil Nadu.
 */

import { SITE_CONFIG } from './config.js';

export function initCostCalculator() {
    const calcForm = document.getElementById('construction-calculator-form');
    if (!calcForm) return;

    const typeSelect = document.getElementById('calc-project-type');
    const areaRange = document.getElementById('calc-area-range');
    const areaNumber = document.getElementById('calc-area-number');
    const gradeRadios = document.querySelectorAll('input[name="calc-quality-tier"]');
    const floorsSelect = document.getElementById('calc-floors');
    
    // Result elements
    const budgetLowEl = document.getElementById('calc-budget-low');
    const budgetHighEl = document.getElementById('calc-budget-high');
    const timelineEl = document.getElementById('calc-timeline-val');
    const cementBagsEl = document.getElementById('calc-cement-bags');
    const steelTonnesEl = document.getElementById('calc-steel-tonnes');
    const concreteVolumeEl = document.getElementById('calc-concrete-volume');
    const applyToQuoteBtn = document.getElementById('calc-apply-quote-btn');
    const whatsappEstimateBtn = document.getElementById('calc-whatsapp-btn');

    // Base rates per Sq.Ft (INR)
    const TYPE_BASE_RATES = {
        'villa': 2700,
        'home': 2300,
        'commercial': 2900,
        'turnkey': 3300,
        'industrial': 1900
    };

    const TIER_MULTIPLIERS = {
        'standard': 1.0,
        'luxury': 1.25,
        'ultra': 1.55
    };

    function formatIndianCurrency(amount) {
        if (amount >= 10000000) {
            const crores = amount / 10000000;
            return `₹ ${crores.toFixed(2)} Cr`;
        } else if (amount >= 100000) {
            const lakhs = amount / 100000;
            return `₹ ${lakhs.toFixed(2)} Lakh`;
        }
        return `₹ ${Math.round(amount).toLocaleString('en-IN')}`;
    }

    function calculateEstimate() {
        const type = typeSelect ? typeSelect.value : 'villa';
        const area = parseInt(areaNumber?.value || areaRange?.value || '4000', 10);
        
        let tier = 'luxury';
        gradeRadios.forEach(r => {
            if (r.checked) tier = r.value;
        });

        const floors = parseInt(floorsSelect ? floorsSelect.value : '2', 10);

        const baseRate = TYPE_BASE_RATES[type] || 2700;
        const tierMultiplier = TIER_MULTIPLIERS[tier] || 1.25;
        const floorFactor = 1 + ((floors - 1) * 0.04); // subtle height logistic variance

        const effectiveRatePerSqFt = baseRate * tierMultiplier * floorFactor;
        const totalBaseCost = area * effectiveRatePerSqFt;

        // ±8% range for realistic engineering allowance
        const lowCost = totalBaseCost * 0.94;
        const highCost = totalBaseCost * 1.08;

        // Material estimates based on standard Indian civil engineering factors per 1000 sq.ft
        // Avg ~380-420 bags cement per 1000 sq ft, ~3.5-4.2 tonnes steel per 1000 sq ft, ~32m3 concrete per 1000 sq ft
        const cementFactor = tier === 'ultra' ? 0.44 : (tier === 'luxury' ? 0.40 : 0.36);
        const steelFactor = tier === 'ultra' ? 0.0044 : (tier === 'luxury' ? 0.0039 : 0.0034);
        const concreteFactor = tier === 'ultra' ? 0.038 : (tier === 'luxury' ? 0.034 : 0.030);

        const totalCementBags = Math.round(area * cementFactor);
        const totalSteelTonnes = (area * steelFactor).toFixed(1);
        const totalConcreteM3 = Math.round(area * concreteFactor);

        // Timeline estimation in months: ~8-10 months for 2000 sq.ft, scaling predictably
        let baseMonths = 9;
        if (area <= 2500) baseMonths = 9;
        else if (area <= 5000) baseMonths = 12;
        else if (area <= 10000) baseMonths = 16;
        else if (area <= 20000) baseMonths = 22;
        else baseMonths = 28;

        if (tier === 'ultra') baseMonths += 2;

        // Update DOM
        if (budgetLowEl) budgetLowEl.textContent = formatIndianCurrency(lowCost);
        if (budgetHighEl) budgetHighEl.textContent = formatIndianCurrency(highCost);
        if (timelineEl) timelineEl.textContent = `${baseMonths - 1} - ${baseMonths + 2} Months`;
        if (cementBagsEl) cementBagsEl.textContent = `${totalCementBags.toLocaleString('en-IN')} Bags`;
        if (steelTonnesEl) steelTonnesEl.textContent = `${totalSteelTonnes} Tonnes`;
        if (concreteVolumeEl) concreteVolumeEl.textContent = `${totalConcreteM3.toLocaleString('en-IN')} m³`;

        return {
            type,
            area,
            tier,
            floors,
            budgetRange: `${formatIndianCurrency(lowCost)} – ${formatIndianCurrency(highCost)}`,
            timeline: `${baseMonths - 1} - ${baseMonths + 2} Months`,
            cement: `${totalCementBags} Bags`,
            steel: `${totalSteelTonnes} Tonnes`,
            concrete: `${totalConcreteM3} m³`
        };
    }

    // Sync Area inputs
    areaRange?.addEventListener('input', () => {
        if (areaNumber) areaNumber.value = areaRange.value;
        calculateEstimate();
    });

    areaNumber?.addEventListener('input', () => {
        let val = parseInt(areaNumber.value, 10);
        if (isNaN(val)) val = 1000;
        if (val < 500) val = 500;
        if (val > 50000) val = 50000;
        if (areaRange) areaRange.value = val.toString();
        calculateEstimate();
    });

    typeSelect?.addEventListener('change', calculateEstimate);
    floorsSelect?.addEventListener('change', calculateEstimate);
    gradeRadios.forEach(radio => radio.addEventListener('change', calculateEstimate));

    // Connect "Apply to Enquiry Form"
    applyToQuoteBtn?.addEventListener('click', () => {
        const est = calculateEstimate();
        const projectTypeSelect = document.getElementById('project-type');
        const messageTextarea = document.getElementById('project-message');
        const contactSection = document.getElementById('contact');

        if (projectTypeSelect) {
            if (est.type === 'commercial') {
                projectTypeSelect.value = 'Commercial Office / Hub';
            } else if (est.type === 'industrial') {
                projectTypeSelect.value = 'Industrial / Warehouse';
            } else if (est.type === 'turnkey') {
                projectTypeSelect.value = 'Turnkey Construction';
            } else {
                projectTypeSelect.value = 'Residential Villa / Estate';
            }
        }

        if (messageTextarea) {
            messageTextarea.value = `Estimated Project Parameters:\n- Category: ${est.type.toUpperCase()}\n- Built-up Area: ${est.area.toLocaleString()} Sq.Ft. (${est.floors} Floors)\n- Quality Specification: ${est.tier.toUpperCase()}\n- Estimated Budget: ${est.budgetRange}\n- Target Timeline: ${est.timeline}\n\nPlease schedule a detailed BOQ engineering consultation.`;
        }

        contactSection?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            const nameInput = document.getElementById('client-name');
            nameInput?.focus();
        }, 600);
    });

    // Connect "Share on WhatsApp"
    whatsappEstimateBtn?.addEventListener('click', () => {
        const est = calculateEstimate();
        const msg = `Hello GS Sowmiya Builders, I generated a preliminary project estimate on your website:%0A%0A*Project Category:* ${est.type.toUpperCase()}%0A*Built-up Area:* ${est.area.toLocaleString()} Sq.Ft. (${est.floors} Floors)%0A*Quality Tier:* ${est.tier.toUpperCase()}%0A*Estimated Budget:* ${est.budgetRange}%0A*Timeline:* ${est.timeline}%0A%0AI would like to discuss next steps with your engineering team.`;
        const phone = SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '');
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    });

    // Initial calculation
    calculateEstimate();
}
