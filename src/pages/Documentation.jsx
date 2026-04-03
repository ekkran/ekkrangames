import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import docs from '../data/docsIndex'

const categories = [...new Set(docs.map((item) => item.category))]

function Documentation() {
  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const filteredDocs = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    return docs
      .filter((item) => categoryFilter === 'All' || item.category === categoryFilter)
      .filter(
        (item) =>
          item.title.toLowerCase().includes(normalized) ||
          item.summary.toLowerCase().includes(normalized) ||
          item.category.toLowerCase().includes(normalized),
      )
  }, [categoryFilter, query])

  return (
    <div className="mx-auto max-w-6xl space-y-8 rounded-md bg-marshland-600 p-8 shadow-xl">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-reef-gold-300">Docs</p>
        <h1 className="text-4xl font-semibold text-reef-gold-100">Platformer Controller Documentation</h1>
        <p className="max-w-3xl text-reef-gold-200">
          Browse the package documentation, search topics, and open any markdown reference for reading.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          <div className="rounded-md border border-reef-gold-700 bg-reef-gold-950 p-6">
            <label className="mb-2 block text-sm text-reef-gold-300" htmlFor="docs-search">
              Search documentation
            </label>
            <input
              id="docs-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, summary or category..."
              className="w-full rounded-sm border border-reef-gold-700 bg-marshland-700 px-4 py-3 text-reef-gold-100 focus:border-reef-gold-500 focus:outline-none"
            />
          </div>

          <div className="rounded-md border border-reef-gold-700 bg-marshland-700 p-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-reef-gold-300">Category</p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setCategoryFilter('All')}
                className={`rounded-sm px-4 py-2 text-sm font-medium transition ${
                  categoryFilter === 'All'
                    ? 'bg-reef-gold-600 text-marshland-950'
                    : 'bg-marshland-800 text-reef-gold-200 hover:bg-marshland-700'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setCategoryFilter(category)}
                  className={`rounded-sm px-4 py-2 text-sm font-medium transition ${
                    categoryFilter === category
                      ? 'bg-reef-gold-600 text-marshland-950'
                      : 'bg-marshland-800 text-reef-gold-200 hover:bg-marshland-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filteredDocs.length === 0 ? (
            <div className="rounded-md border border-reef-gold-700 bg-reef-gold-950 p-6 text-reef-gold-200">
              <p>No documentation pages match your search. Try another keyword or category.</p>
            </div>
          ) : (
            filteredDocs.map((item) => (
              <Link
                key={item.slug}
                to={`/docs/${item.slug}`}
                className="block rounded-md border border-reef-gold-700 bg-marshland-700 p-6 transition hover:border-reef-gold-500 hover:bg-marshland-600"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold text-reef-gold-100">{item.title}</h2>
                  <span className="rounded-sm bg-reef-gold-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-reef-gold-300">
                    {item.category}
                  </span>
                </div>
                <p className="mt-3 text-reef-gold-300">{item.summary}</p>
              </Link>
            ))
          )}
        </div>

        <aside className="space-y-6 rounded-md border border-reef-gold-700 bg-reef-gold-950 p-6 text-reef-gold-200">
          <div>
            <h2 className="text-xl font-semibold text-reef-gold-100">Quick start</h2>
            <p className="mt-3 text-sm text-reef-gold-300">
              Open a documentation page to read the full markdown reference from the package docs.
            </p>
          </div>

          <div className="grid gap-3">
            {docs.slice(0, 4).map((item) => (
              <Link
                key={item.slug}
                to={`/docs/${item.slug}`}
                className="rounded-sm bg-marshland-700 px-4 py-3 text-sm text-reef-gold-100 transition hover:bg-marshland-600"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Documentation


