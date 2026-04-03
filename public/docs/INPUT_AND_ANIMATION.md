# Input and Animation System Documentation

## Input System

### Modern Input System Integration

The Platformer Character Controller uses Unity's Modern Input System for flexible, rebindable input handling.

#### Input Actions

Input actions are defined in auto-generated `Input.cs` class (derived from InputActionAsset).

**Character Input Map** - Available actions:

```csharp
public struct CharacterActions
{
    public InputAction Move;         // Locomotion input (2D: X=horizontal, Y=vertical)
    public InputAction Jump;         // Jump/special action
    public InputAction Dash;         // Dash ability
    public InputAction Look;         // Aiming/look direction (2D: mouse or analog)
    public InputAction Crouch;       // Crouch action (if implemented)
}
```

#### Default Input Bindings

**Keyboard Layout**:
```
Move:    WASD or Arrow Keys
Jump:    Spacebar
Dash:    Left Shift
Look:    Mouse Move (absolute position)
Crouch:  Left Ctrl
```

**Gamepad Layout** (typical):
```
Move:    Left Stick
Jump:    A (Xbox) / Cross (PlayStation)
Dash:    X (Xbox) / Square (PlayStation)
Look:    Right Stick
Crouch:  B (Xbox) / Circle (PlayStation)
```

### Input Handling in MovementMotor

#### Input Callback Registration

```csharp
private void SetInputCallbacks()
{
    _input = new Input();
    _input.Enable();
    
    _input.Character.Jump.started += Jump_started;      // Jump pressed
    _input.Character.Jump.canceled += Jump_canceled;    // Jump released
    _input.Character.Dash.performed += DashOnPerformed; // Dash pressed
}
```

#### Callback Methods

**Jump Started**:
```csharp
private void Jump_started(InputAction.CallbackContext obj)
{
    // Called when player presses jump button
    // Triggers jump state transition
    // Respects jump count and coyote time
}
```

**Jump Canceled**:
```csharp
private void Jump_canceled(InputAction.CallbackContext obj)
{
    // Called when player releases jump button
    // Ends jump early (respects minimum jump time)
    // Ends jump timer
}
```

**Dash Performed**:
```csharp
private void DashOnPerformed(InputAction.CallbackContext obj)
{
    // Called when player presses dash button
    // Triggers dash state if cooldown ready
    // Can be any direction (uses facing direction)
}
```

#### Continuous Input

**Movement Input** (polled each frame):
```csharp
private void GetHorizontalAxis()
{
    _horizontal = _input.Character.Move.ReadValue<Vector2>().x;
    horizontal.NotifyObservers(_horizontal); // Update observable
}

private void GetVerticalAxis()
{
    _vertical = _input.Character.Move.ReadValue<Vector2>().y;
    vertical.NotifyObservers(_vertical); // Update observable
}
```

**Aiming Input** (polled each frame):
```csharp
private void GetAimingDirection()
{
    Vector2 rawLook = _input.Character.Look.ReadValue<Vector2>();
    
    if (mouseActionIsDelta)
    {
        // Delta mode: accumulate mouse movement
        _aimAccumulator += rawLook;
        _smoothedMouseAim = Vector2.Lerp(
            _smoothedMouseAim, 
            _aimAccumulator, 
            mouseSmoothing
        );
    }
    else
    {
        // Absolute mode: convert screen position to direction
        _smoothedMouseAim = ConvertScreenToWorldDirection(rawLook);
    }
    
    aimingDirection.NotifyObservers(_smoothedMouseAim.normalized);
}
```

### Aiming System

The aiming system provides directional targeting for weapons and ranged abilities.

#### Configuration Options

```csharp
[Header("Aiming Settings")]
[SerializeField] private float mouseSensitivity = 1f;
[SerializeField] private bool invertMouseY = false;
[SerializeField] private bool enableMouseSmoothing = true;
[SerializeField] private float mouseSmoothing = 0.05f;
[SerializeField] private bool mouseActionIsDelta = false;
```

#### Two Aiming Modes

**Absolute Mode** (default):
- Input action provides screen position of mouse
- Converted to world direction from character position
- More intuitive for point-and-click style aiming
- Independent of frame rate

**Delta Mode**:
- Input action provides mouse movement delta
- Accumulates delta each frame
- Suitable for first-person style aiming
- Requires delta input action configuration

#### Output

```csharp
public Observer<Vector2> aimingDirection;  // Normalized aim direction

// Subscribe to aiming changes:
aimingDirection.Subscribe(aim => 
{
    weapon.SetFireDirection(aim);
});
```

### Rebinding System

The Modern Input System supports runtime rebinding.

**Example Rebinding**:
```csharp
var jumpAction = _input.Character.Jump;

// Rebind to new key
var rebindOperation = jumpAction.PerformInteractiveRebinding()
    .WithTargetBinding(bindingIndex)
    .OnMatchWaitForAnotherButtonPress()
    .Start();
```

**Rebinding UI Workflow**:
1. Present rebinding dialog
2. Wait for player input
3. Apply new binding
4. Save to rebinding data
5. Load on startup

---

## Animation System

### AnimationManager Component

Manages animation state and transitions.

**Responsibilities**:
- Synchronize character state to animator parameters
- Trigger animations on events
- Manage animation timing
- Integrate with movement and combat states

### Animation Parameters

**Animator Parameters** (set dynamically):

```csharp
// Movement
animator.SetFloat("Horizontal", horizontal);      // Movement direction
animator.SetBool("IsGrounded", grounded);         // Ground contact
animator.SetBool("IsInAir", !grounded);          // Airborne
animator.SetBool("IsDashing", dashing);          // Dash active
animator.SetBool("IsWallAttached", hanging);     // Wall contact
animator.SetFloat("VerticalVelocity", velocityY); // Jump/fall speed

// Facing
animator.SetInteger("FacingDirection", facingDirection); // -1, 0, 1

// Aiming
animator.SetFloat("AimX", aimingDirection.x);    // Aim direction X
animator.SetFloat("AimY", aimingDirection.y);    // Aim direction Y
```

**Trigger Parameters** (one-shot):

```csharp
animator.SetTrigger("Jump");           // Jump started
animator.SetTrigger("Land");           // Landed on ground
animator.SetTrigger("Dash");           // Dash started
animator.SetTrigger("WallAttach");     // Wall attached
animator.SetTrigger("TakeDamage");     // Damage taken
animator.SetTrigger("Die");            // Character died
animator.SetTrigger("Fire");           // Weapon fired
```

### Animation States & Transitions

**Locomotion Animation State Machine**:

```
        ┌─────────────────┐
        │  Idle / Running │
        └────────┬────────┘
                 │
     ┌───────────┼───────────┐
     │           │           │
     ▼           ▼           ▼
  ┌────────┐ ┌────────┐ ┌────────┐
  │ Jump   │ │ Falling│ │Dashing │
  └────────┘ └────────┘ └────────┘
     │           │           │
     └───────────┼───────────┘
                 │
            ┌────▼─────┐
            │Wall Climb│
            └──────────┘
```

**Idle/Running**:
- Entry: Grounded
- Exit: Jump, Fall, Dash, or Wall
- Parameters: Horizontal input changes animation speed

**Jump**:
- Entry: Jump initiated
- Exit: Land (transition to Idle/Running)
- Duration: Short burst animation

**Falling**:
- Entry: Airborne and moving down
- Exit: Land or Wall attach
- Looped until landing

**Dash**:
- Entry: Dash initiated
- Exit: Dash duration expires
- Direction-based animation (left/right)

**Wall Climb**:
- Entry: Wall attached
- Exit: Wall detached or jump
- Descent speed affects animation speed

### Event-Driven Animations

Key events trigger animations:

**Jump Event** (`onJump`):
```csharp
movementMotor.onJump.AddListener(() => 
{
    animationManager.PlayJumpAnimation();
    animator.SetTrigger("Jump");
});
```

**Landing Event** (`onLand`):
```csharp
movementMotor.onLand.AddListener(() => 
{
    animationManager.PlayLandingAnimation();
    animator.SetTrigger("Land");
});
```

**Dash Event** (`onDash`):
```csharp
movementMotor.onDash.AddListener((direction) => 
{
    animationManager.PlayDashAnimation(direction);
    animator.SetTrigger("Dash");
});
```

**Wall Attach Event** (`onWallAttached`):
```csharp
movementMotor.onWallAttached.AddListener((normal) => 
{
    animationManager.PlayWallAttachAnimation();
    animator.SetTrigger("WallAttach");
});
```

**Damage Event** (from Health):
```csharp
health.healthEvents.OnDamaged += (damage) =>
{
    animationManager.PlayDamageAnimation();
    animator.SetTrigger("TakeDamage");
};
```

**Combat Events**:
```csharp
// Weapon fired
combatController.onWeaponFired.AddListener(() => 
{
    animator.SetTrigger("Fire");
});

// Weapon switched
combatController.onWeaponSwitched.AddListener((index) =>
{
    animator.SetTrigger("SwitchWeapon");
});
```

### Animation Synchronization

**Synchronized with Observable Fields**:

```csharp
// Horizontal movement
movementMotor.horizontal.Subscribe(value =>
{
    animator.SetFloat("Horizontal", value);
});

// Ground state
movementMotor.grounded.Subscribe(value =>
{
    animator.SetBool("IsGrounded", value);
});

// Dash state
movementMotor.dashing.Subscribe(value =>
{
    animator.SetBool("IsDashing", value);
});

// Facing direction
movementMotor.facingDirection.Subscribe(value =>
{
    animator.SetInteger("FacingDirection", (int)value);
});

// Aiming direction
movementMotor.aimingDirection.Subscribe(direction =>
{
    animator.SetFloat("AimX", direction.x);
    animator.SetFloat("AimY", direction.y);
});
```

---

## VFX System

### VFXManager Component

Manages visual effects playback tied to game events.

**Responsibilities**:
- Instantiate or activate VFX prefabs
- Synchronize effects with events
- Manage effect lifetime
- Optimize effect performance (pooling)

### Common VFX Events

```csharp
// Movement VFX
PlayDustEffect(position, direction);        // On landing
PlayDashEffect(position, direction);        // On dash
PlayWallSlideEffect(position);             // While on wall
PlayJumpEffect(position);                  // On jump start

// Combat VFX
PlayMuzzleFlash(weaponPosition);           // On weapon fire
PlayHitEffect(impactPosition, normal);     // On projectile hit
PlayCriticalHitEffect(position);           // On critical damage
PlayExplosion(position, radius);           // On explosion
PlayHeartEffect(position);                 // On healing
```

### VFX Event Integration

```csharp
// Jump effect
movementMotor.onJump.AddListener(() =>
{
    vfxManager.PlayJumpEffect(transform.position);
});

// Weapon fire effect
combatController.onWeaponFired.AddListener(() =>
{
    vfxManager.PlayMuzzleFlash(weaponMuzzlePosition);
});

// Hit effect
projectile.onHit.AddListener((hitPoint, normal) =>
{
    vfxManager.PlayHitEffect(hitPoint, normal);
});

// Damage effect
health.healthEvents.OnDamaged += (damage) =>
{
    vfxManager.PlayDamageFlash();
};
```

---

## Audio System

### SoundManager Component

Manages sound effects and audio playback.

**Responsibilities**:
- Play sound effects on demand
- Manage audio source pooling
- Apply audio settings (volume, pitch)
- Spatial audio positioning

### Common Audio Events

```csharp
// Movement sounds
PlayFootstepSound(position, speed);        // Footstep sfx
PlayJumpSound();                           // Jump sfx
PlayLandingSound(impactForce);             // Landing sfx
PlayWallSlideSound();                      // Wall sliding sfx

// Combat sounds
PlayWeaponFireSound(weaponType);           // Weapon fire
PlayProjectileHitSound(hitType);           // Impact sound
PlayDamageSound();                         // Damage sfx
PlayDeathSound();                          // Death sfx
PlayHealSound();                           // Healing sfx
```

### Audio Configuration

**SoundManager Settings**:
```csharp
[SerializeField] private float masterVolume = 1f;
[SerializeField] private float sfxVolume = 0.8f;
[SerializeField] private float musicVolume = 0.6f;
[SerializeField] private int audioSourcePoolSize = 16;
```

### Audio Event Integration

```csharp
// Jump sound
movementMotor.onJump.AddListener(() =>
{
    soundManager.PlayJumpSound();
});

// Landing sound
movementMotor.onLand.AddListener(() =>
{
    soundManager.PlayLandingSound();
});

// Weapon fire sound
combatController.onWeaponFired.AddListener(() =>
{
    soundManager.PlayWeaponFireSound(currentWeapon.weaponName);
});

// Hit sound
projectile.onHit.AddListener((hitPoint, target) =>
{
    soundManager.PlayProjectileHitSound(hitPoint);
});

// Damage sound
health.healthEvents.OnDamaged += (damage) =>
{
    soundManager.PlayDamageSound();
};
```

### Spatial Audio

Position sounds in 3D space for immersion:

```csharp
AudioSource audioSource = GetAudioSource();
audioSource.transform.position = effectPosition;
audioSource.PlayOneShot(clip);
```

---

## Integration Patterns

### Complete Event Chain Example

Weapon fire → Visual & Audio feedback → Animation update:

```csharp
// 1. User presses fire button
// (Input system triggers dash action)

// 2. WeaponManager fires
public void FireWeapon()
{
    // Spawn projectile
    var projectile = SpawnProjectile(aimDirection);
    
    // 3. Broadcast event
    onWeaponFired.Invoke();
}

// 4. Subscribers react
// Animation:
onWeaponFired.AddListener(() => animator.SetTrigger("Fire"));

// VFX:
onWeaponFired.AddListener(() => vfxManager.PlayMuzzleFlash(gunPosition));

// Audio:
onWeaponFired.AddListener(() => soundManager.PlayFireSound());

// UI:
onWeaponFired.AddListener(() => fireRateDisplay.ShowCooldown());
```

### State-Synchronized Updates

Update animations and effects based on state:

```csharp
void Update()
{
    // Update animation parameters based on current state
    if (IsGrounded && HasHorizontalInput)
    {
        animator.SetFloat("Horizontal", horizontalInput);
        soundManager.PlayFootsteps();
    }
    else if (IsAirborne)
    {
        animator.SetBool("IsInAir", true);
        soundManager.StopFootsteps();
    }
}
```

---

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for setup instructions.

