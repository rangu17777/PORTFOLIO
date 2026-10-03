import React, { useEffect, useRef, useState } from 'react';
import Cursor from './components/Cursor';
import Background from './components/Background';
import NeuralLinks from './components/NeuralLinks';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TheArchitect from './components/TheArchitect';
import AutomationDemo from './components/AutomationDemo';
import SystemsShowcase from './components/SystemsShowcase';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IntroLoader, { shouldPlayIntro } from './components/IntroLoader';
import MobileTabBar from './components/MobileTabBar';
import useIsMobile from './hooks/useIsMobile';
import Lenis from '@studio-freight/lenis';

function App() {
    const lenisRef = useRef(null);
    const isMobile = useIsMobile();
    const [introDone, setIntroDone] = useState(() => !shouldPlayIntro());

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        let rafId = 0;
        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Lock scrolling while the intro plays.
    useEffect(() => {
        const root = document.documentElement;
        if (introDone) {
            root.style.overflow = '';
            lenisRef.current?.start();
        } else {
            root.style.overflow = 'hidden';
            lenisRef.current?.stop();
        }
    }, [introDone]);

    return (
        <div className="bg-core min-h-screen text-main font-sans selection:bg-neon-cyan selection:text-black relative overflow-x-hidden">
            {/* Mobile gets a lightweight static backdrop; desktop keeps the full effects */}
            {isMobile ? (
                <div className="fixed inset-0 z-[-1] bg-[#030014] bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.12),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(188,19,254,0.10),transparent_60%)]" />
            ) : (
                <>
                    <Cursor />
                    <Background />
                    <NeuralLinks />
                </>
            )}

            {!introDone && <IntroLoader onComplete={() => setIntroDone(true)} />}

            <Navbar />

            {/* Main Content: Stabilized (No Skew/Scale) */}
            <main className="container mx-auto px-6 pt-28 pb-20 space-y-20 md:space-y-32">
                <Hero />
                <SystemsShowcase />
                <TheArchitect />
                <Process />
                <AutomationDemo />
                <Contact />
            </main>

            <Footer />

            {isMobile && introDone && <MobileTabBar />}

            {/* Global Color Pulse Overlay */}
            {!isMobile && <div className="fixed inset-0 pointer-events-none z-[50] mix-blend-overlay opacity-20 animate-pulse-slow bg-gradient-to-t from-transparent via-[--neon-purple] to-transparent" />}

            <style>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.3; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 8s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

export default App;
