import { useEffect, useRef, useState } from 'react';
import configSlide from '../../assets/skillbound-slides/Config.png';
import eventsSlide from '../../assets/skillbound-slides/Events.png';
import observablesSlide from '../../assets/skillbound-slides/Observables.png';

function Overview() {
    const slides = [
        { src: configSlide, alt: 'SkillBound configuration preview' },
        { src: eventsSlide, alt: 'SkillBound event preview' },
        { src: observablesSlide, alt: 'SkillBound observables preview' },
    ];
    const [activeSlide, setActiveSlide] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleSlideChange = (index) => {
        if (index === activeSlide || isFading) return;
        setIsFading(true);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setActiveSlide(index);
            setIsFading(false);
        }, 250);
    };

    return (
        <div className="space-y-10">
            <div id="overview" className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-reef-gold-300">SkillBound 2.5D</p>
                <h1 className="text-4xl font-semibold text-reef-gold-100">Platformer Character Controller Package</h1>
                <p className="max-w-3xl text-reef-gold-200">
                    SkillBound 2.5D delivers a complete Unity platformer controller experience with state-driven movement, collision sensing, combat mechanics,
                    input integration, and a rich documentation package for rapid setup and extension.
                </p>
            </div>

            <section className="rounded-md bg-marshland-700 p-2 shadow-xl">
                <div className="rounded-md bg-black">
                    <img
                        src={slides[activeSlide].src}
                        alt={slides[activeSlide].alt}
                        className={`w-full object-contain transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
                    />
                </div>

                <div className="mt-4 flex items-center justify-center gap-2">
                    {slides.map((slide, index) => (
                        <button
                            key={slide.alt}
                            type="button"
                            onClick={() => handleSlideChange(index)}
                            className={`h-2.5 w-2.5 rounded-full ${activeSlide === index ? 'bg-reef-gold-100' : 'bg-reef-gold-400'}`}
                            aria-label={`Show slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Overview;