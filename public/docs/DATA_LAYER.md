# Data Layer and Configuration System

## Overview

The data layer provides a centralized, type-safe system for managing configuration and runtime data. It follows the Singleton pattern with the `DataWarehouse` class providing global access to all data.

## DataWarehouse (Singleton)

The `DataWarehouse` class provides centralized data storage and retrieval.

### Purpose

- Single point of access for all configuration and runtime data
- Type-safe generic API for storing/retrieving any data type
- Loaded at startup with essential configuration
- Accessible from any system without direct references

### Singleton Pattern

```csharp
// Access anywhere in code:
var warehouse = DataWarehouse.Instance;

// Get or store data:
warehouse.StoreData("key", data);
var retrievedData = warehouse.GetData<DataType>("key");
```

### Key-Value Storage

Data stored as key-value pairs with generic type support:

```csharp
public void StoreData<T>(string key, T data);
public T GetData<T>(string key);
public bool HasData(string key);
public void RemoveData(string key);
```

**Usage Examples**:

```csharp
// Store movement configuration
warehouse.StoreData("movement_config", movementConfig);

// Retrieve weapon data
var weaponData = warehouse.GetData<WeaponData>("player_weapon_data");

// Check if data exists
if (warehouse.HasData("current_move_set"))
{
    var moveSet = warehouse.GetData<CurrentMoveSet>("current_move_set");
}

// Remove data
warehouse.RemoveData("temp_key");
```

### Initialization Sequence

DataWarehouse is initialized early with essential configuration:

```csharp
// In DataManager.InitializeDataWarehouse():
warehouse.StoreData("movement_config", movementConfig);
warehouse.StoreData("current_move_set", new CurrentMoveSet());
warehouse.StoreData("player_weapon_data", new WeaponData());
// ... additional data storage
```

---

## Configuration System

### ScriptableObject Patterns

Configuration uses Unity ScriptableObjects for easy inspector editing and asset management.

#### MovementConfig

**Location**: Assets/Platformer Character Controller/Scripts/Character/Movement/

**Creation**: Right-click > Create > Character > MovementConfig

**Scope**: Global character movement settings

**Structure**:
```
MovementConfig (ScriptableObject)
├── Movement Parameters
│   ├── speed
│   ├── gravity
│   ├── groundDistance
│   ├── groundFriction
│   └── airFriction
├── Jump Parameters
│   ├── maxJumpTime
│   ├── minJumpTime
│   ├── jumpForce
│   ├── highJumpForce
│   ├── coyoteTime
│   ├── jumpBuffer
│   └── airControlRate
├── Crouch Parameters
│   ├── crouchColliderHeight
│   └── crouchColliderCenter
├── Wall Mechanics
│   ├── wallGravity
│   ├── wallJumpForce
│   ├── wallReattachCooldown
│   └── wallAttachVerticalThreshold
└── Dash Parameters
    ├── dashForce
    ├── dashDuration
    └── dashCooldown
```

**Reference in Scene**:
- Assign to MovementMotor's `mc` field in inspector
- MovementMotor reads configuration on Start()

**Runtime Access**:
```csharp
// Via DataWarehouse
var movementConfig = DataWarehouse.Instance.GetData<MovementConfig>("movement_config");

// Via direct reference
movementConfig.speed;      // Current speed setting
movementConfig.gravity;    // Current gravity setting
```

#### WeaponConfig

**Location**: Assets/Platformer Character Controller/Scripts/Character/Combat System/Weapon/

**Creation**: Right-click > Create > Character > WeaponConfig

**Scope**: Individual weapon settings

**Structure**:
```
WeaponConfig (ScriptableObject)
├── Weapon Info
│   └── weaponName
├── Firing
│   ├── fireRate
│   ├── projectileDamage
│   ├── projectileSpeed
│   └── projectileSize
├── Knockback
│   ├── knockbackForce
│   └── knockbackDuration
└── Spread
    ├── spreadAngle
    └── projectilesPerShot
```

**Runtime Access**:
```csharp
// Via WeaponManager
var currentWeapon = weaponManager.GetCurrentWeapon();
currentWeapon.fireRate;           // Fire rate setting
currentWeapon.projectileDamage;   // Damage per shot

// Via DataWarehouse
var weaponData = DataWarehouse.Instance.GetData<WeaponData>("player_weapon_data");
```

#### Custom Configuration Pattern

To create new configuration:

```csharp
[CreateAssetMenu(fileName = "CustomConfig", menuName = "Character/CustomConfig")]
public class CustomConfig : ScriptableObject
{
    [Header("Section 1")]
    public float parameter1;
    public int parameter2;
    
    [Header("Section 2")]
    public string parameter3;
    public LayerMask parameter4;
}

// Reference in component:
[SerializeField] private CustomConfig config;

// Store in DataWarehouse:
DataWarehouse.Instance.StoreData("custom_config", config);

// Retrieve from DataWarehouse:
var customConfig = DataWarehouse.Instance.GetData<CustomConfig>("custom_config");
```

---

## Data Types

### CurrentMoveSet

Tracks available character capabilities at runtime.

**Purpose**: Feature gates that can be modified during gameplay

**Definition**:
```csharp
public class CurrentMoveSet
{
    public bool CanHighJump { get; set; } = false;
    public int MaxConsecutiveJumps { get; set; } = 0;
    public bool CanWallJump { get; set; } = false;
    public bool CanDash { get; set; } = false;
}
```

**Usage Examples**:

```csharp
// Get current move set
var moveSet = DataWarehouse.Instance.GetData<CurrentMoveSet>("current_move_set");

// Check capability
if (moveSet.CanDash)
{
    // Allow dash
}

// Unlock feature during gameplay
moveSet.CanWallJump = true;  // Unlock wall jumping

// Restrict feature
moveSet.CanDash = false;     // Disable dash temporarily
```

**Typical Progression**:
```
Starting:
- CanHighJump: false
- MaxConsecutiveJumps: 1
- CanWallJump: false
- CanDash: false

After tutorial:
- CanHighJump: true
- MaxConsecutiveJumps: 2
- CanWallJump: true
- CanDash: true
```

### WeaponData

Runtime weapon inventory and state.

**Definition**:
```csharp
public class WeaponData
{
    public int weaponIndex { get; set; }           // Currently equipped
    public List<WeaponConfig> inventory { get; set; }
    public float ammo { get; set; }                // Current ammo
    public float reloadTime { get; set; }          // Reload cooldown
}
```

**Usage Examples**:

```csharp
var weaponData = DataWarehouse.Instance.GetData<WeaponData>("player_weapon_data");

// Get current weapon
var currentWeapon = weaponData.inventory[weaponData.weaponIndex];

// Switch weapons
weaponData.weaponIndex = 1;

// Track ammo
weaponData.ammo -= 1;  // Use ammo

// Reload
weaponData.reloadTime = currentWeapon.fireRate;
```

### Custom Data Types

Extend with game-specific data:

```csharp
public class GameStateData
{
    public int level;
    public float playtime;
    public List<string> unlockedAbilities;
    public Dictionary<string, int> collectedItems;
}

// Store
var gameState = new GameStateData 
{ 
    level = 1, 
    playtime = 120.5f 
};
DataWarehouse.Instance.StoreData("game_state", gameState);

// Retrieve
var state = DataWarehouse.Instance.GetData<GameStateData>("game_state");
state.level++;  // Progress
```

---

## Data Readers

Data readers provide typed access to stored data with validation.

### IDataReader Interface

```csharp
public interface IDataReader
{
    T GetData<T>(string key);
    void ValidateData();
}
```

### MoveSetDataReader

Reads and validates CurrentMoveSet data:

```csharp
public class MoveSetDataReader : IDataReader
{
    private DataWarehouse _warehouse;
    
    public T GetData<T>(string key)
    {
        return _warehouse.GetData<T>(key);
    }
    
    public void ValidateData()
    {
        var moveSet = _warehouse.GetData<CurrentMoveSet>("current_move_set");
        if (moveSet == null)
            throw new InvalidOperationException("MoveSet data not initialized");
    }
}

// Usage
var reader = new MoveSetDataReader();
var moveSet = reader.GetData<CurrentMoveSet>("current_move_set");
```

### WeaponDataReader

Reads and validates WeaponData:

```csharp
public class WeaponDataReader : IDataReader
{
    public T GetData<T>(string key)
    {
        // Validated retrieval
    }
    
    public void ValidateData()
    {
        var weaponData = _warehouse.GetData<WeaponData>("player_weapon_data");
        if (weaponData?.inventory == null || weaponData.inventory.Count == 0)
            throw new InvalidOperationException("Weapon inventory not initialized");
    }
}
```

---

## Data Management (DataManager)

The DataManager component initializes and manages the data layer.

### Responsibilities

- Initialize DataWarehouse at startup
- Load configuration ScriptableObjects
- Populate default data
- Validate data integrity
- Provide data access utilities

### Initialization Pattern

```csharp
public class DataManager : MonoBehaviour
{
    [SerializeField] private MovementConfig movementConfig;
    [SerializeField] private List<WeaponConfig> weaponConfigs;
    
    private void Start()
    {
        InitializeDataWarehouse();
        ValidateEssentialData();
    }
    
    private void InitializeDataWarehouse()
    {
        var warehouse = DataWarehouse.Instance;
        
        // Store configurations
        warehouse.StoreData("movement_config", movementConfig);
        warehouse.StoreData("weapon_configs", weaponConfigs);
        
        // Initialize runtime data
        warehouse.StoreData("current_move_set", new CurrentMoveSet 
        { 
            MaxConsecutiveJumps = 1,
            CanWallJump = true
        });
        
        warehouse.StoreData("player_weapon_data", new WeaponData 
        { 
            inventory = weaponConfigs,
            weaponIndex = 0
        });
    }
    
    private void ValidateEssentialData()
    {
        var warehouse = DataWarehouse.Instance;
        
        if (!warehouse.HasData("movement_config"))
            Debug.LogError("MovementConfig not loaded!");
            
        if (!warehouse.HasData("current_move_set"))
            Debug.LogError("CurrentMoveSet not initialized!");
    }
}
```

---

## Runtime Data Modification

### Example: Unlocking Features

```csharp
// Listen for level progression event
public class LevelProgression : MonoBehaviour
{
    public void OnLevelComplete(int level)
    {
        var moveSet = DataWarehouse.Instance.GetData<CurrentMoveSet>("current_move_set");
        
        switch (level)
        {
            case 1:
                moveSet.CanHighJump = true;
                moveSet.MaxConsecutiveJumps = 2;
                break;
            case 2:
                moveSet.CanWallJump = true;
                break;
            case 3:
                moveSet.CanDash = true;
                break;
        }
    }
}
```

### Example: Dynamic Weapon Switching

```csharp
public class WeaponProgression : MonoBehaviour
{
    public void CollectWeapon(WeaponConfig newWeapon)
    {
        var weaponData = DataWarehouse.Instance.GetData<WeaponData>("player_weapon_data");
        weaponData.inventory.Add(newWeapon);
        
        // Automatically switch to new weapon
        weaponData.weaponIndex = weaponData.inventory.Count - 1;
    }
}
```

---

## Performance Considerations

### Data Access Optimization

Cache frequent data accesses:

```csharp
// Inefficient: repeated warehouse lookups
void Update()
{
    float speed = DataWarehouse.Instance.GetData<MovementConfig>("movement_config").speed;
    // Use speed...
}

// Efficient: cache reference
private MovementConfig _movementConfig;

void Start()
{
    _movementConfig = DataWarehouse.Instance.GetData<MovementConfig>("movement_config");
}

void Update()
{
    float speed = _movementConfig.speed;  // Direct access
    // Use speed...
}
```

### Memory Management

Clean up large data when no longer needed:

```csharp
// Remove temporary data
public void CleanupLevelData()
{
    DataWarehouse.Instance.RemoveData("level_state");
    DataWarehouse.Instance.RemoveData("enemy_data");
}
```

---

## Best Practices

1. **Use DataWarehouse for global configuration**: Avoids passing references through many systems
2. **Create typed data classes**: Avoid string-based access where possible
3. **Initialize on startup**: Load all essential data in DataManager.Start()
4. **Validate data**: Check data existence before access
5. **Cache references**: Store DataWarehouse data locally to reduce lookups
6. **Use meaningful keys**: Use clear, descriptive key names (e.g., "current_move_set", not "cms")
7. **Document data structure**: Add comments explaining expected data types and usage

---

See [ARCHITECTURE.md](./ARCHITECTURE.md) for system overview and [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for setup instructions.

