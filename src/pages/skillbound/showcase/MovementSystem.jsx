function MovementSystem() {
  const sections = [
    {
      title: 'Overview',
      description: 'The core Movement System manages all character locomotion, physics, and state transitions through a finite state machine architecture.',
    },
    {
      title: 'State Machine',
      description: 'Finite state machine with 6 states: Grounded, Rising, Falling, Jumping, WallAttached, and Dashing.',
      subsections: [
        'State Diagram',
        'GroundedState',
        'RisingState',
        'FallingState',
        'JumpingState',
        'WallAttachedState',
        'DashingState',
      ],
    },
    {
      title: 'Movement Configuration',
      description: 'Centralized movement parameters via MovementConfig ScriptableObject.',
      subsections: [
        'Movement Parameters',
        'Jump Parameters',
        'Crouch Parameters',
        'Wall Mechanics',
        'Dash Parameters',
      ],
    },
    {
      title: 'Collision Detection',
      description: 'RaycastSensor system for robust collision detection.',
      subsections: [
        'RaycastSensor System',
        'Ground Sensor',
        'Low-Side Sensor (Wall Detection)',
        'RaycastSensor Features',
      ],
    },
    {
      title: 'Movement Features',
      description: 'Advanced platformer mechanics including double jump, wall climbing, dashing, and more.',
      subsections: [
        'Double Jump',
        'Wall Climbing & Wall Jumping',
        'Dash Ability',
        'Crouch/Slide',
        'Coyote Time',
        'Jump Buffer',
        'Momentum System',
      ],
    },
    {
      title: 'Observable Fields',
      description: 'Exposed fields for UI and system integration: horizontal, vertical, grounded, hanging, dashing, position, facingDirection, aimingDirection.',
    },
    {
      title: 'Events',
      description: 'Movement system events: onDash, onJump, onLand, onWallAttached.',
    },
    {
      title: 'Aiming System',
      description: 'Advanced aiming system with absolute and delta modes, mouse sensitivity, and smoothing options.',
    },
    {
      title: 'Debugging & Monitoring',
      description: 'State machine logging and debug information for development and troubleshooting.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-reef-gold-100">Movement System</h2>
        <p className="text-reef-gold-200">
          Advanced state-driven movement with jumping, wall climbing, dashing, and momentum-based physics.
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6 hover:border-reef-gold-500 hover:bg-marshland-600 transition-colors">
            <h3 className="text-xl font-semibold text-reef-gold-100 mb-2">{section.title}</h3>
            <p className="text-reef-gold-300 mb-4">{section.description}</p>
            
            {section.subsections && (
              <div className="mt-4 pl-4 border-l-2 border-reef-gold-600">
                <p className="text-sm text-reef-gold-400 font-semibold mb-2">Key Topics:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {section.subsections.map((subsection, subIdx) => (
                    <li key={subIdx} className="text-reef-gold-300 flex items-start">
                      <span className="text-reef-gold-500 mr-2">▪</span>
                      <span>{subsection}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
        <h3 className="text-lg font-semibold text-reef-gold-100 mb-2">Full Documentation</h3>
        <p className="text-reef-gold-300">
          For detailed implementation information, consult the complete Movement System documentation in the Resources section.
        </p>
      </div>
    </div>
  )
}

export default MovementSystem
