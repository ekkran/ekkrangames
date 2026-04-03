function VFXSystem() {
  const vfxEvents = [
    {
      category: 'Movement Effects',
      effects: [
        { name: 'PlayDashEffect', description: 'Motion blur / trail effect on dash', trigger: 'onDash event', signature: 'PlayDashEffect(Vector3 direction)' },
        { name: 'PlayJumpEffect', description: 'Burst particles on jump takeoff', trigger: 'onJump event', signature: 'PlayJumpEffect()' },
        { name: 'PlayLandEffect', description: 'Dust particles on landing', trigger: 'onLand event', signature: 'PlayLandEffect()' },
        { name: 'WalkEffect', description: 'Subtle particles during movement', trigger: 'During walk animation', signature: 'WalkEffect(float horizontal)' },
        { name: 'AttachToWallEffect', description: 'Particle effect when attaching to wall', trigger: 'While onWallAttached', signature: 'AttachToWallEffect(Vector3 direction)' },
      ],
    },
  ];

  const features = [
    {
      title: 'Object Pooling',
      description: 'Pre-allocated VFX instances reduce instantiation overhead',
      details: [
        'Reuses inactive VFX prefabs instead of creating new ones',
        'Significantly reduces garbage collection pressure',
        'Critical for repeated movement effects (multiple jumps, dashes)',
      ],
    },
    {
      title: 'Event Integration',
      description: 'Automatic VFX playback on movement events',
      details: [
        'Subscribe to MovementMotor events',
        'VFX plays automatically without manual triggering',
        'Synchronized with animations',
      ],
    },
    {
      title: 'Lifetime Management',
      description: 'Effects automatically deactivate when finished',
      details: [
        'Particle system duration determines effect lifetime',
        'Automatic return to pool for reuse',
        'Configurable timeout for safety cleanup',
      ],
    },
    {
      title: 'Spatial Positioning',
      description: 'Effects positioned accurately in world space',
      details: [
        'Direction parameter: Used for dash and wall attach effects',
        'Character location: Base position for movement effects',
        'Proper depth sorting for visual hierarchy',
      ],
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-reef-gold-100">VFX System</h1>
        <p className="text-reef-gold-200">
          Visual effects management tied to game events with automatic pooling and synchronization.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">VFX Events Reference</h2>
        {vfxEvents.map((section, idx) => (
          <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
            <h3 className="text-xl font-semibold text-reef-gold-100 mb-4">{section.category}</h3>
            <div className="space-y-3">
              {section.effects.map((effect, effectIdx) => (
                <div key={effectIdx} className="pb-3 border-b border-reef-gold-600 last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-mono text-reef-gold-100 font-semibold">{effect.name}</h4>
                      <p className="text-reef-gold-300 text-sm mt-1">{effect.description}</p>
                      <p className="text-reef-gold-400 text-xs mt-2 flex items-center gap-1">
                        <span className="text-reef-gold-500">→</span>
                        Triggered by: <span className="font-mono">{effect.trigger}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Key Features</h2>
        <div className="grid gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
              <h3 className="text-lg font-semibold text-reef-gold-100 mb-2">{feature.title}</h3>
              <p className="text-reef-gold-300 mb-4">{feature.description}</p>
              
              <ul className="space-y-2">
                {feature.details.map((detail, detailIdx) => (
                  <li key={detailIdx} className="text-sm text-reef-gold-300 flex items-start gap-2">
                    <span className="text-reef-gold-500 flex-shrink-0">→</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-reef-gold-100">VFX Configuration</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
          <div className="space-y-4">
            <div className="pb-4 border-b border-reef-gold-600">
              <h4 className="font-semibold text-reef-gold-100 mb-2 flex items-center gap-2">
                <span className="text-reef-gold-500">▪</span>
                Effect Prefabs
              </h4>
              <p className="text-reef-gold-300 text-sm ml-6">Create or import VFX prefabs with ParticleSystems</p>
              <p className="text-reef-gold-300 text-sm ml-6">Assign duration matching effect timing (0.3s - 1.5s typical for movement)</p>
            </div>

            <div className="pb-4 border-b border-reef-gold-600">
              <h4 className="font-semibold text-reef-gold-100 mb-2 flex items-center gap-2">
                <span className="text-reef-gold-500">▪</span>
                Pool Configuration
              </h4>
              <p className="text-reef-gold-300 text-sm ml-6">Set pool size based on effect frequency</p>
              <p className="text-reef-gold-300 text-sm ml-6">8-16 instances typical for movement effects</p>
            </div>

            <div className="pb-4 border-b border-reef-gold-600">
              <h4 className="font-semibold text-reef-gold-100 mb-2 flex items-center gap-2">
                <span className="text-reef-gold-500">▪</span>
                Direction Vectors
              </h4>
              <p className="text-reef-gold-300 text-sm ml-6">Dash and wall attach effects use direction parameters</p>
              <p className="text-reef-gold-300 text-sm ml-6">Used for particle velocity and effect orientation</p>
            </div>

            <div>
              <h4 className="font-semibold text-reef-gold-100 mb-2 flex items-center gap-2">
                <span className="text-reef-gold-500">▪</span>
                Render Layers
              </h4>
              <p className="text-reef-gold-300 text-sm ml-6">Assign to appropriate render layers (World, etc.)</p>
              <p className="text-reef-gold-300 text-sm ml-6">Ensure depth sorting for correct visual hierarchy</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Best Practices</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
          <ul className="space-y-3 text-reef-gold-300">
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Pool Size:</strong> Pre-allocate enough instances for typical play patterns; 8-16 instances for 5 movement effects</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Duration Matching:</strong> Keep particle system duration consistent with movement animation timing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Direction Integration:</strong> Use provided direction vectors for dash and wall attach effects</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Performance Tuning:</strong> Limit visible particles; disable at distance if needed</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default VFXSystem;
