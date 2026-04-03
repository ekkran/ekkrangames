# API Reference

Quick reference for public APIs in the Platformer Character Controller.

## MovementMotor

Main character controller managing locomotion and physics.

### Public Properties

```csharp
// Observable state fields
public Observer<float> horizontal;           // Current horizontal input (-1 to 1)
public Observer<float> vertical;             // Current vertical input (-1 to 1)
public Observer<bool> grounded;              // Is character on ground?
public Observer<bool> hanging;               // Is character on wall?
public Observer<bool> dashing;               // Is character dashing?
public Observer<float> position;             // Character X position
public Observer<float> facingDirection;      // -1 or 1 (left or right)
public Observer<Vector2> aimingDirection;    // Normalized aim direction
```

### Public Methods

```csharp
// Access current state
public bool IsGrounded();
public bool IsAirborne();
public bool IsDashing();
public Vector3 GetMomentum();
public Vector3 GetMovementVelocity();

// Manual control
public void Jump();
public void Dash();
public void SetMovementDirection(int direction); // -1 or 1
```

### Public Events

```csharp
// Movement events
public UnityEvent<Vector3> onDash;           // Triggered when dash starts
public UnityEvent onJump;                    // Triggered when jump starts
public UnityEvent onLand;                    // Triggered when landing
public UnityEvent<Vector3> onWallAttached;   // Triggered when attaching to wall
```

### Configuration

```csharp
// Via inspector
[SerializeField] private MovementConfig mc;  // Main configuration

// Aiming options
[SerializeField] private float mouseSensitivity = 1f;
[SerializeField] private bool invertMouseY = false;
[SerializeField] private bool enableMouseSmoothing = true;
[SerializeField] private float mouseSmoothing = 0.05f;
[SerializeField] private bool mouseActionIsDelta = false;
```

---

## CombatController

Manages weapons, firing, and combat state.

### Public Methods

```csharp
// Weapon management
public void FireWeapon();
public void SwitchWeapon(int index);
public void EquipWeapon(WeaponConfig config);
public WeaponConfig GetCurrentWeapon();
public List<WeaponConfig> GetWeaponInventory();
public bool CanFire();

// Damage
public void TakeDamage(float damage);
public void ApplyKnockback(Vector3 direction, float force);

// Status
public float GetHealth();
public float GetMaxHealth();
public bool IsDead();
```

### Public Events

```csharp
// Combat events
public UnityEvent<float> onDamageReceived;   // Damage amount parameter
public UnityEvent onWeaponFired;             // Weapon fired
public UnityEvent<int> onWeaponSwitched;     // Weapon switched (index)
```

### Configuration

```csharp
// Weapon inventory setup
[SerializeField] private List<WeaponConfig> weaponInventory;

// Health settings
[SerializeField] private float maxHealth = 100f;
[SerializeField] private float iframesDuration = 0.5f;
```

---

## Health

Component for health tracking and damage state.

### Public Methods

```csharp
// Health queries
public float GetHealth();
public float GetMaxHealth();
public float GetHealthPercentage();
public bool IsDead();
public bool IsInvulnerable();

// Health modification
public void TakeDamage(float damage);
public void Heal(float amount);
public void Die();
public void Revive(float healthAmount = -1);

// Iframe control
public void StartIframes(float duration);
public void EndIframes();
```

### Public Properties

```csharp
public HealthEvents healthEvents;  // Container for health events
```

### Health Events

```csharp
public class HealthEvents
{
    public UnityEvent<float> OnDamaged;     // Damage amount
    public UnityEvent<float> OnHealed;      // Heal amount
    public UnityEvent OnDeath;              // No parameters
    public UnityEvent OnFullHealth;         // No parameters
}
```

### Observable

```csharp
public Observer<float> healthChanged;       // Subscribe to health updates
```

---

## WeaponManager

Manages weapon inventory and firing.

### Public Methods

```csharp
// Weapon management
public void AddWeapon(WeaponConfig config);
public void RemoveWeapon(int index);
public void SwitchWeapon(int index);
public void FireWeapon();

// Queries
public WeaponConfig GetCurrentWeapon();
public WeaponConfig GetWeapon(int index);
public List<WeaponConfig> GetInventory();
public int GetCurrentWeaponIndex();
public bool CanFire();
public float GetFireCooldown();
```

### Public Events

```csharp
public UnityEvent<int> onWeaponSwitched;     // Weapon switched
public UnityEvent onWeaponFired;             // Weapon fired
public UnityEvent<WeaponConfig> onWeaponAdded;
public UnityEvent<int> onWeaponRemoved;
```

---

## RaycastSensor

Raycast-based collision detection component.

### Public Methods

```csharp
// Configuration
public void SetCastOrigin(Vector3 worldPosition);
public void SetCastDistance(float distance);
public void SetCastDirection(CastDirection direction);
public void SetWorldDirection(Vector3 worldDirection);
public void ClearWorldDirection();

// Casting
public bool Cast(LayerMask layerMask, 
    QueryTriggerInteraction queryTrigger = QueryTriggerInteraction.Ignore);

// Results
public bool HasDetectedHit();
public float GetDistance();
public RaycastHit GetHit();
public Vector3 GetHitPoint();
public Vector3 GetHitNormal();
public Collider GetHitCollider();
```

### Cast Directions

```csharp
public enum CastDirection
{
    Up,      // +Y
    Down,    // -Y
    Left,    // +X
    Right,   // -X
    Forward, // +Z
    Back     // -Z
}
```

---

## MovementConfig (ScriptableObject)

Configuration for character movement parameters.

### Public Fields

```csharp
// Movement
public float speed = 8f;
public float gravity = 25f;
public LayerMask ground;
public float groundDistance = 0.1f;
public float airFriction = 0.95f;
public float groundFriction = 0.85f;

// Jump
public float maxJumpTime = 0.4f;
public float minJumpTime = 0.1f;
public float jumpForce = 15f;
public float highJumpForce = 20f;
public float coyoteTime = 0.15f;
public float jumpBuffer = 0.05f;
public float airControlRate = 0.8f;

// Crouch
public float crouchColliderHeight = 1.5f;
public float crouchColliderCenter = 0.75f;

// Wall Mechanics
public float wallGravity = 8f;
public float wallJumpForce = 18f;
public float wallReattachCooldown = 0.2f;
public float wallAttachVerticalThreshold = 2f;

// Dash
public float dashForce = 30f;
public float dashDuration = 0.3f;
public float dashCooldown = 0.5f;
```

---

## WeaponConfig (ScriptableObject)

Configuration for individual weapons.

### Public Fields

```csharp
// Weapon Info
public string weaponName = "Weapon";

// Firing
public float fireRate = 1f;           // Shots per second or seconds between shots
public float projectileDamage = 10f;
public float projectileSpeed = 30f;
public float projectileSize = 1f;

// Knockback
public float knockbackForce = 5f;
public float knockbackDuration = 0.1f;

// Spread
public float spreadAngle = 0f;
public int projectilesPerShot = 1;
```

---

## CurrentMoveSet

Runtime capability tracking.

### Public Properties

```csharp
public bool CanHighJump { get; set; }
public int MaxConsecutiveJumps { get; set; }
public bool CanWallJump { get; set; }
public bool CanDash { get; set; }
```

### Usage

```csharp
var moveSet = DataWarehouse.Instance.GetData<CurrentMoveSet>("current_move_set");
moveSet.CanDash = true;  // Enable dash
moveSet.MaxConsecutiveJumps = 2;  // Enable double jump
```

---

## DataWarehouse (Singleton)

Centralized data storage system.

### Public Methods

```csharp
// Access
public static DataWarehouse Instance { get; }

// Data management
public void StoreData<T>(string key, T data);
public T GetData<T>(string key);
public bool HasData(string key);
public void RemoveData(string key);
public void ClearAllData();
```

### Usage

```csharp
// Get singleton instance
var warehouse = DataWarehouse.Instance;

// Store data
warehouse.StoreData("my_data", myObject);

// Retrieve data
var data = warehouse.GetData<MyType>("my_data");

// Check existence
if (warehouse.HasData("key"))
{
    var value = warehouse.GetData<MyType>("key");
}
```

---

## Projectile

Projectile behavior and lifecycle.

### Public Methods

```csharp
// Initialization
public void Initialize(Vector3 position, Vector3 direction, 
    float speed, float damage);
public void Launch();

// Control
public void Deactivate();
public void SetDirection(Vector3 direction);
public void SetSpeed(float speed);
public void SetDamage(float damage);

// Queries
public bool IsActive();
public Vector3 GetPosition();
public Vector3 GetVelocity();
```

### Events

```csharp
public UnityEvent<Vector3, Collider> onHit;  // Hit position and collider
public UnityEvent onDeactivated;              // Returned to pool
```

---

## IDamageable Interface

Implement on objects that can receive damage.

### Interface

```csharp
public interface IDamageable
{
    void TakeDamage(float damage, float knockbackForce, Vector3 knockbackDirection);
}
```

### Implementation Example

```csharp
public class DamageableObject : MonoBehaviour, IDamageable
{
    private float health = 100f;
    
    public void TakeDamage(float damage, float knockbackForce, Vector3 knockbackDirection)
    {
        health -= damage;
        
        // Apply knockback if Rigidbody exists
        if (TryGetComponent<Rigidbody>(out var rb))
        {
            rb.velocity += knockbackDirection * knockbackForce;
        }
        
        if (health <= 0)
            Die();
    }
    
    private void Die()
    {
        Destroy(gameObject);
    }
}
```

---

## IState Interface

Implement custom movement or behavior states.

### Interface

```csharp
public interface IState
{
    void OnEnter();
    void OnExit();
    void Tick();  // Optional per-frame update
}
```

### Implementation Example

```csharp
public class CustomState : IState
{
    private MovementMotor controller;
    
    public CustomState(MovementMotor controller)
    {
        this.controller = controller;
    }
    
    public void OnEnter()
    {
        Debug.Log("Entering custom state");
    }
    
    public void OnExit()
    {
        Debug.Log("Exiting custom state");
    }
    
    public void Tick()
    {
        // Per-frame state logic
    }
}
```

---

## StateMachine

Finite state machine framework.

### Public Methods

```csharp
// State management
public void SetState(IState state);
public IState GetCurrentState();
public IState GetPreviousState();

// Transitions
public void AddTransition(IState from, IState to, Func<bool> condition);
public void AddAnyTransition(IState to, Func<bool> condition);

// Updates
public void Update();
public void FixedUpdate();

// Queries
public bool IsInState<T>() where T : IState;
public bool IsInState(IState state);
```

---

## Observable<T> Pattern

Generic observable for state changes.

### Public Methods

```csharp
public void Subscribe(System.Action<T> action);
public void Unsubscribe(System.Action<T> action);
public void NotifyObservers(T value);
public T GetValue();
```

### Usage

```csharp
// Subscribe to changes
movementMotor.grounded.Subscribe(isGrounded =>
{
    Debug.Log($"Grounded: {isGrounded}");
});

// Notify observers
grounded.NotifyObservers(true);
```

---

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for usage examples and [ARCHITECTURE.md](./ARCHITECTURE.md) for system overview.

