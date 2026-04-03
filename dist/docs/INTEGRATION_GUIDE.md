# Integration Guide

## Quick Start

This guide walks you through integrating the Platformer Character Controller into your Unity project.

## Prerequisites

### Required

- **Unity Version**: 2022 LTS or higher
- **Input System Package**: Modern Input System (installed via Package Manager)
- **Third-Party Assets**: ImprovedTimers (included in package)

### Optional

- **TextMesh Pro**: For UI text rendering
- **Universal Render Pipeline (URP)**: For advanced rendering

### Install Steps

1. **Import the Asset Package**
   - In Unity Editor, go to Assets > Import Package > Custom Package
   - Select the Platformer Character Controller package file
   - Click Import

2. **Enable Input System** (if not already enabled)
   - Go to Edit > Project Settings > Player
   - Input System Package: Enable New Input System
   - Disable Old Input Manager if desired
   - Restart editor when prompted

---

## Scene Setup

### 1. Create Basic Scene

1. Create new scene (File > New Scene)
2. Save the scene
3. Keep default Main Camera
4. Delete default Cube

### 2. Add Character

1. **Instance Character Prefab**:
   - Drag `Assets/Platformer Character Controller/Prefabs/Character.prefab` into scene
   - Position at ground level (Y = 0)

2. **Configure Character Prefab**:
   - Select Character in hierarchy
   - In Inspector, locate `MovementMotor` component
   - Assign MovementConfig ScriptableObject to `Mc` field
   - Verify Input component is configured

3. **Add Collider to Character**:
   - Character should already have CapsuleCollider
   - Verify in inspector (should be present)

### 3. Create Ground

1. **Create Plane**:
   - Right-click in Hierarchy > 3D Object > Plane
   - Name it "Ground"
   - Scale to (10, 1, 10)
   - Position at (0, -1, 0)

2. **Add Physics Collider**:
   - Add BoxCollider component
   - Adjust collider size to match plane dimensions

3. **Assign Ground Layer**:
   - Select Ground object
   - In Inspector, set Layer to "Ground" (create if needed)
   - Do this for all ground/platform objects

### 4. Configure Movement

1. **Create MovementConfig**:
   - Right-click in Project folder
   - Create > Character > MovementConfig
   - Name it "Player_MovementConfig"
   - Configure parameters (see configuration templates below)

2. **Assign to Character**:
   - Select Character in scene
   - In MovementMotor component, assign MovementConfig to `Mc` field
   - In Ground LayerMask, select "Ground"

### 5. Test Basic Movement

1. Press Play
2. Use WASD to move
3. Press Space to jump
4. Character should move and fall with gravity

---

## Movement Configuration

### Step-by-Step Configuration

**1. Access the scene**
- Open your scene with the Character prefab
- Select the Character GameObject
- Find the MovementMotor component

**2. Assign MovementConfig**
```
MovementMotor > Mc field > Drag your MovementConfig asset
```

**3. Configure movement parameters** in the ScriptableObject:

```csharp
// Movement
Speed: 8.0           // Horizontal movement speed
Gravity: 25.0        // Downward acceleration
Ground Distance: 0.1 // Ground detection range
Ground Friction: 0.85 // Friction when grounded
Air Friction: 0.95   // Friction when airborne
```

**4. Configure jump parameters**:

```csharp
Max Jump Time: 0.4   // Max jump duration (seconds)
Min Jump Time: 0.1   // Min jump duration (seconds)
Jump Force: 15.0     // Upward acceleration during jump
High Jump Force: 20.0 // Enhanced jump force (if enabled)
Coyote Time: 0.15    // Grace period after leaving ground
Jump Buffer: 0.05    // Input buffering duration
Air Control Rate: 0.8 // Air movement responsiveness (0-1)
```

**5. Configure wall mechanics**:

```csharp
Wall Gravity: 8.0    // Gravity while on wall (slower descent)
Wall Jump Force: 18.0 // Force when jumping from wall
Wall Reattach Cooldown: 0.2 // Time before can reattach
Wall Attach Vertical Threshold: 2.0 // Max upward velocity for attachment
```

**6. Configure dash**:

```csharp
Dash Force: 30.0     // Dash movement force
Dash Duration: 0.3   // How long dash lasts
Dash Cooldown: 0.5   // Time between dashes
```

### Quick Configuration Templates

**Template 1: Responsive Platformer**
```
Speed: 8.0
Gravity: 25.0
Jump Force: 15.0
Max Jump Time: 0.35
Air Control Rate: 0.8
Ground Friction: 0.85
```

**Template 2: Floaty, Long Jumps**
```
Speed: 6.0
Gravity: 15.0
Jump Force: 20.0
Max Jump Time: 0.5
Air Control Rate: 0.5
Ground Friction: 0.9
```

**Template 3: Wall Climbing Focus**
```
Wall Gravity: 8.0
Wall Jump Force: 18.0
Wall Reattach Cooldown: 0.2
Max Consecutive Jumps: 3 (enable in CurrentMoveSet)
```

---

## Combat Setup

### 1. Create Weapon Configuration

1. **Create WeaponConfig**:
   - Right-click in Project folder
   - Create > Character > WeaponConfig
   - Name it "Rifle_Config"

2. **Configure weapon**:
   - Weapon Name: "Rifle"
   - Fire Rate: 5.0
   - Projectile Damage: 10.0
   - Projectile Speed: 30.0
   - Knockback Force: 5.0

### 2. Setup Combat System

1. **Select Character in scene**
2. **Add CombatController component**:
   - Component > Add > CombatController
   - Inspector should show Combat Settings

3. **Configure CombatController**:
   - Assign Health max value
   - Configure Iframes duration
   - Setup weapon inventory

### 3. Add Projectile Prefab

1. **Use included Bullet prefab**:
   - Located at: `Prefabs/bullet.prefab`
   - Assign to ProjectilePool in CombatController
   - Verify Projectile component is present

2. **Test weapon fire**:
   - Press Fire input (typically mouse click or gamepad trigger)
   - Projectile should spawn and travel
   - Verify pooling is working (check project console)

---

## Input Configuration

### Access Input Actions

1. **Edit Input Bindings**:
   - Find `Input.inputactions` asset in project
   - Double-click to open Input Manager
   - Expand Character action map
   - Edit bindings as needed

2. **Common Bindings**:
   - Move: Keyboard > WASD or D-Pad
   - Jump: Spacebar or Gamepad Button
   - Dash: Left Shift or Gamepad Button
   - Look: Mouse or Right Stick

### Input Code Integration

Access input in code:

```csharp
// Get current input
Vector2 movement = _input.Character.Move.ReadValue<Vector2>();

// Listen for button press
_input.Character.Jump.started += OnJumpPressed;

// Listen for button release
_input.Character.Jump.canceled += OnJumpReleased;
```

---

## Data Layer Setup

### 1. Create DataManager

1. **Create empty GameObject**:
   - Right-click in Hierarchy > Create Empty
   - Name it "DataManager"

2. **Add DataManager component**:
   - Select DataManager GameObject
   - Component > Add > DataManager
   - Assign MovementConfig to inspector field
   - Assign WeaponConfigs to inventory list

### 2. Initialize Data

The DataManager automatically:
- Loads configuration objects
- Initializes CurrentMoveSet
- Populates weapon inventory
- Validates essential data

**Verify Initialization**:
- Play scene
- Open Debug console
- Should see no data initialization errors

### 3. Access Data Runtime

```csharp
// Get current configuration
var movementConfig = DataWarehouse.Instance.GetData<MovementConfig>("movement_config");

// Get weapon data
var weaponData = DataWarehouse.Instance.GetData<WeaponData>("player_weapon_data");

// Modify capabilities
var moveSet = DataWarehouse.Instance.GetData<CurrentMoveSet>("current_move_set");
moveSet.CanDash = true;  // Enable dash feature
```

---

## Animation Setup

### 1. Create Animator Controller

1. **Create AnimatorController**:
   - Right-click in Project
   - Create > Animator Controller
   - Name it "Player_Animator"

2. **Add States**:
   - Idle (default)
   - Running
   - Jumping
   - Falling
   - WallClimb
   - Dashing

3. **Add Parameters**:
   - Float: Horizontal
   - Float: VerticalVelocity
   - Bool: IsGrounded
   - Bool: IsDashing
   - Bool: IsWallAttached
   - Trigger: Jump
   - Trigger: Land
   - Trigger: Fire

### 2. Assign to Character

1. **Select Character**
2. **Add Animator component**:
   - Component > Add > Animator
   - Assign AnimatorController to Controller field
   - Configure Avatar if using humanoid character

3. **Add AnimationManager**:
   - Component > Add > AnimationManager
   - Inspector should auto-find Animator component

### 3. Connect Events

```csharp
// Subscribe movement events to animation
movementMotor.onJump.AddListener(() => 
{
    animator.SetTrigger("Jump");
});

movementMotor.onLand.AddListener(() =>
{
    animator.SetTrigger("Land");
});

// Subscribe input to animation parameters
movementMotor.horizontal.Subscribe(value =>
{
    animator.SetFloat("Horizontal", value);
});
```

---

## VFX & Audio Setup

### 1. Create VFX Manager

1. **Add VFXManager component**:
   - Select Character > Component > Add > VFXManager
   - Inspector shows VFX event hooks

2. **Assign VFX Prefabs**:
   - Create or import particle system prefabs
   - Assign to jump effect, dash effect, etc.

### 2. Create Sound Manager

1. **Add SoundManager component**:
   - Select Character > Component > Add > SoundManager
   - Add AudioListener if not present

2. **Assign Audio Clips**:
   - Assign jump sound, landing sound, hit sound
   - Configure volume levels

### 3. Connect Events

```csharp
// Jump VFX
movementMotor.onJump.AddListener(() =>
{
    vfxManager.PlayJumpEffect(transform.position);
    soundManager.PlayJumpSound();
});

// Weapon fire VFX
combatController.onWeaponFired.AddListener(() =>
{
    vfxManager.PlayMuzzleFlash();
    soundManager.PlayFireSound();
});
```

---

## Complete Setup Checklist

### Scene Setup
- [ ] Character prefab instanced in scene
- [ ] Ground plane with BoxCollider
- [ ] Ground layer created and assigned
- [ ] Camera positioned to see character
- [ ] Lighting configured

### Character Configuration
- [ ] MovementConfig created and assigned
- [ ] Rigidbody configured (no gravity, freeze rotation)
- [ ] CapsuleCollider properly sized
- [ ] Input actions enabled

### Movement
- [ ] WASD movement works
- [ ] Jumping works (spacebar)
- [ ] Character falls with gravity
- [ ] Landing animation plays
- [ ] Coyote time functioning

### Combat (Optional)
- [ ] CombatController added
- [ ] WeaponConfig created
- [ ] Projectile prefab assigned
- [ ] Weapon firing works
- [ ] Projectiles pool correctly
- [ ] Damage applies to enemies

### Animation & VFX
- [ ] AnimatorController created
- [ ] Animation states set up
- [ ] Animator assigned to character
- [ ] Jump/land animations play
- [ ] VFX plays on events

### Data Layer
- [ ] DataManager created
- [ ] MovementConfig assigned
- [ ] WeaponConfigs assigned
- [ ] Data initializes without errors

---

## Common Issues & Fixes

### Issue: Character Doesn't Move
**Check**:
- Input system enabled in Project Settings
- Input actions configured correctly
- Movement input values updating (debug log `_horizontal`)
- MovementConfig speed > 0

**Fix**:
```csharp
// Debug movement input
Debug.Log($"Input horizontal: {_horizontal}");
Debug.Log($"Movement direction: {GetMovementDir()}");
```

### Issue: Character Falls Through Ground
**Check**:
- Ground collider exists and is enabled
- Ground layer correctly assigned
- Ground detection raycast hitting ground

**Fix**:
```csharp
// Verify layer mask
Debug.Log($"Ground layer: {mc.ground}");

// Test ground detection
Debug.Log($"Ground detected: {_groundSensor.HasDetectedHit()}");
```

### Issue: Jump Doesn't Work
**Check**:
- Jump input bound correctly
- Jump callbacks registered
- Jump force value > 0
- Coyote time or grounded check passing

**Fix**:
```csharp
// Debug jump state
Debug.Log($"Can jump: {_jumpCount < moveSet.MaxConsecutiveJumps}");
Debug.Log($"Is jumping: {_isJumping}");
```

### Issue: Input Not Working
**Check**:
- Modern Input System package installed
- Input enabled in code (`_input.Enable()`)
- Input actions asset exists
- Correct action map ("Character")

**Fix**:
```csharp
// Verify input system
if (Input.touchSupported)
    Debug.Log("Touch input available");
    
Debug.Log($"Input enabled: {_input.user.valid}");
```

---

## Next Steps

1. **Customize Movement**: Adjust MovementConfig for desired feel
2. **Add Animations**: Create animator states and transitions
3. **Implement Levels**: Create platforms and obstacles
4. **Add Enemies**: Implement enemy AI with combat system
5. **Build UI**: Health bar, weapon display, score system
6. **Polish**: Add particle effects, sounds, visual feedback

---

## Performance Tips

1. **Raycasts**: Already optimized with limited distance
2. **Object Pooling**: Projectiles pooled automatically
3. **Collision Layers**: Use layer masks to limit raycast targets
4. **Animation States**: Keep animator states minimal
5. **Debug Drawing**: Disable in builds (automatic)

---

See [ARCHITECTURE.md](./ARCHITECTURE.md) for system overview and [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for advanced debugging.

