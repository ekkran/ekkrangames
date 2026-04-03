function Support() {
  return (
    <div className="mx-auto max-w-3xl rounded-md bg-marshland-600 p-8 shadow-xl">
      <h1 className="text-3xl font-bold text-center text-reef-gold-100">Support</h1>
      <p className="mt-3 text-center text-reef-gold-200">
        If you have questions or need help, reach out via email or follow us on social.
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-sm border border-reef-gold-700 bg-reef-gold-950 p-6">
          <h2 className="text-xl font-semibold text-reef-gold-100">Email</h2>
          <p className="mt-2 text-reef-gold-200">support@ekkrangames.com</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href="https://www.facebook.com/share/16gDSNPJ4q/"
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-reef-gold-700 bg-reef-gold-950 p-6 text-center transition hover:border-reef-gold-600"
          >
            Facebook
          </a>
          <a
            href="https://x.com/ekkrangames"
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-reef-gold-700 bg-reef-gold-950 p-6 text-center transition hover:border-reef-gold-600"
          >
            X
          </a>
          <a
            href="https://instagram.com/ekkrangames"
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-reef-gold-700 bg-reef-gold-950 p-6 text-center transition hover:border-reef-gold-600"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  )
}

export default Support


