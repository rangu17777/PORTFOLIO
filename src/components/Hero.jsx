import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ContainerScroll from './ContainerScroll';
import useIsMobile from '../hooks/useIsMobile';

const sites = [
    { name: 'Dress To Impress by Mohini', image: '/projects/websites/dresstoimpress.webp' },
    { name: 'River Deck Villa', image: '/projects/websites/riverdeck.webp' },
    { name: 'Madhuban Villa', image: '/projects/websites/villakarjat.webp' },
    { name: 'AA Nagare · Personalised software', image: '/projects/websites/billing.webp' },
];

const ease = [0.22, 1, 0.36, 1];

const typedLines = ['e-commerce stores', 'villa booking sites', 'custom billing software', 'sites that win enquiries'];

const chips = [
    { label: 'See websites', href: '#work' },
    { label: 'How we work', href: '#process' },
    { label: 'Try the AI demo', href: '#demo' },
    { label: 'WhatsApp me', href: '#contact' },
];

// Mobile only: a terminal-style line that types out what Relentix builds.
const TypedLine = ({ reduceMotion }) => {
    const [lineIdx, setLineIdx] = useState(0);
    const [count, setCount] = useState(reduceMotion ? typedLines[0].length : 0);

    useEffect(() => {
        if (reduceMotion) return;
        const line = typedLines[lineIdx];
        const done = count >= line.length;
        const id = setTimeout(() => {
            if (done) {
                setLineIdx((i) => (i + 1) % typedLines.length);
                setCount(0);
            } else {
                setCount((c) => c + 1);
            }
        }, done ? 1600 : 55);
        return () => clearTimeout(id);
    }, [count, lineIdx, reduceMotion]);

    return (
        <div className="mx-auto mb-5 w-fit max-w-full px-4 py-2 rounded-lg bg-black/60 border border-white/10 font-mono text-sm text-left">
            <span className="text-[--neon-green]">➜</span> <span className="text-[--text-muted]">building</span>{' '}
            <span className="text-[--neon-cyan]">{typedLines[lineIdx].slice(0, count)}</span>
            <span className="inline-block w-2 h-4 bg-[--neon-cyan] align-middle ml-0.5 animate-pulse" />
        </div>
    );
};

// Mobile only: swipeable showcase instead of the scroll-driven 3D device.
const MobileShowcase = ({ active, setActive }) => (
    <div className="mt-8 -mx-2">
        <div className="device-frame p-1.5 rounded-2xl">
            <div className="relative h-56 overflow-hidden rounded-xl bg-[#050505] touch-pan-y">
                <AnimatePresence initial={false} mode="popLayout">
                    <motion.img
                        key={sites[active].image}
                        src={sites[active].image}
                        alt={`${sites[active].name} website built by Relentix`}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.45, ease }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.4}
                        onDragEnd={(_, info) => {
                            if (info.offset.x < -50) setActive((i) => (i + 1) % sites.length);
                            else if (info.offset.x > 50) setActive((i) => (i - 1 + sites.length) % sites.length);
                        }}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                        draggable="false"
                    />
                </AnimatePresence>
                <span className="absolute bottom-2 left-2 z-10 px-2.5 py-1 rounded-md bg-black/80 text-white text-[11px] font-mono" aria-live="polite">
                    {sites[active].name}
                </span>
            </div>
        </div>
        <div className="mt-3 flex justify-center gap-1">
            {sites.map((site, i) => (
                <button
                    key={site.image}
                    onClick={() => setActive(i)}
                    aria-label={`Show ${site.name}`}
                    className="p-1.5"
                >
                    <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-[--neon-cyan]' : 'w-1.5 bg-white/40'}`} />
                </button>
            ))}
        </div>
        <p className="mt-1 text-center text-[11px] font-mono text-[--text-dim]">swipe to browse</p>
    </div>
);

const Hero = () => {
    const reduceMotion = useReducedMotion();
    const [active, setActive] = useState(0);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (reduceMotion) return;
        const id = setInterval(() => setActive((i) => (i + 1) % sites.length), isMobile ? 5000 : 3500);
        return () => clearInterval(id);
    }, [reduceMotion, isMobile, active]);

    const enter = (delay) => ({
        // Content is visible from the first frame; the entrance is only a short rise.
        initial: { y: reduceMotion ? 0 : 16 },
        animate: { y: 0 },
        transition: { duration: 0.7, delay, ease },
    });

    const title = (
        <>
            {isMobile && <TypedLine reduceMotion={reduceMotion} />}
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

            {isMobile && (
                <motion.div {...enter(0.5)} className="mt-6 -mx-6 px-6 flex gap-2 overflow-x-auto [scrollbar-width:none]">
                    {chips.map((chip) => (
                        <a
                            key={chip.label}
                            href={chip.href}
                            className="shrink-0 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white active:bg-[--neon-cyan] active:text-black transition-colors"
                        >
                            {chip.label}
                        </a>
                    ))}
                </motion.div>
            )}
        </>
    );

    if (isMobile) {
        return (
            <section className="relative pt-2 pb-8">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[--neon-cyan] rounded-full blur-[100px] opacity-[0.08] pointer-events-none" />
                <div className="relative text-center">{title}</div>
                <MobileShowcase active={active} setActive={setActive} />
            </section>
        );
    }

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
