import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const CustomCursor = () => {
    const cursorRef = useRef();

    useEffect(() => {
        const moveCursor = (e) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
        };

        const handleHover = () => cursorRef.current.classList.add('hovering');
        const handleUnhover = () => cursorRef.current.classList.remove('hovering');

        window.addEventListener('mousemove', moveCursor);
        const interactibles = document.querySelectorAll('a, button, .project-card, .nav-link, .award-row');
        interactibles.forEach(el => {
            el.addEventListener('mouseenter', handleHover);
            el.addEventListener('mouseleave', handleUnhover);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            interactibles.forEach(el => {
                el.removeEventListener('mouseenter', handleHover);
                el.removeEventListener('mouseleave', handleUnhover);
            });
        };
    }, []);

    return <div className="custom-cursor" ref={cursorRef}></div>;
};

const NavLink = ({ text, href }) => (
    <a href={href} className="nav-link" style={{ textDecoration: 'none' }}>
        <span className="arrow-char">↳</span>
        <span>{text}</span>
    </a>
);

const Marquee = () => {
    const marqueeRef = useRef();

    useGSAP(() => {
        const marquee = marqueeRef.current;
        gsap.to(marquee, {
            xPercent: -50,
            duration: 30,
            repeat: -1,
            ease: 'none'
        });
    }, { scope: marqueeRef });

    const images = [
        '/images/lynkr.png',
        '/images/vita+.png',
        '/images/Loki.png',
        '/images/maisonetvie.png',
        '/images/Synapse.jpg',
        '/images/Foresight.png',
        '/images/Drug Discovery.png',
        '/images/GreenLoop.png',
        '/images/Hope.png'
    ];

    return (
        <div className="marquee-container">
            <div className="marquee-content" ref={marqueeRef}>
                {[...images, ...images].map((src, i) => (
                    <div key={i} className="marquee-item">
                        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProjectCard = ({ title, tags, image, wide = false }) => {
    const cardRef = useRef();
    return (
        <div className={`project-card ${wide ? 'wide' : ''}`} ref={cardRef}>
            <div className="project-image-wrap">
                {image ? (
                    <img src={image} alt={title} loading="lazy" />
                ) : (
                    <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--card-bg)' }}></div>
                )}
            </div>
            <div className="project-info">
                <h3 className="project-title">{title}</h3>
                <span className="project-tags">{tags}</span>
            </div>
        </div>
    );
};

const AwardRow = ({ name, category }) => (
    <div className="award-row">
        <span className="award-name">{name}</span>
        <span className="award-category">{category}</span>
    </div>
);

const App = () => {
    const [theme, setTheme] = useState('dark');
    const mainRef = useRef();

    useEffect(() => {
        const lenis = new Lenis();
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    useGSAP(() => {
        // General reveal animation for sections
        const sections = gsap.utils.toArray('section');
        sections.forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out'
            });
        });

        // About section specific animation
        gsap.from('.about-word', {
            scrollTrigger: {
                trigger: '#about',
                start: 'top bottom-=100',
                end: 'bottom center',
                scrub: 1,
            },
            opacity: 0.1,
            stagger: 0.1,
            ease: 'none'
        });
    }, { scope: mainRef });

    const toggleTheme = (e) => {
        e.stopPropagation();
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="app-wrapper">
            <div className="noise-bg"></div>
            <CustomCursor />

            <header>
                <div className="logo">Hiba Baccouch</div>
                <div className="nav-links">
                    <NavLink text="Work" href="#work" />
                    <NavLink text="About" href="#about" />
                    <NavLink text="Recognition" href="#recognition" />
                    <NavLink text="Contact" href="#contact" />
                    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                        <div className="toggle-knob"></div>
                    </button>
                </div>
            </header>

            <main ref={mainRef}>
                <section className="hero container">
                    <div className="hero-content">
                        <div className="hero-left">[Welcome]</div>
                        <div className="hero-right">
                            <h2 className="display-title">
                                A UI/UX Designer & Developer
                            </h2>
                            <p className="hero-p">
                                I specialize in crafting user-centric designs that are visually striking and intuitive. I bring a unique combination of creativity and technical skill to every project.
                            </p>
                            <a href="#contact" className="nav-link contact-cta" style={{ fontSize: '1.4rem', marginTop: '1rem', color: 'var(--text-color)', textDecoration: 'none' }}>
                                <span className="arrow-char">↳</span>
                                <span>Contact Me</span>
                            </a>
                        </div>
                    </div>
                    <Marquee />
                </section>

                <section id="work" className="projects container">
                    <h2 className="display-title" style={{ marginBottom: '4rem', fontSize: '4rem' }}>Selected Work</h2>
                    <div className="projects-grid">
                        <ProjectCard 
                            title="LYNKR - ORGANIZE & SHARE" 
                            tags="iOS / MOBILE / ASO" 
                            image="/images/lynkr2.png"
                            wide 
                        />
                        <ProjectCard 
                            title="VITA + HABIT TRACKER" 
                            tags="iOS / MOBILE / FIGMA" 
                            image="/images/vita+.png"
                        />
                        <ProjectCard 
                            title="LOKI PET FILTERS" 
                            tags="iOS / UI/UX / FIGMA" 
                            image="/images/Loki.png"
                        />
                        <ProjectCard 
                            title="MAISON ET VIE" 
                            tags="WEBSITE / INTERIOR DESIGN" 
                            image="/images/maisonetvie.png"
                            wide 
                        />
                        <ProjectCard 
                            title="SYNAPSE ADHD TRACKER" 
                            tags="IoT / AI / FLUTTER" 
                            image="/images/Synapse.jpg"
                        />
                        <ProjectCard 
                            title="FORESIGHT MEDICAL" 
                            tags="AI / MEDICAL / FLUTTER" 
                            image="/images/Foresight.png"
                        />
                        <ProjectCard 
                            title="DRUG DISCOVERY AI" 
                            tags="AI / MEDICAL / NLP" 
                            image="/images/Drug Discovery.png"
                            wide
                        />
                    </div>
                </section>

                <section id="about" className="about container">
                    <div className="about-content">
                        <p className="about-text">
                            {"I believe that great design is not just about how it looks, but how it works and how it makes people feel. With over 4 years of experience in the industry, I have had the privilege to work with amazing clients across the globe.".split(" ").map((word, i) => (
                                <span key={i} className="about-word" style={{ display: 'inline-block', marginRight: '0.3em' }}>
                                    {word}
                                </span>
                            ))}
                        </p>
                    </div>
                </section>

                <section id="experience" className="previous-experience container">
                    <h2 className="display-title" style={{ fontSize: '4rem' }}>Previous Experience</h2>
                    <div className="awards-list">
                        <AwardRow name="Freelance UI/UX Designer - SARsat" category="Jun 2025 - Present" />
                        <AwardRow name="UI/UX Designer - MYCO-TECHNOLOGIES" category="Jan 2025 - Mar 2025" />
                        <AwardRow name="UI/UX Designer - Tradly" category="Dec 2024 - Mar 2025" />
                        <AwardRow name="UI/UX Designer - Formacity" category="Apr 2024 - Jun 2024" />
                        <AwardRow name="UI/UX Trainer" category="Dec 2023 - Apr 2024" />
                    </div>
                </section>

                <section id="recognition" className="previous-experience container" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <h2 className="display-title" style={{ fontSize: '4rem' }}>Recognition</h2>
                    <div className="awards-list">
                        <AwardRow name="Statut Étudiant Entrepreneur - Titre Innovateur" category="PEEMo - Mar 2025" />
                        <AwardRow name="Entrepreneurship & Innovation Leadership" category="PEEMo - 2024" />
                    </div>
                    
                    <div style={{ marginTop: '10rem', width: '100%' }}>
                        <p className="hero-left">[Recommendation]</p>
                        <p style={{ 
                            fontSize: 'clamp(1.5rem, 4.2vw, 4rem)', 
                            fontStyle: 'italic', 
                            marginTop: '3rem', 
                            lineHeight: '1.1', 
                            color: 'var(--text-color)', 
                            fontWeight: '500',
                            letterSpacing: '-0.02em',
                            maxWidth: '1500px'
                        }}>
                            "Heba Backouch demonstrated exceptional growth and technical proficiency during her UX Design residency at SARsatX. She is a proactive, detail-oriented designer who consistently delivers high-quality results while navigating complex product challenges. Her ability to rapidly master new requirements and her commitment to user-centric excellence make her a standout talent. I highly recommend Heba as a forward-thinking addition to any design organization."
                        </p>
                        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                            <div>
                                <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>Mohammed Almawsami</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Product Manager at SARsatX</p>
                            </div>
                            <a href="/Recommendation Heba.pdf" download="Recommendation_Hiba_Baccouch_SARsatX.pdf" className="nav-link" style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                                <span className="arrow-char">↓</span>
                                <span>Download PDF</span>
                            </a>
                        </div>
                    </div>
                </section>

                <section id="contact" className="contact-cta-section container">
                    <p className="hero-left" style={{ marginBottom: '2rem' }}>[Get in touch]</p>
                    <a href="mailto:hibabakouch517@gmail.com" className="contact-giant">
                        LET'S TALK
                    </a>
                    <div style={{ marginTop: '4rem', display: 'flex', gap: '4rem' }}>
                        <NavLink text="Instagram" href="https://www.instagram.com/hiiba01._/" />
                        <NavLink text="LinkedIn" href="https://www.linkedin.com/in/hibabaccouch/" />
                        <NavLink text="Email" href="mailto:hibabakouch517@gmail.com" />
                    </div>
                </section>
            </main>

            <footer className="container" style={{ padding: '4rem 4vw', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', opacity: 0.5, fontSize: '0.85rem' }}>
                <span>© 2026 HIBA BACCOUCH</span>
                <span>BASED IN TUNISIA / REMOTE</span>
            </footer>
        </div>
    );
};

export default App;
