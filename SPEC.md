# SPEC.md - Tactical Counter-Strike Web Game Specifications

## 1. Product Overview
A standalone 2D Top-Down Tactical Web Game inspired by Counter-Strike, built completely from scratch using pure HTML5 Canvas, CSS3, and Vanilla JavaScript. No external libraries, asset packages, or frameworks allowed.

## 2. Core Technical Architecture
* **Single File Output**: Final executable deliverable must be `index.html` containing all HTML, CSS, and JS logic.
* **Performance Benchmark**: Target stable 60 FPS with minimal GC pressure via Object Pooling for Bullets and Impact Particles.

## 3. Mechanics & Entity Specifications

### A. Player & Controls
* **Movement**: WASD keys (8-directional movement with smooth acceleration/friction).
* **Aiming**: Player sprite rotates dynamically toward mouse cursor.
* **Combat**: Left Click = Primary Fire; Key 'R' = Reload magazine.

### B. Map & Tactical Environment
* **Design**: Counter-Strike tactical style layout with distinct Chokepoints, Bombsite A/B styled zones, Wooden/Concrete Cover Blocks, and Wall Barriers.
* **Physics**: Solid AABB collision for walls. Bullets destroy or stop upon hitting obstacle bounds.

### C. Weapons & Ballistics
* **Primary Rifle (AK-47 / M4A1)**:
    * Magazine: 30 rounds / Reserve: 90 rounds.
    * Fire Rate: Automatic (approx. 600 RPM).
    * Recoil Mechanics: Bullet spread angle increases continuously while holding Left Click and recovers when firing stops.
    * Reloading: 2.5 second reload timer with UI visual progress indicator.

### D. Enemy AI Bots
* **Count**: Minimum 5 active enemy bots.
* **AI State Machine**:
    * `PATROL`: Move between pre-defined map waypoints.
    * `ALERT`: Rotate toward suspicious sounds/bullets.
    * `CHASE & ATTACK`: If Raycast to Player is uninterrupted by walls, switch to attack mode, take cover, and fire bursts.
* **Damage Logic**: Headshots (calculated by hitting the top center collision circle of entities) deliver 3x damage.

## 4. UI & HUD Overlay Requirements

### Top-Right Kill Feed
* Display real-time combat logs fading out over 5 seconds.
* Format: `[Attacker] ︻╦╤─ [Victim]` with special red icon for Headshots (e.g., `Player 🎯 Bot1`).

### Top-Right Radar / Minimap
* Circular/Square minimap showing map bounds, obstacles (dark gray), player position (green dot + vision cone), and revealed enemies (red dots).

### Bottom Tactical HUD
* Clean CS-style UI displaying:
    * **HP**: Health bar & numerical value (0-100).
    * **Armor**: Kevlar status bar (0-100).
    * **Ammo**: Current Magazine / Reserve (e.g., `30 | 90`).
    * Reloading animation / progress bar.

## 5. Difficulty Levels & Player Loadout System

### A. Level Select (Start Screen)
* On page load, an HTML overlay (outside the canvas) shows the game title and 5 clickable level buttons (`LEVEL 1` – `LEVEL 5`), each with a short name/description. The game/render loop does not start until a level is chosen.
* The level is fixed for the duration of that playthrough — there is no mid-game hotkey to change it. To play a different level, the player must return to the start screen (shown again after clicking a "Return to Menu" action on death/respawn overlay, or via page reload).
* Enemy bot **weapons stay the same** across all levels; only the **player's weapon** changes per level. Difficulty is otherwise driven by bot combat stats and bot count (see table below).

### B. Per-Level Configuration

| Level | Name      | Bot Count | Player Weapon             | Bot Detect Range | Bot FOV (half, rad) | Bot Burst Damage | Bot Accuracy (spread) | Bot Fire Cadence | Bot Chase Speed | Bot Armor |
|-------|-----------|-----------|----------------------------|------------------|----------------------|------------------|------------------------|------------------|-----------------|-----------|
| 1     | Recruit   | 3         | **Pistol**                 | 450px            | 0.80                 | 10               | Low (wide spread)      | Slow             | 130 px/s        | 0         |
| 2     | Easy      | 4         | **SMG**                    | 520px            | 0.95                 | 12               | Low-Med                | Medium-slow      | 145 px/s        | 0         |
| 3     | Normal    | 5         | **Rifle** (AK-47/M4A1, baseline) | 650px      | 1.15                 | 16               | Medium                 | Medium           | 160 px/s        | 0         |
| 4     | Hard      | 6         | **Marksman Rifle**         | 720px            | 1.30                 | 20               | High                   | Fast             | 185 px/s        | 25        |
| 5     | Hell      | 8         | **LMG** (Heavy)             | 800px            | 1.45                 | 24               | Very High (tight)      | Very fast        | 205 px/s        | 50        |

* Bot detection range/FOV/accuracy/damage/chase speed/armor scale up smoothly from Level 1 → 5. Bot reaction generosity (how long a bot keeps chasing after losing line-of-sight before giving up) also increases with level (Level 1 gives up soonest, Level 5 is most persistent).
* Bot count scales from 3 (Level 1) up to 8 (Level 5), always ≥ the original minimum of 5 starting at Level 3 (Normal), so "Normal" preserves the baseline spec requirement.

### C. Player Weapon Table (one weapon active per playthrough, chosen by level)

| Weapon           | Levels | Magazine / Reserve | Fire Mode        | Damage/Hit | Reload Time | Character                                   |
|------------------|--------|---------------------|------------------|------------|-------------|----------------------------------------------|
| Pistol           | 1      | 12 / 72             | Semi-auto, slow  | 34         | 1.6s        | Very accurate, forgiving, low DPS             |
| SMG              | 2      | 25 / 125            | Full-auto, fast  | 16         | 2.0s        | High fire rate, low damage, more spread       |
| Rifle (baseline) | 3      | 30 / 90             | Full-auto, ~600RPM | 26       | 2.5s        | Current AK-47/M4A1 stats (unchanged)          |
| Marksman Rifle   | 4      | 20 / 80              | Full-auto, slower | 45        | 3.0s        | Hard-hitting, low spread, punishes spraying   |
| LMG (Heavy)      | 5      | 50 / 150             | Full-auto, fastest| 22        | 4.0s        | Huge ammo pool, high spread, hard to control  |

* Each weapon has its own spread/recoil tuning (min spread, max spread, spread-per-shot, recovery rate) analogous to the existing Rifle recoil model — reused unchanged from Section 3C, just re-parameterized per weapon.
* The HUD ammo/reload readout and kill feed already work generically off whatever weapon is equipped; no HUD changes are needed beyond showing the correct mag/reserve numbers.

## 6. Ammo Depletion Feedback & Ammo Pickups

### A. Out-of-Ammo HUD Feedback
* **Magazine empty, reserve available** (`ammo == 0 && reserve > 0`): show a small pulsing prompt near the ammo counter, e.g. `RELOAD (R)`, in amber/yellow. Firing still does nothing (unchanged), but the player now sees why.
* **Fully out of ammo** (`ammo == 0 && reserve == 0`): show a more prominent warning, e.g. `OUT OF AMMO`, in red, flashing, positioned near the ammo counter (bottom-right HUD, above the mag/reserve numbers). Persists until the player either collects an ammo pickup (Section 6B) or dies/respawns.
* Purely visual — no change to the existing fire/reload gating logic (`ammo > 0` to fire, `reserve > 0` to reload).

### B. Ammo Pickup Crates
* **Placement**: 5 fixed pickup points spread across the map, one per major area, positioned clear of all wall/cover colliders:
    * Mid-north approach (~950, 610)
    * Mid-south approach (~1300, 790)
    * Spawn corridor, south (~900, 1150)
    * Southwest area (~550, 950)
    * Northeast area (~1850, 700)
* **Visual**: small ammo-box icon distinct from wood/concrete cover crates (e.g., olive/green crate with a bullet icon), rendered in world space; hidden while on cooldown.
* **Collection**: walking the player's collision circle into the pickup's radius (~14px) collects it instantly — no keypress needed.
* **Effect**: fully restores the player's **reserve** ammo to the current weapon's `reserveMax` (Section 5C). Does not directly refill the magazine — the player still reloads (`R`) as normal afterward. No effect (crate stays, or simply doesn't consume) if reserve is already at max.
* **Respawn**: after collection, the crate disappears and reappears at the same point after a fixed cooldown (e.g., 20 seconds), consistent with the game's continuous/round-less respawn design for bots and the player. No collection limit.