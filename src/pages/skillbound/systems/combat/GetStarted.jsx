function GetStarted() {
  const quickSteps = [
    {
      title: 'Attach CombatController',
      description: 'Add the CombatController component to your character. This manages all combat functionality.',
    },
    {
      title: 'Attach Health Component',
      description: 'Add the Health component to track character health and damage state.',
    },
    {
      title: 'Create Weapon Configs',
      description: 'Create WeaponConfig ScriptableObjects via Right-click > Create > Character > WeaponConfig for each weapon.',
    },
    {
      title: 'Configure Weapon Parameters',
      description: 'Set fireRate, damage, speed, knockback, and spread values for each weapon.',
    },
    {
      title: 'Setup Projectile Pooling',
      description: 'Configure the projectile pool with initial size and projectile prefab for performance.',
    },
    {
      title: 'Connect Input',
      description: 'Map input events to FireWeapon() and SwitchWeapon() methods in your input system.',
    },
  ];

  const keyFeatures = [
    'Flexible health management system with iframes',
    'Weapon inventory and switching',
    'Configurable damage and knockback',
    'Projectile object pooling for performance',
    'Event-based architecture for easy integration',
    'Support for weapon spread and multi-projectiles',
    'IDamageable interface for custom damage handling',
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-reef-gold-100">Combat System - Get Started</h1>
        <p className="text-reef-gold-200">
          Learn how to set up and configure the SkillBound Combat System for your game.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Quick Start Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {quickSteps.map((step, idx) => (
            <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-reef-gold-700 text-reef-gold-100 font-semibold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-reef-gold-100">{step.title}</h3>
                  <p className="mt-1 text-sm text-reef-gold-300">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Key Features</h2>
        <ul className="space-y-2">
          {keyFeatures.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-reef-gold-200">
              <span className="flex-shrink-0 text-reef-gold-500 mt-1">▪</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
        <h3 className="text-lg font-semibold text-reef-gold-100 mb-2">Next Steps</h3>
        <p className="text-reef-gold-300 mb-4">
          Explore the detailed documentation for each combat system component:
        </p>
        <ul className="space-y-2 text-reef-gold-300">
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500">→</span>
            <span><strong>Core Components:</strong> Understand CombatController, Health, and WeaponManager</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500">→</span>
            <span><strong>Weapon Configuration:</strong> Create and configure weapons with damage, spread, and knockback</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500">→</span>
            <span><strong>Aiming System:</strong> Setup 2.5D aiming with collision detection and visual feedback</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default GetStarted;
