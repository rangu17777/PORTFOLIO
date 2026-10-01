import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ContainerScroll from './ContainerScroll';

const sites = [
    { name: 'Dress To Impress by Mohini', image: '/projects/websites/dresstoimpress.webp' },
    { name: 'River Deck Villa', image: '/projects/websites/riverdeck.webp' },
    { name: 'Madhuban Villa', image: '/projects/websites/villakarjat.webp' },
    { name: 'AA Nagare · Personalised software', image: '/projects/websites/billing.webp' },
];

const ease = [0.22, 1, 0.36, 1];

const Hero = () => {
    const reduceMotion = useReducedMotion();
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (reduceMotion) return;
        const id = setInterval(() => setActive((i) => (i + 1) % sites.length), 3500);
        return () => clearInterval(id);
    }, [reduceMotion]);

    const enter = (delay) => ({
        // Content is visible from the first frame; the entrance is only a short rise.
        initial: { y: reduceMotion ? 0 : 16 },
        animate: { y: 0 },
        transition: { duration: 0.7, delay, ease },
    });

    const title = (
        <>
            <motion.div
                {...enter(0.1)}
                className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 mb-6 font-mono text-sm md:text-base tracking-wider"
            >
                <span className="text-[--text-muted]">
                    Building{' '}
                    <a href="https://relentix.co.in" target="_blank" rel="noopener noreferrer" className="wavy-link text-white font-bold">Relentix</a>
                </span>
                <span className="text-[--neon-cyan] font-bold uppercase">Sites that sell. Shipped fast.</span>
            </motion.div>

            <motion.h1
                {...enter(0.2)}
                className="font-bold tracking-tight leading-[0.9] text-white text-[clamp(2.75rem,7.5vw,6rem)]"
                style={{ textWrap: 'balance' }}
            >
                Websites that <span className="text-[--neon-cyan]">work for you</span>
            </motion.h1>

            <motion.p
                {...enter(0.3)}
                className="mt-6 mx-auto max-w-[56ch] text-base md:text-lg text-[--text-muted] leading-relaxed"
                style={{ textWrap: 'pretty' }}
            >
                I run{' '}
                <a href="https://relentix.co.in" target="_blank" rel="noopener noreferrer" className="text-white font-medium underline decoration-[--neon-cyan] underline-offset-4 hover:text-[--neon-cyan]">Relentix</a>,
                a web design studio building fast, sharp websites that help businesses look credible and win enquiries.
                I'm also learning AI automation and use it to work faster.
            </motion.p>

            <motion.div {...enter(0.4)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                    href="#work"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[--neon-cyan] text-black font-bold hover:shadow-[0_0_30px_rgba(0,240,255,0.35)] transition-shadow"
                >
                    See the work
                    <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                    href="#contact"
                    className="inline-flex items-center px-6 py-3.5 rounded-full text-white font-medium hover:text-[--neon-cyan] transition-colors"
                >
                    Start a project
                </a>
            </motion.div>
        </>
    );

    return (
        <section className="relative">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] max-w-full h-[600px] bg-[--neon-cyan] rounded-full blur-[120px] opacity-[0.08] pointer-events-none" />

            <ContainerScroll titleComponent={title}>
                <AnimatePresence initial={false}>
                    <motion.img
                        key={sites[active].image}
                        src={sites[active].image}
                        alt={`${sites[active].name} website built by Relentix`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease }}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                        draggable="false"
                    />
                </AnimatePresence>

                <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 z-10 flex items-center gap-3">
                    <span className="px-3 py-1.5 rounded-md bg-black/80 text-white text-xs font-mono tracking-wide" aria-live="polite">
                        {sites[active].name}
                    </span>
                    <span className="hidden sm:flex gap-1.5" aria-hidden="true">
                        {sites.map((site, i) => (
                            <span
                                key={site.image}
                                className={`h-1 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-[--neon-cyan]' : 'w-2 bg-white/40'}`}
                            />
                        ))}
                    </span>
                </div>
            </ContainerScroll>
        </section>
    );
};

export default Hero;
