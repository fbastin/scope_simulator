# Scope Simulator

A mathematically accurate, interactive web simulation of telescopic sights, currently focusing on the Soviet PSO-1 ($4\times24$) reticle.

This project accurately models the optics and ballistic drop compensation (BDC) of the PSO-1 reticle, specifically calibrated for the $1.7\text{m}$ stadiametric rangefinder and the $7.62\times54\text{mmR}$ (7N1) sniper cartridge. It is designed to be easily extensible to other reticle patterns.

## Features

*   **Pixel-Perfect Mathematical Reticle:** The SVG reticle is generated dynamically using strict mathematical equations, ensuring accurate $1\text{ mrad}$ intervals for both windage and elevation holdovers.
*   **Stadiametric Rangefinder:** Accurately models the target height curve using the formula $\alpha(D) = \frac{1.7}{D} \times 1000$ mrad.
*   **Dynamic Calibration:** Built with JavaScript, allowing easy modification of the target height reference (e.g., changing from the $1.7\text{m}$ military standard to a $1.5\text{m}$ hunting standard).
*   **Night Vision Illumination:** Includes a CSS-driven toggle to simulate the battery-powered red reticle illumination for low-light environments.
*   **Extensible Architecture:** The JavaScript implementation uses a generator class structure, making it straightforward to add new reticle types in the future.

## Getting Started

### Prerequisites
No build tools, frameworks, or dependencies are required. This is a vanilla HTML/JS/CSS project.

### Installation
1.  Clone the repository:
    ```bash
    git clone [https://github.com/fbastin/scope_simulator.git](https://github.com/fbastin/scope_simulator.git)
    ```
2.  Open `index.html` in your preferred web browser.

## File Structure

*   `index.html`: The main user interface, demonstrating the scope viewport and controls.
*   `pso1.js`: The core JavaScript class `PSO1ReticleGenerator`. It mathematically plots the SVG paths and outputs the XML string.
*   `docs/`: Contains the mathematical specifications used to build the simulator.
    *   `pso1_technical_specification.pdf`: A detailed document explaining the math behind the mrad spacing, lead formulas, and the stadiametric curve.

## Usage (JavaScript Implementation)

To use the reticle generator in your own project, instantiate the class and render it into a container:
```javascript
// Include pso1.js in your HTML document

// 1. Generate standard PSO-1 (1.7m target calibration)
const pso1 = new PSO1ReticleGenerator();
document.getElementById('your-container').innerHTML = pso1.render();

// 2. Generate a custom variant (e.g., calibrated for a 1.5m target)
const huntingVariant = new PSO1ReticleGenerator({ targetHeight: 1.5 });
document.getElementById('your-container').innerHTML = huntingVariant.render();
