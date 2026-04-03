# Prefabs and Demo Content

## Included Prefabs

The Platformer Character Controller package includes ready-to-use prefabs for quick scene setup.

### Character Prefabs

#### Character.prefab

**Location**: `Assets/Platformer Character Controller/Prefabs/Character.prefab`

**Description**: Main playable character prefab with all systems integrated.

**Components**:
- **MovementMotor**: Handles locomotion and state machine
- **CombatController**: Manages weapons and combat
- **Rigidbody**: Physics simulation (Dynamic, no gravity)
- **CapsuleCollider**: Character collision shape
- **Animator**: Animation state machine
- **AnimationManager**: Animation synchronization
- **VFXManager**: Visual effects playback
- **SoundManager**: Audio management
- **WeaponManager**: Weapon inventory and firing

**Configuration**:
```
Transform
├── Position: (0, 0, 0) - adjustable
├── Rotation: (0, 0, 0)
└── Scale: (1, 1, 1) - adjust for size

Rigidbody
├── Mass: 1
├── Gravity: Off (controlled by MovementMotor)
├── Constraints: Freeze Rotation (X, Y, Z)
└── Collision Detection: Continuous

CapsuleCollider
├── Radius: 0.5
├── Height: 2.0
├── Center: (0, 1, 0)
└── Enabled: True
```

**Required Setup**:
1. Assign MovementConfig ScriptableObject
2. Set Ground layer in MovementConfig
3. Optionally assign AnimatorController
4. Create and assign WeaponConfigs to inventory

**Usage**:
```csharp
// Instance in scene
Character character = Instantiate(characterPrefab);

// Access components
var motor = character.GetComponent<MovementMotor>();
var combat = character.GetComponent<CombatController>();

// Modify capabilities at runtime
var moveSet = DataWarehouse.Instance.GetData<CurrentMoveSet>("current_move_set");
moveSet.CanDash = true;  // Enable dash
```

---

## Environment Prefabs

### Floor.prefab

**Location**: `Assets/Platformer Character Controller/Prefabs/Floor.prefab`

**Description**: Simple platform/ground object.

**Components**:
- **Transform**: Position, rotation, scale
- **MeshFilter**: Flat plane mesh
- **MeshRenderer**: Visual appearance
- **BoxCollider**: Physics collider

**Configuration**:
```
Mesh: Unity plane (2x2 units)
Scale: Adjust for platform size
  - (10, 1, 1) = long horizontal platform
  - (2, 1, 2) = small square platform
Layer: "Ground" (required)
```

**Usage**:
```csharp
// Create platform
var floor = Instantiate(floorPrefab);
floor.transform.position = new Vector3(5, 0, 0);
floor.transform.localScale = new Vector3(10, 1, 1);

// Set correct layer
floor.layer = LayerMask.NameToLayer("Ground");
```

**Design Tips**:
- Scale Y = 1 for standard floor thickness
- Increase Z scale for player size (Y for width, Z for depth from camera)
- Combine multiple floors to create level layouts
- Use rotation for angled platforms (e.g., 15 degrees for slopes)

### Step.prefab

**Location**: `Assets/Platformer Character Controller/Prefabs/Step.prefab`

**Description**: Small step/stair element for platformer level design.

**Components**:
- Same as Floor.prefab
- Pre-scaled for typical step size

**Configuration**:
```
Default Scale: (1, 0.3, 1) - small step
Typical Height: 0.3 units
Usage: Combine multiple for stair effects
```

**Stair Creation Pattern**:
```csharp
// Create ascending stairs
for (int i = 0; i < 5; i++)
{
    var step = Instantiate(stepPrefab);
    step.transform.position = new Vector3(i * 1.5f, i * 0.3f, 0);
}
```

---

## Weapon Prefabs

### Rifle.prefab

**Location**: `Assets/Platformer Character Controller/Prefabs/Rifle.prefab`

**Description**: Rifle weapon model and behavior.

**Components**:
- **Transform**: Weapon positioning (typically child of character)
- **MeshFilter/MeshRenderer**: Visual model
- **WeaponManager reference**: Integration point

**Positioning** (as child of Character):
```
Position: (0.5, 0, 0.5) - off to right side
Rotation: (0, 0, 0)
Scale: (0.5, 0.5, 0.5) - typical weapon scale
```

**Configuration**:
- Assign WeaponConfig ScriptableObject
- Set fire point (muzzle position)
- Configure animation events

**Usage**:
```csharp
// Instance on character
var rifle = Instantiate(riflePrefab, character.transform);
rifle.transform.localPosition = new Vector3(0.5f, 0, 0.5f);

// Connect to WeaponManager
weaponManager.EquipWeapon(rifleConfig);
```

### bullet.prefab

**Location**: `Assets/Platformer Character Controller/Prefabs/bullet.prefab`

**Description**: Projectile fired by weapons.

**Components**:
- **Rigidbody**: Dynamic, no gravity (velocity-controlled)
- **SphereCollider**: Projectile collision shape
- **Projectile script**: Behavior and pooling

**Configuration**:
```
Rigidbody
├── Mass: 0.1
├── Gravity: Off
├── Collision Detection: Continuous
└── Constraints: Freeze Rotation (all)

SphereCollider
├── Radius: 0.1
├── Trigger: False (collides with objects)
└── Layer: "Projectile" (optional)
```

**Pooling**:
- Automatically managed by ProjectilePool
- Lifetime: Expires after 10 seconds (configurable)
- Returns to pool on deactivation

**Usage**:
```csharp
// Automatic: fired by weapon system
weaponManager.FireWeapon();

// Manual pooling access
var projectile = projectilePool.GetProjectile();
projectile.Initialize(position, direction, speed, damage);
projectile.Launch();
```

#### bullet 1.prefab

**Location**: `Assets/Platformer Character Controller/Prefabs/bullet 1.prefab`

Alternative bullet prefab variant for variety or different weapon types.

---

## Demo Scene

### Demo.unity

**Location**: `Assets/Platformer Character Controller/Scenes/Demo.unity`

**Description**: Complete working demo scene showcasing all features.

**Scene Contents**:

#### GameObjects

```
Scene Hierarchy:
├── Main Camera
│   └── Positioned to view play area
├── Ground Plane
│   ├── Large base platform
│   ├── Layer: "Ground"
│   └── BoxCollider configured
├── Platforms
│   ├── Platform 1 (middle height)
│   ├── Platform 2 (elevated)
│   ├── Platform 3 (wall climbing area)
│   └── Each with BoxCollider and Ground layer
├── Character
│   ├── MovementMotor (configured)
│   ├── CombatController (configured)
│   ├── Animator (with demo controller)
│   └── Child objects (weapon, etc.)
├── DataManager
│   ├── MovementConfig assigned
│   ├── WeaponConfigs assigned
│   └── All data initialized
├── Environmental Objects
│   ├── Walls for wall-climbing
│   ├── Obstacles for testing collision
│   └── Collectibles (optional)
└── UI Canvas
    ├── Health display
    ├── Weapon display
    ├── Debug info (optional)
    └── Instructions text
```

#### Demo Features

The demo scene showcases:

1. **Movement**:
   - Flat ground movement
   - Jumping and double jumping
   - Falling and landing
   - Wall climbing and wall jumping

2. **Level Design**:
   - Multiple platforms at different heights
   - Walls for climbing practice
   - Gaps requiring precise jumping
   - Progression from easy to challenging

3. **Combat** (if enabled):
   - Enemy dummy or targets
   - Weapon firing and projectile spawning
   - Damage feedback
   - Health tracking

4. **Animation & VFX**:
   - Character animations playing with movement
   - Particle effects on jump/land
   - Weapon fire effects
   - Damage visual feedback

### Running the Demo

1. **Open Demo Scene**:
   - File > Open Scene > Demo.unity
   - Double-click Demo.unity in Project

2. **Play Scene**:
   - Press Play button
   - WASD: Move left/right
   - Space: Jump
   - Shift: Dash
   - Mouse/Gamepad: Aim and fire (if combat enabled)

3. **Explore Features**:
   - Walk around flat area
   - Jump between platforms
   - Practice wall climbing
   - Test combat system
   - Observe animation and VFX

### Demo Configuration

The demo scene is pre-configured with:

**Movement**:
```
Speed: 8.0
Gravity: 25.0
Jump Force: 15.0
Coyote Time: 0.15f
Max Jump Time: 0.35f
```

**Wall Mechanics**:
```
Wall Gravity: 8.0
Wall Jump Force: 18.0
Wall Reattach Cooldown: 0.2f
Max Consecutive Jumps: 2
```

**Dash**:
```
Dash Force: 30.0
Dash Duration: 0.3f
Dash Cooldown: 0.5f
```

**Combat** (if enabled):
```
Rifle Fire Rate: 5.0
Projectile Damage: 10.0
Projectile Speed: 30.0
```

---

## Creating Custom Prefabs

### Custom Character Variant

Create specialized character prefab:

```csharp
// 1. Duplicate Character.prefab
// 2. Rename: "Character_Heavy", "Character_Fast", etc.
// 3. Modify:
//    - Different mesh/model
//    - Different collider size
//    - Different default config
// 4. Save as new prefab
```

### Custom Platform

Create special platform types:

```csharp
// Moving platform example
public class MovingPlatform : MonoBehaviour
{
    public Vector3 destination;
    public float speed = 2.0f;
    
    // Platform moves between positions
    // Character stays on platform via physics
}

// Crumbling platform example
public class CrumblingPlatform : MonoBehaviour
{
    public float timeBeforeCrumble = 2.0f;
    
    void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.CompareTag("Player"))
            Invoke(nameof(Crumble), timeBeforeCrumble);
    }
    
    void Crumble()
    {
        // Disable platform or destroy
    }
}
```

### Custom Projectile

Extend projectile behavior:

```csharp
public class TracingProjectile : Projectile
{
    public Transform target;
    public float turnSpeed = 5.0f;
    
    protected override void Move()
    {
        if (target != null)
        {
            // Home toward target
            Vector3 direction = (target.position - transform.position).normalized;
            transform.position += direction * speed * Time.deltaTime;
        }
        else
        {
            base.Move();  // Standard movement
        }
    }
}
```

---

## Asset Organization

Recommended folder structure for custom prefabs:

```
Assets/
├── Platformer Character Controller/ (read-only)
├── Game/ (your project)
│   ├── Prefabs/
│   │   ├── Characters/
│   │   │   ├── Player.prefab
│   │   │   └── Enemy.prefab
│   │   ├── Environment/
│   │   │   ├── Platform_Moving.prefab
│   │   │   └── Hazard_Spike.prefab
│   │   ├── Weapons/
│   │   │   ├── Rifle_Advanced.prefab
│   │   │   └── Projectile_Homing.prefab
│   │   └── UI/
│   │       └── HUD.prefab
│   ├── Scenes/
│   ├── Scripts/
│   └── Resources/
```

---

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for setup instructions using these prefabs.

