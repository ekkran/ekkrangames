function AimingSystem() {
  const aimingModes = [
    {
      name: 'Gamepad Analog Aiming (Primary)',
      description: 'Continuous directional aiming using right stick input',
      characteristics: [
        'Uses right stick input when magnitude > 0.01',
        'Provides smooth analog control for ranged weapons',
        'Returns normalized direction vector',
        'Ideal for gamepad and controller input',
      ],
    },
    {
      name: 'Keyboard Discrete Aiming (Fallback)',
      description: 'Eight discrete directions using keyboard input (Metroid-style)',
      characteristics: [
        'Uses vertical input (Look action) and horizontal input (Move action)',
        'Supports 8 directions: Up, Down, Left, Right, and diagonals',
        'Falls back to facing direction for left/right with no horizontal input',
        'Downward aiming only available while airborne (jumping/falling)',
      ],
    },
  ];

  const directions = [
    { position: 'Up', input: 'Vertical input > 0.5', direction: 'Straight up' },
    { position: 'Down', input: 'Vertical input < -0.5 (airborne only)', direction: 'Straight down' },
    { position: 'Up-Left', input: 'Up + Left input', direction: 'Diagonal up-left' },
    { position: 'Up-Right', input: 'Up + Right input', direction: 'Diagonal up-right' },
    { position: 'Down-Left', input: 'Down + Left input (airborne)', direction: 'Diagonal down-left' },
    { position: 'Down-Right', input: 'Down + Right input (airborne)', direction: 'Diagonal down-right' },
    { position: 'Left', input: 'Left movement',direction: 'Aims left' },
    { position: 'Right', input: 'Right movement', direction: 'Aims right' },
  ];

  const outputDetails = [
    {
      title: 'Output Vector',
      description: 'Aiming direction as normalized Vector2',
      details: [
        'X component: -1 (left) to 1 (right)',
        'Y component: -1 (down) to 1 (up)',
        'Always normalized to unit length',
      ],
    },
    {
      title: 'Animation Integration',
      description: 'Direction converted to animation position value (0-4 range)',
      details: [
        'Converted based on angle from up direction',
        'Used for 8-way directional aiming animations',
        'Smooth animation blending across directions',
        '0: Up, 1: Diagonals, 2: Horizontal, 3: Diagonals, 4: Down',
      ],
    },
    {
      title: 'Facing Direction',
      description: 'Character facing updated based on aiming direction',
      details: [
        'Automatically set from aiming X component',
        'Falls back to movement direction when no aiming input',
        'Synchronized with animation system',
      ],
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-reef-gold-100">Aiming System</h1>
        <p className="text-reef-gold-200">
          Hybrid aiming system supporting both gamepad analog and keyboard discrete 8-direction aiming.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Aiming Modes</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {aimingModes.map((mode, idx) => (
            <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
              <h3 className="text-lg font-semibold text-reef-gold-100 mb-2">{mode.name}</h3>
              <p className="text-reef-gold-400 text-sm mb-4">{mode.description}</p>
              <ul className="space-y-2">
                {mode.characteristics.map((char, charIdx) => (
                  <li key={charIdx} className="text-sm text-reef-gold-300 flex items-start gap-2">
                    <span className="text-reef-gold-500 flex-shrink-0">→</span>
                    <span>{char}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Eight Discrete Directions</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-marshland-600 border-b border-reef-gold-600">
                  <th className="px-4 py-3 text-left font-semibold text-reef-gold-100">Position</th>
                  <th className="px-4 py-3 text-left font-semibold text-reef-gold-100">Input Required</th>
                  <th className="px-4 py-3 text-left font-semibold text-reef-gold-100">Direction</th>
                </tr>
              </thead>
              <tbody>
                {directions.map((dir, idx) => (
                  <tr key={idx} className="border-b border-reef-gold-600 last:border-b-0 hover:bg-marshland-600">
                    <td className="px-4 py-3">
                      <span className="font-semibold text-reef-gold-100">{dir.position}</span>
                    </td>
                    <td className="px-4 py-3 text-reef-gold-300">{dir.input}</td>
                    <td className="px-4 py-3 text-reef-gold-300">{dir.direction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Output & Integration</h2>
        <div className="grid gap-6">
          {outputDetails.map((item, idx) => (
            <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
              <h3 className="text-lg font-semibold text-reef-gold-100 mb-2">{item.title}</h3>
              <p className="text-reef-gold-300 mb-4">{item.description}</p>
              
              <ul className="space-y-2">
                {item.details.map((detail, detailIdx) => (
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
        <h2 className="text-2xl font-semibold text-reef-gold-100">Integration with Combat</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
          <p className="text-reef-gold-300 mb-4">
            The aiming direction is used by the weapon system to determine fire direction:
          </p>
          <ul className="space-y-3 text-reef-gold-300">
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">▪</span>
              <span><strong>Weapon Targeting:</strong> Normalized aiming direction passed to weapon fire system</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">▪</span>
              <span><strong>Animation Blending:</strong> Aiming direction converted to animation value for 8-way blend tree</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">▪</span>
              <span><strong>Facing Synchronization:</strong> Character facing direction automatically updated from aim direction</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Special Behaviors</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
          <ul className="space-y-3 text-reef-gold-300">
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Downward Aiming:</strong> Only available while airborne (jumping/falling); when grounded and pressing down, aims horizontally in the facing direction instead</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Gamepad Priority:</strong> Right stick input takes priority over keyboard discrete directions when magnitude {'>'} 0.01</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Facing Fallback:</strong> Horizontal directions fall back to current facing direction when no horizontal input detected</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Upcoming Features</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
          <div className="mb-3 p-3 bg-marshland-600 rounded border-l-4 border-reef-gold-500">
            <p className="text-sm text-reef-gold-300">
              <span className="font-semibold text-reef-gold-200">Coming in Next Version:</span> Mouse aiming support will be added, enabling absolute and delta mouse modes for precise targeting on PC.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AimingSystem;
