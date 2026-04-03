import characterPrefabImage from '../../../../../assets/skillbound-misc/character-prefab.png';
import animationManagerImage from '../../../../../assets/skillbound-misc/animation-manager.png';

function GetStarted() {
  const quickSteps = [
    {
      title: 'Drag Out the Prefab',
      description: 'The package includes a ready-to-use character prefab. Simply drag it into your scene from the prefabs folder.',
    },
    {
      title: 'Replace Graphics Prefab',
      description: 'Swap the placeholder graphics prefab for your actual game art. The movement system remains unchanged.',
    },
    {
      title: 'Configure Animator Manager',
      description: 'Assign the Animator Manager script to your character and set up the animator controller and animation references.',
    },
    {
      title: 'Use Included Animator',
      description: 'We recommend using the character animation controller included in the package. Alternatively, create a new one and reference the animator parameters listed in the Animation section.',
    },
    {
      title: 'Set Up Ground Layer',
      description: 'Ensure your scene geometry is on the "Ground" layer so the movement system can properly detect ground and walls.',
    },
    {
      title: 'Playtest',
      description: 'Adjust movement parameters in the MovementConfig to fine-tune feel and responsiveness for your game.',
    },
  ];

  const keyFeatures = [
    'State-driven movement with finite state machine',
    'Double jump and wall climbing mechanics',
    'Dash ability with cooldown',
    'Momentum-based physics system',
    'Advanced aiming system',
    'Coyote time and jump buffer',
    'Ground and wall detection via raycasts',
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-reef-gold-100">Movement System - Get Started</h1>
        <p className="text-reef-gold-200">
          Learn the basics of setting up and using the SkillBound Movement System for your platformer character controller.
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

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-reef-gold-100">Prefab Setup Overview</h2>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
            <div className="space-y-4">
              <img 
                src={characterPrefabImage} 
                alt="Character Prefab" 
                className="w-full h-auto rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold text-reef-gold-100 mb-2">Character Prefab</h3>
                <p className="text-reef-gold-300 text-sm">
                  The included prefab comes with the movement system pre-configured. Simply swap the graphics prefab with your game art and you're ready to go.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
            <div className="space-y-4">
              <img 
                src={animationManagerImage} 
                alt="Animation Manager Inspector" 
                className="w-full h-auto rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold text-reef-gold-100 mb-2">Animation Manager</h3>
                <p className="text-reef-gold-300 text-sm">
                  Configure the Animator Manager script to link your animations. Use the included animator controller or create your own using the animator parameters from the Animation section.
                </p>
              </div>
            </div>
          </div>
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
          Once you have the basic setup complete, explore the detailed documentation for each system component:
        </p>
        <ul className="space-y-2 text-reef-gold-300">
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500">→</span>
            <span><strong>Animation Section:</strong> Find all animator parameters for custom animation controllers</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500">→</span>
            <span><strong>State Machine:</strong> Understand the 6 core states and state transitions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500">→</span>
            <span><strong>Configuration Details:</strong> Fine-tune all movement parameters</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500">→</span>
            <span><strong>Collision Detection:</strong> Setup and configure raycast sensors</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-reef-gold-500">→</span>
            <span><strong>Events & Observables:</strong> Integrate with other systems via callbacks</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default GetStarted;
