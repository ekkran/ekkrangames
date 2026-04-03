# Troubleshooting Guide

Common issues and solutions for the Platformer Character Controller.

## Movement Issues

### Character Won't Move

**Symptom**: WASD input doesn't move character

**Causes**:
1. Input system not enabled
2. MovementConfig not assigned
3. Movement speed set to 0
4. Input callbacks not registered

**Solutions**:

1. **Check Input System**:
```
Edit > Project Settings > Player
→ Input System Package: Enabled
→ Old Input Manager: Disabled
```

2. **Check MovementConfig**:
```
Select Character in hierarchy
→ MovementMotor component
→ Mc field should reference MovementConfig
→ Speed should be > 0
```

3. **Debug Input**:
```csharp
// Add to MovementMotor
Debug.Log($"Horizontal input: {_horizontal}");
Debug.Log($"Vertical input: {_vertical}");

// Should show non-zero values during WASD input
```

4. **Verify Movement Direction**:
```csharp
// Check if movement direction is calculated
private Vector3 GetMovementDir() => new Vector3(_horizontal, 0, 0);
Debug.Log($"Movement direction: {GetMovementDir()}");
```

### Character Moves But Too Slow/Fast

**Symptom**: Movement speed doesn't feel right

**Cause**: Speed parameter incorrect

**Solution**:
```csharp
// In MovementConfig
public float speed = 8.0f;  // Default

// Adjust for feel:
// 5.0f = slow, methodical
// 8.0f = standard platformer pace
// 12.0f = fast, arcadey
// 15.0f+ = very fast
```

**Tuning Guide**:
- Test with character moving across screen
- Typical ground distance = 5-8 units/second
- Air movement should feel responsive (airControlRate)

---

## Jump Issues

### Character Won't Jump

**Symptom**: Space bar doesn't trigger jump

**Causes**:
1. Jump input not bound
2. Jump callbacks not registered
3. Not grounded and no coyote time
4. Jump count exceeded

**Solutions**:

1. **Verify Input Binding**:
```
Double-click Input.inputactions
→ Character > Jump action
→ Should have Spacebar binding
→ If missing, add: Spacebar binding
```

2. **Check Grounded State**:
```csharp
// In GroundCheck method
Debug.Log($"Ground sensor hit: {_groundSensor.HasDetectedHit()}");
Debug.Log($"Grounded: {grounded}");

// Should return true when on ground
```

3. **Debug Jump Logic**:
```csharp
// In JumpCheck method
Debug.Log($"Jump input: {_jumpPressed}");
Debug.Log($"Grounded: {grounded}");
Debug.Log($"Coyote active: {_coyoteTimeTimer?.IsRunning}");
Debug.Log($"Jump count: {_jumpCount}");
```

4. **Check Jump Configuration**:
```csharp
// In MovementConfig
public float jumpForce = 15.0f;  // Should be > 0
public float maxJumpTime = 0.4f;
public float minJumpTime = 0.1f;
```

### Jump Height Too Low/High

**Symptom**: Jump doesn't reach appropriate height

**Solution**: Adjust jump parameters

```csharp
// Formula: Height ≈ (jumpForce²) / (2 × gravity)
// Example: (15²) / (2 × 25) ≈ 4.5 units

// For higher jump:
jumpForce = 20.0f;  // Increases to ~8 units

// For lower jump:
jumpForce = 12.0f;  // Decreases to ~2.9 units

// Or adjust gravity (affects falling speed too):
gravity = 20.0f;    // Higher gravity = shorter hang time
gravity = 30.0f;    // Lower hang time
```

### Jump Feels Floaty/Unresponsive

**Symptom**: Jump doesn't feel tight or responsive to input release

**Solution**:

1. **Reduce Max Jump Time**:
```csharp
public float maxJumpTime = 0.25f;  // Was 0.4f
// Character can't hold jump as long
```

2. **Increase Air Friction**:
```csharp
public float airFriction = 0.9f;  // Was 0.95f
// Loses momentum faster in air
```

3. **Increase Gravity**:
```csharp
public float gravity = 30.0f;  // Was 25.0f
// Falls faster, feels heavier
```

### Double Jump Not Working

**Symptom**: Can only jump once

**Causes**:
1. MaxConsecutiveJumps set to 1
2. Jump count not resetting on land

**Solution**:

1. **Enable Double Jump**:
```csharp
// In DataManager or startup
var moveSet = DataWarehouse.Instance.GetData<CurrentMoveSet>("current_move_set");
moveSet.MaxConsecutiveJumps = 2;  // Enable double jump
```

2. **Verify Jump Count Reset**:
```csharp
// In GroundedState.OnEnter()
// Should reset jump count
private void ResetJumpCount()
{
    _jumpCount = 0;
}
```

---

## Collision & Ground Detection

### Character Falls Through Ground

**Symptom**: Character drops through platforms immediately

**Causes**:
1. Ground layer not assigned
2. Ground collider missing
3. Ground detection raycast too short
4. Character spawned inside collider

**Solutions**:

1. **Assign Ground Layer**:
```
Select floor object
→ Inspector: Layer = "Ground" (create if missing)
→ All platforms must have this layer
```

2. **Verify Ground Collider**:
```
Select floor object
→ Inspector: Should have BoxCollider or other collider
→ Collider enabled checkbox checked
→ Collision geometry correct
```

3. **Check Ground Detection**:
```csharp
// In GroundCheck method
Debug.Log($"Ground distance setting: {mc.groundDistance}");
Debug.Log($"Raycast distance: {_groundSensor.GetDistance()}");

// Should be roughly equal to how far below character is checked
// Typical: 0.1 units (10cm)
```

4. **Verify Ray Origin**:
```csharp
// Ray should originate from character bottom
Vector3 origin = transform.position - (transform.up * (_standingColliderHeight / 2 + 0.1f));

Debug.DrawLine(origin, origin - transform.up * mc.groundDistance, Color.green);
// Should see ray extending downward from character
```

**Scene Visualization**:
- Play scene
- Look at Scene view (not Game view)
- Should see yellow ray extending downward
- Cyan cross marks hit point

### Character Stuck in Wall

**Symptom**: Character gets stuck when moving into walls

**Causes**:
1. Wall thickness too thin (collider inside character)
2. Rigidbody collision detection set to discrete
4. Movement pushes character through wall

**Solutions**:

1. **Increase Wall Thickness**:
```
Walls should be > 0.5 units thick
Typical wall: 1.0 unit thick
```

2. **Set Rigidbody Collision Detection**:
```
Select Character
→ Rigidbody component
→ Collision Detection: Continuous (or Continuous Dynamic)
→ Prevents physics tunneling
```

3. **Check Collider Positioning**:
```
Character capsule should not overlap walls
Add visualization:
Debug.Log($"Character position: {transform.position}");
Debug.Log($"Collider bounds: {collider.bounds}");
```

### Character Jittering on Ground

**Symptom**: Character vibrates up/down while standing on ground

**Causes**:
1. Ground detection unreliable
2. Physics time step too large
3. Collider too small

**Solutions**:

1. **Increase Ground Check Robustness**:
```csharp
// Use multiple raycasts
// Implement multi-point casting in RaycastSensor
// 3 raycasts instead of 1: left, center, right
```

2. **Adjust Physics Timestep**:
```
Edit > Project Settings > Time
→ Fixed Timestep: 0.02 (default, good)
→ Max Allowed Timestep: 0.1 (default)

For stability: Fixed Timestep = 0.01666 (60 FPS)
```

3. **Increase Collider Size**:
```csharp
CapsuleCollider
→ Radius: 0.5 (check if too small)
→ Height: 2.0 (check if reasonable)

Too small = unreliable collisions
Typical: radius 0.5-0.8, height 1.8-2.2
```

---

## Wall Mechanics

### Wall Climbing Not Working

**Symptom**: Character can't attach to walls

**Causes**:
1. CanWallJump not enabled in CurrentMoveSet
2. Wall detection raycast not finding walls
3. Character velocity too high upward
4. Input not directed toward wall

**Solutions**:

1. **Enable Wall Climbing**:
```csharp
var moveSet = DataWarehouse.Instance.GetData<CurrentMoveSet>("current_move_set");
moveSet.CanWallJump = true;
```

2. **Debug Wall Detection**:
```csharp
// In WallCheck method
Debug.Log($"Low collision: {_lowCollision}");
Debug.Log($"Distance to wall: {_lowSideColliderSensor.GetDistance()}");

// Should show true/distance when near wall
```

3. **Check Velocity Threshold**:
```csharp
// In MovementConfig
public float wallAttachVerticalThreshold = 2.0f;

// Debug current velocity
Debug.Log($"Current vertical velocity: {_rb.velocity.y}");

// Can't attach if moving up faster than threshold
```

4. **Verify Input Toward Wall**:
```
Must press left/right toward wall while in air
Input must be toward wall, not away
```

### Wall Jump Not Launching

**Symptom**: Wall jump exists but doesn't launch character

**Causes**:
1. Wall jump force set to 0
2. Not in WallAttachedState when jump pressed
3. Transition to jump state blocked

**Solution**:

```csharp
// Check wall jump force
public float wallJumpForce = 18.0f;  // Should be > 0

// Debug wall jump logic
Debug.Log($"In WallAttachedState: {_stateMachine.IsInState<WallAttachedState>()}")
Debug.Log($"Jump input received: {_jumpPressed}");
Debug.Log($"Wall jump force: {mc.wallJumpForce}");
```

---

## Dash Issues

### Dash Not Working

**Symptom**: Shift key doesn't trigger dash

**Causes**:
1. CanDash not enabled
2. Dash cooldown still running
3. Dash force set to 0

**Solutions**:

1. **Enable Dash**:
```csharp
var moveSet = DataWarehouse.Instance.GetData<CurrentMoveSet>("current_move_set");
moveSet.CanDash = true;
```

2. **Check Dash Cooldown**:
```csharp
// In MovementConfig
public float dashCooldown = 0.5f;

// Debug cooldown
Debug.Log($"Dash cooldown running: {_dashCooldownTimer?.IsRunning}");
Debug.Log($"Dash cooldown time left: {_dashCooldownTimer?.TimeRemaining}");
```

3. **Verify Dash Force**:
```csharp
public float dashForce = 30.0f;  // Should be > 0
```

### Dash Direction Wrong

**Symptom**: Character dashes in wrong direction

**Cause**: Movement direction calculation incorrect

**Solution**:

```csharp
// Verify facing direction
Debug.Log($"Facing direction: {_facingDirection}");
Debug.Log($"Movement direction: {_movementDirection}");

// Dash should use current facing direction
// If wrong, check horizontal input detection
```

---

## Animation Issues

### Animations Not Playing

**Symptom**: Character has no animation when moving

**Causes**:
1. No AnimatorController assigned
2. Animator parameters not being set
3. Animations not configured in states

**Solutions**:

1. **Assign AnimatorController**:
```
Select Character
→ Animator component
→ Controller field: Assign AnimatorController
```

2. **Set Animator Parameters**:
```csharp
// In AnimationManager or Update
animator.SetFloat("Horizontal", _horizontal);
animator.SetBool("IsGrounded", grounded);
animator.SetTrigger("Jump");
```

3. **Verify State Transitions**:
```
In Animator window:
→ Create states: Idle, Running, Jumping, Falling
→ Add transitions between states
→ Set conditions (e.g., Horizontal > 0.1 → Running)
```

### Wrong Animation Playing

**Symptom**: Animation doesn't match current state

**Cause**: Animator conditions incorrect

**Solution**:

1. **Debug Parameter Values**:
```csharp
Debug.Log($"Horizontal: {animator.GetFloat("Horizontal")}");
Debug.Log($"IsGrounded: {animator.GetBool("IsGrounded")}");
Debug.Log($"Current state: {_stateMachine.GetCurrentState()}");
```

2. **Verify Transition Conditions**:
```
In Animator window:
→ Double-click transition arrow
→ Check condition in Inspector
→ Should match actual parameter values
```

---

## Input Issues

### Input Not Responding

**Symptom**: No input detected at all

**Causes**:
1. Input system not enabled
2. Input actions not enabled in code
3. Input bindings missing

**Solutions**:

1. **Enable Input System Package**:
```
Edit > Project Settings > Player
→ Input System Package: Enabled
→ Restart editor
```

2. **Enable Input in Code**:
```csharp
// In MovementMotor.Start()
_input = new Input();
_input.Enable();  // This line is critical

// Debug
Debug.Log($"Input enabled: {_input.user.valid}");
```

3. **Verify Input Bindings**:
```
Double-click Input.inputactions
→ Check each action has bindings
→ Keyboard > WASD/Space/Shift should be there
```

### Aiming/Looking Not Working

**Symptom**: Mouse look doesn't control aim

**Cause**: Look action misconfigured or mouseActionIsDelta wrong

**Solution**:

```csharp
// Check aiming direction
Debug.Log($"Aiming direction: {movementMotor.aimingDirection.GetValue()}");

// If wrong, check mode
[SerializeField] private bool mouseActionIsDelta = false;
// Try toggling this value

// Check mouse sensitivity
[SerializeField] private float mouseSensitivity = 1f;
// Increase to make aiming more responsive
```

---

## Performance Issues

### Frame Rate Dropping

**Symptom**: Stuttering or low FPS

**Causes**:
1. Raycasts too frequent or long distance
2. Object pooling not working
3. Too many debug logs

**Solutions**:

1. **Reduce Raycast Distance**:
```csharp
// In MovementConfig
public float groundDistance = 0.1f;  // Keep small
// Too large = slower raycasts
```

2. **Verify Object Pooling**:
```csharp
// Check projectile pool usage
Debug.Log($"Active projectiles: {projectilePool.GetActiveCount()}");
Debug.Log($"Pool size: {projectilePool.GetPoolSize()}");

// If all slots used, projectiles created/destroyed each frame (slow)
// Solution: Increase pool size
```

3. **Remove Debug Logs**:
```csharp
// In release build, remove or conditionalize
#if UNITY_EDITOR
    Debug.Log("Debug message");
#endif
```

---

## Data Layer Issues

### Data Not Initializing

**Symptom**: Warnings about missing data in DataWarehouse

**Cause**: DataManager not in scene or not running

**Solution**:

```
Scene should contain:
→ DataManager GameObject
→ With DataManager script component
→ MovementConfig assigned in inspector
→ WeaponConfigs assigned in inspector

In Start():
→ DataWarehouse.Instance should be initialized
→ All data should be stored
```

### Configuration Changes Not Applied

**Symptom**: Changing config in inspector doesn't affect gameplay

**Cause**: Not reading from DataWarehouse or not cached correctly

**Solution**:

```csharp
// Always read from DataWarehouse
var config = DataWarehouse.Instance.GetData<MovementConfig>("movement_config");
float speed = config.speed;

// Or cache reference at start
private MovementConfig _config;

void Start()
{
    _config = DataWarehouse.Instance.GetData<MovementConfig>("movement_config");
}

void Update()
{
    float speed = _config.speed;  // Use cached reference
}
```

---

## Combat Issues

### Weapon Won't Fire

**Symptom**: Mouse click doesn't fire weapon

**Causes**:
1. Fire input not bound
2. No weapon equipped
3. Cooldown still active

**Solutions**:

1. **Bind Fire Input**:
```
Double-click Input.inputactions
→ Add fire action or check Fire binding
→ Typically: Mouse Click or Gamepad Trigger
```

2. **Verify Weapon**:
```csharp
var weapon = weaponManager.GetCurrentWeapon();
Debug.Log($"Current weapon: {weapon?.weaponName ?? "None"}");
```

3. **Check Fire Cooldown**:
```csharp
Debug.Log($"Can fire: {weaponManager.CanFire()}");
Debug.Log($"Fire cooldown: {weaponManager.GetFireCooldown()}");
```

### Projectiles Not Damaging

**Symptom**: Hit target but no damage applied

**Causes**:
1. Target doesn't implement IDamageable
2. Projectile layer collision wrong
3. Damage amount = 0

**Solutions**:

1. **Implement IDamageable**:
```csharp
public class Enemy : MonoBehaviour, IDamageable
{
    public void TakeDamage(float damage, float knockback, Vector3 direction)
    {
        health -= damage;
        if (health <= 0) Die();
    }
}
```

2. **Check Collision**:
```
Target GameObject must have collider
Projectile must collide with target layer
Check collision matrix in physics settings
```

3. **Verify Damage Amount**:
```csharp
// In WeaponConfig
public float projectileDamage = 10.0f;  // Should be > 0
```

---

## Debugging Checklist

When troubleshooting any issue:

- [ ] Check error console for exceptions
- [ ] Enable Scene view gizmos (eye icon > Gizmos)
- [ ] Add Debug.Log() statements around problem area
- [ ] Verify expected state in Inspector during Play
- [ ] Check all GameObjects have required components
- [ ] Verify all fields in Inspector are assigned
- [ ] Look for physics debug visualization issues
- [ ] Test in clean scene to isolate problems
- [ ] Compare with Demo scene working setup

---

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for setup help and [API_REFERENCE.md](./API_REFERENCE.md) for API documentation.

