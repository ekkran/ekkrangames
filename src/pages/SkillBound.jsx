import { Outlet, Link } from 'react-router-dom';
import SidebarTree from '../components/SidebarTree'

function SkillBound() {
    return (
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <SidebarTree
                menuItems={[
                    { id: 'overview', label: 'Overview', path: '/skillbound/overview' },
                    {
                        id: 'movement',
                        label: 'Movement System',
                        path: '/skillbound/movement',
                        children: [
                            { id: 'movement-started', label: 'Get Started', path: '/skillbound/movement' },
                            { id: 'movement-state', label: 'State Machine', path: '/skillbound/movement/state-machine' },
                            { id: 'movement-config', label: 'Configuration Details', path: '/skillbound/movement/configuration' },
                            { id: 'movement-collision', label: 'Collision Detection', path: '/skillbound/movement/collision' },
                            { id: 'movement-events', label: 'Events & Observables', path: '/skillbound/movement/events' },
                        ],
                    },
                    {
                        id: 'combat',
                        label: 'Combat System',
                        path: '/skillbound/combat',
                        children: [
                            { id: 'combat-started', label: 'Get Started', path: '/skillbound/combat' },
                            { id: 'combat-core', label: 'Core Components', path: '/skillbound/combat/core-components' },
                            { id: 'combat-weapons', label: 'Weapon Configuration', path: '/skillbound/combat/weapons' },
                            { id: 'combat-aiming', label: 'Aiming System', path: '/skillbound/combat/aiming' },
                        ],
                    },
                    {
                        id: 'input',
                        label: 'Input & Animation',
                        path: '/skillbound/input',
                        children: [
                            { id: 'input-started', label: 'Get Started', path: '/skillbound/input' },
                            { id: 'input-system', label: 'Input System', path: '/skillbound/input/input-system' },
                            { id: 'animation', label: 'Animation System', path: '/skillbound/input/animation' },
                            { id: 'vfx', label: 'VFX System', path: '/skillbound/input/vfx' },
                            { id: 'audio', label: 'Audio System', path: '/skillbound/input/audio' },
                        ],
                    },
                    { id: 'collision', label: 'Collision Detection', path: '/skillbound/collision' },
                    { id: 'data', label: 'Data Management', path: '/skillbound/data' },
                ]}
            />
            <div className="mx-auto space-y-10 rounded-md bg-marshland-600 p-8 shadow-xl">
                <Outlet />
            </div>
        </div>
    );
}

export default SkillBound;
