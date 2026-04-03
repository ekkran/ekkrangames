function CollisionDetection() {
  const sensors = [
    {
      name: 'Ground Sensor',
      description: 'Detects solid ground for grounding mechanics',
      configuration: [
        'Casts downward from player position',
        'Uses ground layer mask',
        'Distance defined by groundDistance parameter',
        'Multiple cast points for robustness',
      ],
      usage: 'Determines if character is standing on ground for state transitions and friction',
    },
    {
      name: 'Low-Side Sensor (Wall Detection)',
      description: 'Detects walls for wall climbing mechanics',
      configuration: [
        'Casts horizontally to detect walls',
        'Direction follows movement direction',
        'Uses same ground layer mask',
        'Multiple cast points at different heights',
      ],
      usage: 'Enables wall attachment when horizontal input toward wall detected',
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-reef-gold-100">Collision Detection</h1>
        <p className="text-reef-gold-200">
          The RaycastSensor system provides robust, distance-based collision detection for ground and wall mechanics.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">RaycastSensor System</h2>
        <p className="text-reef-gold-300">
          The RaycastSensor class provides raycast-based collision detection with multiple cast points for robustness and accuracy.
        </p>

        <div className="grid gap-6">
          {sensors.map((sensor, idx) => (
            <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
              <h3 className="text-xl font-semibold text-reef-gold-100 mb-2">{sensor.name}</h3>
              <p className="text-reef-gold-300 mb-4">{sensor.description}</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-reef-gold-200 mb-2">Configuration</h4>
                  <ul className="space-y-1">
                    {sensor.configuration.map((config, configIdx) => (
                      <li key={configIdx} className="text-sm text-reef-gold-300 flex items-start gap-2">
                        <span className="text-reef-gold-500 flex-shrink-0">✓</span>
                        <span>{config}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-reef-gold-600">
                  <h4 className="font-semibold text-reef-gold-200 mb-2">Usage</h4>
                  <p className="text-sm text-reef-gold-300">{sensor.usage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-reef-gold-100">RaycastSensor Features</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6 space-y-4">
          <div>
            <h4 className="font-semibold text-reef-gold-200 mb-2 flex items-center gap-2">
              <span className="text-reef-gold-500">▪</span>
              Multiple Cast Points
            </h4>
            <p className="text-reef-gold-300 text-sm ml-6">
              Several raycasts at different heights and positions for robustness and edge case handling
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-reef-gold-200 mb-2 flex items-center gap-2">
              <span className="text-reef-gold-500">▪</span>
              Distance-Based Detection
            </h4>
            <p className="text-reef-gold-300 text-sm ml-6">
              Returns precise distance to detected hit, not just boolean collision
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-reef-gold-200 mb-2 flex items-center gap-2">
              <span className="text-reef-gold-500">▪</span>
              Direction Override
            </h4>
            <p className="text-reef-gold-300 text-sm ml-6">
              Can force world-space cast direction independent of transform rotation
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-reef-gold-200 mb-2 flex items-center gap-2">
              <span className="text-reef-gold-500">▪</span>
              Scene Debug Visualization
            </h4>
            <p className="text-reef-gold-300 text-sm ml-6">
              Yellow rays visible in Scene view for easy debugging and sensor tuning
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-reef-gold-200 mb-2 flex items-center gap-2">
              <span className="text-reef-gold-500">▪</span>
              Rotation-Agnostic
            </h4>
            <p className="text-reef-gold-300 text-sm ml-6">
              Properly handles rotated player transforms for dynamic camera angles
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Usage Example</h2>
        <div className="rounded-md bg-black p-4 font-mono text-sm text-gray-300 overflow-x-auto">
          <pre>{`
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
          `}</pre>
        </div>
      </section>

      <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
        <h3 className="text-lg font-semibold text-reef-gold-100 mb-2">Best Practices</h3>
        <ul className="space-y-3 text-reef-gold-300">
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500 flex-shrink-0">•</span>
            <span><strong>Ground Distance:</strong> Set slightly above collider bottom to avoid false positives</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500 flex-shrink-0">•</span>
            <span><strong>Sensor Visualization:</strong> Use Scene view debug rays to tune sensor positions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500 flex-shrink-0">•</span>
            <span><strong>Layer Mask:</strong> Ensure only collideable geometry is on the ground layer</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500 flex-shrink-0">•</span>
            <span><strong>Performance:</strong> Raycast sensors are efficient; multiple points enable reliability</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CollisionDetection;
