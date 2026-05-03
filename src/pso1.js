/**
 * PSO1ReticleGenerator
 * Mathematically accurate SVG generator for the PSO-1 Reticle.
 * Scale: 1 mrad = 10 SVG units.
 */
class PSO1ReticleGenerator {
    constructor(options = {}) {
        this.targetHeight = options.targetHeight || 1.7; // Target height in meters
        this.scale = options.scale || 10;                // SVG units per 1 mrad
        this.color = options.color || 'currentColor';    // Uses CSS color by default
    }

    _generateWindage() {
        let path = "M -100,0 H -5 M 5,0 H 100 "; // Main horizontal line (gap in middle)
        
        // Generate ticks every 1 mrad (10 units)
        for (let i = -10; i <= 10; i++) {
            if (i === 0) continue;
            let x = i * this.scale;
            let y1 = -2.5, y2 = 2.5; // Default tick height
            
            if (Math.abs(i) === 5) { y1 = -4; y2 = 4; } // Medium tick
            if (Math.abs(i) === 10) { y1 = -6; y2 = 6; } // Tall tick
            
            path += `M ${x},${y1} V ${y2} `;
        }
        return path;
    }

    _generateStadiametricRangefinder() {
        let path = "";
        const baselineY = 100; // Baseline located 10 mrad below center
        
        // 1. Draw Baseline
        path += `M -140,${baselineY} H -40 `;
        
        // 2. Mathematically generate the curve (y = 1700/D * scale)
        for (let d = 1000; d >= 200; d -= 10) {
            let x = -130 + (1000 - d) * 0.1; // Map 1000m->200m to X-coords -130->-50
            let heightMrad = (this.targetHeight / d) * 1000;
            let y = baselineY - (heightMrad * this.scale);
            
            let command = (d === 1000) ? "M" : "L";
            path += `${command} ${x.toFixed(2)},${y.toFixed(2)} `;
        }

        // 3. Draw upward ticks connecting to numbers
        const ranges = [1000, 800, 600, 400, 200];
        ranges.forEach(d => {
            let x = -130 + (1000 - d) * 0.1;
            let heightMrad = (this.targetHeight / d) * 1000;
            let y = baselineY - (heightMrad * this.scale);
            
            // Tick goes UP (subtract from Y)
            path += `M ${x},${y.toFixed(2)} V ${(y - 3).toFixed(2)} `;
        });

        return path;
    }

    _generateStadiaLabels() {
        let labels = "";
        const baselineY = 100;
        const ranges = [1000, 800, 600, 400, 200];
        
        ranges.forEach(d => {
            let x = -130 + (1000 - d) * 0.1;
            let heightMrad = (this.targetHeight / d) * 1000;
            let y = baselineY - (heightMrad * this.scale);
            let labelText = d / 100; // e.g., 1000 -> 10
            
            // Text positioned above the ticks
            labels += `<text x="${x}" y="${(y - 5).toFixed(2)}">${labelText}</text>\n`;
        });
        
        return labels;
    }

    render() {
        return `
        <svg viewBox="-150 -60 300 200" xmlns="http://www.w3.org/2000/svg" style="color: ${this.color}; width: 100%; height: 100%;">
            <!-- Lines -->
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                
                <!-- Windage -->
                <path d="${this._generateWindage()}" stroke-width="0.6" />
                
                <!-- Center Aiming Chevron (1000m zero) -->
                <path d="M -5,8 L 0,0 L 5,8" stroke-width="1.2" /> 
                
                <!-- Lower BDC Chevrons (Smaller & More Acute) -->
                <!-- 1100m, 1200m, 1300m spaced at 1 mrad (10 units) -->
                <path d="M -3,15 L 0,10 L 3,15" stroke-width="1" /> 
                <path d="M -3,25 L 0,20 L 3,25" stroke-width="1" /> 
                <path d="M -3,35 L 0,30 L 3,35" stroke-width="1" /> 

                <!-- Vertical Plumb Line below last chevron -->
                <path d="M 0,37 V 90" stroke-width="0.6" />
                
                <!-- Stadiametric Rangefinder -->
                <path d="${this._generateStadiametricRangefinder()}" stroke-width="0.8" />
            </g>

            <!-- Typography -->
            <g font-family="Arial, sans-serif" font-weight="bold" font-size="6" fill="currentColor" text-anchor="middle">
                <!-- Windage 10-mil labels -->
                <text x="-100" y="-10">10</text>
                <text x="100" y="-10">10</text>
                
                <!-- Stadiametric Range Labels -->
                ${this._generateStadiaLabels()}
                
                <!-- 1.7m Calibration Label (Right of baseline) -->
                <text x="-35" y="102" text-anchor="start" font-size="7">${this.targetHeight.toString().replace('.', ',')}</text>
            </g>
        </svg>
        `;
    }
}