import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import docs from '../data/docsIndex'

function DocPage() {
  const { slug } = useParams()
  const [content, setContent] = useState('')
  const [error, setError] = useState(null)
  const doc = docs.find((item) => item.slug === slug)

  useEffect(() => {
    if (!doc) {
      setError('Documentation page not found.')
      return
    }

    setError(null)
    setContent('')

    fetch(`/docs/${doc.filename}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load documentation file.')
        }
        return response.text()
      })
      .then((text) => setContent(text))
      .catch((fetchError) => setError(fetchError.message))
  }, [doc])

  if (!doc) {
    return (
      <div className="mx-auto max-w-5xl rounded-md bg-marshland-600 p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-reef-gold-100">Page not found</h1>
        <p className="mt-4 text-reef-gold-200">The requested documentation page does not exist.</p>
        <Link to="/docs" className="mt-6 inline-block rounded-sm bg-reef-gold-600 px-5 py-3 text-sm font-semibold text-marshland-950 hover:bg-reef-gold-500">
          Back to Docs
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="rounded-md border border-reef-gold-700 bg-marshland-600 p-8 shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-reef-gold-300">Documentation</p>
            <h1 className="mt-2 text-4xl font-semibold text-reef-gold-100">{doc.title}</h1>
            <p className="mt-3 max-w-3xl text-reef-gold-200">{doc.summary}</p>
          </div>
          <Link to="/docs" className="inline-flex items-center rounded-sm bg-reef-gold-600 px-5 py-3 text-sm font-semibold text-marshland-950 transition hover:bg-reef-gold-500">
            Back to docs
          </Link>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
        <div className="space-y-6 rounded-md border border-reef-gold-700 bg-marshland-600 p-8 shadow-xl">
          {error ? (
            <div className="rounded-sm border border-reef-gold-700 bg-reef-gold-950 p-6 text-reef-gold-200">
              <p className="font-semibold text-reef-gold-100">Unable to load content</p>
              <p className="mt-3">{error}</p>
            </div>
          ) : content === '' ? (
            <div className="rounded-sm border border-reef-gold-700 bg-reef-gold-950 p-6 text-reef-gold-200">
              Loading documentation…
            </div>
          ) : (
            <article className="space-y-6 text-reef-gold-200">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </article>
          )}
        </div>

        <aside className="space-y-4 rounded-md border border-reef-gold-700 bg-reef-gold-950 p-6 text-reef-gold-200 shadow-xl">
          <h2 className="text-lg font-semibold text-reef-gold-100">Quick links</h2>
          <p className="text-sm text-reef-gold-300">Browse other docs pages without leaving this view.</p>
          <div className="space-y-3">
            {docs.slice(0, 5).map((item) => (
              <Link
                key={item.slug}
                to={`/docs/${item.slug}`}
                className="block rounded-sm border border-reef-gold-800 bg-marshland-700 px-4 py-3 text-sm text-reef-gold-100 transition hover:bg-marshland-600"
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

export default DocPage
