import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { isLowEnd } from '../utils/deviceTier';

// Intro: a neon orb with a glow rotating around its inner edge, the name lighting up letter by letter,
// then the screen splits open. Effect modelled on the "AI Loader" on 21st.dev, rebuilt by hand.

const NAME = 'Sarang';
const TAGLINE = 'Building Relentix';
const STORAGE_KEY = 'intro-seen';
const DURATION_MS = 2200;

const ease = [0.22, 1, 0.36, 1];

export const shouldPlayIntro = () => {
    try {
        return !sessionStorage.getItem(STORAGE_KEY);
    } catch {
        return true;
    }
};

const IntroLoader = ({ onComplete }) => {
    const reduceMotion = useReducedMotion();
    const [exiting, setExiting] = useState(false);
    const finishedRef = useRef(false);

    const finish = useCallback(() => {
        if (finishedRef.current) return;
        finishedRef.current = true;
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
        const timer = setTimeout(finish, reduceMotion ? 800 : DURATION_MS);

        return () => {
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
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.92 }}
                animate={{ opacity: exiting ? 0 : 1, scale: exiting && !reduceMotion ? 1.08 : 1 }}
                transition={{ duration: exiting ? 0.3 : 0.5, ease }}
            >
                <div className={`intro-orb ${reduceMotion ? 'intro-orb--still' : ''} ${isLowEnd ? 'intro-orb--lite' : ''}`}>
                    <span className="intro-orb__ring" />
                    <span className="intro-orb__name">
                        {NAME.split('').map((ch, i) => (
                            <span key={i} className="intro-orb__letter" style={{ animationDelay: `${i * 0.1}s` }}>
                                {ch}
                            </span>
                        ))}
                    </span>
                </div>

                <div className="mt-8 font-mono text-xs md:text-sm uppercase tracking-[0.35em] text-[--text-muted]">
                    {TAGLINE}
                </div>
            </motion.div>
        </div>
    );
};

export default IntroLoader;
