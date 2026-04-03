# Combat System Documentation

## Overview

The Combat System provides a flexible framework for health management, weapons, projectiles, and damage mechanics. It's designed to be easily extended for various game mechanics through configurable ScriptableObjects and event-based architecture.

## Core Components

### CombatController

The main combat controller component that manages all combat-related functionality.

**Responsibilities**:
- Weapon management and inventory
- Combat state tracking
- Event broadcasting
- Damage application
- Integration with animation/VFX systems

**Public Interface**:
```csharp
public void FireWeapon();              // Trigger current weapon fire
public void SwitchWeapon(int index);   // Switch to weapon by index
public void TakeDamage(float amount);  // Apply damage to character
public void Heal(float amount);        // Restore health
```

**Key Events**:
```csharp
public UnityEvent<float> onDamageReceived;  // Triggered when damaged
public UnityEvent onWeaponFired;            // Triggered when weapon fires
public UnityEvent<int> onWeaponSwitched;    // Triggered when switching weapons
```

### Health System

The `Health` component tracks character health and damage state.

**Features**:
- Health tracking with max health
- Damage application with configurable iframe duration
- Health events (damaged, healed, died)
- Observable health value for UI
- Knockback support

**Public Interface**:
```csharp
public float GetHealth();              // Current health
public float GetMaxHealth();           // Maximum health
public void TakeDamage(float damage);  // Apply damage
public void Heal(float amount);        // Restore health
public bool IsDead();                  // Check if health <= 0
public void Die();                     // Trigger death
```

**Iframe System**:
- Duration: Configurable via scriptable object
- Blocks damage temporarily after taking damage
- Prevents damage spam
- Typical duration: 0.5-1.0 seconds

**Events**:
```csharp
public HealthEvents healthEvents;      // Container for health events

// Access events via:
healthEvents.OnDamaged?.Invoke(damage);
healthEvents.OnHealed?.Invoke(amount);
healthEvents.OnDeath?.Invoke();
```

### WeaponManager

Manages weapon inventory and firing.

**Responsibilities**:
- Weapon inventory tracking
- Weapon equipping/switching
- Weapon firing coordination
- Projectile spawning
- Cooldown management

**Public Interface**:
```csharp
public void EquipWeapon(WeaponConfig config);
public void FireWeapon();
public void SwitchWeapon(int index);
public WeaponConfig GetCurrentWeapon();
public List<WeaponConfig> GetWeaponInventory();
public bool CanFire();                 // Check if weapon ready
```

**Weapon Setup**:
```csharp
// In inspector or code:
List<WeaponConfig> weaponInventory = new List<WeaponConfig>();
weaponInventory.Add(rifleConfig);
weaponInventory.Add(pistolConfig);

// Switch between them:
weaponManager.SwitchWeapon(0);  // Rifle
weaponManager.SwitchWeapon(1);  // Pistol
```

## Configuration System

### WeaponConfig ScriptableObject

Configuration for individual weapons. Create via: `Right-click > Create > Character > WeaponConfig`

**Parameters**:
```csharp
[Header("Weapon Info")]
public string weaponName;              // Display name

[Header("Firing")]
public float fireRate;                 // Rounds per second (or cooldown in seconds)
public float projectileDamage;         // Damage per shot
public float projectileSpeed;          // Projectile velocity
public float projectileSize;           // Projectile scale

[Header("Knockback")]
public float knockbackForce;           // Force applied to hit targets
public float knockbackDuration;        // How long knockback lasts

[Header("Spread")]
public float spreadAngle;              // Cone spread for inaccuracy
public int projectilesPerShot;         // Multiple projectiles per shot
```

### Weapon Variants

**Example Configurations**:

**Rifle** (high fire rate):
```
fireRate: 5.0       // 5 shots per second
damage: 10.0
speed: 30.0
knockback: 5.0
```

**Sniper** (slow, high damage):
```
fireRate: 0.5       // 1 shot every 2 seconds
damage: 50.0
speed: 50.0
knockback: 15.0
```

**Shotgun** (spread):
```
fireRate: 1.0
damage: 15.0
speed: 25.0
spreadAngle: 30.0
projectilesPerShot: 8
knockback: 20.0
```

## Projectile System

### Projectile Component

Manages individual projectile behavior.

**Features**:
- Velocity-based movement
- Lifetime management
- Collision detection
- Damage application
- Pooling support

**Public Interface**:
```csharp
public void Initialize(Vector3 position, Vector3 direction, float speed, float damage);
public void Deactivate();              // Return to pool
public void OnHit(Collider other);     // Handle collision
```

**Damage Application**:
```csharp
// When projectile hits target:
if (other.TryGetComponent<IDamageable>(out var damageable))
{
    damageable.TakeDamage(damage, knockbackForce, direction);
}
```

### ProjectilePool

Object pooling system for projectiles to reduce garbage collection.

**Pooling Mechanics**:
- Pre-allocates projectile instances
- Reuses inactive projectiles for new shots
- Improves performance with rapid firing
- Reduces GC pressure

**Usage**:
```csharp
// Automatically handled by WeaponManager
// Projectiles spawned from pool when fired
// Returned to pool when deactivated
```

**Pool Configuration**:
```csharp
[SerializeField] private int initialPoolSize = 50;  // Pre-allocated count
[SerializeField] private GameObject projectilePrefab;
```

## Damage & Health

### IDamageable Interface

Interface for any object that can receive damage.

**Implementation**:
```csharp
public interface IDamageable
{
    void TakeDamage(float damage, float knockbackForce, Vector3 knockbackDirection);
}
```

**Example Implementation**:
```csharp
public class DamageableObject : MonoBehaviour, IDamageable
{
    public void TakeDamage(float damage, float knockbackForce, Vector3 direction)
    {
        // Apply damage logic
        health -= damage;
        
        // Apply knockback if Rigidbody exists
        if (rb != null)
        {
            rb.velocity += direction * knockbackForce;
        }
    }
}
```

### Knockback System

Applies force to targets when hit by projectiles.

**Mechanics**:
- Direction: From projectile to target (or specified direction)
- Force: Configured in WeaponConfig
- Duration: Optional knockback momentum decay over time
- Physics-based: Applied to Rigidbody

**Configuration**:
```csharp
public float knockbackForce;    // How much force to apply
public float knockbackDuration; // How long force is applied
```

### Health Recovery System

Optional system for health regeneration/recovery mechanics.

**IHealthRecovery Interface**:
```csharp
public interface IHealthRecovery
{
    void RecoverHealth(float amount);
    bool CanRecover();
}
```

**HealthRecoveryTable**:
Configuration ScriptableObject for recovery mechanics.

**EnergyBasedRecovery** (Example):
```csharp
- Recovery rate per second
- Energy cost per recovery
- Maximum recovery amount
- Cooldown between recovery
```

**Usage**:
```csharp
if (recoverySystem.CanRecover())
{
    recoverySystem.RecoverHealth(10f);
}
```

## Data Management

### WeaponData

Runtime data structure for current weapon state.

**Fields**:
```csharp
public int weaponIndex;              // Currently equipped weapon
public List<WeaponConfig> inventory; // Available weapons
public float ammo;                   // Current ammo (if tracked)
public float reloadTime;             // Reload cooldown
```

### Combat State Tracking

**Via DataWarehouse**:
```csharp
// Store combat data
DataWarehouse.Instance.StoreData("player_weapon_data", weaponData);

// Retrieve combat data
var weaponData = DataWarehouse.Instance.GetData<WeaponData>("player_weapon_data");
```

## Event System

### Health Events

Events triggered by health changes:

```csharp
public class HealthEvents
{
    public UnityEvent<float> OnDamaged;    // Damage amount parameter
    public UnityEvent<float> OnHealed;     // Heal amount parameter
    public UnityEvent OnDeath;             // No parameters
    public UnityEvent OnFullHealth;        // No parameters
}
```

**Usage**:
```csharp
health.healthEvents.OnDamaged?.Invoke(damageAmount);

// Subscribe to events:
health.healthEvents.OnDamaged += OnHealthChanged;
void OnHealthChanged(float damage)
{
    Debug.Log($"Took {damage} damage!");
}
```

### Combat Events

Events triggered by combat actions:

```csharp
public UnityEvent<float> onDamageReceived;   // From CombatController
public UnityEvent onWeaponFired;             // Weapon fired
public UnityEvent<int> onWeaponSwitched;     // Weapon switched (index param)
```

## Integration Points

### Animation Integration

Trigger animations on combat events:

```csharp
// Connect to CombatController events:
combatController.onWeaponFired.AddListener(() => 
{
    animationManager.PlayAttackAnimation();
});

health.healthEvents.OnDamaged += (damage) =>
{
    animationManager.PlayHitAnimation();
};
```

### VFX/SFX Integration

Trigger effects on combat events:

```csharp
// Weapon fire VFX:
onWeaponFired.AddListener(() => 
{
    vfxManager.PlayMuzzleFlash();
    soundManager.PlayFireSound();
});

// Damage VFX:
OnDamaged += (damage) =>
{
    vfxManager.PlayHitEffect();
    soundManager.PlayHitSound();
};
```

### UI Integration

Display combat state on UI:

```csharp
// Health bar:
health.healthChanged.Subscribe(current => 
{
    healthBar.fillAmount = current / health.maxHealth;
});

// Weapon display:
weaponManager.onWeaponSwitched.AddListener((index) =>
{
    weaponNameText.text = weaponManager.GetCurrentWeapon().weaponName;
});
```

## Combat Scenarios

### Scenario 1: Enemy Takes Damage

```
Player fires weapon
→ Projectile spawned from pool
→ Projectile travels toward enemy
→ Projectile collides with enemy
→ OnHit() called
→ Enemy.TakeDamage() called
→ Health reduced
→ OnDamaged event triggered
→ Animation/VFX plays
→ Projectile returned to pool
→ UI health bar updates
```

### Scenario 2: Weapon Switch

```
Player input: Switch weapon
→ WeaponManager.SwitchWeapon(newIndex) called
→ Current weapon deactivated
→ New weapon activated
→ onWeaponSwitched event triggered
→ Animation plays
→ UI updates weapon display
```

### Scenario 3: Health Recovery

```
Recovery triggered
→ Health.Heal(amount) called
→ Current health increased (capped at max)
→ OnHealed event triggered
→ UI health bar animates recovery
→ Recovery cooldown started
```

## Damage Mechanics

### Damage Types (Extensible)

Through IDamageable interface, support any damage type:

```csharp
// Standard damage
damage.Apply(10f);  // Generic damage

// Typed damage (via interface extension)
interface ITypedDamageable : IDamageable
{
    void TakeDamage(float amount, DamageType type);
}

// Types: Bullet, Fire, Poison, Magic, etc.
```

### Damage Mitigation

Extend Health/IDamageable for damage reduction:

```csharp
// Armor system
float armorDefense = 0.2f;  // 20% reduction
float actualDamage = baseDamage * (1 - armorDefense);

// Type resistance
float resistance = GetResistance(damageType);
float actualDamage = baseDamage * (1 - resistance);
```

### Critical Hits

Extend damage system for critical mechanics:

```csharp
float critChance = 0.25f;   // 25% chance
float critMultiplier = 2.0f; // 2x damage

if (Random.value < critChance)
{
    actualDamage *= critMultiplier;
    PlayCriticalEffect();
}
```

## Performance Optimization

### Projectile Pooling

Improves performance with frequent projectile spawning:

```csharp
// Benefits:
- Eliminates instantiate/destroy per shot
- Reduces garbage collection
- Pre-allocated memory
- Typical pool size: 50-200 projectiles
```

### Damage Calculation

Keep damage calculations lightweight:

```csharp
// Cache values
float cachedMaxHealth = health.GetMaxHealth();
float cachedDamageMultiplier = weapon.damageMultiplier;

// Use cached values in hot paths
float actualDamage = baseDamage * cachedDamageMultiplier;
```

## Debugging Combat

### Health Monitoring

```csharp
// Subscribe to health changes
health.healthChanged.Subscribe(current =>
{
    Debug.Log($"Health: {current}/{health.GetMaxHealth()}");
});
```

### Weapon State Logging

```csharp
// Log weapon switches
onWeaponSwitched.AddListener((index) =>
{
    Debug.Log($"Switched to: {weaponInventory[index].weaponName}");
});
```

### Projectile Tracking

```csharp
// Log projectile spawning
onWeaponFired.AddListener(() =>
{
    Debug.Log($"Projectiles in use: {projectilePool.GetActiveCount()}");
});
```

---

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for setup instructions and [API_REFERENCE.md](./API_REFERENCE.md) for detailed API documentation.

