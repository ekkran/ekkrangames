import { Link } from 'react-router-dom'

function Showcase() {
  const features = [
    {
      title: 'Movement System',
      description: 'Advanced state-driven movement with jumping, wall climbing, dashing, and momentum-based physics.',
      path: '/skillbound/showcase/movement',
    },
    {
      title: 'Combat System',
      description: 'Complete combat framework with health, weapons, projectiles, and damage mechanics.',
      path: '/skillbound/showcase/combat',
    },
    {
      title: 'Input & Animation',
      description: 'Modern Input System integration with animation synchronization and visual feedback.',
      path: '/skillbound/showcase/input',
    },
    {
      title: 'Collision Detection',
      description: 'Robust raycast-based collision sensing for ground, wall, and environment detection.',
      path: '/skillbound/showcase/collision',
    },
    {
      title: 'Data Management',
      description: 'Flexible configuration system using ScriptableObjects with runtime data modification.',
      path: '/skillbound/showcase/data',
    },
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-reef-gold-100">Feature Showcase</h2>
        <p className="text-reef-gold-200">
          Explore the core systems that make SkillBound 2.5D a complete platformer solution.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature, index) => (
          <Link
            key={index}
            to={feature.path}
            className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6 hover:border-reef-gold-600 hover:bg-marshland-600 transition cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-reef-gold-100">{feature.title}</h3>
            <p className="mt-3 text-reef-gold-200">{feature.description}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-md border border-reef-gold-700 bg-reef-gold-950 p-6">
        <h3 className="text-lg font-semibold text-reef-gold-100">Want to learn more?</h3>
        <p className="mt-2 text-reef-gold-200">
          Visit the Resources section to access detailed documentation for each system.
        </p>
      </div>
    </div>
  )
}

export default Showcase
