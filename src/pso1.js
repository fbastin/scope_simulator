/**
 * PSO1ReticleGenerator
 * Mathematically accurate SVG & Canvas generator for the PSO-1 Reticle.
 * Scale: 1 mrad = 'scale' units (default 10).
 */
class PSO1ReticleGenerator {
    constructor(options = {}) {
        this.targetHeight = options.targetHeight || 1.7; // Target height in meters
        this.scale = options.scale || 10;                // Units per 1 mrad
        this.color = options.color || 'currentColor';    // Uses CSS color by default
    }

    _generateWindage() {
        const s = this.scale;
        let path = `M ${-10 * s},0 H ${-0.5 * s} M ${0.5 * s},0 H ${10 * s} `; 
        
        // Generate ticks every 1 mrad
        for (let i = -10; i <= 10; i++) {
            if (i === 0) continue;
            let x = i * s;
            let y1 = -0.25 * s, y2 = 0.25 * s; // Default tick height (0.5 mrad total)
            
            if (Math.abs(i) === 5) { y1 = -0.4 * s; y2 = 0.4 * s; } // Medium tick
            if (Math.abs(i) === 10) { y1 = -0.6 * s; y2 = 0.6 * s; } // Tall tick
            
            path += `M ${x},${y1} V ${y2} `;
        }
        return path;
    }

    _generateStadiametricRangefinder() {
        const s = this.scale;
        let path = "";
        const baselineY = 10 * s; // Baseline located 10 mrad below center
        
        // 1. Draw Baseline
        path += `M ${-14 * s},${baselineY} H ${-4 * s} `;
        
        // 2. Mathematically generate the curve (y = 1700/D * scale)
        for (let d = 1000; d >= 200; d -= 10) {
            let x = (-13 * s) + (1000 - d) * 0.01 * s; // Map 1000m->200m to X-coords
            let heightMrad = (this.targetHeight / d) * 1000;
            let y = baselineY - (heightMrad * s);
            
            let command = (d === 1000) ? "M" : "L";
            path += `${command} ${x.toFixed(2)},${y.toFixed(2)} `;
        }

        // 3. Draw upward ticks connecting to numbers
        const ranges = [1000, 800, 600, 400, 200];
        ranges.forEach(d => {
            let x = (-13 * s) + (1000 - d) * 0.01 * s;
            let heightMrad = (this.targetHeight / d) * 1000;
            let y = baselineY - (heightMrad * s);
            
            path += `M ${x},${y.toFixed(2)} V ${(y - 0.3 * s).toFixed(2)} `;
        });

        return path;
    }

    render() {
        const s = this.scale;
        const viewBox = `${-15 * s} ${-6 * s} ${30 * s} ${20 * s}`;
        
        return `
        <svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" style="color: ${this.color}; width: 100%; height: 100%;">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <path d="${this._generateWindage()}" stroke-width="${0.06 * s}" />
                <path d="M ${-0.5 * s},${0.8 * s} L 0,0 L ${0.5 * s},${0.8 * s}" stroke-width="${0.12 * s}" /> 
                <path d="M ${-0.3 * s},${1.5 * s} L 0,${1.0 * s} L ${0.3 * s},${1.5 * s}" stroke-width="${0.1 * s}" /> 
                <path d="M ${-0.3 * s},${2.5 * s} L 0,${2.0 * s} L ${0.3 * s},${2.5 * s}" stroke-width="${0.1 * s}" /> 
                <path d="M ${-0.3 * s},${3.5 * s} L 0,${3.0 * s} L ${0.3 * s},${3.5 * s}" stroke-width="${0.1 * s}" /> 
                <path d="M 0,${3.7 * s} V ${9 * s}" stroke-width="${0.06 * s}" />
                <path d="${this._generateStadiametricRangefinder()}" stroke-width="${0.08 * s}" />
            </g>
            <g font-family="Arial, sans-serif" font-weight="bold" font-size="${0.6 * s}" fill="currentColor" text-anchor="middle">
                <text x="${-10 * s}" y="${-s}">10</text>
                <text x="${10 * s}" y="${-s}">10</text>
                ${this._generateStadiaLabelsSVG()}
                <text x="${-3.5 * s}" y="${10.2 * s}" text-anchor="start" font-size="${0.7 * s}">${this.targetHeight.toString().replace('.', ',')}</text>
            </g>
        </svg>
        `;
    }

    _generateStadiaLabelsSVG() {
        const s = this.scale;
        const baselineY = 10 * s;
        const ranges = [1000, 800, 600, 400, 200];
        let labels = "";
        ranges.forEach(d => {
            let x = (-13 * s) + (1000 - d) * 0.01 * s;
            let heightMrad = (this.targetHeight / d) * 1000;
            let y = baselineY - (heightMrad * s);
            labels += `<text x="${x}" y="${(y - 0.5 * s).toFixed(2)}">${d / 100}</text>\n`;
        });
        return labels;
    }

    /**
     * Draws the reticle to a Canvas context.
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} cx Center X
     * @param {number} cy Center Y
     * @param {Object} options Rendering options (mil, lwFine, applyIllumination)
     */
    drawToCanvas(ctx, cx, cy, options = {}) {
        const mil = options.mil || this.scale;
        const lwFine = options.lwFine || (mil * 0.06);
        const applyIllumination = options.applyIllumination || (() => {});
        const s = mil;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        // 1. Windage (Not illuminated)
        applyIllumination(false);
        ctx.lineWidth = lwFine;
        ctx.stroke(new Path2D(this._generateWindageInternal(s)));

        // Windage Labels
        ctx.font = `bold ${Math.max(12, s * 0.8)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText("10", -10 * s, -s);
        ctx.fillText("10", 10 * s, -s);

        // 2. Center & BDC Chevrons (Illuminated)
        applyIllumination(true);
        
        // Main Chevron
        ctx.lineWidth = lwFine * 2;
        ctx.beginPath();
        ctx.moveTo(-0.5 * s, 0.8 * s); ctx.lineTo(0, 0); ctx.lineTo(0.5 * s, 0.8 * s);
        ctx.stroke();

        // BDC Chevrons
        ctx.lineWidth = lwFine * 1.5;
        const drawChev = (y) => {
            ctx.beginPath();
            ctx.moveTo(-0.3 * s, y + 0.5 * s); ctx.lineTo(0, y); ctx.lineTo(0.3 * s, y + 0.5 * s);
            ctx.stroke();
        };
        drawChev(1.0 * s);
        drawChev(2.0 * s);
        drawChev(3.0 * s);

        // 3. Plumb line & Rangefinder (Illuminated or not depending on preference, PSO-1 usually illuminates all)
        ctx.lineWidth = lwFine;
        ctx.beginPath();
        ctx.moveTo(0, 3.7 * s); ctx.lineTo(0, 9 * s);
        ctx.stroke();

        ctx.stroke(new Path2D(this._generateStadiametricRangefinderInternal(s)));

        // Rangefinder Labels
        ctx.font = `bold ${Math.max(10, s * 0.7)}px sans-serif`;
        ctx.textBaseline = "bottom";
        const ranges = [1000, 800, 600, 400, 200];
        const baselineY = 10 * s;
        ranges.forEach(d => {
            let x = (-13 * s) + (1000 - d) * 0.01 * s;
            let heightMrad = (this.targetHeight / d) * 1000;
            let y = baselineY - (heightMrad * s);
            ctx.fillText((d / 100).toString(), x, y - 0.2 * s);
        });

        // 1,7 Label
        ctx.font = `${Math.max(10, s * 0.6)}px sans-serif`;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(this.targetHeight.toString().replace('.', ','), -3.5 * s, 10 * s);

        ctx.restore();
    }

    // Internal methods that take 's' as parameter for consistency
    _generateWindageInternal(s) {
        let path = `M ${-10 * s},0 H ${-0.5 * s} M ${0.5 * s},0 H ${10 * s} `; 
        for (let i = -10; i <= 10; i++) {
            if (i === 0) continue;
            let x = i * s;
            let y1 = -0.25 * s, y2 = 0.25 * s;
            if (Math.abs(i) === 5) { y1 = -0.4 * s; y2 = 0.4 * s; }
            if (Math.abs(i) === 10) { y1 = -0.6 * s; y2 = 0.6 * s; }
            path += `M ${x},${y1} V ${y2} `;
        }
        return path;
    }

    _generateStadiametricRangefinderInternal(s) {
        let path = "";
        const baselineY = 10 * s;
        path += `M ${-14 * s},${baselineY} H ${-4 * s} `;
        for (let d = 1000; d >= 200; d -= 10) {
            let x = (-13 * s) + (1000 - d) * 0.01 * s;
            let heightMrad = (this.targetHeight / d) * 1000;
            let y = baselineY - (heightMrad * s);
            let command = (d === 1000) ? "M" : "L";
            path += `${command} ${x.toFixed(2)},${y.toFixed(2)} `;
        }
        const ranges = [1000, 800, 600, 400, 200];
        ranges.forEach(d => {
            let x = (-13 * s) + (1000 - d) * 0.01 * s;
            let heightMrad = (this.targetHeight / d) * 1000;
            let y = baselineY - (heightMrad * s);
            path += `M ${x},${y.toFixed(2)} V ${(y - 0.3 * s).toFixed(2)} `;
        });
        return path;
    }
}
