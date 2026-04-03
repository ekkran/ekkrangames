function CoreComponents() {
  const components = [
    {
      name: 'CombatController',
      description: 'Main combat system manager',
      responsibilities: [
        'Weapon management and inventory',
        'Combat state tracking',
        'Event broadcasting',
        'Damage application',
        'Integration with animation/VFX',
      ],
      methods: [
        'FireWeapon() - Trigger current weapon fire',
        'SwitchWeapon(int) - Switch to weapon by index',
        'TakeDamage(float) - Apply damage to character',
        'Heal(float) - Restore health',
      ],
    },
    {
      name: 'Health',
      description: 'Character health management',
      responsibilities: [
        'Health tracking with max health',
        'Damage application with iframe duration',
        'Health events (damaged, healed, died)',
        'Observable health value for UI',
        'Knockback support',
      ],
      methods: [
        'GetHealth() - Current health value',
        'GetMaxHealth() - Maximum health',
        'TakeDamage(float) - Apply damage',
        'Heal(float) - Restore health',
        'IsDead() - Check if dead',
      ],
    },
    {
      name: 'WeaponManager',
      description: 'Weapon inventory and firing system',
      responsibilities: [
        'Weapon inventory tracking',
        'Weapon equipping/switching',
        'Weapon firing coordination',
        'Projectile spawning',
        'Cooldown management',
      ],
      methods: [
        'EquipWeapon(WeaponConfig) - Set current weapon',
        'FireWeapon() - Fire current weapon',
        'SwitchWeapon(int) - Switch by index',
        'GetCurrentWeapon() - Get active weapon',
        'CanFire() - Check if ready to fire',
      ],
    },
    {
      name: 'Projectile',
      description: 'Individual projectile behavior',
      responsibilities: [
        'Velocity-based movement',
        'Lifetime management',
        'Collision detection',
        'Damage application',
        'Pooling support',
      ],
      methods: [
        'Initialize(position, direction, speed, damage)',
        'Deactivate() - Return to pool',
        'OnHit(Collider) - Handle collision',
      ],
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-reef-gold-100">Core Components</h1>
        <p className="text-reef-gold-200">
          The Combat System consists of four core components that work together to manage all combat mechanics.
        </p>
      </div>

      <section className="space-y-6">
        {components.map((component, idx) => (
          <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-reef-gold-100">{component.name}</h3>
              <p className="text-reef-gold-400 text-sm mt-1">{component.description}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-reef-gold-200 mb-3">Responsibilities</h4>
                <ul className="space-y-2">
                  {component.responsibilities.map((resp, respIdx) => (
                    <li key={respIdx} className="text-sm text-reef-gold-300 flex items-start gap-2">
                      <span className="text-reef-gold-500 flex-shrink-0 mt-0.5">▪</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-reef-gold-200 mb-3">Key Methods</h4>
                <ul className="space-y-2">
                  {component.methods.map((method, methodIdx) => (
                    <li key={methodIdx} className="text-sm text-reef-gold-300 flex items-start gap-2">
                      <span className="text-reef-gold-500 flex-shrink-0">→</span>
                      <span>{method}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
        <h3 className="text-lg font-semibold text-reef-gold-100 mb-3">Integration Pattern</h3>
        <p className="text-reef-gold-300 mb-4">
          The components use an event-based architecture for loose coupling:
        </p>
        <ul className="space-y-2 text-reef-gold-300">
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500 flex-shrink-0">•</span>
            <span><strong>CombatController</strong> coordinates between Health and WeaponManager</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500 flex-shrink-0">•</span>
            <span><strong>WeaponManager</strong> spawns and manages Projectiles from pool</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500 flex-shrink-0">•</span>
            <span><strong>Projectiles</strong> notify via IDamageable interface when hitting targets</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500 flex-shrink-0">•</span>
            <span><strong>Health</strong> broadcasts events for UI, animation, and VFX systems</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CoreComponents;
