# Platformer Character Controller - Asset Documentation Guide
*For asset support and updates, refer to the included Third-Party Notices and asset documentation.*

---

- **Weapon Config**: Created as ScriptableObject via right-click > Create > Character > WeaponConfig
- **Movement Config**: Created as ScriptableObject via right-click > Create > Character > MovementConfig
- **Main Controller Prefab**: Assets/Platformer Character Controller/Prefabs/Character.prefab
- **Demo Scene**: Assets/Platformer Character Controller/Scenes/Demo.unity

## Quick Links

- **TextMesh Pro**: UI text rendering (optional)
- **Unity Input System**: Modern input handling
- **ImprovedTimers**: Timer management system (included)
### Third-Party Dependencies

- **DataWarehouse**: Centralized configuration and runtime data
- **RaycastSensor**: Collision detection and environment sensing
- **CombatController**: Combat behavior and state management
- **MovementMotor**: Main controller managing character locomotion
### Key Components

- **Collision Detection**: Custom raycast-based collision system
- **Animation System**: Integrated animation and VFX/SFX management
- **Input System**: Modern input handling with rebindable controls
- **Combat System**: Health, damage, weapons, and projectiles
- **Movement System**: Advanced platformer locomotion with state machine
### Core Systems

## Package Contents Summary

- **Namespace**: `EkkranGames.CharacterController`
- **Target Unity Version**: 2022 LTS or higher
- **Documentation Generated**: 2026-03-31
- **Asset Package Version**: 1.0.0

## Version Information

5. **Build troubleshooting guides** - Compile from TROUBLESHOOTING.md and system docs
4. **Create system diagrams** - Extract architectural information from ARCHITECTURE.md
3. **Generate tutorials** - Combine INTEGRATION_GUIDE.md with examples
2. **Create interactive API documentation** - Build searchable reference from API_REFERENCE.md
1. **Generate web documentation** - Convert markdown to static site content

This documentation set is designed to be parsed and referenced by documentation generation agents to:

## Usage for Documentation Agents

- Performance optimization tips
- Combat system debugging
- Collision detection problems
- Movement behavior tuning
Common issues and solutions:
### 10. [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

- Observable fields
- Event signatures
- Configuration options
- CombatController public interface
- MovementMotor public interface
Quick reference for public APIs:
### 9. [API_REFERENCE.md](./API_REFERENCE.md)

- Demo scene walkthrough
- Weapon prefabs (Rifle, Bullet)
- Environment prefabs (Floor, Step)
- Character prefab structure
Inventory of included prefabs and demo content:
### 8. [PREFABS_AND_SCENES.md](./PREFABS_AND_SCENES.md)

- Common integration patterns
- Configuration workflow
- Prefab and component setup
- Dependencies and third-party libraries
- Setup requirements
Step-by-step integration guide for developers:
### 7. [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)

- Raycast direction configuration
- Wall detection and attachment
- Ground detection
- RaycastSensor functionality
Detailed guide to collision and raycast sensing:
### 6. [COLLISION_DETECTION.md](./COLLISION_DETECTION.md)

- Runtime data management
- Data readers and type system
- Configuration ScriptableObjects
- DataWarehouse singleton pattern
Data management and configuration system:
### 5. [DATA_LAYER.md](./DATA_LAYER.md)

- Event system integration
- VFX and sound effects
- Animation management
- Input mapping and actions
Input handling and visual feedback systems:
### 4. [INPUT_AND_ANIMATION.md](./INPUT_AND_ANIMATION.md)

- Combat configuration
- Health recovery system
- Projectile pooling
- Weapon system and weapon management
- Health and damage mechanics
Combat and damage system documentation:
### 3. [COMBAT_SYSTEM.md](./COMBAT_SYSTEM.md)

- Features (jumping, wall climbing, dashing, crouch)
- Collision detection (RaycastSensor)
- Configuration options (MovementConfig)
- State machine states (Grounded, Falling, Rising, Jumping, WallAttached, Dashing)
Complete guide to the movement and locomotion system:
### 2. [MOVEMENT_SYSTEM.md](./MOVEMENT_SYSTEM.md)

- Component relationships and dependencies
- Data layer and configuration system
- State machine architecture
- Core system components (Movement, Combat, Input, Animation)
High-level overview of the system architecture, including:
### 1. [ARCHITECTURE.md](./ARCHITECTURE.md)

## Document Structure

This directory contains comprehensive documentation for the **Platformer Character Controller** asset package. This documentation is maintained outside the asset package to provide reference material for documentation generation agents and developers.


