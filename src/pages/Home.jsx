import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import heroImage from '../../assets/Hero.png'

const projects = [
    {
        title: 'Hoarder',
        href: '',
        image: 'https://img.itch.zone/aW1nLzE4MTY3NTA0LnBuZw==/315x250%23c/HN4Y5U.png',
        alt: 'Hoarder',
    },
    {
        title: 'RedPath',
        href: 'https://ekkran.itch.io/redpath',
        image: 'https://img.itch.zone/aW1nLzE3NTcwMjQyLnBuZw==/315x250%23c/nXa4ZY.png',
        alt: 'RedPath',
    },
    {
        title: 'The Wedding of Oscar',
        href: 'https://ekkran.itch.io/the-wedding-of-oscar',
        image: 'https://img.itch.zone/aW1nLzE0MTA2OTU3LnBuZw==/315x250%23c/2%2FFnPL.png',
        alt: 'The Wedding of Oscar',
    },
]

function Home() {
    return (
        <div className="space-y-8">
            <section className="rounded-md bg-marshland-600 p-4 shadow-xl">
                <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-center">
                    <div className="flex items-center justify-center rounded-md p-2">
                        <img src={heroImage} alt="Ekkran Games Logo" className="h-72 w-auto rounded-sm object-contain" />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-reef-gold-100">Welcome to Ekkran Games!</h1>
                        <p className="max-w-xl leading-7 text-reef-gold-200">
                            We are a game development studio based in Costa Rica, dedicated to creating tools and solutions for the modern game development journey.
                        </p>
                        <div className="space-y-3">
                            <p className="text-reef-gold-200">Want to know more?</p>
                            <p className="text-reef-gold-200">Join our newsletter</p>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full rounded-sm border border-reef-gold-700 bg-reef-gold-950 px-4 py-2 text-reef-gold-100 focus:border-reef-gold-500 focus:outline-none"
                                />
                                <button className="rounded-sm bg-reef-gold-700 px-6 py-2 text-reef-gold-100 transition hover:bg-reef-gold-600">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="rounded-md bg-marshland-600 p-6 shadow-xl">
                <header className="mb-6 text-center text-3xl font-semibold text-reef-gold-100">Our Projects</header>
                <ul className="grid gap-6 md:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard key={project.title} {...project} />
                    ))}
                </ul>
            </section>

            <section className="rounded-md bg-marshland-600 p-6 shadow-xl">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold text-reef-gold-100">Interactive Documentation</h2>
                        <p className="mt-3 max-w-2xl text-reef-gold-200">
                            Build and explore the documentation section inside the app with searchable topics, example workflows, and quick navigation.
                        </p>
                    </div>
                    <Link
                        to="/skillbound/overview"
                        className="inline-flex rounded-sm bg-reef-gold-700 px-6 py-3 text-reef-gold-100 transition hover:bg-reef-gold-600"
                    >
                        Explore Docs
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Home


