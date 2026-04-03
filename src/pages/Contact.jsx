function Contact() {
  return (
    <div className="mx-auto max-w-3xl rounded-md bg-marshland-600 p-8 shadow-xl">
      <h1 className="text-3xl font-bold text-reef-gold-100 text-center">Contact Us</h1>
      <p className="mt-3 text-center text-reef-gold-200">
        Use the form below to send us questions, feedback, or partnership ideas.
      </p>

      <form
        action="https://formsubmit.co/1b279f9694a9aa649dc40e42ebf18ba0"
        method="POST"
        className="mt-8 space-y-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-reef-gold-200">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-2 w-full rounded-sm border border-reef-gold-700 bg-reef-gold-950 px-4 py-3 text-reef-gold-100 focus:border-reef-gold-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-reef-gold-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-2 w-full rounded-sm border border-reef-gold-700 bg-reef-gold-950 px-4 py-3 text-reef-gold-100 focus:border-reef-gold-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-reef-gold-200">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            className="mt-2 w-full rounded-sm border border-reef-gold-700 bg-reef-gold-950 px-4 py-3 text-reef-gold-100 focus:border-reef-gold-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-sm bg-reef-gold-700 px-6 py-3 text-reef-gold-100 transition hover:bg-reef-gold-600"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}

export default Contact


