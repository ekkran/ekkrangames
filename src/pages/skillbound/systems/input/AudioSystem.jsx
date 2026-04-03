function AudioSystem() {
  const audioEvents = [
    {
      category: 'Movement Audio',
      sounds: [
        { name: 'PlayJumpClip', description: 'Jump takeoff sound effect', trigger: 'onJump event', signature: 'PlayJumpClip()' },
        { name: 'PlayLandClip', description: 'Landing impact sound', trigger: 'onLand event', signature: 'PlayLandClip()' },
        { name: 'PlayDashClip', description: 'Dash movement sound effect', trigger: 'onDash event', signature: 'PlayDashClip()' },
      ],
    },
  ];

  const features = [
    {
      title: 'Event-Driven Playback',
      description: 'Audio clips play automatically on movement events',
      details: [
        'Subscribe to MovementMotor events',
        'Audio plays without manual triggering',
        'Each movement event has dedicated audio clip',
      ],
    },
    {
      title: 'Audio Source Pooling',
      description: 'Efficient audio playback with reusable audio sources',
      details: [
        'Pre-creates AudioSource instances',
        'Reuses inactive sources for new sound playback',
        'Reduces runtime instantiation overhead',
      ],
    },
    {
      title: 'Volume Control',
      description: 'Simple volume management system',
      details: [
        'Master volume: Global audio level',
        'SFX volume: Individual sound effects volume',
        'Both scale together for unified control',
      ],
    },
    {
      title: 'Spatial Audio',
      description: 'Positional audio effects in 3D world',
      details: [
        'Sounds play from character position',
        'Automatic attenuation with distance',
        'Immersive audio feedback for movement',
      ],
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-reef-gold-100">Audio System</h1>
        <p className="text-reef-gold-200">
          Sound effects management with pooling, spatial audio, and event-driven playback.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Audio Events Reference</h2>
        {audioEvents.map((section, idx) => (
          <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
            <h3 className="text-xl font-semibold text-reef-gold-100 mb-4">{section.category}</h3>
            <div className="space-y-3">
              {section.sounds.map((sound, soundIdx) => (
                <div key={soundIdx} className="pb-3 border-b border-reef-gold-600 last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-mono text-reef-gold-100 font-semibold">{sound.name}</h4>
                      <p className="text-reef-gold-300 text-sm mt-1">{sound.description}</p>
                      <p className="text-reef-gold-400 text-xs mt-2 flex items-center gap-1">
                        <span className="text-reef-gold-500">→</span>
                        Triggered by: <span className="font-mono">{sound.trigger}</span>
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
        <h2 className="text-2xl font-semibold text-reef-gold-100">Audio Configuration</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
          <div className="space-y-4">
            <div className="pb-4 border-b border-reef-gold-600">
              <h4 className="font-semibold text-reef-gold-100 mb-2 flex items-center gap-2">
                <span className="text-reef-gold-500">▪</span>
                Audio Clips Assignment
              </h4>
              <p className="text-reef-gold-300 text-sm ml-6">PlayJumpClip: Jump takeoff sound (0.3-0.8 seconds typical)</p>
              <p className="text-reef-gold-300 text-sm ml-6">PlayLandClip: Landing impact sound (0.2-0.5 seconds typical)</p>
              <p className="text-reef-gold-300 text-sm ml-6">PlayDashClip: Dash effect sound (0.2-0.6 seconds typical)</p>
            </div>

            <div className="pb-4 border-b border-reef-gold-600">
              <h4 className="font-semibold text-reef-gold-100 mb-2 flex items-center gap-2">
                <span className="text-reef-gold-500">▪</span>
                Volume Settings
              </h4>
              <p className="text-reef-gold-300 text-sm ml-6">Master Volume: 0.0 - 1.0 (default 1.0)</p>
              <p className="text-reef-gold-300 text-sm ml-6">SFX Volume: 0.0 - 1.0 (default 0.8)</p>
            </div>

            <div className="pb-4 border-b border-reef-gold-600">
              <h4 className="font-semibold text-reef-gold-100 mb-2 flex items-center gap-2">
                <span className="text-reef-gold-500">▪</span>
                Audio Source Pool
              </h4>
              <p className="text-reef-gold-300 text-sm ml-6">Pool Size: 4-8 sources typical</p>
              <p className="text-reef-gold-300 text-sm ml-6">Sufficient for 3 movement audio events</p>
            </div>

            <div>
              <h4 className="font-semibold text-reef-gold-100 mb-2 flex items-center gap-2">
                <span className="text-reef-gold-500">▪</span>
                Audio Format
              </h4>
              <p className="text-reef-gold-300 text-sm ml-6">Use compressed formats (Ogg Vorbis, MP3) for efficiency</p>
              <p className="text-reef-gold-300 text-sm ml-6">Mono for 3D positional audio, stereo optional</p>
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
              <span><strong>Clip Length:</strong> Keep audio clips short (under 1 second for jump/land/dash)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Volume Balance:</strong> Test relative volumes across the 3 movement sounds</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Audio Format:</strong> Use compressed formats (Ogg Vorbis, MP3) for storage efficiency</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Event Synchronization:</strong> Ensure audio plays at correct moment in animation cycle</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Pool Size:</strong> Size pools for concurrent sounds; 4-8 sources sufficient</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default AudioSystem;
