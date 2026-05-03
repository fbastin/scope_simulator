# Advanced Scope Simulator

A high-fidelity, web-based simulator for rifle telescopic sights (scopes). This tool allows shooters, hunters, and enthusiasts to understand reticle mechanics, stadiametric rangefinding, and the effects of focal planes and turret adjustments in a controlled, interactive environment.

![Scope Simulator Preview](https://via.placeholder.com/800x400.png?text=Scope+Simulator+Interactive+Interface)

## 🎯 Key Features

- **Interactive Optics Engine:** Real-time rendering of target and reticle using HTML5 Canvas.
- **Multiple Reticle Styles:** 
    - **Standard MRAD / Mil-Dot:** Classic military and tactical markings.
    - **PSO-1 (SVD):** Authentically modeled Soviet-style reticle with stadiametric rangefinder and BDC chevrons.
    - **Christmas Tree (EBR):** Advanced holdover grid for windage and elevation.
    - **Horus H59 / TReMoR:** High-speed tactical grids.
    - **German #4 & Duplex:** Traditional hunting and sport reticles.
    - **MOA Crosshair:** Fine markings for precision shooting.
- **Ballistics & Telemetry:**
    - **Target Presets:** IPSC, Deer, Boar, and Steel Gongs.
    - **Stadiametric Rangefinding:** Calculate distance based on target height/width in Mils.
    - **Turret Corrections:** Dial in clicks in 0.1 MRAD, 1/4 MOA, or 1/8 MOA.
    - **Impact Visualization:** See how turret adjustments shift the reticle relative to the target.
- **Optical Configurations:**
    - **FFP vs SFP:** Compare First Focal Plane (scaling reticle) vs Second Focal Plane (fixed reticle) behavior.
    - **Variable Magnification:** Zoom from 1x up to 50x (configurable limits).
    - **Illumination:** Adjustable color (Red/Green/Custom), intensity, and coverage (Center/Full).
- **Physical Effects:**
    - **Eye Relief:** Simulate "scope shadow" and vignetting based on eye distance.
    - **Parallax Error:** Visualize how eye positioning (X/Y) shifts the point of aim if not properly aligned.

## ⌨️ Controls & Shortcuts

- **Mouse:** Hover over the scope lens to activate keyboard shortcuts. Use UI sliders for fine adjustments.
- **Arrow Keys:** Adjust Turrets (1 click per press).
    - `Up/Down`: Elevation
    - `Left/Right`: Windage
- **Keypad `+` / `-`:** Adjust Magnification (Zoom).
- **UI Panels:** 
    - **Target & Telemetry:** Set target dimensions and read distance.
    - **Turrets:** Change click values and view impact displacement.
    - **Optics:** Switch reticles, focal planes, and zoom ranges.
    - **Illumination & Eye:** Configure visual effects and parallax.

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (ES6+).
- **Graphics:** HTML5 Canvas API for high-performance reticle and target rendering.
- **Math:** Rigorous trigonometric calculations for MRAD/MOA conversions and stadiametric rangefinding.
- **Documentation:** LaTeX (`doc/pso-1.tex`) used for documenting the mathematical specifications of complex reticles.

## 📚 Mathematical Foundation

The simulator is built on accurate ballistics and optics math. For instance, the **PSO-1** reticle curve is modeled using the formula:
$$\alpha_{mrad} = \frac{H}{D} \times 1000$$
Where $H$ is the target height (default 1.7m) and $D$ is the distance in meters. For more details on the PSO-1 implementation, refer to the [Technical Documentation](doc/pso-1.tex).

## 🚀 Getting Started

Since this is a client-side application, no installation or server-side environment is required.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/scope-simulator.git
   ```
2. Open `index.html` in any modern web browser.

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---
*Created by Fabian Bastin (2026)*
