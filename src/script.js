const translations = {
    fr: {
        appTitle: "Simulateur de Lunette",
        panel1Title: "1. Cible et Télémétrie",
        lblPreset: "Cible Prédéfinie :", 
        optIpsc: "Cible IPSC (0.45m x 0.57m)", optDeer: "Chevreuil (0.6m x 0.7m)",
        optBoar: "Sanglier (0.9m x 0.5m)", optGong: "Gong (0.5m x 0.5m)",
        optCustomTarget: "Personnalisée...",
        lblUnit: "Unité :", optMeters: "Mètres (Dist. en M)", optInches: "Pouces (Dist. en Yd)",
        lblWidth: "Largeur :", lblHeight: "Hauteur :",
        lblMeasuredDim: "Dimension mesurée (Mrad/Mil) :", optMeasureHeight: "Hauteur", optMeasureWidth: "Largeur",
        panel2Title: "2. Tourelles et Corrections", lblClickValue: "Valeur d'un Clic :",
        optCustomTurret: "Personnalisé...",
        lblElev: "Élévation (Haut = +) :", lblWind: "Dérive (Droite = +) :",
        panel3Title: "3. Optique & Grossissement", lblFocalPlane: "Type de Plan Focal :",
        optFfp: "Premier Plan Focal (FFP)", optSfp: "Second Plan Focal (SFP)",
        lblMagMin: "Zoom Min :", lblMagMax: "Zoom Max :",
        lblReticleStyle: "Style de Réticule :", optMrad: "MRAD Standard", optMildot: "Mil-Dot Classique",
        optTree: "Sapin de Noël (EBR)", optGerman4: "German #4 (Chasse)", optPso: "PSO-1 (SVD)",
        optDuplex: "Duplex (Leupold)", optHorus: "Horus H59 (TReMoR)", optMoaCross: "MOA Crosshair",
        lblCurrentMag: "Grossissement :", 
        panel4Title: "4. Œil & Illumination",
        lblIllum: "Illumination activée", lblColor: "Couleur", optColorRed: "Rouge", optColorGreen: "Vert", optColorCustom: "Personnalisé...", 
        lblType: "Zone", optIllumPart: "Partiel (Centre)", optIllumFull: "Totalité",
        lblIntensity: "Intensité", lblEyeDist: "Dégagement oculaire (Distance Z) :",
        lblParallaxX: "Parallaxe X (Gauche/Droite) :", lblParallaxY: "Parallaxe Y (Haut/Bas) :",
        resDistPrefix: "Distance : ", resDistMeters: "Mètres",
        resDistYards: "Yards", resImpPrefix: "Impact : ", dirUp: "HAUT", dirDown: "BAS", dirRight: "DROITE", dirLeft: "GAUCHE",
        unitCm: "cm", unitIn: "po", lblKeyboardHint: "Survolez la lunette pour utiliser le clavier (Flèches = Clics, +/- = Zoom)"
    },
    en: {
        appTitle: "Scope Simulator",
        panel1Title: "1. Target & Telemetry",
        lblPreset: "Target Preset:", 
        optIpsc: "IPSC Target (0.45m x 0.57m)", optDeer: "Roe Deer (0.6m x 0.7m)",
        optBoar: "Wild Boar (0.9m x 0.5m)", optGong: "Steel Gong (0.5m x 0.5m)",
        optCustomTarget: "Custom...",
        lblUnit: "Unit:", optMeters: "Meters (Dist in M)", optInches: "Inches (Dist in Yd)",
        lblWidth: "Width:", lblHeight: "Height:",
        lblMeasuredDim: "Measured Dimension (Mrad):", optMeasureHeight: "Height", optMeasureWidth: "Width",
        panel2Title: "2. Turrets & Corrections", lblClickValue: "Click Value:",
        optCustomTurret: "Custom...",
        lblElev: "Elevation (Up = +):", lblWind: "Windage (Right = +):",
        panel3Title: "3. Optics & Magnification", lblFocalPlane: "Focal Plane Type:",
        optFfp: "First Focal Plane (FFP)", optSfp: "Second Focal Plane (SFP)",
        lblMagMin: "Min Zoom:", lblMagMax: "Max Zoom:",
        lblReticleStyle: "Reticle Style:", optMrad: "Standard MRAD", optMildot: "Classic Mil-Dot",
        optTree: "Christmas Tree (EBR)", optGerman4: "German #4 (Hunting)", optPso: "PSO-1 (SVD)",
        optDuplex: "Duplex (Leupold)", optHorus: "Horus H59 (TReMoR)", optMoaCross: "MOA Crosshair",
        lblCurrentMag: "Magnification:", 
        panel4Title: "4. Eye & Illumination",
        lblIllum: "Illumination active", lblColor: "Color", optColorRed: "Red", optColorGreen: "Green", optColorCustom: "Custom...", 
        lblType: "Zone", optIllumPart: "Partial (Center)", optIllumFull: "Full",
        lblIntensity: "Intensity", lblEyeDist: "Eye Relief (Distance Z):",
        lblParallaxX: "Parallax X (Left/Right):", lblParallaxY: "Parallax Y (Up/Down):",
        resDistPrefix: "Distance: ", resDistMeters: "Meters",
        resDistYards: "Yards", resImpPrefix: "Impact: ", dirUp: "UP", dirDown: "DOWN", dirRight: "RIGHT", dirLeft: "LEFT",
        unitCm: "cm", unitIn: "in", lblKeyboardHint: "Hover over scope for keyboard controls (Arrows = Clicks, +/- = Zoom)"
    }
};

let currentLang = 'fr';

const targetPresets = {
    ipsc: { wm: 0.45, hm: 0.57, win: 17.7, hin: 22.4 },
    deer: { wm: 0.6, hm: 0.7, win: 23.6, hin: 27.6 },
    boar: { wm: 0.9, hm: 0.5, win: 35.4, hin: 19.7 },
    gong: { wm: 0.5, hm: 0.5, win: 19.7, hin: 19.7 }
};

function applyPreset() {
    const preset = document.getElementById('presetTarget').value;
    const isInches = document.getElementById('sizeUnit').value === 'inches';
    if (preset !== 'custom' && targetPresets[preset]) {
        const p = targetPresets[preset];
        document.getElementById('targetWidth').value = isInches ? p.win : p.wm;
        document.getElementById('targetHeight').value = isInches ? p.hin : p.hm;
    }
    updateApp();
}

function setCustomPreset() {
    document.getElementById('presetTarget').value = 'custom';
}

let previousUnit = 'meters';

function onUnitChange() {
    const newUnit = document.getElementById('sizeUnit').value;
    const wInput = document.getElementById('targetWidth');
    const hInput = document.getElementById('targetHeight');
    const preset = document.getElementById('presetTarget').value;

    if (preset !== 'custom' && targetPresets[preset]) {
        const p = targetPresets[preset];
        wInput.value = (newUnit === 'inches') ? p.win : p.wm;
        hInput.value = (newUnit === 'inches') ? p.hin : p.hm;
    } else {
        const w = parseFloat(wInput.value) || 0;
        const h = parseFloat(hInput.value) || 0;
        if (newUnit === 'inches' && previousUnit === 'meters') {
            wInput.value = (w / 0.0254).toFixed(1);
            hInput.value = (h / 0.0254).toFixed(1);
        } else if (newUnit === 'meters' && previousUnit === 'inches') {
            wInput.value = (w * 0.0254).toFixed(3);
            hInput.value = (h * 0.0254).toFixed(3);
        }
    }

    wInput.step = (newUnit === 'inches') ? '0.1' : '0.01';
    hInput.step = (newUnit === 'inches') ? '0.1' : '0.01';

    updatePresetLabels();
    previousUnit = newUnit;
    updateApp();
}

function updatePresetLabels() {
    const isInches = document.getElementById('sizeUnit').value === 'inches';
    const t = translations[currentLang];
    const sel = document.getElementById('presetTarget');

    const fmtIn = (v) => {
        if (v >= 12) {
            const ft = Math.floor(v / 12);
            const rem = Math.round(v - ft * 12);
            return rem > 0 ? ft + "'" + rem + '"' : ft + "'";
        }
        return v + '"';
    };

    const labels = {
        ipsc: isInches
            ? (currentLang === 'fr' ? 'Cible IPSC' : 'IPSC Target') + ' (' + fmtIn(17.7) + ' x ' + fmtIn(22.4) + ')'
            : t.optIpsc,
        deer: isInches
            ? (currentLang === 'fr' ? 'Chevreuil' : 'Roe Deer') + ' (' + fmtIn(23.6) + ' x ' + fmtIn(27.6) + ')'
            : t.optDeer,
        boar: isInches
            ? (currentLang === 'fr' ? 'Sanglier' : 'Wild Boar') + ' (' + fmtIn(35.4) + ' x ' + fmtIn(19.7) + ')'
            : t.optBoar,
        gong: isInches
            ? (currentLang === 'fr' ? 'Gong' : 'Steel Gong') + ' (' + fmtIn(19.7) + ' x ' + fmtIn(19.7) + ')'
            : t.optGong
    };

    for (let i = 0; i < sel.options.length; i++) {
        const opt = sel.options[i];
        if (labels[opt.value]) opt.text = labels[opt.value];
    }
}

let savedMag = { min: '4', max: '16', current: '16', plane: 'ffp' };

function onReticleChange() {
    const style = document.getElementById('reticleStyle').value;
    const minEl = document.getElementById('magMin');
    const maxEl = document.getElementById('magMax');
    const sliderEl = document.getElementById('currentMag');
    const displayEl = document.getElementById('magDisplay');
    const planeEl = document.getElementById('focalPlane');

    if (style === 'pso') {
        savedMag.min = minEl.value;
        savedMag.max = maxEl.value;
        savedMag.current = sliderEl.value;
        savedMag.plane = planeEl.value;

        minEl.value = 4; minEl.disabled = true;
        maxEl.value = 4; maxEl.disabled = true;
        sliderEl.min = 4; sliderEl.max = 4; sliderEl.value = 4; sliderEl.disabled = true;
        displayEl.innerText = '4';
        planeEl.value = 'ffp'; planeEl.disabled = true;
    } else {
        minEl.disabled = false;
        maxEl.disabled = false;
        sliderEl.disabled = false;
        planeEl.disabled = false;

        if (minEl.value === '4' && maxEl.value === '4') {
            minEl.value = savedMag.min;
            maxEl.value = savedMag.max;
            sliderEl.min = savedMag.min;
            sliderEl.max = savedMag.max;
            sliderEl.value = savedMag.current;
            displayEl.innerText = savedMag.current;
            planeEl.value = savedMag.plane;
        }
    }
    updateApp();
}

function toggleCustomTurret() {
    const val = document.getElementById('turretValue').value;
    document.getElementById('customTurretWrapper').style.display = (val === 'custom') ? 'flex' : 'none';
}

function toggleCustomColor() {
    const val = document.getElementById('illumColorSelect').value;
    document.getElementById('illumColorCustom').style.display = (val === 'custom') ? 'block' : 'none';
}

function changeLanguage() {
    currentLang = document.getElementById('langSelect').value;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            if (el.tagName === 'OPTION') el.text = translations[currentLang][key];
            else el.innerText = translations[currentLang][key];
        }
    });
    updatePresetLabels();
    updateApp();
}

function updateMagLimits() {
    const minInput = document.getElementById('magMin');
    const maxInput = document.getElementById('magMax');
    const slider = document.getElementById('currentMag');
    
    let min = parseFloat(minInput.value);
    let max = parseFloat(maxInput.value);
    if (min >= max) { min = max - 1; minInput.value = min; }
    
    slider.min = min;
    slider.max = max;
    
    if (parseFloat(slider.value) > max) slider.value = max;
    if (parseFloat(slider.value) < min) slider.value = min;
    
    updateApp();
}

// --- Keyboard Inputs ---
let isMouseOverScope = false;
const scopeContainerEl = document.getElementById('scopeContainer');
scopeContainerEl.addEventListener('mouseenter', () => { isMouseOverScope = true; scopeContainerEl.classList.add('keyboard-active'); });
scopeContainerEl.addEventListener('mouseleave', () => { isMouseOverScope = false; scopeContainerEl.classList.remove('keyboard-active'); });

document.addEventListener('keydown', (e) => {
    if (!isMouseOverScope) return;
    const elevInput = document.getElementById('elevClicks');
    const windInput = document.getElementById('windClicks');
    const magInput = document.getElementById('currentMag');
    let handled = false;

    if (e.key === 'ArrowUp') { elevInput.value = parseInt(elevInput.value || 0) + 1; handled = true; }
    else if (e.key === 'ArrowDown') { elevInput.value = parseInt(elevInput.value || 0) - 1; handled = true; }
    else if (e.key === 'ArrowRight') { windInput.value = parseInt(windInput.value || 0) + 1; handled = true; }
    else if (e.key === 'ArrowLeft') { windInput.value = parseInt(windInput.value || 0) - 1; handled = true; }
    else if (e.key === '+' || e.key === '=') { magInput.value = Math.min(parseFloat(magInput.max), parseFloat(magInput.value) + parseFloat(magInput.step)); handled = true; }
    else if (e.key === '-') { magInput.value = Math.max(parseFloat(magInput.min), parseFloat(magInput.value) - parseFloat(magInput.step)); handled = true; }

    if (handled) { e.preventDefault(); updateApp(); }
});

const canvas = document.getElementById('scopeCanvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const basePixelsPerMil = 65; 

function applyIlluminationStyle(isCenterElement) {
    const isIllum = document.getElementById('illumActive').checked;
    let color = document.getElementById('illumColorSelect').value;
    if (color === 'custom') color = document.getElementById('illumColorCustom').value;
    
    const intensity = parseFloat(document.getElementById('illumIntensity').value);
    const type = document.getElementById('illumType').value;
    
    if (isIllum && (type === 'full' || (type === 'partial' && isCenterElement))) {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 15 * intensity;
        ctx.globalAlpha = 0.6 + (intensity * 0.4);
    } else {
        ctx.strokeStyle = '#000';
        ctx.fillStyle = '#000';
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 0.95;
    }
}

function drawReticle(milsRead, style, elevShiftMils, windShiftMils, focalPlane, currentMag, maxMag, tWidth, tHeight, measuredAxis, eyeDist, eyeX, eyeY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let zoomRatio = currentMag / maxMag;

    // 1. ZOOM AND FOCAL PLANE MANAGEMENT
    // PSO-1 is a fixed 4x scope (~6° FOV ≈ 105 mrad) — override zoom
    // so the full reticle (±14 mil) fits within the visible scope circle
    if (style === 'pso') {
        zoomRatio = 0.25;
    }

    // The reticle scales with zoom if FFP, remains fixed if SFP
    // PSO-1 is inherently FFP (fixed power)
    let reticleScale = (focalPlane === 'ffp' || style === 'pso') ? zoomRatio : 1;
    const currentPixelsPerMil = basePixelsPerMil * reticleScale;
    
    // The target always visually scales when zooming (Target size in px)
    // "milsRead" is considered the true target size read with calibrated optics (FFP, or SFP at max mag)
    let targetTrueMils = milsRead;
    let targetSizePx = targetTrueMils * basePixelsPerMil * zoomRatio;
    
    let targetHPx, targetWPx;
    if (measuredAxis === 'height') {
        targetHPx = targetSizePx;
        targetWPx = targetHPx * (tWidth / tHeight);
    } else {
        targetWPx = targetSizePx;
        targetHPx = targetWPx * (tHeight / tWidth);
    }
    
    // 2. DRAW TARGET
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(211, 84, 0, 0.8)';
    ctx.fillRect(centerX - targetWPx/2, centerY - targetHPx/2, targetWPx, targetHPx);

    // Offset for turret adjustments.
    // A turret click is a TRUE angular correction: it is worth the same angle on
    // the target at every magnification, on SFP just as on FFP. It must therefore
    // be applied at the scale of the target image (basePixelsPerMil * zoomRatio),
    // never at the scale of the reticle graduations — which on SFP no longer
    // measure a mil below the reference magnification. On FFP the two are equal.
    const truePixelsPerMil = basePixelsPerMil * zoomRatio;
    const cx = centerX - (windShiftMils * truePixelsPerMil);
    const cy = centerY + (elevShiftMils * truePixelsPerMil);

    const lwFine = Math.max(1, 1.5 * reticleScale);
    const lwThick = Math.max(2.5, 5 * reticleScale);
    const hashLen = Math.max(4, 7 * reticleScale);

    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // 3. DRAW RETICLE
    if (style === 'pso') {
        const pso = new PSO1ReticleGenerator({
            targetHeight: 1.7 // Standard PSO-1 calibration
        });
        pso.drawToCanvas(ctx, cx, cy, {
            mil: currentPixelsPerMil,
            lwFine: lwFine,
            applyIllumination: applyIlluminationStyle
        });
    }
    else if (style === 'german4') {
        const gap = 3 * currentPixelsPerMil;
        
        applyIlluminationStyle(true);
        ctx.lineWidth = lwFine;
        ctx.beginPath();
        ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - 2000);
        ctx.stroke();
        
        applyIlluminationStyle(false);
        ctx.lineWidth = lwThick;
        ctx.beginPath();
        ctx.moveTo(cx, cy + gap); ctx.lineTo(cx, 2000); 
        ctx.moveTo(cx - gap, cy); ctx.lineTo(-2000, cy); 
        ctx.moveTo(cx + gap, cy); ctx.lineTo(2000, cy); 
        ctx.stroke();
    }
    else if (style === 'duplex') {
        const gap = 2.5 * currentPixelsPerMil;
        const taperLen = 1.5 * currentPixelsPerMil;

        applyIlluminationStyle(true);
        ctx.lineWidth = lwFine;
        ctx.beginPath();
        ctx.moveTo(cx, cy - gap); ctx.lineTo(cx, cy + gap);
        ctx.moveTo(cx - gap, cy); ctx.lineTo(cx + gap, cy);
        ctx.stroke();

        applyIlluminationStyle(false);

        const drawTaperedPost = (x1, y1, x2, y2) => {
            const dx = x2 - x1, dy = y2 - y1;
            const len = Math.sqrt(dx * dx + dy * dy);
            const nx = -dy / len, ny = dx / len;
            const taperFrac = taperLen / len;

            const thickHalf = lwThick * 1.2;
            const thinHalf = lwFine * 0.5;

            ctx.beginPath();
            ctx.moveTo(x1 + nx * thinHalf, y1 + ny * thinHalf);
            ctx.lineTo(x1 + dx * taperFrac + nx * thickHalf, y1 + dy * taperFrac + ny * thickHalf);
            ctx.lineTo(x2 + nx * thickHalf, y2 + ny * thickHalf);
            ctx.lineTo(x2 - nx * thickHalf, y2 - ny * thickHalf);
            ctx.lineTo(x1 + dx * taperFrac - nx * thickHalf, y1 + dy * taperFrac - ny * thickHalf);
            ctx.lineTo(x1 - nx * thinHalf, y1 - ny * thinHalf);
            ctx.closePath();
            ctx.fill();
        };

        drawTaperedPost(cx, cy - gap, cx, -2000);
        drawTaperedPost(cx, cy + gap, cx, 2000);
        drawTaperedPost(cx - gap, cy, -2000, cy);
        drawTaperedPost(cx + gap, cy, 2000, cy);
    }
    else if (style === 'horus') {
        const mil = currentPixelsPerMil;
        const gridRange = 15;
        const dotR = Math.max(1, 0.04 * mil);

        applyIlluminationStyle(false);
        ctx.lineWidth = lwFine;
        ctx.beginPath();
        ctx.moveTo(cx, -2000); ctx.lineTo(cx, 2000);
        ctx.moveTo(-2000, cy); ctx.lineTo(2000, cy);
        ctx.stroke();

        for (let i = -gridRange; i <= gridRange; i++) {
            for (let j = -gridRange; j <= gridRange; j++) {
                if (i === 0 && j === 0) continue;
                const px = cx + i * mil;
                const py = cy + j * mil;
                const isCenterZone = Math.abs(i) <= 3 && Math.abs(j) <= 3;
                applyIlluminationStyle(isCenterZone);

                if (i % 5 === 0 && j % 5 === 0) {
                    const markLen = Math.max(3, 0.15 * mil);
                    ctx.lineWidth = lwFine * 1.5;
                    ctx.beginPath();
                    ctx.moveTo(px - markLen, py); ctx.lineTo(px + markLen, py);
                    ctx.moveTo(px, py - markLen); ctx.lineTo(px, py + markLen);
                    ctx.stroke();
                } else if (i % 1 === 0 && j % 1 === 0) {
                    ctx.beginPath();
                    ctx.arc(px, py, dotR * 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }

                if (j === 0 && i !== 0) {
                    for (let sub = 1; sub <= 4; sub++) {
                        const sx = cx + (i - 1 + sub * 0.2) * mil;
                        ctx.beginPath();
                        ctx.arc(sx, cy, dotR, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
                if (i === 0 && j !== 0) {
                    for (let sub = 1; sub <= 4; sub++) {
                        const sy = cy + (j - 1 + sub * 0.2) * mil;
                        ctx.beginPath();
                        ctx.arc(cx, sy, dotR, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }
        }

        applyIlluminationStyle(true);
        ctx.lineWidth = lwFine;
        ctx.beginPath();
        ctx.moveTo(cx - hashLen, cy); ctx.lineTo(cx + hashLen, cy);
        ctx.moveTo(cx, cy - hashLen); ctx.lineTo(cx, cy + hashLen);
        ctx.stroke();
    }
    else if (style === 'moacross') {
        const moaToMil = 0.29089;
        const pxPerMoa = currentPixelsPerMil * moaToMil;

        applyIlluminationStyle(false);
        ctx.lineWidth = lwFine;
        ctx.beginPath();
        ctx.moveTo(cx, -2000); ctx.lineTo(cx, 2000);
        ctx.moveTo(-2000, cy); ctx.lineTo(2000, cy);
        ctx.stroke();

        const moaHashFull = Math.max(4, 7 * reticleScale);
        const moaHashHalf = moaHashFull * 0.5;

        for (let i = -40; i <= 40; i++) {
            if (i === 0) continue;
            const pos = i * pxPerMoa;
            const isCenterZone = Math.abs(i) <= 10;
            applyIlluminationStyle(isCenterZone);

            if (i % 2 === 0) {
                ctx.lineWidth = lwFine * 1.5;
                ctx.beginPath();
                ctx.moveTo(cx + pos, cy - moaHashFull); ctx.lineTo(cx + pos, cy + moaHashFull);
                ctx.moveTo(cx - moaHashFull, cy + pos); ctx.lineTo(cx + moaHashFull, cy + pos);
                ctx.stroke();
            } else {
                ctx.lineWidth = lwFine;
                ctx.beginPath();
                ctx.moveTo(cx + pos, cy - moaHashHalf); ctx.lineTo(cx + pos, cy + moaHashHalf);
                ctx.moveTo(cx - moaHashHalf, cy + pos); ctx.lineTo(cx + moaHashHalf, cy + pos);
                ctx.stroke();
            }

            if (i % 5 === 0) {
                applyIlluminationStyle(isCenterZone);
                ctx.font = `bold ${Math.max(8, 5 * reticleScale)}px sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";
                ctx.fillText(Math.abs(i).toString(), cx + pos, cy - moaHashFull - 2);
                ctx.textAlign = "right";
                ctx.textBaseline = "middle";
                ctx.fillText(Math.abs(i).toString(), cx - moaHashFull - 2, cy + pos);
            }
        }

        applyIlluminationStyle(true);
        ctx.lineWidth = lwFine;
        ctx.beginPath();
        ctx.moveTo(cx - moaHashFull, cy); ctx.lineTo(cx + moaHashFull, cy);
        ctx.moveTo(cx, cy - moaHashFull); ctx.lineTo(cx, cy + moaHashFull);
        ctx.stroke();
    }
    else {
        applyIlluminationStyle(false);
        ctx.lineWidth = lwFine;
        ctx.beginPath();
        ctx.moveTo(cx, -2000); ctx.lineTo(cx, 2000);
        ctx.moveTo(-2000, cy); ctx.lineTo(2000, cy);
        ctx.stroke();

        for (let i = -20; i <= 20; i++) {
            if (i === 0) continue;
            const pos = i * currentPixelsPerMil;
            const isCenterZone = Math.abs(i) <= 5;

            applyIlluminationStyle(isCenterZone);

            if (style === 'mildot') {
                const r = Math.max(2, 0.1 * currentPixelsPerMil);
                ctx.beginPath();
                ctx.arc(cx + pos, cy, r, 0, Math.PI*2);
                ctx.arc(cx, cy + pos, r, 0, Math.PI*2);
                ctx.fill();
            } 
            else if (style === 'mrad') {
                ctx.lineWidth = lwFine * 1.5;
                ctx.beginPath();
                ctx.moveTo(cx + pos, cy - hashLen); ctx.lineTo(cx + pos, cy + hashLen);
                ctx.moveTo(cx - hashLen, cy + pos); ctx.lineTo(cx + hashLen, cy + pos);
                ctx.stroke();
            }
            else if (style === 'tree' && i > 0) { 
                ctx.lineWidth = lwFine * 1.5;
                ctx.beginPath();
                ctx.moveTo(cx - hashLen, cy + pos); ctx.lineTo(cx + hashLen, cy + pos);
                ctx.stroke();
                for (let d = 1; d <= i; d++) {
                    const r = Math.max(1, 2 * reticleScale);
                    const dPos = d * currentPixelsPerMil;
                    ctx.beginPath();
                    ctx.arc(cx + dPos, cy + pos, r, 0, Math.PI*2);
                    ctx.arc(cx - dPos, cy + pos, r, 0, Math.PI*2);
                    ctx.fill();
                }
            }
            
            if (style === 'tree' && i !== 0) {
                ctx.lineWidth = lwFine * 1.5;
                ctx.beginPath();
                ctx.moveTo(cx + pos, cy - hashLen/2); ctx.lineTo(cx + pos, cy + hashLen/2);
                ctx.stroke();
            }
        }

        if (style === 'mrad') {
            const halfHashLen = hashLen * 0.5;
            for (let i = -19; i <= 19; i++) {
                const pos = (i + 0.5) * currentPixelsPerMil;
                const isCenterZone = Math.abs(i + 0.5) <= 5;
                applyIlluminationStyle(isCenterZone);
                ctx.lineWidth = lwFine;
                ctx.beginPath();
                ctx.moveTo(cx + pos, cy - halfHashLen); ctx.lineTo(cx + pos, cy + halfHashLen);
                ctx.moveTo(cx - halfHashLen, cy + pos); ctx.lineTo(cx + halfHashLen, cy + pos);
                ctx.stroke();
            }
        }

        applyIlluminationStyle(true);
        ctx.lineWidth = lwFine;
        ctx.beginPath();
        ctx.moveTo(cx - hashLen, cy); ctx.lineTo(cx + hashLen, cy);
        ctx.moveTo(cx, cy - hashLen); ctx.lineTo(cx, cy + hashLen);
        ctx.stroke();
    }

    // 4. SHADOW AND VIGNETTING
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    
    let maxRadius = canvas.width * 0.7;
    let vignetteRadius = Math.max(10, maxRadius * eyeDist);
    if (style === 'pso') vignetteRadius = Math.max(vignetteRadius, maxRadius * 0.86);
    
    let vx = centerX + parseFloat(eyeX) * 2; 
    let vy = centerY + parseFloat(eyeY) * 2;

    ctx.arc(vx, vy, vignetteRadius, 0, Math.PI*2, true);
    ctx.fill();
}

function updateApp() {
    const width = parseFloat(document.getElementById('targetWidth').value) || 0.5;
    const height = parseFloat(document.getElementById('targetHeight').value) || 1.7;
    const unit = document.getElementById('sizeUnit').value;
    const measuredAxis = document.getElementById('measuredAxis').value;
    const milsRead = parseFloat(document.getElementById('milsRead').value);
    
    const style = document.getElementById('reticleStyle').value;
    const turretVal = document.getElementById('turretValue').value;
    const elevClicks = parseInt(document.getElementById('elevClicks').value) || 0;
    const windClicks = parseInt(document.getElementById('windClicks').value) || 0;
    const focalPlane = document.getElementById('focalPlane').value;
    const magMax = parseFloat(document.getElementById('magMax').value);
    const currentMag = parseFloat(document.getElementById('currentMag').value);
    const eyeDist = parseFloat(document.getElementById('eyeDist').value);
    const eyeX = document.getElementById('eyeX').value;
    const eyeY = document.getElementById('eyeY').value;

    const t = translations[currentLang];
    document.getElementById('magDisplay').innerText = currentMag;

    if (!milsRead) return;

    const targetDim = (measuredAxis === 'height') ? height : width;
    let dist = (unit === 'meters') ? (targetDim * 1000) / milsRead : (targetDim * 27.778) / milsRead;
    
    let uLabel = (unit === 'meters') ? t.resDistMeters : t.resDistYards;
    document.getElementById('distanceResult').innerText = `${t.resDistPrefix}${dist.toFixed(1)} ${uLabel}`;

    let milPerClick;
    if (turretVal === '0.1mil') milPerClick = 0.1;
    else if (turretVal === '0.25moa') milPerClick = 0.0727; 
    else if (turretVal === '0.125moa') milPerClick = 0.0363; 
    else if (turretVal === 'custom') {
        const customVal = parseFloat(document.getElementById('customTurretInput').value) || 0.1;
        const customUnit = document.getElementById('customTurretUnit').value;
        milPerClick = (customUnit === 'moa') ? (customVal / 3.4377) : customVal;
    }

    let cmPerClick100m = milPerClick * 10.0;
    let inPerClick100y = milPerClick * 3.6;

    let elevDisp, windDisp, dispUnitStr;
    if (unit === 'meters') {
        elevDisp = elevClicks * cmPerClick100m * (dist / 100);
        windDisp = windClicks * cmPerClick100m * (dist / 100);
        dispUnitStr = t.unitCm;
    } else {
        elevDisp = elevClicks * inPerClick100y * (dist / 100);
        windDisp = windClicks * inPerClick100y * (dist / 100);
        dispUnitStr = t.unitIn;
    }

    let elevStr = elevDisp === 0 ? "0" : `${Math.abs(elevDisp).toFixed(2)}${dispUnitStr} ${elevDisp > 0 ? t.dirUp : t.dirDown}`;
    let windStr = windDisp === 0 ? "0" : `${Math.abs(windDisp).toFixed(2)}${dispUnitStr} ${windDisp > 0 ? t.dirRight : t.dirLeft}`;
    document.getElementById('displacementResult').innerText = `${t.resImpPrefix}${elevStr} | ${windStr}`;

    let elevShiftMils = elevClicks * milPerClick;
    let windShiftMils = windClicks * milPerClick;
    
    drawReticle(milsRead, style, elevShiftMils, windShiftMils, focalPlane, currentMag, magMax, width, height, measuredAxis, eyeDist, eyeX, eyeY);
}

(function initFromURL() {
    const params = new URLSearchParams(window.location.search);

    const reticle = params.get('reticle');
    if (reticle) {
        const sel = document.getElementById('reticleStyle');
        const valid = Array.from(sel.options).map(o => o.value);
        if (valid.includes(reticle)) sel.value = reticle;
    }

    const lang = params.get('lang');
    if (lang === 'fr' || lang === 'en') {
        document.getElementById('langSelect').value = lang;
        changeLanguage();
    }

    const focal = params.get('focal');
    if (focal === 'ffp' || focal === 'sfp') {
        document.getElementById('focalPlane').value = focal;
    }

    const mag = parseFloat(params.get('mag'));
    if (mag && mag >= 1 && mag <= 50) {
        document.getElementById('currentMag').value = mag;
        document.getElementById('magDisplay').innerText = mag;
    }

    onReticleChange();
})();