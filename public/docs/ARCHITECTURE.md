# Architecture Overview

## System Architecture

The Platformer Character Controller is built on a modular architecture with clear separation of concerns across four main system layers:

```
┌─────────────────────────────────────────────┐
│         Input Layer                         │
│  (Input System, Input Actions, Aiming)     │
└────────────┬────────────────────────────────┘
             │
┌────────────▼──────────────────────────────────────────┐
│         Character Controller Layer                    │
│  ┌──────────────────────┬──────────────────────┐    │
│  │  Movement System     │   Combat System      │    │
│  │  - MovementMotor     │   - CombatController │    │
│  │  - State Machine     │   - WeaponManager    │    │
│  │  - LocomotionStates  │   - Health System    │    │
│  └──────────────────────┴──────────────────────┘    │
│  ┌──────────────────────┬──────────────────────┐    │
│  │  Animation & VFX     │   Collision Detection│    │
│  │  - AnimationManager  │   - RaycastSensor    │    │
│  │  - VFXManager        │   - VectorMath       │    │
│  │  - SoundManager      │                      │    │
│  └──────────────────────┴──────────────────────┘    │
└────────────┬─────────────────────────────────────────┘
             │
┌────────────▼──────────────────────────────────────────┐
│         Data Layer                                    │
│  - DataWarehouse (Singleton)                         │
│  - Configuration (ScriptableObjects)                 │
│  - Data Readers                                      │
└────────────┬─────────────────────────────────────────┘
             │
┌────────────▼──────────────────────────────────────────┐
│         Utility Layer                                 │
│  - State Machine Framework                           │
│  - Timer Management (ImprovedTimers)                 │
│  - Observable Fields                                 │
│  - Vector Math Utilities                             │
└─────────────────────────────────────────────────────────┘
```

## Component Hierarchy

### Character GameObject Structure
```
Character (MovementMotor, CombatController)
├── Body (Rigidbody, CapsuleCollider)
├── GroundSensor (RaycastSensor)
├── LowSideSensor (RaycastSensor)
├── AnimationManager
├── VFXManager
├── SoundManager
└── WeaponManager
    └── Weapon Instances (child GameObjects)
```

## Core Systems

### 1. Movement System

**Purpose**: Handles all character locomotion, state transitions, and physics.

**Key Components**:
- `MovementMotor`: Main controller (MonoBehaviour)
- `MovementConfig`: Configuration (ScriptableObject)
- `LocomotionStates`: State implementations
- `RaycastSensor`: Collision detection
- `CurrentMoveSet`: Capability tracker

**State Machine States**:
1. **GroundedState** - Character on solid ground
2. **FallingState** - Character falling
3. **RisingState** - Character moving upward
4. **JumpingState** - Active jump
5. **WallAttachedState** - Clinging to wall
6. **DashingState** - Dash ability active

**Key Features**:
- Double jump capability
- Wall climbing and wall jumping
- Dash mechanic with cooldown
- Crouch/slide mechanics
- Coyote time and jump buffering
- Advanced momentum and friction system

### 2. Combat System

**Purpose**: Manages health, damage, weapons, and projectiles.

**Key Components**:
- `CombatController`: Main combat controller (MonoBehaviour)
- `Health`: Health tracking and damage
- `WeaponManager`: Weapon management
- `WeaponConfig`: Weapon configuration (ScriptableObject)
- `ProjectilePool`: Projectile object pooling
- `Projectile`: Projectile behavior

**Features**:
- Health tracking with events
- Weapon inventory system
- Projectile pooling for performance
- Configurable damage and knockback
- Health recovery system
- Damageable interface for extensibility

### 3. Input System

**Purpose**: Handles input processing and event distribution.

**Key Components**:
- `Input`: Auto-generated input actions (Modern Input System)
- `MovementMotor`: Input callbacks and processing

**Input Actions** (Character map):
- Move - 2D input (WASD)
- Jump - Button press
- Dash - Button press
- Look - Mouse/Analog stick
- Crouch - Button press (if implemented)

**Aiming System**:
- Supports absolute mouse position or delta input
- Optional mouse smoothing
- Y-axis inversion option
- Observable aiming direction for UI/systems

### 4. Animation & VFX/Audio System

**Purpose**: Provides visual and audio feedback.

**Key Components**:
- `AnimationManager`: Animation state synchronization
- `VFXManager`: Visual effects playback
- `SoundManager`: Audio playback

**Integration Points**:
- Synchronized with locomotion states
- Responds to events (Jump, Land, Dash, Wall Attach)
- Configurable parameter mapping

### 5. Collision Detection System

**Purpose**: Provides robust environment sensing.

**Key Components**:
- `RaycastSensor`: Raycast-based collision detection
- `VectorMath`: Vector utilities for collision calculations

**Sensor Types**:
- Ground detection (downward rays)
- Side wall detection (horizontal rays)
- Low-side detection (wall climbing detection)

**Key Features**:
- World-direction override capability
- Distance-based hit detection
- Scene debug visualization
- Rotation-agnostic casting

## Data Flow Architecture

### Movement Update Flow
```
Input Events → Input Processing → State Machine Evaluation
    ↓
Collision Detection (GroundCheck, WallCheck)
    ↓
Jump/Dash/Movement Logic
    ↓
Momentum Calculation
    ↓
Velocity Application to Rigidbody
    ↓
State Transitions
    ↓
Animation/VFX Updates
```

### Combat Update Flow
```
Weapon Input → WeaponManager
    ↓
Fire Event → Projectile Spawn (from pool)
    ↓
Projectile Movement & Collision
    ↓
Hit Detection → Apply Damage
    ↓
Health Update → Health Events
    ↓
VFX/SFX Playback
```

## Configuration Architecture

### ScriptableObject Hierarchy
```
MovementConfig
├── Movement Parameters (speed, gravity, friction)
├── Jump Parameters (force, timing, coyote)
├── Wall Mechanics (gravity, jump force, attach threshold)
├── Dash Parameters (force, duration, cooldown)
├── Crouch Parameters (collider adjustments)
└── Feature Gates (via CurrentMoveSet)

WeaponConfig
├── Fire Rate
├── Damage
├── Projectile Parameters
├── Cooldown Times
└── Knockback

HealthConfig (implicit)
├── Max Health
├── Iframes Duration
└── Recovery Settings
```

## Data Layer Architecture

**DataWarehouse Pattern**:
- Singleton pattern for global access
- Type-safe generic Get/Set methods
- Key-value storage for runtime data
- Pre-populated with configuration objects

**Standard Data Keys**:
- `current_move_set`: CurrentMoveSet instance
- `player_weapon_data`: WeaponData instance
- Custom keys for game-specific data

## Dependency Injection & Initialization

### Initialization Sequence (MovementMotor.Start())
1. Initialize private variables (Rigidbody, Collider, etc.)
2. Setup input callbacks
3. Calibrate sensors (GroundCheck, WallCheck)
4. Initialize state machine with all states
5. Setup timers (jump, coyote, jump buffer, dash, wall reattach)

### Observable Field System

The architecture uses Observable pattern for state tracking:
```csharp
public Observer<float> horizontal;      // Current input
public Observer<float> vertical;        // Current input
public Observer<bool> grounded;         // Ground contact state
public Observer<bool> hanging;          // Wall contact state
public Observer<bool> dashing;          // Dash state
public Observer<float> position;        // Character X position
public Observer<float> facingDirection; // -1 (left) or 1 (right)
public Observer<Vector2> aimingDirection; // Aim direction
```

These observables allow UI systems and other components to react to state changes without tight coupling.

## Extension Points

The architecture provides several extension points:

1. **Custom States**: Inherit from `IState` and add to state machine
2. **Custom Damage Types**: Implement `IDamageable` interface
3. **Health Recovery**: Implement `IHealthRecovery` interface
4. **Predicates**: Custom condition checking via `IPredicate` interface
5. **Event Subscription**: React to `UnityEvent` callbacks (onJump, onLand, onDash, etc.)

## Namespace Organization

```
EkkranGames.CharacterController          // Main namespace
├── Character.Movement                  // MovementMotor, States
├── Character.Combat                    // Combat system
├── Character.Animation                 // Animation managers
├── Character.CollisionCheck            // RaycastSensor
├── Character.Input                     // Input definitions
├── Character.DataLayer                 // DataWarehouse
├── Character.Utils                     // Vector math, utilities
└── Character.Predicates                // Condition system
```

## Performance Considerations

- **Object Pooling**: Projectiles use object pooling to reduce GC pressure
- **Raycast Optimization**: RaycastSensors are calibrated once at startup
- **State Machine**: Efficient state transitions with minimal overhead
- **Timers**: Uses ImprovedTimers for garbage-collection-free timing
- **Collision**: Raycast-based system avoids complex shape casting

## Third-Party Dependencies

1. **Unity Input System**: Modern input handling
2. **ImprovedTimers**: GC-free timer management
3. **TextMesh Pro**: UI text (optional)
4. **Universal Render Pipeline**: Optional visual enhancements

---

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for setup instructions and [API_REFERENCE.md](./API_REFERENCE.md) for detailed API documentation.

