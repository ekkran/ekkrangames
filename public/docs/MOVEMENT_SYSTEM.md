# Movement System Documentation

## Overview

The Movement System is the core of the Platformer Character Controller, managing all character locomotion, physics, and state transitions through a finite state machine architecture. It provides advanced platformer mechanics including double jumping, wall climbing, dashing, and momentum-based physics.

## State Machine

### State Diagram

```
                    ┌─────────────┐
                    │  Grounded   │◄─────┐
                    └─────┬───────┘      │
                          │             │
          ┌───────────────┼──────────────┼─────────┐
          │               │              │         │
          ▼               ▼              ▼         ▼
      ┌─────────┐   ┌──────────┐   ┌──────────┐ ┌────────────┐
      │ Jumping │   │  Rising  │   │  Falling │ │ Dashing    │
      └────┬────┘   └──────┬───┘   └──────┬───┘ └──────┬─────┘
           │               │              │            │
           └───────┬───────┴──────────┬───┴────────────┘
                   │                  │
                   ▼                  ▼
              ┌──────────────┐   ┌─────────────┐
              │ WallAttached │   │   Falling   │
              └──────────────┘   └─────────────┘
```

### States

#### 1. GroundedState
**Description**: Character is in contact with ground.

**Entry Conditions**:
- Rigidbody reports collision with ground layer
- Ground distance sensor detects hit within threshold

**Exit Conditions**:
- No ground contact detected
- Transition to Falling/Rising/Jumping

**Behavior**:
- Apply ground friction to horizontal velocity
- Allow movement input to adjust horizontal velocity
- Listen for jump input
- Track facing direction based on input
- Call `OnGroundContactRegained()` callback

**Key Logic**:
```
- Ground friction applied: groundFriction parameter
- Movement speed: speed parameter
- Jump input triggers JumpingState transition
- Dash input triggers DashingState transition
```

#### 2. RisingState
**Description**: Character is moving upward (positive vertical velocity).

**Entry Conditions**:
- Vertical velocity > 0
- Not in Grounded state
- Jump started or momentum carries upward

**Exit Conditions**:
- Vertical velocity becomes zero
- Wall attach conditions met
- Dash input triggered

**Behavior**:
- Apply air friction
- Allow air control for horizontal adjustment
- Apply gravity
- Check for wall attachment (if conditions met)
- Call `OnGroundContactLost()` on entry

**Key Logic**:
```
- Air friction applied: airFriction parameter
- Gravity: gravity parameter
- Air control rate: airControlRate parameter
- Wall attachment: requires !grounded && vertical velocity < wallAttachVerticalThreshold
```

#### 3. FallingState
**Description**: Character is moving downward (negative vertical velocity).

**Entry Conditions**:
- Vertical velocity < 0
- Not in Grounded state
- Exited Rising state

**Exit Conditions**:
- Vertical velocity becomes zero
- Wall attach conditions met
- Ground contact regained

**Behavior**:
- Apply air friction
- Apply gravity (potentially modified wall gravity if near wall)
- Check for wall attachment
- Allow limited air control
- Apply gravity downward for acceleration

**Key Logic**:
```
- Air friction applied
- Gravity: gravity parameter
- Wall gravity (if near wall): wallGravity parameter
- Ground detection frequency: every frame
```

#### 4. JumpingState
**Description**: Character is actively jumping with sustained upward force.

**Entry Conditions**:
- Jump input pressed
- Character is grounded OR coyote time active
- Jump count < max consecutive jumps

**Exit Conditions**:
- Jump button released
- Minimum jump time elapsed
- Maximum jump time exceeded
- Wall attached (cannot transition while grounded)

**Behavior**:
- Apply upward force (jumpForce parameter)
- Apply high jump force if applicable
- Track jump time with jumpTimer
- Enforce minimum jump time
- Enforce maximum jump time
- Can allow air horizontal input but avoid adding horizontal momentum when jumping into wall

**Key Parameters**:
```
- Jump force: jumpForce
- High jump force: highJumpForce
- Max jump time: maxJumpTime
- Min jump time: minJumpTime
- Jump buffer: jumpBuffer (input buffering)
- Coyote time: coyoteTime (grace period after leaving ground)
```

#### 5. WallAttachedState
**Description**: Character is clinging to a wall.

**Entry Conditions**:
- Low collision detected (wall nearby)
- Character not grounded
- Horizontal input toward wall
- Vertical velocity below threshold (not rising fast)
- Wall reattach cooldown not active

**Exit Conditions**:
- No wall contact (low collision clear)
- Horizontal input released
- Jump initiated
- Wall reattach cooldown triggered

**Behavior**:
- Apply wall gravity (reduced gravity for slower descent)
- Apply wall friction
- Allow wall jump (if capability enabled)
- Block standard momentum application
- Trigger wall attachment direction tracking
- Start wall reattach cooldown on state exit

**Key Parameters**:
```
- Wall gravity: wallGravity (typically 1/2 to 1/3 of normal gravity)
- Wall jump force: wallJumpForce
- Wall reattach cooldown: wallReattachCooldown
- Wall attach vertical threshold: wallAttachVerticalThreshold
```

#### 6. DashingState
**Description**: Character is performing a dash ability.

**Entry Conditions**:
- Dash input received
- Dash cooldown expired
- CanDash capability enabled

**Exit Conditions**:
- Dash duration timer expires
- Dash cooldown initiated

**Behavior**:
- Apply dash force in facing direction
- Disable normal gravity
- Block other movement inputs (except aiming)
- Track dash timer
- Trigger onDash event
- Apply dash momentum
- Start dash cooldown after completion

**Key Parameters**:
```
- Dash force: dashForce
- Dash duration: dashDuration
- Dash cooldown: dashCooldown
- Direction: Current facing direction
```

## Movement Configuration

### MovementConfig ScriptableObject

The `MovementConfig` is a ScriptableObject that centralizes all movement parameters. Create one via: `Right-click > Create > Character > MovementConfig`

#### Movement Parameters
```csharp
public float speed;                    // Horizontal movement speed
public float gravity;                  // Downward acceleration (positive value)
public LayerMask ground;              // Ground detection layer
public float groundDistance;          // Ray distance for ground detection
public float airFriction;             // Friction while airborne (0-1)
public float groundFriction;          // Friction while grounded (0-1)
```

#### Jump Parameters
```csharp
public float maxJumpTime;             // Maximum sustained jump duration
public float minJumpTime;             // Minimum jump duration (can't cut off before this)
public float jumpForce;               // Upward force applied during jump
public float highJumpForce;           // Optional higher jump force
public float coyoteTime;              // Grace period after leaving ground (can still jump)
public float jumpBuffer;              // Input buffering time (can jump this long before landing)
public float airControlRate;          // How responsive air movement is (0-1)
```

#### Crouch Parameters
```csharp
public float crouchColliderHeight;    // Collider height while crouching
public float crouchColliderCenter;    // Collider center Y while crouching
```

#### Wall Mechanics
```csharp
public float wallGravity;             // Gravity while attached to wall
public float wallJumpForce;           // Force applied when jumping from wall
public float wallReattachCooldown;    // Time before can reattach to wall
public float wallAttachVerticalThreshold; // Max upward velocity to allow attachment
```

#### Dash Parameters
```csharp
public float dashForce;               // Dash movement force
public float dashDuration;            // How long dash lasts
public float dashCooldown;            // Time before can dash again
```

## Collision Detection

### RaycastSensor System

The `RaycastSensor` class provides raycast-based collision detection with multiple cast points for robustness.

#### Sensor Setup

**Ground Sensor**:
```csharp
// Configured in MovementMotor.RecalibrateSensor()
// Casts downward from player position
// Detects solid ground for grounding
// Uses ground layer mask and ground distance from config
```

**Low-Side Sensor** (Wall Detection):
```csharp
// Configured in MovementMotor.RecalibrateLowSideSensor()
// Casts horizontally to detect walls
// Detects walls for wall climbing mechanics
// Uses same ground layer mask
// Direction follows movement direction
```

#### RaycastSensor Features

- **Multiple Cast Points**: Several raycasts at different heights for robustness
- **Distance-Based**: Returns distance to detected hit
- **Direction Override**: Can force world-space cast direction
- **Scene Debug Visualization**: Yellow rays visible in Scene view for debugging
- **Rotation-Agnostic**: Properly handles rotated player transforms

#### Usage Example
```csharp
// Check if ground detected
if (_groundSensor.HasDetectedHit())
{
    float distanceToGround = _groundSensor.GetDistance();
    // Character is grounded
}

// Check for wall
if (_lowSideColliderSensor.HasDetectedHit())
{
    float distanceToWall = _lowSideColliderSensor.GetDistance();
    // Character can attach to wall
}
```

## Movement Features

### Double Jump

**Configuration**:
```csharp
CurrentMoveSet.MaxConsecutiveJumps = 2; // Enables double jump
```

**Mechanics**:
- Track jump count via `_jumpCount`
- Increment on each jump
- Reset when landing (grounded state entry)
- Prevent jump if count >= MaxConsecutiveJumps

**Usage**:
```csharp
if (_jumpCount < moveSet.MaxConsecutiveJumps)
{
    // Allow jump
}
```

### Wall Climbing & Wall Jumping

**Attachment Conditions**:
1. Low collision detected (wall nearby)
2. Horizontal input toward wall
3. Not grounded
4. Vertical velocity below threshold
5. Wall reattach cooldown expired

**Wall Jump**:
- Jump from attached state with wallJumpForce
- Applies in direction away from wall
- Can chain into another wall attachment
- Resets jump count for mid-air recombination

**Mechanics**:
```
Wall Attach → Wall Gravity Applied (slower descent)
          → Wall Input Maintained
          → Jump Input → Wall Jump with wallJumpForce
          → Exit → Wall Reattach Cooldown Started
```

### Dash Ability

**Trigger**: Press designated dash input (configurable)

**Mechanics**:
1. Disable gravity during dash
2. Apply constant dashForce in facing direction
3. Duration = dashDuration
4. After dash, cooldown = dashCooldown
5. Trigger onDash event for VFX/SFX

**Configuration**:
```csharp
public float dashForce;      // How fast the dash is
public float dashDuration;   // How long it lasts (seconds)
public float dashCooldown;   // Time between dashes
```

### Crouch/Slide

**Mechanics**:
- Reduce collider height
- Adjust collider center
- Maintain momentum while crouching
- Speed adjustment possible

**Configuration**:
```csharp
public float crouchColliderHeight;
public float crouchColliderCenter;
```

### Coyote Time

**Purpose**: Grace period allowing jump shortly after leaving ground.

**Mechanics**:
- Jump input checks coyote timer
- Timer starts when leaving ground
- Timer expires after coyoteTime duration
- Allows jump input to execute even if technically airborne

**Configuration**:
```csharp
public float coyoteTime = 0.1f; // 100ms grace period
```

### Jump Buffer

**Purpose**: Allow input buffering for responsive jumping.

**Mechanics**:
- Jump input can be buffered before landing
- Buffer duration = jumpBuffer
- On landing, buffered jump executes immediately
- Improves feel of platformer controls

**Configuration**:
```csharp
public float jumpBuffer = 0.05f; // 50ms buffer
```

### Momentum System

The movement system uses a momentum-based physics model.

**Momentum Components**:
```csharp
Vector3 _momentum;  // Current velocity (X, Y, Z)
// X: Horizontal velocity (affected by movement input, friction)
// Y: Vertical velocity (affected by gravity, jumps, wall gravity)
// Z: Currently unused (2D character)
```

**Momentum Application**:
1. Calculate desired velocity from input
2. Apply friction (lerp toward zero)
3. Apply gravity (add downward acceleration)
4. Apply adjustments (air control, friction)
5. Apply to Rigidbody velocity

**Friction Mechanics**:
```csharp
// Ground friction (higher value = more friction)
groundFriction = 0.9f;  // Example: lose 90% of horizontal momentum per frame

// Air friction (lower than ground for floaty feel)
airFriction = 0.95f;    // Example: lose 5% of horizontal momentum per frame

// Applied via: velocity *= friction;
```

## Observable Fields

The MovementMotor exposes several observable fields for UI and system integration:

```csharp
public Observer<float> horizontal;        // Input horizontal value (-1 to 1)
public Observer<float> vertical;          // Input vertical value (-1 to 1)
public Observer<bool> grounded;           // Is character on ground?
public Observer<bool> hanging;            // Is character on wall?
public Observer<bool> dashing;            // Is character dashing?
public Observer<float> position;          // Character X position
public Observer<float> facingDirection;   // -1 (left) or 1 (right)
public Observer<Vector2> aimingDirection; // Aim direction for aiming systems
```

## Events

Movement system triggers several events for other systems:

```csharp
public UnityEvent<Vector3> onDash;       // Triggered when dash starts (passes direction)
public UnityEvent onJump;                // Triggered when jump starts
public UnityEvent onLand;                // Triggered when landing on ground
public UnityEvent<Vector3> onWallAttached; // Triggered when attaching to wall
```

## Aiming System

The movement system includes an advanced aiming system.

**Input Options**:
- **Absolute Mode** (default): Mouse position on screen
- **Delta Mode**: Mouse movement delta each frame

**Configuration**:
```csharp
public float mouseSensitivity = 1f;      // Sensitivity multiplier
public bool invertMouseY = false;        // Invert Y axis
public bool enableMouseSmoothing = true; // Smooth aiming
public float mouseSmoothing = 0.05f;     // Smoothing amount (0-1)
```

**Output**:
```csharp
public Observer<Vector2> aimingDirection; // Normalized direction vector
```

## Debugging & Monitoring

### State Machine Logging

The state machine logs state transitions with debug information:

```
[MovementMotor] StateChange: Grounded => Jumping | 
  groundHit=true, lowCollision=0.00, momentumY=0.00, 
  isJumping=true, jumpCount=1, horizontal=0.5
```

### Sensor Debug Visualization

- Raycasts drawn in Scene view (yellow rays)
- Hit points marked with cyan crosses
- Visible when scene view is displayed

### Observable Monitoring

Subscribe to observable fields to monitor state:
```csharp
movementMotor.grounded.Subscribe(isGrounded => 
{
    Debug.Log($"Grounded: {isGrounded}");
});
```

## Physics Setup Requirements

For proper movement system functionality:

1. **Rigidbody Configuration**:
   - Body Type: Dynamic
   - Gravity: Off (handled by MovementMotor)
   - Constraints: Freeze Rotation (X, Y, Z)
   - Collision: Use CapsuleCollider

2. **Collider Configuration**:
   - Type: CapsuleCollider
   - Radius: ~0.5 units (adjust for character size)
   - Height: ~2 units (adjust for character size)
   - Center: Adjusted by MovementConfig

3. **Layer Setup**:
   - Create "Ground" layer
   - Assign to all ground/platform objects
   - Set in MovementConfig.ground LayerMask

## Common Configuration Patterns

### Fast, Responsive Platformer
```csharp
speed = 8f;
gravity = 25f;
jumpForce = 15f;
airControlRate = 0.8f;
groundFriction = 0.85f;
coyoteTime = 0.15f;
```

### Floaty, Longer Jumps
```csharp
speed = 6f;
gravity = 15f;
jumpForce = 20f;
maxJumpTime = 0.4f;
airControlRate = 0.5f;
groundFriction = 0.9f;
```

### Wall Climbing Focus
```csharp
wallGravity = 8f;           // Slow descent
wallJumpForce = 18f;        // Powerful push off wall
wallReattachCooldown = 0.2f;
wallAttachVerticalThreshold = 2f;
```

---

See [COLLISION_DETECTION.md](./COLLISION_DETECTION.md) for sensor configuration details and [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for tuning advice.

