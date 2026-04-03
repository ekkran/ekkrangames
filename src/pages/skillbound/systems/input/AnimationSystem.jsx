function AnimationSystem() {
  const animatorParameters = [
    {
      category: 'Movement',
      params: [
        { name: 'Horizontal', type: 'float', description: 'Normalized horizontal movement (-1 to 1)' },
        { name: 'IsGrounded', type: 'bool', description: 'Character is touching ground' },
        { name: 'IsInAir', type: 'bool', description: 'Character is airborne' },
        { name: 'IsWallAttached', type: 'bool', description: 'Character is in contact with wall' },
        { name: 'VerticalVelocity', type: 'float', description: 'Current Y velocity for jump/fall blending' },
        { name: 'IsDashing', type: 'bool', description: 'Dash ability is active' },
      ],
    },
    {
      category: 'Facing & Aiming',
      params: [
        { name: 'FacingDirection', type: 'int', description: 'Direction character faces (-1 left, 1 right)' },
        { name: 'AimX', type: 'float', description: 'Aim direction X component' },
        { name: 'AimY', type: 'float', description: 'Aim direction Y component' },
      ],
    },
    {
      category: 'Trigger Events',
      params: [
        { name: 'Jump', type: 'trigger', description: 'Jump animation started' },
        { name: 'Land', type: 'trigger', description: 'Character landed on ground' },
        { name: 'Dash', type: 'trigger', description: 'Dash animation started' },
        { name: 'WallAttach', type: 'trigger', description: 'Wall contact detected' },
        { name: 'TakeDamage', type: 'trigger', description: 'Damage event triggered' },
        { name: 'Die', type: 'trigger', description: 'Character death triggered' },
        { name: 'Fire', type: 'trigger', description: 'Weapon fired' },
        { name: 'SwitchWeapon', type: 'trigger', description: 'Weapon switched' },
      ],
    },
  ];

  const animationStates = [
    {
      name: 'Idle / Running',
      entry: 'Character is grounded',
      exit: 'Jump, Dash, or airborne',
      features: ['Horizontal parameter controls animation blend', 'Smooth speed transitions', 'Footstep sync points'],
    },
    {
      name: 'Jump',
      entry: 'Jump initiated',
      exit: 'Land trigger or fall duration',
      features: ['Quick rise animation', 'Apex hang point', 'Customizable jump duration'],
    },
    {
      name: 'Falling',
      entry: 'Airborne and moving downward',
      exit: 'Land trigger or wall contact',
      features: ['Loop animation until landing', 'VerticalVelocity parameter affects speed', 'Wind effects feel'],
    },
    {
      name: 'Dash',
      entry: 'Dash initiated',
      exit: 'Dash duration expires',
      features: ['Direction-based animation (left/right)', 'Quick burst animation', 'Can be interrupted by jump'],
    },
    {
      name: 'Wall Climb',
      entry: 'IsWallAttached active',
      exit: 'Wall detached or jump triggered',
      features: ['Descent speed affects animation speed', 'Wall slide friction feel', 'Smooth transition on detach'],
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-reef-gold-100">Animation System</h1>
        <p className="text-reef-gold-200">
          Synchronize character animations with movement, aiming, and combat states using an event-driven architecture.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Animator Parameters</h2>
        {animatorParameters.map((section, idx) => (
          <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
            <h3 className="text-xl font-semibold text-reef-gold-100 mb-4">{section.category}</h3>
            <div className="space-y-3">
              {section.params.map((param, paramIdx) => (
                <div key={paramIdx} className="pb-3 border-b border-reef-gold-600 last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-3 flex-wrap">
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

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Animation States</h2>
        <div className="space-y-4">
          {animationStates.map((state, idx) => (
            <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
              <h3 className="text-lg font-semibold text-reef-gold-100 mb-3">{state.name}</h3>
              <div className="grid gap-4 md:grid-cols-3 mb-4">
                <div>
                  <p className="text-reef-gold-400 text-sm font-semibold mb-1">Entry Condition</p>
                  <p className="text-reef-gold-300 text-sm">{state.entry}</p>
                </div>
                <div>
                  <p className="text-reef-gold-400 text-sm font-semibold mb-1">Exit Condition</p>
                  <p className="text-reef-gold-300 text-sm">{state.exit}</p>
                </div>
                <div>
                  <p className="text-reef-gold-400 text-sm font-semibold mb-1">Key Features</p>
                  <ul className="text-reef-gold-300 text-sm space-y-1">
                    {state.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-start gap-1">
                        <span className="text-reef-gold-500 flex-shrink-0">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Event-Driven Synchronization</h2>
        <div className="space-y-4">
          <p className="text-reef-gold-300">
            Animations are synchronized through Observable field subscriptions from MovementMotor and CombatController.
          </p>
          
          <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
            <h3 className="text-lg font-semibold text-reef-gold-100 mb-4">Common Events</h3>
            <ul className="space-y-3 text-reef-gold-300">
              <li className="flex items-start gap-2">
                <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                <div>
                  <p className="font-semibold text-reef-gold-100">onJump</p>
                  <p className="text-sm text-reef-gold-400">Triggered when jump starts → Sets Jump trigger, starts jump animation</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                <div>
                  <p className="font-semibold text-reef-gold-100">onLand</p>
                  <p className="text-sm text-reef-gold-400">Triggered when landing → Sets Land trigger, transitions to Idle/Running</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                <div>
                  <p className="font-semibold text-reef-gold-100">onDash</p>
                  <p className="text-sm text-reef-gold-400">Triggered when dash is used → Sets Dash trigger, direction animation</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                <div>
                  <p className="font-semibold text-reef-gold-100">onWallAttached</p>
                  <p className="text-sm text-reef-gold-400">Triggered when wall contact detected → Sets WallAttach trigger, wall climb animation</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                <div>
                  <p className="font-semibold text-reef-gold-100">onWeaponFired (CombatController)</p>
                  <p className="text-sm text-reef-gold-400">Triggered when weapon fires → Sets Fire trigger, firing animation</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                <div>
                  <p className="font-semibold text-reef-gold-100">onWeaponSwitched (CombatController)</p>
                  <p className="text-sm text-reef-gold-400">Triggered when switching weapons → Sets SwitchWeapon trigger</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                <div>
                  <p className="font-semibold text-reef-gold-100">OnDamaged (Health)</p>
                  <p className="text-sm text-reef-gold-400">Triggered on damage taken → Sets TakeDamage trigger</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                <div>
                  <p className="font-semibold text-reef-gold-100">horizontal / vertical (Observable)</p>
                  <p className="text-sm text-reef-gold-400">Subscribed → Updates Horizontal parameter for blending animations</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                <div>
                  <p className="font-semibold text-reef-gold-100">aimingDirection (Observable)</p>
                  <p className="text-sm text-reef-gold-400">Subscribed → Updates AimX, AimY for directional aiming blends</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Tips for Great Animation</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
          <ul className="space-y-3 text-reef-gold-300">
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Footstep Sync:</strong> Use animation events to trigger footstep sounds at exact frame points</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Parameter Smoothing:</strong> Use Damping on blend parameters for smooth transitions between speeds</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Transition Timing:</strong> Keep transitions under 0.25s for responsive controls</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>8-Direction Aiming:</strong> Create blend tree with 8 aim poses for smooth aiming feedback</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default AnimationSystem;
