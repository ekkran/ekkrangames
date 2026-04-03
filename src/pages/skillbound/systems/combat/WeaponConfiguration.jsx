function WeaponConfiguration() {
  const weaponParams = [
    {
      category: 'Weapon Info',
      params: [
        { name: 'weaponName', type: 'string', description: 'Display name for the weapon' },
        { name: 'weaponID', type: 'int', description: 'Unique identifier (default: -1)' },
      ],
    },
    {
      category: 'Configuration',
      params: [
        { name: 'fireRate', type: 'float', description: 'Time in seconds between shots' },
        { name: 'weaponPrefab', type: 'GameObject', description: 'Visual model of the weapon' },
        { name: 'bulletPrefab', type: 'GameObject', description: 'Projectile prefab to spawn' },
        { name: 'bulletSpeed', type: 'float', description: 'Projectile movement speed' },
      ],
    },
    {
      category: 'Audio & UI',
      params: [
        { name: 'icon', type: 'Sprite', description: 'Inventory icon for the weapon' },
        { name: 'shotSound', type: 'AudioClip', description: 'Fire sound effect' },
      ],
    },
  ];

  const weaponExamples = [
    {
      name: 'Rifle',
      description: 'High fire rate weapon',
      config: {
        fireRate: 0.2,
        bulletSpeed: 30.0,
        bulletPrefab: 'rifle_bullet',
      },
    },
    {
      name: 'Sniper Rifle',
      description: 'Slow fire rate, high impact',
      config: {
        fireRate: 2.0,
        bulletSpeed: 50.0,
        bulletPrefab: 'sniper_bullet',
      },
    },
    {
      name: 'Pistol',
      description: 'Balanced weapon',
      config: {
        fireRate: 0.5,
        bulletSpeed: 25.0,
        bulletPrefab: 'pistol_bullet',
      },
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-reef-gold-100">Weapon Configuration</h1>
        <p className="text-reef-gold-200">
          Create and configure weapons using WeaponConfig ScriptableObjects. Create via: Right-click {'>'} Create {'>'} Character {'>'} WeaponConfig
        </p>
      </div>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Configuration Parameters</h2>
        {weaponParams.map((section, idx) => (
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
        <h2 className="text-2xl font-semibold text-reef-gold-100">Weapon Examples</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {weaponExamples.map((weapon, idx) => (
            <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
              <h3 className="text-lg font-semibold text-reef-gold-100 mb-1">{weapon.name}</h3>
              <p className="text-reef-gold-400 text-sm mb-4">{weapon.description}</p>
              <div className="space-y-2 text-sm text-reef-gold-300">
                <div className="flex justify-between">
                  <span>Fire Rate:</span>
                  <span className="font-mono text-reef-gold-100">{weapon.config.fireRate}s</span>
                </div>
                <div className="flex justify-between">
                  <span>Bullet Speed:</span>
                  <span className="font-mono text-reef-gold-100">{weapon.config.bulletSpeed}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bullet Prefab:</span>
                  <span className="font-mono text-reef-gold-100 text-xs">{weapon.config.bulletPrefab}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
        <h3 className="text-lg font-semibold text-reef-gold-100 mb-2">Configuration Tips</h3>
        <ul className="space-y-3 text-reef-gold-300">
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500 flex-shrink-0">•</span>
            <span><strong>Fire Rate:</strong> Time in seconds between shots. Use 0.1-0.3 for rapid fire, 1.0+ for slower weapons</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500 flex-shrink-0">•</span>
            <span><strong>Bullet Speed:</strong> Higher values for faster projectiles. Range typically 20-60 units per frame</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500 flex-shrink-0">•</span>
            <span><strong>Prefabs:</strong> Ensure bulletPrefab has projectile script, weaponPrefab is properly rigged</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500 flex-shrink-0">•</span>
            <span><strong>Audio:</strong> Keep shotSound clips short (under 1 second) for better responsiveness feedback</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default WeaponConfiguration;
