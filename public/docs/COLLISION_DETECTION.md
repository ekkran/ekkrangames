# Collision Detection System

## Overview

The collision detection system uses raycasting for robust, frame-rate-independent environment sensing. The `RaycastSensor` class provides efficient detection of ground, walls, and other environmental features.

## RaycastSensor Component

### Purpose

The `RaycastSensor` provides multi-point raycast-based collision detection with the following advantages:

- **Robustness**: Multiple raycasts provide consistent detection across varied geometry
- **Efficiency**: Raycasts are lightweight compared to shape casting
- **Flexibility**: Supports any direction, distance, and layer configuration
- **Debugging**: Visual debug representation in Scene view

### Key Features

1. **Multi-Point Casting**: Multiple raycasts at different positions (e.g., left, center, right)
2. **Distance-Based Detection**: Returns distance to nearest hit
3. **Direction Override**: Can force specific world-space direction
4. **Scene Visualization**: Debug rays drawn in yellow with hit points marked in cyan
5. **Rotation-Agnostic**: Properly handles rotated transforms

### Public API

```csharp
public class RaycastSensor
{
    // Configuration
    public void SetCastOrigin(Vector3 worldPosition);
    public void SetCastDistance(float distance);
    public void SetCastDirection(CastDirection direction);
    public void SetWorldDirection(Vector3 worldDirection);
    public void ClearWorldDirection();
    
    // Casting
    public bool Cast(LayerMask layerMask, QueryTriggerInteraction queryTrigger = QueryTriggerInteraction.Ignore);
    
    // Results
    public bool HasDetectedHit();
    public float GetDistance();
    public RaycastHit GetHit();
    public Vector3 GetHitPoint();
    public Vector3 GetHitNormal();
}
```

---

## Cast Directions

The sensor supports 8 primary directions plus custom world-space directions.

### Predefined Directions

```csharp
public enum CastDirection
{
    Up,         // +Y (world up)
    Down,       // -Y (world down)
    Left,       // +X (world left)
    Right,      // -X (world right)
    Forward,    // +Z (world forward)
    Back,       // -Z (world back)
    // Plus diagonals for custom use
}
```

**Direction Mapping** (world-space):

```
        Up (+Y)
          ↑
Left ← Center → Right
         ↓
       Down (-Y)
```

**Rotation-Agnostic Casting**:

The sensor uses world-space directions rather than local directions. This prevents issues when the character rotates:

```csharp
// Example: Wall detection
// Character rotated 90° doesn't affect ray direction
// Ray always points in world +X (right) regardless of model rotation
```

### World Direction Override

Force casting in arbitrary world directions:

```csharp
// Override to cast diagonally up-right at 45°
Vector3 diagonalDirection = (Vector3.right + Vector3.up).normalized;
sensor.SetWorldDirection(diagonalDirection);

// Clear override to return to standard direction
sensor.ClearWorldDirection();
```

---

## Sensor Setup

### Ground Detection

**Purpose**: Detect solid ground for grounding checks

**Configuration** (in MovementMotor.RecalibrateSensor):

```csharp
private void RecalibrateSensor()
{
    // Create and configure ground sensor
    _groundSensor = new RaycastSensor();
    
    // Position: Center of character, slightly below collider bottom
    Vector3 groundCheckOrigin = transform.position 
        - (transform.up * (_standingColliderHeight / 2 + 0.1f));
    _groundSensor.SetCastOrigin(groundCheckOrigin);
    
    // Distance: From MovementConfig
    _groundSensor.SetCastDistance(mc.groundDistance);
    
    // Direction: Downward (toward ground)
    _groundSensor.SetCastDirection(RaycastSensor.CastDirection.Down);
}
```

**Usage** (in MovementMotor.GroundCheck):

```csharp
private void GroundCheck()
{
    bool wasGrounded = grounded;
    
    // Cast downward for ground
    grounded.NotifyObservers(
        _groundSensor.Cast(mc.ground, QueryTriggerInteraction.Ignore)
    );
    
    // Log if state changed
    if (grounded != wasGrounded)
    {
        Debug.Log($"Ground contact: {grounded}");
    }
}
```

**Ray Visualization**:
```
Character
│
├─ Cast origin (center, below collider)
│
└─→ Yellow ray pointing downward
    └─→ Cyan cross at impact (if hit ground)
```

### Wall Detection (Low-Side Sensor)

**Purpose**: Detect walls for wall climbing mechanics

**Configuration** (in MovementMotor.RecalibrateLowSideSensor):

```csharp
private void RecalibrateLowSideSensor()
{
    // Create and configure wall sensor
    _lowSideColliderSensor = new RaycastSensor();
    
    // Position: Side of character at wall-climbing height
    Vector3 sideCheckOrigin = transform.position 
        + (transform.right * _standingColliderHeight * 0.3f);  // Offset to side
    _lowSideColliderSensor.SetCastOrigin(sideCheckOrigin);
    
    // Distance: How far to check for walls
    _lowSideColliderSensor.SetCastDistance(0.5f);
    
    // Direction: Updated based on movement direction
    // (set dynamically in WallCheck method)
}
```

**Usage** (in MovementMotor.WallCheck):

```csharp
private void WallCheck()
{
    // Update direction based on movement
    var castDir = GetCastDirection();  // Right or Left based on _horizontal
    _lowSideColliderSensor.SetCastDirection(castDir);
    
    // Cast toward wall
    _lowCollision = _lowSideColliderSensor.Cast(mc.ground);
    
    // Log detection
    if (_lowCollision)
    {
        float distanceToWall = _lowSideColliderSensor.GetDistance();
        Debug.Log($"Wall detected at distance: {distanceToWall}");
    }
}
```

**Ray Visualization**:
```
Character (side view)
│
├─ Cast origin (side, at wall-climb height)
│
└─→ Yellow ray pointing left/right (toward wall)
    └─→ Cyan cross at wall surface (if hit)
```

---

## Casting Mechanics

### Single Frame Raycast

Cast is performed each frame during GroundCheck/WallCheck:

```csharp
public bool Cast(LayerMask layerMask, QueryTriggerInteraction queryTrigger)
{
    // Get normalized direction
    Vector3 castDir = GetNormalizedDirection();
    
    // Perform raycast
    bool hit = Physics.Raycast(
        origin: _castOrigin,
        direction: castDir,
        hitInfo: out _hitInfo,
        maxDistance: _castDistance,
        layerMask: layerMask,
        queryTriggerInteraction: queryTrigger
    );
    
    _hasHit = hit;
    return hit;
}
```

### Distance Threshold

Ground/wall detection typically uses a small threshold:

```csharp
// Example from MovementConfig
public float groundDistance = 0.1f;  // Check 10cm below character
```

This small distance prevents:
- False positives from overlapping colliders
- Detection through platforms (too close range)
- Jittering on ground edges

---

## Debug Visualization

### Scene View Debug Drawing

When casting, debug rays are drawn in Scene view:

```csharp
private void OnDrawGizmosSelected()
{
    if (!HasDetectedHit())
    {
        // No hit: draw yellow ray to max distance
        Gizmos.color = Color.yellow;
        Gizmos.DrawLine(_castOrigin, _castOrigin + direction * _castDistance);
    }
    else
    {
        // Hit detected: draw to hit point and mark with cyan cross
        Gizmos.color = Color.yellow;
        Gizmos.DrawLine(_castOrigin, GetHitPoint());
        
        Gizmos.color = Color.cyan;
        Gizmos.DrawCube(GetHitPoint(), Vector3.one * 0.1f);  // Small cross at impact
    }
}
```

### Enabling Debug Visualization

Debug drawing is automatic when using RaycastSensor. View in Scene view during play to see:

1. Yellow rays showing cast direction and distance
2. Cyan crosses at hit points (if collision detected)
3. Multiple rays if multi-point casting is used

### Debug Logging

Add logging to trace sensor activity:

```csharp
private void WallCheck()
{
    _lowSideColliderSensor.SetCastDirection(GetCastDirection());
    bool hitWall = _lowSideColliderSensor.Cast(mc.ground);
    
    if (hitWall != _lowCollision)  // State changed
    {
        Debug.Log($"Wall collision: {hitWall}, distance: " +
            $"{_lowSideColliderSensor.GetDistance()}");
    }
    
    _lowCollision = hitWall;
}
```

---

## Multi-Point Casting (Optional Enhancement)

For more robust detection, use multiple raycasts at different positions:

```csharp
public class RaycastSensor
{
    private List<Vector3> _castOrigins = new();
    
    // Add multiple cast points (left, center, right)
    public void AddCastOrigin(Vector3 offset)
    {
        _castOrigins.Add(offset);
    }
    
    public bool CastMultiple(LayerMask layerMask)
    {
        float closestDistance = float.MaxValue;
        bool hitDetected = false;
        
        foreach (var origin in _castOrigins)
        {
            if (Physics.Raycast(
                transform.position + origin,
                direction,
                out RaycastHit hit,
                _castDistance,
                layerMask))
            {
                hitDetected = true;
                if (hit.distance < closestDistance)
                {
                    closestDistance = hit.distance;
                    _hitInfo = hit;
                }
            }
        }
        
        return hitDetected;
    }
}
```

**Ground Detection with 3 Points**:
```
Left Ray    Center Ray    Right Ray
    ↓           ↓              ↓
    └───────────┴──────────────┘
              Character
```

This prevents false negatives on uneven platforms.

---

## Collision Layer Configuration

### Layer Setup

1. Create "Ground" layer in Project Settings > Layers
2. Assign layer to all ground/platform objects
3. Set in MovementConfig.ground LayerMask

```
Layers:
- Default
- Water
- UI
- Ground (assign here)
- Walls (optional)
- Enemy (optional)
```

### LayerMask Configuration

```csharp
// In inspector, select "Ground" layer for ground detection
[SerializeField] private LayerMask ground;

// In code:
ground = LayerMask.GetMask("Ground");

// Cast only against Ground layer:
_groundSensor.Cast(ground);
```

### QueryTriggerInteraction

Control whether raycasts detect trigger colliders:

```csharp
// Ignore triggers (typical for environmental sensing)
_groundSensor.Cast(mc.ground, QueryTriggerInteraction.Ignore);

// Include triggers (if needed for special mechanics)
_sensor.Cast(layerMask, QueryTriggerInteraction.Collide);
```

---

## Common Issues & Solutions

### Issue: Ray Not Detecting Colliders

**Causes**:
- Collider disabled
- Wrong layer assigned
- Collider too small for ray distance
- Ray origin inside collider

**Solutions**:
```csharp
// Check collider is enabled and has correct layer
Debug.Assert(collider.enabled, "Collider disabled");
Debug.Assert(collider.gameObject.layer == groundLayer, "Wrong layer");

// Verify ray origin
Debug.Log($"Ray origin: {_castOrigin}, distance: {_castDistance}");

// Use Gizmo visualization to verify ray position
```

### Issue: Ray Detecting Through Geometry

**Causes**:
- Ray distance too large
- Ray origin positioned poorly
- Unexpected collider in path

**Solutions**:
```csharp
// Reduce cast distance
_castDistance = 0.05f;  // Very short range

// Adjust ray origin (e.g., lower for ground check)
Vector3 origin = transform.position - transform.up * offsetAmount;

// Check what's being hit
if (_groundSensor.HasDetectedHit())
{
    Debug.Log($"Hit: {_groundSensor.GetHit().collider.name}");
}
```

### Issue: Rotation Affecting Ray Direction

**Causes**:
- Using local direction instead of world direction
- Transform rotation applied to direction

**Solutions**:
```csharp
// Always use world-space directions
Vector3 downDirection = Vector3.down;  // World down

// Or use CastDirection enum
_sensor.SetCastDirection(RaycastSensor.CastDirection.Down);

// Don't rotate direction by transform
// WRONG: transform.TransformDirection(Vector3.down)
// RIGHT: Vector3.down
```

---

## Performance Optimization

### Ray Casting Cost

Raycasts are O(n) where n = number of colliders in path. Optimize by:

1. **Minimize ray distance**: Only check necessary range
2. **Use specific layer masks**: Exclude unnecessary layers
3. **Batch raycasts**: Cache results across frames if valid
4. **Limit casting frequency**: Could cast every 2 frames for non-critical sensors

### Distance Caching

Avoid repeated casts:

```csharp
// Cache ground state
private float _lastGroundCheckTime;
private bool _cachedGroundState;

private void GroundCheck()
{
    // Only re-check ground every X seconds
    if (Time.time - _lastGroundCheckTime < 0.05f)
    {
        grounded.NotifyObservers(_cachedGroundState);
        return;
    }
    
    _lastGroundCheckTime = Time.time;
    _cachedGroundState = _groundSensor.Cast(mc.ground);
    grounded.NotifyObservers(_cachedGroundState);
}
```

---

See [MOVEMENT_SYSTEM.md](./MOVEMENT_SYSTEM.md) for collision detection usage in movement and [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for debugging guidance.

