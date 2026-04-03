function ProjectCard({ href, image, title, alt }) {
  return (
    <li className="w-full max-w-xs rounded-md border border-reef-gold-700 bg-reef-gold-900 shadow-xl transition hover:-translate-y-1 hover:border-reef-gold-600">
      <a href={href} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-sm">
        <img src={image} alt={alt} className="h-64 w-full object-cover" />
      </a>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-reef-gold-100">{title}</h3>
      </div>
    </li>
  )
}

export default ProjectCard


