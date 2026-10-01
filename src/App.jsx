import React, { useEffect } from 'react';
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
import Lenis from '@studio-freight/lenis';

function App() {
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

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div className="bg-core min-h-screen text-main font-sans selection:bg-neon-cyan selection:text-black relative overflow-x-hidden">
            <Cursor />
            <Background />
            <NeuralLinks />

            <Navbar />

            {/* Main Content: Stabilized (No Skew/Scale) */}
            <main className="container mx-auto px-6 pt-32 pb-20 space-y-32">
                <Hero />
                <TheArchitect />
                <AutomationDemo />
                <SystemsShowcase />
                <Process />
                <Contact />
            </main>

            <Footer />

            {/* Global Color Pulse Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[50] mix-blend-overlay opacity-20 animate-pulse-slow bg-gradient-to-t from-transparent via-[--neon-purple] to-transparent" />

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
