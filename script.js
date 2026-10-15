
document.addEventListener('DOMContentLoaded', () => {
    const solarForm = document.getElementById('solarForm');
    const resultsBox = document.getElementById('results');
    const waCalcBtn = document.getElementById('waCalcBtn');

    solarForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const bill = parseFloat(document.getElementById('bill').value);
        const area = parseFloat(document.getElementById('area').value);

        let kw = Math.ceil(bill / 1200);
        const maxKwByArea = Math.floor(area / 80);
        kw = Math.max(1, Math.min(kw, maxKwByArea, 10));

        let subsidy = 0;
        if (kw === 1) subsidy = 30000;
        else if (kw === 2) subsidy = 60000;
        else if (kw >= 3) subsidy = 78000;

        const monthlySavings = Math.round(kw * 1150);
        const netCost = (kw * 62000) - subsidy;

        const r = 0.0575 / 12;
        const n = 60;
        const emi = Math.round((netCost * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

        document.getElementById('outKw').innerText = kw + ' kW';
        document.getElementById('outSub').innerText = '₹ ' + subsidy.toLocaleString('en-IN');
        document.getElementById('outSave').innerText = '₹ ' + monthlySavings.toLocaleString('en-IN');
        document.getElementById('outEmi').innerText = '₹ ' + emi.toLocaleString('en-IN');

        const waMsg = encodeURIComponent(
            `Hello Solaray Power Innovations,\n` +
            `I calculated my rooftop solar requirement on your website:\n` +
            `- Monthly Bill: ₹${bill}\n` +
            `- Roof Area: ${area} Sq.Ft.\n` +
            `- Recommended System: ${kw} kW\n` +
            `- Expected Subsidy: ₹${subsidy}\n` +
            `Please contact me for a physical site inspection.`
        );

        waCalcBtn.href = `https://wa.me/919436452537?text=${waMsg}`;
        resultsBox.classList.remove('hidden');
    });
});
