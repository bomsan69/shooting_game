# CLAUDE.md - Top-Down Shooter Game Autonomous Rules

This file governs the autonomous execution loop of Claude Code for building the HTML5 Canvas Top-Down Counter-Strike Web Game.

## 1. Project Goal & Scope
* **Target**: Standalone Top-Down Tactical Action Game (`index.html`) using Pure HTML5 Canvas, CSS3, and Vanilla JS ES6+. Zero external dependencies.
* **Architecture**: Strict Object-Oriented/Entity-Component structure implemented within modular script blocks before final single-file bundling, following `FLOW.md`.

## 2. No-Stop Autonomous Execution Loop
* **Bypass Human Confirmation**: Do NOT stop between phases to ask for manual code reviews or confirmations. If the programmatic verification (Section 4) succeeds, proceed automatically to the next phase in `FLOW.md`.
* **Zero Omission Policy**: Never truncate code with placeholders like `// TODO` or `// Rest of code...`. Generate complete, fully functional, executable implementations.

## 3. Performance & Architecture Requirements
* **Game Loop**: Fixed-timestep update loop with delta-time (`dt`) interpolation using `requestAnimationFrame`.
* **Graphics**: Pure Canvas 2D Rendering Context (`ctx`). Smooth rotation using Trigonometry (`Math.atan2`).
* **Physics & Collisions**: Raycasting for Line-of-Sight/Bullet trajectories and AABB/Circle-Sweep for wall collisions.

## 4. Automated Checkpoint Commands
* **Syntax Verification**: `node --check script.js` (or inline html syntax validation)
* **Execution Test Harness**: Execute headless browser validation or zero-console-error checks.