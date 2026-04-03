function GetStarted() {
  const setupSteps = [
    {
      step: 1,
      title: 'Enable Input System',
      description: 'Configure Modern Input System bindings in your project',
      details: [
        'Ensure the Input.asset InputActionAsset is generated',
        'Configure Action Maps (Character input)',
        'Set up keyboard and gamepad bindings',
        'Assign buttons/axes for Move, Jump, Dash, Look, Fire, WeaponChange, Heal',
      ],
    },
    {
      step: 2,
      title: 'Set Up AnimationManager',
      description: 'Create the animation controller and synchronize with movement',
      details: [
        'Create Animator parameter set matching MovementMotor outputs',
        'Configure state machine with Idle, Jump, Fall, Dash states',
        'Set up Float parameters: Horizontal, AimX, AimY, VerticalVelocity',
        'Set up Bool parameters: IsGrounded, IsInAir, IsDashing',
      ],
    },
    {
      step: 3,
      title: 'Configure VFXManager',
      description: 'Set up VFX prefabs and event connections',
      details: [
        'Create or import VFX prefabs (dust, dash, landing effects)',
        'Assign VFX prefabs to VFXManager component',
        'Subscribe to movement events for automatic VFX playback',
        'Test effects at different speeds and positions',
      ],
    },
    {
      step: 4,
      title: 'Setup SoundManager',
      description: 'Configure audio clips and spatial audio systems',
      details: [
        'Prepare audio clips for (footstep, jump, landing, damage)',
        'Assign clips to SoundManager in the Inspector',
        'Configure audio source pooling (16+ sources recommended)',
        'Adjust volume levels for SFX, Music, Master',
      ],
    },
    {
      step: 5,
      title: 'Test Integration',
      description: 'Validate that all systems work together smoothly',
      details: [
        'Run in play mode and verify input response',
        'Check animation playback matches movement states',
        'Listen for audio feedback and VFX visibility',
      ],
    },
    {
      step: 6,
      title: 'Customize Configuration',
      description: 'Fine-tune settings to match your game feel',
      details: [
        'Adjust mouse sensitivity for aiming',
        'Tweak animation transition timings',
        'Modify VFX effect scales and durations',
        'Balance audio levels for immersion',
      ],
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-reef-gold-100">Input & Animation - Get Started</h1>
        <p className="text-reef-gold-200">
          Set up and integrate the complete input, animation, VFX, and audio systems.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Setup Workflow</h2>
        <div className="space-y-4">
          {setupSteps.map((entry) => (
            <div key={entry.step} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-reef-gold-700">
                    <span className="text-sm font-semibold text-marshland-800">{entry.step}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-reef-gold-100">{entry.title}</h3>
                  <p className="text-reef-gold-300 mt-1">{entry.description}</p>
                  <ul className="mt-3 space-y-2">
                    {entry.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-reef-gold-300 flex items-start gap-2">
                        <span className="text-reef-gold-500 flex-shrink-0">→</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Key Concepts</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
          <ul className="space-y-3 text-reef-gold-300">
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">▪</span>
              <span><strong>Modern Input System:</strong> Flexible input with keyboard and gamepad support</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">▪</span>
              <span><strong>Event-Driven Animation:</strong> Movement events automatically trigger animation updates through subscriptions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">▪</span>
              <span><strong>Unified Feedback:</strong> Input → Animation → VFX → Audio all synchronized for cohesive feel</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">▪</span>
              <span><strong>Performance Optimized:</strong> Object pooling for particles and audio sources reduces garbage collection</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default GetStarted;
