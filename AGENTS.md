# AGENT.md - Cross-Platform Behavioral Guidelines & Game Physics Rules

This file defines the strict system architecture, collision standards, and security/performance checks for cross-platform coding agents (Codex, Gemini, etc.).

## 1. Execution Protocol
* **Autonomous Milestone Transitions**: Granted full permission to transition through phases in `FLOW.md` once automated validation criteria pass.
* **Surgical Precision**: Focus changes strictly on the active phase scope. Do not pollute global namespace.

## 2. Technical Game Engine Principles
* **State Management**: Encapsulate Player, Bot AI, Bullet, Map Wall, Particle, and UI Entities into separate dedicated classes.
* **Raycasting & Visibility**: Line-of-sight checking between Bots and Player must use efficient vector ray-box intersection algorithms.
* **Recoil & Spread**: Implement dynamic spread angles that expand per shot and recover exponentially over time.

## 3. Verification & Memory Optimization
* **Object Pooling**: Pre-allocate and reuse Bullet and Particle objects to avoid Garbage Collection (GC) frame drops during heavy combat.
* **Spatial Partitioning**: Efficiently partition map colliders so bots do not perform $O(N^2)$ distance checks every frame.