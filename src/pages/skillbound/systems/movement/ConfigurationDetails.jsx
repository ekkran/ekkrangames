function ConfigurationDetails() {
  const configSections = [
    {
      category: 'Movement Parameters',
      params: [
        { name: 'speed', type: 'float', description: 'Horizontal movement speed' },
        { name: 'gravity', type: 'float', description: 'Downward acceleration (positive value)' },
        { name: 'groundDistance', type: 'float', description: 'Ray distance for ground detection' },
        { name: 'airFriction', type: 'float (0-1)', description: 'Friction while airborne' },
        { name: 'groundFriction', type: 'float (0-1)', description: 'Friction while grounded' },
      ],
    },
    {
      category: 'Jump Parameters',
      params: [
        { name: 'maxJumpTime', type: 'float', description: 'Maximum sustained jump duration' },
        { name: 'minJumpTime', type: 'float', description: 'Minimum jump duration (cannot cut off before this)' },
        { name: 'jumpForce', type: 'float', description: 'Upward force applied during jump' },
        { name: 'highJumpForce', type: 'float', description: 'Optional higher jump force' },
        { name: 'coyoteTime', type: 'float', description: 'Grace period after leaving ground (can still jump)' },
        { name: 'jumpBuffer', type: 'float', description: 'Input buffering time (can jump this long before landing)' },
        { name: 'airControlRate', type: 'float (0-1)', description: 'How responsive air movement is' },
      ],
    },
    {
      category: 'Crouch Parameters',
      params: [
        { name: 'crouchColliderHeight', type: 'float', description: 'Collider height while crouching' },
        { name: 'crouchColliderCenter', type: 'float', description: 'Collider center Y while crouching' },
      ],
    },
    {
      category: 'Wall Mechanics',
      params: [
        { name: 'wallGravity', type: 'float', description: 'Gravity while attached to wall (typically 1/2 to 1/3 of normal)' },
        { name: 'wallJumpForce', type: 'float', description: 'Force applied when jumping from wall' },
        { name: 'wallReattachCooldown', type: 'float', description: 'Time before can reattach to wall' },
        { name: 'wallAttachVerticalThreshold', type: 'float', description: 'Max upward velocity to allow attachment' },
      ],
    },
    {
      category: 'Dash Parameters',
      params: [
        { name: 'dashForce', type: 'float', description: 'Dash movement force' },
        { name: 'dashDuration', type: 'float', description: 'How long dash lasts' },
        { name: 'dashCooldown', type: 'float', description: 'Time before can dash again' },
      ],
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-reef-gold-100">Configuration Details</h1>
        <p className="text-reef-gold-200">
          The MovementConfig ScriptableObject centralizes all movement parameters. Create one via: Right-click {'>'} Create {'>'} Character {'>'} MovementConfig
        </p>
      </div>

      <section className="space-y-8">
        {configSections.map((section, idx) => (
          <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
            <h2 className="text-xl font-semibold text-reef-gold-100 mb-4">{section.category}</h2>
            <div className="space-y-3">
              {section.params.map((param, paramIdx) => (
                <div key={paramIdx} className="pb-3 border-b border-reef-gold-600 last:border-b-0 last:pb-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-reef-gold-100 font-semibold">{param.name}</span>
                        <span className="text-sm text-reef-gold-400 font-mono bg-marshland-500 px-2 py-1 rounded">
                          {param.type}
                        </span>
                      </div>
                      <p className="mt-2 text-reef-gold-300">{param.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
        <h3 className="text-lg font-semibold text-reef-gold-100 mb-2">Configuration Tips</h3>
        <ul className="space-y-3 text-reef-gold-300">
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500 flex-shrink-0">•</span>
            <span><strong>Ground Friction:</strong> Higher values (0.8-0.95) reduce horizontal momentum faster</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500 flex-shrink-0">•</span>
            <span><strong>Air Friction:</strong> Lower values (0.95-0.98) provide floatier feel in air</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500 flex-shrink-0">•</span>
            <span><strong>Coyote Time:</strong> 0.1 seconds (100ms) is a good starting point for forgiving jumps</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500 flex-shrink-0">•</span>
            <span><strong>Jump Buffer:</strong> 0.05 seconds (50ms) enables responsive jump input before landing</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500 flex-shrink-0">•</span>
            <span><strong>Wall Gravity:</strong> Typically 1/3 of normal gravity for smooth wall sliding</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ConfigurationDetails;
