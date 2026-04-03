// UI implementation guidelines are documented in src/ui-guidelines.md
import { NavLink, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Support from './pages/Support'
import SkillBound from './pages/SkillBound'
import Overview from './pages/skillbound/Overview'
import MovementSystemLayout from './pages/skillbound/systems/MovementSystemLayout'
import GetStarted from './pages/skillbound/systems/movement/GetStarted'
import StateMachine from './pages/skillbound/systems/movement/StateMachine'
import ConfigurationDetails from './pages/skillbound/systems/movement/ConfigurationDetails'
import MovementCollisionDetection from './pages/skillbound/systems/movement/CollisionDetection'
import EventsObservables from './pages/skillbound/systems/movement/EventsObservables'
import CombatSystemLayout from './pages/skillbound/systems/CombatSystemLayout'
import CombatGetStarted from './pages/skillbound/systems/combat/GetStarted'
import CoreComponents from './pages/skillbound/systems/combat/CoreComponents'
import WeaponConfiguration from './pages/skillbound/systems/combat/WeaponConfiguration'
import AimingSystem from './pages/skillbound/systems/combat/AimingSystem'
import InputAnimationLayout from './pages/skillbound/systems/input/InputAnimationLayout'
import InputGetStarted from './pages/skillbound/systems/input/GetStarted'
import InputSystem from './pages/skillbound/systems/input/InputSystem'
import AnimationSystem from './pages/skillbound/systems/input/AnimationSystem'
import VFXSystem from './pages/skillbound/systems/input/VFXSystem'
import AudioSystem from './pages/skillbound/systems/input/AudioSystem'
import CombatSystemShowcase from './pages/skillbound/showcase/CombatSystem'
import CollisionDetection from './pages/skillbound/showcase/CollisionDetection'
import DataManagement from './pages/skillbound/showcase/DataManagement'
import Footer from './components/Footer'

const linkClass = ({ isActive }) =>
  isActive
    ? 'text-reef-gold-100 font-semibold'
    : 'text-reef-gold-200 hover:text-reef-gold-100 transition-colors'

function App() {
  const [toolsOpen, setToolsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-marshland-700 text-reef-gold-200">
      <header className="sticky top-0 z-50 border-b border-reef-gold-800 bg-marshland-700">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <NavLink to="/" className="text-3xl font-bold text-reef-gold-100">
            Ekkran Games
          </NavLink>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <div className="relative">
              <button
                type="button"
                onClick={() => setToolsOpen((open) => !open)}
                className="inline-flex items-center px-2 py-1 text-sm font-medium text-reef-gold-200 hover:text-reef-gold-100 transition-colors"
                aria-expanded={toolsOpen}
              >
                Tools ▾
              </button>
              {toolsOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 w-[210px] bg-marshland-500 p-1 shadow-xl">
                  <NavLink
                    to="/skillbound"
                    className="block px-3 py-2 text-sm text-reef-gold-200 transition hover:bg-marshland-600 hover:text-reef-gold-100"
                    onClick={() => setToolsOpen(false)}
                  >
                    SkillBound 2.5D
                  </NavLink>
                </div>
              )}
            </div>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
            <NavLink to="/support" className={linkClass}>
              Support
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full px-6 py-8">
        <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skillbound" element={<SkillBound />}>
                <Route index element={<Overview />} />
                <Route path="overview" element={<Overview />} />
                <Route path="movement" element={<MovementSystemLayout />}>
                    <Route index element={<GetStarted />} />
                    <Route path="get-started" element={<GetStarted />} />
                    <Route path="state-machine" element={<StateMachine />} />
                    <Route path="configuration" element={<ConfigurationDetails />} />
                    <Route path="collision" element={<MovementCollisionDetection />} />
                    <Route path="events" element={<EventsObservables />} />
                </Route>
                <Route path="combat" element={<CombatSystemLayout />}>
                    <Route index element={<CombatGetStarted />} />
                    <Route path="get-started" element={<CombatGetStarted />} />
                    <Route path="core-components" element={<CoreComponents />} />
                    <Route path="weapons" element={<WeaponConfiguration />} />
                    <Route path="aiming" element={<AimingSystem />} />
                </Route>
                <Route path="input" element={<InputAnimationLayout />}>
                    <Route index element={<InputGetStarted />} />
                    <Route path="get-started" element={<InputGetStarted />} />
                    <Route path="input-system" element={<InputSystem />} />
                    <Route path="animation" element={<AnimationSystem />} />
                    <Route path="vfx" element={<VFXSystem />} />
                    <Route path="audio" element={<AudioSystem />} />
                </Route>
                <Route path="collision" element={<CollisionDetection />} />
                <Route path="data" element={<DataManagement />} />
            </Route>
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App


