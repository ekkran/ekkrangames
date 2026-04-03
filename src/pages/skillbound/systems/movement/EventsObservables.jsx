import unityEventsImage from '../../../../../assets/skillbound-misc/unity-events-movement.png';

function EventsObservables() {
  const observables = [
    { name: 'horizontal', type: 'Observer<float>', range: '-1 to 1', description: 'Input horizontal value' },
    { name: 'vertical', type: 'Observer<float>', range: '-1 to 1', description: 'Input vertical value' },
    { name: 'grounded', type: 'Observer<bool>', range: 'true/false', description: 'Is character on ground?' },
    { name: 'hanging', type: 'Observer<bool>', range: 'true/false', description: 'Is character on wall?' },
    { name: 'dashing', type: 'Observer<bool>', range: 'true/false', description: 'Is character dashing?' },
    { name: 'position', type: 'Observer<float>', range: 'varies', description: 'Character X position' },
    { name: 'facingDirection', type: 'Observer<float>', range: '-1 or 1', description: 'Normalized left/right facing' },
    { name: 'aimingDirection', type: 'Observer<Vector2>', range: 'varies', description: 'Aim direction for aiming systems' },
  ];

  const events = [
    {
      name: 'onDash',
      signature: 'UnityEvent<Vector3>',
      description: 'Triggered when dash starts',
      parameter: 'Vector3 - Direction of the dash',
      uses: [
        'Play dash particle effects',
        'Play dash sound effect',
        'Trail renderers',
        'Camera shake effect',
      ],
    },
    {
      name: 'onJump',
      signature: 'UnityEvent',
      description: 'Triggered when jump starts',
      parameter: 'None',
      uses: [
        'Play jump sound effect',
        'Play jump animation',
        'Create jump dust particles',
        'Camera feedback',
      ],
    },
    {
      name: 'onLand',
      signature: 'UnityEvent',
      description: 'Triggered when landing on ground',
      parameter: 'None',
      uses: [
        'Play landing sound effect',
        'Play landing animation',
        'Create impact particles',
        'Screen shake for ground pound',
      ],
    },
    {
      name: 'onWallAttached',
      signature: 'UnityEvent<Vector3>',
      description: 'Triggered when attaching to wall',
      parameter: 'Vector3 - Wall normal direction',
      uses: [
        'Play wall attach particle effect',
        'Change character visual (glow, color)',
        'Play wall attach sound',
        'Wall slide particle loop',
      ],
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-reef-gold-100">Events & Observable Fields</h1>
        <p className="text-reef-gold-200">
          The Movement System exposes events and observable fields for integration with other game systems like animation, VFX, and UI.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Observable Fields</h2>
        <p className="text-reef-gold-300">
          Observable fields expose real-time movement data for UI updates and system monitoring:
        </p>

        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-reef-gold-600">
                  <th className="text-left py-3 px-3 text-reef-gold-100 font-semibold">Field Name</th>
                  <th className="text-left py-3 px-3 text-reef-gold-100 font-semibold">Type</th>
                  <th className="text-left py-3 px-3 text-reef-gold-100 font-semibold">Range</th>
                  <th className="text-left py-3 px-3 text-reef-gold-100 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {observables.map((obs, idx) => (
                  <tr key={idx} className="border-b border-reef-gold-700 last:border-b-0">
                    <td className="py-3 px-3 text-reef-gold-100 font-mono">{obs.name}</td>
                    <td className="py-3 px-3 text-reef-gold-300 font-mono text-xs">{obs.type}</td>
                    <td className="py-3 px-3 text-reef-gold-400">{obs.range}</td>
                    <td className="py-3 px-3 text-reef-gold-300">{obs.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Events</h2>
        <p className="text-reef-gold-300">
          Movement system events trigger when specific actions occur, allowing other systems to react:
        </p>

        <div className="space-y-6">
          {events.map((event, idx) => (
            <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
              <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                <div>
                  <h3 className="text-lg font-semibold text-reef-gold-100">{event.name}</h3>
                  <p className="text-sm font-mono text-reef-gold-400 mt-1">{event.signature}</p>
                </div>
              </div>

              <p className="text-reef-gold-300 mb-4">{event.description}</p>

              {event.parameter && (
                <div className="mb-4 p-3 bg-marshland-600 rounded">
                  <p className="text-sm text-reef-gold-400 font-semibold">Parameter:</p>
                  <p className="text-sm text-reef-gold-300">{event.parameter}</p>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-reef-gold-200 mb-2">Common Uses:</h4>
                <ul className="space-y-1">
                  {event.uses.map((use, useIdx) => (
                    <li key={useIdx} className="text-sm text-reef-gold-300 flex items-start gap-2">
                      <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Integration</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
          <div className="flex gap-8 items-center flex-wrap lg:flex-nowrap">
            <div className="flex-shrink-0 min-w-0">
              <img 
                src={unityEventsImage} 
                alt="Unity Events Inspector" 
                className="h-auto max-h-96 rounded-md"
              />
            </div>
            <div className="flex-1 min-w-full lg:min-w-0">
              <h3 className="text-xl font-semibold text-reef-gold-100 mb-4">Events via Inspector</h3>
              <p className="text-reef-gold-300 mb-4">
                All movement system events are directly accessible in the Unity Inspector. Once you assign the MovementMotor component to a script, you can:
              </p>
              <ul className="space-y-3 text-reef-gold-300">
                <li className="flex items-start gap-2">
                  <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                  <span><strong>Drag & Drop:</strong> Connect other GameObjects and methods directly in the Inspector</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                  <span><strong>No Code Required:</strong> Set up VFX, animations, and feedback without writing code</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                  <span><strong>Rapid Iteration:</strong> Quickly prototype and test different event-driven systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                  <span><strong>Multiple Listeners:</strong> Assign multiple event listeners for complex interactions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EventsObservables;
