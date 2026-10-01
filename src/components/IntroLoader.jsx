import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Intro: the name decrypts out of neon glyphs, the tagline types in, then the screen splits open.
// Pattern after the "Text Scramble" component on 21st.dev, hand-built to stay light (transform/opacity only).

const NAME = 'SARANG KUMBHAR';
const TAGLINE = 'Building Relentix';
const GLYPHS = '!<>-_/[]{}=+*^?#0123456789ABCDEF';
const STORAGE_KEY = 'intro-seen';

const SCRAMBLE_MS = 900;
const TYPE_MS = 500;
const LINE_AT = SCRAMBLE_MS + TYPE_MS;
const EXIT_AT = LINE_AT + 350;
const STEP_MS = 30;

const ease = [0.22, 1, 0.36, 1];

export const shouldPlayIntro = () => {
    try {
        return !sessionStorage.getItem(STORAGE_KEY);
    } catch {
        return true;
    }
};

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

const IntroLoader = ({ onComplete }) => {
    const reduceMotion = useReducedMotion();
    const [exiting, setExiting] = useState(false);
    const lockedRef = useRef(null);
    const scrambleRef = useRef(null);
    const taglineRef = useRef(null);
    const lineRef = useRef(null);
    const finishedRef = useRef(false);

    const finish = useCallback(() => {
        if (finishedRef.current) return;
        finishedRef.current = true;
        if (lockedRef.current) lockedRef.current.textContent = NAME;
        if (scrambleRef.current) scrambleRef.current.textContent = '';
        if (taglineRef.current) taglineRef.current.textContent = TAGLINE;
        setExiting(true);
    }, []);

    useEffect(() => {
        try {
            sessionStorage.setItem(STORAGE_KEY, '1');
        } catch {
            /* storage unavailable: intro simply plays again next time */
        }

        // Any click, tap or key press skips straight to the site.
        window.addEventListener('pointerdown', finish);
        window.addEventListener('keydown', finish);

        let raf = 0;
        let timer = 0;
        let cancelled = false;

        if (reduceMotion) {
            lockedRef.current.textContent = NAME;
            taglineRef.current.textContent = TAGLINE;
            timer = setTimeout(finish, 500);
        } else {
            let start = 0;
            let last = 0;
            let lineShown = false;

            const tick = (now) => {
                if (cancelled || finishedRef.current) return;
                const t = now - start;

                if (now - last >= STEP_MS) {
                    last = now;

                    const locked = Math.floor(Math.min(t / SCRAMBLE_MS, 1) * NAME.length);
                    let scrambled = '';
                    for (let i = locked; i < NAME.length; i++) {
                        scrambled += NAME[i] === ' ' ? ' ' : randomGlyph();
                    }
                    lockedRef.current.textContent = NAME.slice(0, locked);
                    scrambleRef.current.textContent = scrambled;

                    if (t > SCRAMBLE_MS) {
                        const typed = Math.ceil(Math.min((t - SCRAMBLE_MS) / TYPE_MS, 1) * TAGLINE.length);
                        taglineRef.current.textContent = TAGLINE.slice(0, typed);
                    }
                }

                if (!lineShown && t >= LINE_AT) {
                    lineShown = true;
                    lineRef.current.style.transform = 'scaleX(1)';
                }

                if (t >= EXIT_AT) {
                    finish();
                    return;
                }
                raf = requestAnimationFrame(tick);
            };

            // Wait for the fonts (capped) so letters don't swap typeface mid-animation.
            const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
            Promise.race([fontsReady, new Promise((r) => setTimeout(r, 400))]).then(() => {
                if (cancelled) return;
                raf = requestAnimationFrame((now) => {
                    start = now;
                    tick(now);
                });
            });
        }

        return () => {
            cancelled = true;
            cancelAnimationFrame(raf);
            clearTimeout(timer);
            window.removeEventListener('pointerdown', finish);
            window.removeEventListener('keydown', finish);
        };
    }, [finish, reduceMotion]);

    const panelExit = reduceMotion ? { opacity: 0 } : null;
    const panelTransition = { duration: reduceMotion ? 0.4 : 0.8, ease };

    return (
        <div className="fixed inset-0 z-[200]" role="status">
            <span className="sr-only">Loading Sarang Kumbhar's portfolio</span>

            <motion.div
                className="absolute inset-x-0 top-0 h-1/2 bg-[#050505]"
                style={{ willChange: exiting ? 'transform' : 'auto' }}
                initial={false}
                animate={exiting ? panelExit || { y: '-100%' } : { y: 0, opacity: 1 }}
                transition={panelTransition}
                onAnimationComplete={() => exiting && onComplete?.()}
            />
            <motion.div
                className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050505]"
                style={{ willChange: exiting ? 'transform' : 'auto' }}
                initial={false}
                animate={exiting ? panelExit || { y: '100%' } : { y: 0, opacity: 1 }}
                transition={panelTransition}
            />

            <motion.div
                aria-hidden="true"
                className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
                initial={false}
                animate={{ opacity: exiting ? 0 : 1 }}
                transition={{ duration: 0.25 }}
            >
                <div className="font-display font-bold uppercase tracking-wide leading-none text-[clamp(2rem,9vw,5.5rem)] whitespace-pre-wrap">
                    <span ref={lockedRef} className="text-white" />
                    <span ref={scrambleRef} className="text-[--neon-cyan]" />
                </div>

                <div className="mt-4 h-6 flex items-center font-mono text-sm md:text-base tracking-wider text-[--text-muted]">
                    <span ref={taglineRef} />
                    <span className="ml-1 inline-block w-2 h-4 bg-[--neon-cyan] animate-pulse" />
                </div>

                <span
                    ref={lineRef}
                    className="mt-5 block h-px w-40 bg-[--neon-cyan] shadow-[0_0_8px_rgba(0,240,255,0.7)] origin-left"
                    style={{ transform: 'scaleX(0)', transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1)' }}
                />
            </motion.div>
        </div>
    );
};

export default IntroLoader;
