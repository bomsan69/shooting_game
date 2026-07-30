# FLOW.md - Game Engine Build Order & Phase Gates

Sequential milestones for building the 2D Tactical Counter-Strike Engine. Each phase requires passing programmatic gates before proceeding.

## Phase 1: Core Engine Framework & Canvas Setup
* **Objective**: Establish single/multi-file module loader, Canvas rendering context, Game Loop with `requestAnimationFrame`, and Input Handlers (WASD + Mouse Aim + Click).
* **Deliverables**: Canvas setup, input state listener, smooth player movement, and cursor rotation.
* **Gate**: Canvas renders at 60 FPS, and player entity rotates toward mouse coordinates with zero console errors.

## Phase 2: Map Geometry, Collisions & Raycasting Engine
* **Objective**: Construct CS-style tactical map grid (Walls, Obstacles, Cover points) with AABB collision resolution and Raycasting for vision.
* **Deliverables**: Wall entity array, slide collision math for Player, line-of-sight raycaster.
* **Gate**: Player cannot phase through walls/obstacles under any movement speed or angle.

## Phase 3: Weapon Mechanics, Recoil & Ballistics System
* **Objective**: Implement Rifle (AK-47 / M4A1) shooting, magazine capacity, reloading (R key), recoil/bullet spread, and particle impact effects.
* **Deliverables**: Weapon state machine, dynamic recoil angle math, bullet entity update loop, shell eject/muzzle flash animations.
* **Gate**: Magazine depletes correctly, recoil broadens bullet trajectory on continuous fire, and reloading locks shooting for designated duration.

## Phase 4: Enemy AI Bot Patrol, Line-of-Sight & Combat System
* **Objective**: Spawn 5+ AI Bots with state machine (Patrol -> Detect/Alert -> Chase -> Attack/Cover).
* **Deliverables**: Bot entity class, waypoint navigation, raycast vision check to detect player, shooting logic against player.
* **Gate**: Bots patrol routes, spot the player through line-of-sight (blocked by walls), and engage in combat.

## Phase 5: UI HUD, Kill Feed, Radar Minimap & Single-File Bundling
* **Objective**: Build CS-style HUD (HP, Armor, Ammo), top-right Kill Feed with Headshot indicators, top-right Radar/Minimap, and consolidate into final `index.html`.
* **Deliverables**: Complete HUD overlay, Kill Feed logger, Minimap canvas layer, standalone zero-dependency `index.html`.
* **Gate**: Fully functional web game in a single `index.html` file that runs smoothly across browsers with 0 external dependencies.

## Phase 6: Web Server & Docker Deployment
* **Objective**: Serve the completed `index.html` through a minimal web server and package it as a Docker container for deployment. Does not change the game deliverable itself (Section 2 of SPEC.md) — purely a serving/packaging layer around it.
* **Deliverables**: `server.js` (dependency-free Node.js `http`/`fs` server serving `index.html` for any request path, port via `process.env.PORT`, default `8080`); `Dockerfile` (`node:20-alpine` base, copies `index.html` + `server.js`, no install step needed since there are no npm dependencies, exposes `8080`); `docker-compose.yml` (maps host `8080` to container `8080` for a single `docker compose up`).
* **Gate**: `docker build` succeeds; the container starts and responds `HTTP 200` on the exposed port; the game loads through the container in a browser with zero console errors, identical to running `index.html` directly (verified the same way as Phases 1-5).