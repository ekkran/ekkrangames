import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-reef-gold-800 bg-reef-gold-900 px-6 py-8 text-center text-sm text-reef-gold-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>Ekkran Games is a game development studio based in Costa Rica.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="hover:text-reef-gold-100">
            Contact Us
          </Link>
          <Link to="/support" className="hover:text-reef-gold-100">
            Support
          </Link>
          <Link to="/skillbound/overview" className="hover:text-reef-gold-100">
            Documentation
          </Link>
        </div>
      </div>
      <p className="mt-6">© 2025 Ekkran Games. All rights reserved.</p>
    </footer>
  )
}

export default Footer


