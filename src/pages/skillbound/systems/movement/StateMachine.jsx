import stateMachineImage from '../../../../../assets/skillbound-misc/state-machine.png';

function StateMachine() {
  const states = [
    {
      name: 'GroundedState',
      description: 'Character is standing on the ground.',
      entryConditions: [
        'Ground detected via raycast',
        'Vertical velocity near zero',
      ],
      exitConditions: [
        'Ground contact lost',
        'Jump input detected',
      ],
      behavior: [
        'Apply ground friction',
        'Track horizontal movement input',
        'Listen for jump and dash input',
      ],
    },
    {
      name: 'RisingState',
      description: 'Character is moving upward after a jump.',
      entryConditions: [
        'Jump initiated',
        'Vertical velocity positive',
      ],
      exitConditions: [
        'Vertical velocity peaks and starts falling',
        'Wall attachment triggered',
        'Dash input received',
      ],
      behavior: [
        'Apply air friction',
        'Allow air movement control',
        'Apply gravity gradually',
        'Monitor for wall collision',
      ],
    },
    {
      name: 'FallingState',
      description: 'Character is moving downward or falling.',
      entryConditions: [
        'Vertical velocity becomes negative',
        'Exited Rising state',
      ],
      exitConditions: [
        'Ground contact regained',
        'Wall attachment triggered',
      ],
      behavior: [
        'Apply air friction',
        'Apply gravity acceleration',
        'Allow limited air control',
        'Check wall collision continuously',
      ],
    },
    {
      name: 'JumpingState',
      description: 'Character is performing an active jump.',
      entryConditions: [
        'Jump input pressed',
        'Character grounded or coyote time active',
        'Jump count available',
      ],
      exitConditions: [
        'Jump button released',
        'Maximum jump duration reached',
      ],
      behavior: [
        'Apply sustained upward force',
        'Maintain jump for button duration',
        'Track jump count',
      ],
    },
    {
      name: 'WallAttachedState',
      description: 'Character is clinging to a wall.',
      entryConditions: [
        'Wall detected nearby',
        'Horizontal input toward wall',
        'Not grounded',
        'Moving downward or slowly',
      ],
      exitConditions: [
        'Wall contact lost',
        'Jump initiated',
        'Reattach cooldown active',
      ],
      behavior: [
        'Apply reduced wall gravity',
        'Allow wall jump ability',
        'Reduce horizontal momentum',
      ],
    },
    {
      name: 'DashingState',
      description: 'Character is performing a dash ability.',
      entryConditions: [
        'Dash input received',
        'Dash cooldown expired',
        'Ability enabled',
      ],
      exitConditions: [
        'Dash duration expires',
        'Dash cooldown initiated',
      ],
      behavior: [
        'Apply constant forward force',
        'Disable gravity during dash',
        'Prevent other movement inputs',
      ],
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-reef-gold-100">State Machine Architecture</h1>
        <p className="text-reef-gold-200">
          The Movement System uses a finite state machine with 6 core states that handle all character locomotion and physics transitions.
        </p>
      </div>

      <section className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
        <img 
          src={stateMachineImage} 
          alt="State Machine Diagram" 
          className="w-full h-auto rounded-md"
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Core States</h2>
        {states.map((state, idx) => (
          <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
            <h3 className="text-xl font-semibold text-reef-gold-100 mb-2">{state.name}</h3>
            <p className="text-reef-gold-300 mb-4">{state.description}</p>
            
            <div className="grid gap-6 mt-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-reef-gold-200 mb-2">Entry Conditions</h4>
                <ul className="space-y-1">
                  {state.entryConditions.map((condition, idx) => (
                    <li key={idx} className="text-sm text-reef-gold-300 flex items-start gap-2">
                      <span className="text-reef-gold-500 flex-shrink-0">→</span>
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-reef-gold-200 mb-2">Exit Conditions</h4>
                <ul className="space-y-1">
                  {state.exitConditions.map((condition, idx) => (
                    <li key={idx} className="text-sm text-reef-gold-300 flex items-start gap-2">
                      <span className="text-reef-gold-500 flex-shrink-0">✓</span>
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-reef-gold-600">
              <h4 className="font-semibold text-reef-gold-200 mb-2">Behavior</h4>
              <ul className="space-y-1">
                {state.behavior.map((action, idx) => (
                  <li key={idx} className="text-sm text-reef-gold-300 flex items-start gap-2">
                    <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
        <h3 className="text-lg font-semibold text-reef-gold-100 mb-2">How Transitions Work</h3>
        <p className="text-reef-gold-300 mb-4">
          States transition automatically based on physics and input. The system continuously evaluates:
        </p>
        <ul className="space-y-2 text-reef-gold-300">
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500">•</span>
            <span>Ground contact (via raycast sensors)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500">•</span>
            <span>Vertical velocity direction</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500">•</span>
            <span>Player input (move, jump, dash)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500">•</span>
            <span>Wall proximity</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500">•</span>
            <span>Ability cooldowns</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default StateMachine;
