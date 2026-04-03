function CollisionDetection() {
  const keyFeatures = [
    {
      title: 'Multi-Point Casting',
      description: 'Multiple raycasts at different positions (left, center, right) for consistent detection across varied geometry',
    },
    {
      title: 'Distance-Based Detection',
      description: 'Returns distance to nearest hit, allowing for threshold-based logic',
    },
    {
      title: 'Direction Override',
      description: 'Force specific world-space direction for custom casting patterns',
    },
    {
      title: 'Scene Visualization',
      description: 'Debug rays drawn in yellow with hit points marked in cyan for easy debugging',
    },
    {
      title: 'Rotation-Agnostic',
      description: 'Properly handles rotated transforms using world-space directions',
    },
  ];

  const castDirections = [
    { name: 'Up', description: '+Y (world up)', symbol: '↑' },
    { name: 'Down', description: '-Y (world down)', symbol: '↓' },
    { name: 'Left', description: '+X (world left)', symbol: '←' },
    { name: 'Right', description: '-X (world right)', symbol: '→' },
    { name: 'Forward', description: '+Z (world forward)', symbol: '⊕' },
    { name: 'Back', description: '-Z (world back)', symbol: '⊖' },
  ];

  const sensorConfigurations = [
    {
      title: 'Ground Detection',
      description: 'Detects solid ground for grounding checks and platform detection',
      setup: [
        'Position: Center of character, slightly below collider bottom',
        'Distance: From MovementConfig.groundDistance (typically 0.1f)',
        'Direction: Downward (toward ground)',
        'Layer: Ground layer only',
      ],
      purpose: 'Enables jump detection, fall mechanics, and landing feedback',
    },
    {
      title: 'Wall Detection (Low-Side Sensor)',
      description: 'Detects walls for wall climbing mechanics and collision avoidance',
      setup: [
        'Position: Side of character at wall-climbing height',
        'Distance: 0.5f (how far to check for walls)',
        'Direction: Left or Right based on movement direction',
        'Layer: Ground layer (walls are part of ground)',
      ],
      purpose: 'Enables wall climbing, wall sliding, and environmental interaction',
    },
  ];

  const commonIssues = [
    {
      issue: 'Ray Not Detecting Colliders',
      causes: ['Collider disabled', 'Wrong layer assigned', 'Collider too small for ray distance', 'Ray origin inside collider'],
      solutions: ['Verify collider is enabled and has correct layer', 'Check ray origin position', 'Use Gizmo visualization', 'Reduce cast distance'],
    },
    {
      issue: 'Ray Detecting Through Geometry',
      causes: ['Ray distance too large', 'Ray origin positioned poorly', 'Unexpected collider in path'],
      solutions: ['Reduce cast distance (0.05f typical)', 'Adjust ray origin offset', 'Check GetHit() to see what\'s being detected'],
    },
    {
      issue: 'Rotation Affecting Ray Direction',
      causes: ['Using local direction instead of world direction', 'Transform rotation applied to direction'],
      solutions: ['Always use world-space directions', 'Use CastDirection enum', 'Never rotate direction by transform'],
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-reef-gold-100">Collision Detection System</h1>
        <p className="text-reef-gold-200">
          Robust raycast-based collision sensing for ground, wall, and environment detection. The RaycastSensor class provides efficient, frame-rate-independent detection.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Overview</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
          <p className="text-reef-gold-300 mb-4">
            The collision detection system uses raycasting for robust, frame-rate-independent environment sensing. The RaycastSensor component provides multi-point raycast-based collision detection with several key advantages:
          </p>
          <ul className="space-y-2 text-reef-gold-300">
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Robustness:</strong> Multiple raycasts provide consistent detection across varied geometry</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Efficiency:</strong> Raycasts are lightweight compared to shape casting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Flexibility:</strong> Supports any direction, distance, and layer configuration</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Debugging:</strong> Visual debug representation in Scene view</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Key Features</h2>
        <div className="grid gap-6">
          {keyFeatures.map((feature, idx) => (
            <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
              <h3 className="text-lg font-semibold text-reef-gold-100 mb-2">{feature.title}</h3>
              <p className="text-reef-gold-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Cast Directions</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
          <p className="text-reef-gold-300 mb-6">
            The RaycastSensor supports 8 primary directions using world-space coordinates. This rotation-agnostic approach prevents issues when the character rotates.
          </p>
          <div className="grid gap-4 mb-6">
            {castDirections.map((dir, idx) => (
              <div key={idx} className="flex items-center gap-4 pb-3 border-b border-reef-gold-600 last:border-b-0">
                <div className="text-3xl text-reef-gold-400 w-12 text-center">{dir.symbol}</div>
                <div>
                  <div className="font-semibold text-reef-gold-100">{dir.name}</div>
                  <div className="text-sm text-reef-gold-400">{dir.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-marshland-600 rounded p-4">
            <p className="text-sm text-reef-gold-300 font-semibold mb-3">Direction Mapping (World-Space):</p>
            <pre className="text-xs text-reef-gold-400 overflow-x-auto">
{`        Up (+Y)
          ↑
Left ← Center → Right
         ↓
       Down (-Y)`}
            </pre>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Sensor Configuration</h2>
        <div className="grid gap-6">
          {sensorConfigurations.map((config, idx) => (
            <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
              <h3 className="text-lg font-semibold text-reef-gold-100 mb-2">{config.title}</h3>
              <p className="text-reef-gold-400 text-sm mb-4">{config.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-reef-gold-100 mb-3">Setup Parameters:</h4>
                <ul className="space-y-2">
                  {config.setup.map((item, setupIdx) => (
                    <li key={setupIdx} className="text-sm text-reef-gold-300 flex items-start gap-2">
                      <span className="text-reef-gold-500 flex-shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-marshland-600 rounded p-3 border-l-4 border-reef-gold-500">
                <p className="text-sm text-reef-gold-300">
                  <span className="font-semibold text-reef-gold-100">Purpose:</span> {config.purpose}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Public API</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-reef-gold-100 mb-3">Configuration Methods:</h3>
            <div className="bg-marshland-600 rounded p-3 text-xs text-reef-gold-400 font-mono overflow-x-auto space-y-1">
              <div>SetCastOrigin(Vector3 worldPosition)</div>
              <div>SetCastDistance(float distance)</div>
              <div>SetCastDirection(CastDirection direction)</div>
              <div>SetWorldDirection(Vector3 worldDirection)</div>
              <div>ClearWorldDirection()</div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-reef-gold-100 mb-3">Casting Methods:</h3>
            <div className="bg-marshland-600 rounded p-3 text-xs text-reef-gold-400 font-mono overflow-x-auto space-y-1">
              <div>Cast(LayerMask layerMask, QueryTriggerInteraction queryTrigger)</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-reef-gold-100 mb-3">Result Methods:</h3>
            <div className="bg-marshland-600 rounded p-3 text-xs text-reef-gold-400 font-mono overflow-x-auto space-y-1">
              <div>HasDetectedHit() → bool</div>
              <div>GetDistance() → float</div>
              <div>GetHit() → RaycastHit</div>
              <div>GetHitPoint() → Vector3</div>
              <div>GetHitNormal() → Vector3</div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Debug Visualization</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
          <p className="text-reef-gold-300 mb-4">
            Debug drawing is automatic when using RaycastSensor. View in Scene view during play to see:
          </p>
          <ul className="space-y-3 text-reef-gold-300 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Yellow rays:</strong> Show cast direction and distance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Cyan crosses:</strong> Mark hit points (if collision detected)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Multiple rays:</strong> If multi-point casting is used</span>
            </li>
          </ul>
          <div className="bg-marshland-600 rounded p-4 border-l-4 border-reef-gold-500">
            <p className="text-sm text-reef-gold-300">
              <span className="font-semibold text-reef-gold-100">Tip:</span> Use debug logging with GetHit() to identify what colliders are being detected.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Common Issues & Solutions</h2>
        <div className="space-y-6">
          {commonIssues.map((item, idx) => (
            <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
              <h3 className="text-lg font-semibold text-reef-gold-100 mb-4">{item.issue}</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold text-reef-gold-200 text-sm mb-2">Possible Causes:</h4>
                <ul className="space-y-2">
                  {item.causes.map((cause, causeIdx) => (
                    <li key={causeIdx} className="text-sm text-reef-gold-300 flex items-start gap-2">
                      <span className="text-reef-gold-500 flex-shrink-0">○</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-reef-gold-200 text-sm mb-2">Solutions:</h4>
                <ul className="space-y-2">
                  {item.solutions.map((solution, solIdx) => (
                    <li key={solIdx} className="text-sm text-reef-gold-300 flex items-start gap-2">
                      <span className="text-reef-gold-500 flex-shrink-0">✓</span>
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Best Practices</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
          <ul className="space-y-3 text-reef-gold-300">
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">▪</span>
              <span><strong>Layer Configuration:</strong> Create "Ground" layer in Project Settings and assign to all ground/platform objects</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">▪</span>
              <span><strong>Distance Threshold:</strong> Use small distances (0.1f typical) to prevent false positives and jittering</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">▪</span>
              <span><strong>Query Triggers:</strong> Use QueryTriggerInteraction.Ignore for environmental sensing to avoid detecting trigger colliders</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">▪</span>
              <span><strong>World Directions:</strong> Always use world-space directions (Vector3.down) not local directions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">▪</span>
              <span><strong>Debug Visualization:</strong> Enable Gizmos in Scene view while testing to verify ray positions and hits</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default CollisionDetection
