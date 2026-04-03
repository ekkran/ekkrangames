function InputSystem() {
  const inputActions = [
    {
      name: 'Move',
      type: 'Value (Vector2)',
      description: 'Character locomotion input',
      keyBinding: 'WASD / Arrow Keys',
      gamepadBinding: 'Left Stick',
    },
    {
      name: 'Jump',
      type: 'Button',
      description: 'Jump/special action trigger',
      keyBinding: 'Spacebar',
      gamepadBinding: 'A (Xbox) / Cross (PS)',
    },
    {
      name: 'Dash',
      type: 'Button',
      description: 'Dash ability trigger',
      keyBinding: 'Left Shift',
      gamepadBinding: 'X (Xbox) / Square (PS)',
    },
    {
      name: 'Look',
      type: 'Value (Vector2)',
      description: 'Aiming/look direction input',
      keyBinding: 'Mouse Move',
      gamepadBinding: 'Right Stick',
    },
    {
      name: 'Fire',
      type: 'Button',
      description: 'Weapon fire trigger',
      keyBinding: 'Mouse Left Click',
      gamepadBinding: 'RT / R2 (Right Trigger)',
    },
    {
      name: 'WeaponChange',
      type: 'Value',
      description: 'Switch to next/previous weapon',
      keyBinding: 'Mouse Scroll / E or Q Keys',
      gamepadBinding: 'LB/L1 or RB/R1',
    },
    {
      name: 'Heal',
      type: 'Button',
      description: 'Use healing action',
      keyBinding: 'R Key',
      gamepadBinding: 'Y (Xbox) / Triangle (PS)',
    },
  ];

  const inputModes = [
    {
      name: 'Absolute Aiming (Default)',
      description: 'Mouse position on screen determines aim direction',
      characteristics: [
        'Converted to world direction from character position',
        'More intuitive for point-and-click style aiming',
        'Independent of frame rate',
        'Works naturally with isometric or top-down cameras',
      ],
    },
    {
      name: 'Delta Aiming',
      description: 'Mouse movement delta each frame determines aim direction',
      characteristics: [
        'Accumulates mouse movement over frames',
        'Suitable for first-person or rotation-based aiming',
        'Frame-rate dependent accumulation',
        'Useful for analog stick control smoothing',
      ],
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-reef-gold-100">Input System</h1>
        <p className="text-reef-gold-200">
          Modern Input System integration with flexible controls for keyboard and gamepad.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Input Actions</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-marshland-600 border-b border-reef-gold-600">
                  <th className="px-4 py-3 text-left font-semibold text-reef-gold-100">Action</th>
                  <th className="px-4 py-3 text-left font-semibold text-reef-gold-100">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-reef-gold-100">Description</th>
                  <th className="px-4 py-3 text-left font-semibold text-reef-gold-100">Keyboard</th>
                  <th className="px-4 py-3 text-left font-semibold text-reef-gold-100">Gamepad</th>
                </tr>
              </thead>
              <tbody>
                {inputActions.map((action, idx) => (
                  <tr key={idx} className="border-b border-reef-gold-600 last:border-b-0 hover:bg-marshland-600">
                    <td className="px-4 py-3">
                      <span className="font-mono font-semibold text-reef-gold-100">{action.name}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-marshland-500 text-reef-gold-300 px-2 py-1 rounded">{action.type}</span>
                    </td>
                    <td className="px-4 py-3 text-reef-gold-300">{action.description}</td>
                    <td className="px-4 py-3 text-reef-gold-300">{action.keyBinding}</td>
                    <td className="px-4 py-3 text-reef-gold-300">{action.gamepadBinding}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Input Callback Types</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
            <h3 className="text-lg font-semibold text-reef-gold-100 mb-4">Event Callbacks</h3>
            <ul className="space-y-3 text-reef-gold-300">
              <li className="flex items-start gap-2">
                <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                <div>
                  <p className="font-semibold text-reef-gold-100">started</p>
                  <p className="text-sm">Triggered when button is pressed</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                <div>
                  <p className="font-semibold text-reef-gold-100">canceled</p>
                  <p className="text-sm">Triggered when button is released</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                <div>
                  <p className="font-semibold text-reef-gold-100">performed</p>
                  <p className="text-sm">Triggered on full action completion</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
            <h3 className="text-lg font-semibold text-reef-gold-100 mb-4">Polling (Continuous)</h3>
            <ul className="space-y-3 text-reef-gold-300">
              <li className="flex items-start gap-2">
                <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                <div>
                  <p className="font-semibold text-reef-gold-100">ReadValue</p>
                  <p className="text-sm">Read current input value each frame (e.g., Move/Look)</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                <div>
                  <p className="font-semibold text-reef-gold-100">IsPressed</p>
                  <p className="text-sm">Check if button is currently held down</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-reef-gold-500 flex-shrink-0">▪</span>
                <div>
                  <p className="font-semibold text-reef-gold-100">WasPressedThisFrame</p>
                  <p className="text-sm">Check if pressed during this frame only</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Aiming Modes</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {inputModes.map((mode, idx) => (
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


    </div>
  );
}

export default InputSystem;
