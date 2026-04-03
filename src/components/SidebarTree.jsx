import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

/**
 * 1. THE NODE COMPONENT
 * Handles individual item rendering and recursive children.
 */
function TreeNode({ item, level = 0, expanded, onToggle }) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0
  const isExpanded = !!expanded[item.id]

  return (
    <li className="space-y-2">
      <div
        className={`flex items-center justify-between rounded-sm px-3 py-2 transition ${
          level === 0 ? 'bg-marshland-700' : 'bg-marshland-800'
        } hover:bg-marshland-600`}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => onToggle(item.id)}
            className="flex w-full items-center gap-2 text-left text-sm font-medium text-reef-gold-100"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-reef-gold-900 text-xs text-reef-gold-200">
              {isExpanded ? '▾' : '▸'}
            </span>
            {item.label}
          </button>
        ) : (
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `block w-full rounded-sm px-1 py-1 text-sm font-medium transition ${
                isActive
                  ? 'text-reef-gold-100 underline decoration-reef-gold-500 underline-offset-4'
                  : 'text-reef-gold-200 hover:text-reef-gold-100'
              }`
            }
          >
            {item.label}
          </NavLink>
        )}
      </div>

      {/* Recursive Render */}
      {hasChildren && isExpanded && (
        <ul className="ml-4 border-l border-reef-gold-700 pl-3 space-y-2">
          {item.children.map((child) => (
            <TreeNode
              key={child.id}
              item={child}
              level={level + 1}
              expanded={expanded}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

/**
 * 2. THE TREE COMPONENT
 * Manages the state and provides the wrapper.
 */
function SidebarTree({ menuItems = [] }) {
  const location = useLocation()
  
  // Initialize 'tools' as true by default
  const [expanded, setExpanded] = useState({
    tools: true,
  })

  // Auto-expand logic based on URL
  useEffect(() => {
    const shouldExpandTools = location.pathname.startsWith('/skillbound')

    if (shouldExpandTools) {
      setExpanded((prev) => ({ ...prev, tools: true }))
    }
  }, [location.pathname])

  const handleToggle = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <aside className="top-24 w-64 rounded-md border border-reef-gold-700 bg-marshland-700 p-5 shadow-xl">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.35em] text-reef-gold-300">Navigation</p>
        <h2 className="mt-2 text-xl font-semibold text-reef-gold-100">Site Menu</h2>
      </div>
      
      <nav aria-label="Main navigation">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <TreeNode
              key={item.id}
              item={item}
              expanded={expanded}
              onToggle={handleToggle}
            />
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default SidebarTree