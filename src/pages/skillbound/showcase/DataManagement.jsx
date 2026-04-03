function DataManagement() {
  const dataTypes = [
    {
      name: 'CurrentMoveSet',
      description: 'Tracks available character capabilities at runtime',
      fields: [
        { name: 'CanHighJump', type: 'bool', default: 'false' },
        { name: 'MaxConsecutiveJumps', type: 'int', default: '0' },
        { name: 'CanWallJump', type: 'bool', default: 'false' },
        { name: 'CanDash', type: 'bool', default: 'false' },
      ],
    },
    {
      name: 'WeaponData',
      description: 'Runtime weapon inventory and state',
      fields: [
        { name: 'weaponIndex', type: 'int', description: 'Currently equipped weapon index' },
        { name: 'inventory', type: 'List<WeaponConfig>', description: 'Available weapons' },
        { name: 'ammo', type: 'float', description: 'Current ammo count' },
        { name: 'reloadTime', type: 'float', description: 'Reload cooldown remaining' },
      ],
    },
  ];

  const configTypes = [
    {
      name: 'MovementConfig',
      description: 'Global character movement settings',
      sections: [
        {
          title: 'Movement Parameters',
          params: ['speed', 'gravity', 'ground', 'groundDistance', 'groundFriction', 'airFriction'],
        },
        {
          title: 'Jump Parameters',
          params: ['maxJumpTime', 'minJumpTime', 'jumpForce', 'highJumpForce', 'coyoteTime', 'jumpBuffer', 'airControlRate'],
        },
        {
          title: 'Crouch Parameters',
          params: ['crouchColliderHeight', 'crouchColliderCenter'],
        },
        {
          title: 'Wall Mechanics',
          params: ['wallGravity', 'wallJumpForce', 'wallReattachCooldown', 'wallAttachVerticalThreshold'],
        },
        {
          title: 'Dash Parameters',
          params: ['dashForce', 'dashDuration', 'dashCooldown'],
        },
      ],
    },
    {
      name: 'WeaponConfig',
      description: 'Individual weapon settings',
      sections: [
        {
          title: 'Weapon Info',
          params: ['weaponName', 'weaponID'],
        },
        {
          title: 'Configuration',
          params: ['fireRate', 'weaponPrefab', 'bulletPrefab', 'bulletSpeed'],
        },
        {
          title: 'Audio & UI',
          params: ['icon', 'shotSound'],
        },
      ],
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-reef-gold-100">Data Management System</h1>
        <p className="text-reef-gold-200">
          Centralized data layer with type-safe configuration management using ScriptableObjects and the DataWarehouse singleton pattern.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Overview</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
          <p className="text-reef-gold-300 mb-4">
            The data layer provides a centralized, type-safe system for managing configuration and runtime data. It follows the Singleton pattern with the DataWarehouse class providing global access to all data.
          </p>
          <ul className="space-y-2 text-reef-gold-300">
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Single point of access:</strong> DataWarehouse.Instance for all configuration and runtime data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Type-safe API:</strong> Generic methods for storing/retrieving any data type</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Loaded at startup:</strong> Essential configuration initialized by DataManager</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-reef-gold-500 flex-shrink-0">•</span>
              <span><strong>Accessible from anywhere:</strong> No direct component references needed</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">DataWarehouse API</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
          <p className="text-reef-gold-300 mb-6">
            Core methods for storing and retrieving data with generic type support:
          </p>
          <div className="space-y-4">
            <div className="bg-marshland-600 rounded p-4">
              <div className="font-mono text-sm text-reef-gold-400 mb-2">StoreData(string key, T data)</div>
              <p className="text-sm text-reef-gold-300">Store data in the warehouse with a unique key</p>
            </div>
            <div className="bg-marshland-600 rounded p-4">
              <div className="font-mono text-sm text-reef-gold-400 mb-2">GetData&lt;T&gt;(string key)</div>
              <p className="text-sm text-reef-gold-300">Retrieve data by key with type specification</p>
            </div>
            <div className="bg-marshland-600 rounded p-4">
              <div className="font-mono text-sm text-reef-gold-400 mb-2">HasData(string key)</div>
              <p className="text-sm text-reef-gold-300">Check if data exists in the warehouse</p>
            </div>
            <div className="bg-marshland-600 rounded p-4">
              <div className="font-mono text-sm text-reef-gold-400 mb-2">RemoveData(string key)</div>
              <p className="text-sm text-reef-gold-300">Remove data from the warehouse</p>
            </div>
          </div>

          <div className="mt-6 bg-marshland-600 rounded p-4 border-l-4 border-reef-gold-500">
            <p className="text-sm text-reef-gold-300">
              <span className="font-semibold text-reef-gold-100">Access Pattern:</span> var warehouse = DataWarehouse.Instance;
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Configuration System</h2>
        <div className="space-y-6">
          {configTypes.map((config, idx) => (
            <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
              <h3 className="text-lg font-semibold text-reef-gold-100 mb-2">{config.name}</h3>
              <p className="text-reef-gold-400 text-sm mb-4">{config.description}</p>
              
              <div className="space-y-4">
                {config.sections.map((section, sectionIdx) => (
                  <div key={sectionIdx} className="bg-marshland-600 rounded p-4">
                    <h4 className="font-semibold text-reef-gold-100 mb-3 text-sm">{section.title}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {section.params.map((param, paramIdx) => (
                        <div key={paramIdx} className="text-xs text-reef-gold-400 font-mono">
                          • {param}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Data Types</h2>
        <div className="space-y-6">
          {dataTypes.map((dataType, idx) => (
            <div key={idx} className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
              <h3 className="text-lg font-semibold text-reef-gold-100 mb-2">{dataType.name}</h3>
              <p className="text-reef-gold-400 text-sm mb-4">{dataType.description}</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-marshland-600 border-b border-reef-gold-600">
                      <th className="px-4 py-2 text-left font-semibold text-reef-gold-100">Field</th>
                      <th className="px-4 py-2 text-left font-semibold text-reef-gold-100">Type</th>
                      {dataType.fields[0].default && <th className="px-4 py-2 text-left font-semibold text-reef-gold-100">Default</th>}
                      {dataType.fields[0].description && <th className="px-4 py-2 text-left font-semibold text-reef-gold-100">Description</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {dataType.fields.map((field, fieldIdx) => (
                      <tr key={fieldIdx} className="border-b border-reef-gold-600 last:border-b-0 hover:bg-marshland-600">
                        <td className="px-4 py-2 font-mono text-reef-gold-100">{field.name}</td>
                        <td className="px-4 py-2 text-reef-gold-300 font-mono text-xs">{field.type}</td>
                        {field.default && <td className="px-4 py-2 text-reef-gold-400">{field.default}</td>}
                        {field.description && <td className="px-4 py-2 text-reef-gold-300 text-xs">{field.description}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">DataManager Initialization</h2>
        <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
          <p className="text-reef-gold-300 mb-4">
            The DataManager component initializes and manages the data layer at startup. It handles loading configurations, populating default data, and validating data integrity.
          </p>
          
          <div className="space-y-4">
            <div className="bg-marshland-600 rounded p-4 border-l-4 border-reef-gold-500">
              <h4 className="font-semibold text-reef-gold-100 mb-2 text-sm">Responsibilities:</h4>
              <ul className="space-y-2 text-sm text-reef-gold-300">
                <li className="flex items-start gap-2">
                  <span className="text-reef-gold-500 flex-shrink-0">→</span>
                  <span>Initialize DataWarehouse at startup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-reef-gold-500 flex-shrink-0">→</span>
                  <span>Load configuration ScriptableObjects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-reef-gold-500 flex-shrink-0">→</span>
                  <span>Populate default runtime data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-reef-gold-500 flex-shrink-0">→</span>
                  <span>Validate data integrity on start</span>
                </li>
              </ul>
            </div>

            <div className="bg-marshland-600 rounded p-4 border-l-4 border-reef-gold-500">
              <h4 className="font-semibold text-reef-gold-100 mb-2 text-sm">Initialization Sequence:</h4>
              <ol className="space-y-2 text-sm text-reef-gold-300">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 bg-reef-gold-700 text-marshland-800 w-6 h-6 rounded-full flex items-center justify-center font-semibold text-xs">1</span>
                  <span>Assign MovementConfig and WeaponConfigs in inspector</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 bg-reef-gold-700 text-marshland-800 w-6 h-6 rounded-full flex items-center justify-center font-semibold text-xs">2</span>
                  <span>DataManager.Start() calls InitializeDataWarehouse()</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 bg-reef-gold-700 text-marshland-800 w-6 h-6 rounded-full flex items-center justify-center font-semibold text-xs">3</span>
                  <span>Store all configurations and default runtime data in warehouse</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 bg-reef-gold-700 text-marshland-800 w-6 h-6 rounded-full flex items-center justify-center font-semibold text-xs">4</span>
                  <span>ValidateEssentialData() checks all required data is loaded</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Runtime Data Modification</h2>
        <div className="grid gap-6">
          <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
            <h3 className="text-lg font-semibold text-reef-gold-100 mb-4">Feature Unlocking</h3>
            <p className="text-reef-gold-300 mb-4">
              Modify CurrentMoveSet to unlock/lock capabilities during gameplay:
            </p>
            <div className="bg-marshland-600 rounded p-4">
              <div className="text-xs text-reef-gold-400 font-mono space-y-1">
                <div>var moveSet = DataWarehouse.Instance.GetData&lt;CurrentMoveSet&gt;("current_move_set");</div>
                <div className="mt-3 text-reef-gold-300">// Unlock on level complete</div>
                <div>moveSet.CanDash = true;</div>
                <div>moveSet.CanWallJump = true;</div>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
            <h3 className="text-lg font-semibold text-reef-gold-100 mb-4">Weapon Switching</h3>
            <p className="text-reef-gold-300 mb-4">
              Modify WeaponData to add weapons and switch inventory:
            </p>
            <div className="bg-marshland-600 rounded p-4">
              <div className="text-xs text-reef-gold-400 font-mono space-y-1">
                <div>var weaponData = DataWarehouse.Instance.GetData&lt;WeaponData&gt;("player_weapon_data");</div>
                <div className="mt-3 text-reef-gold-300">// Add new weapon</div>
                <div>weaponData.inventory.Add(newWeapon);</div>
                <div>weaponData.weaponIndex = weaponData.inventory.Count - 1;</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DataManagement
