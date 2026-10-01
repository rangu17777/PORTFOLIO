import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Compass, Map as MapIcon, Home, Plus, Minus } from 'lucide-react';

const InfiniteCanvas = ({ children }) => {
    const constraintsRef = useRef(null);
    // Huge canvas size
    const CANVAS_SIZE = 4000;
    const VIEWPORT_WIDTH = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const VIEWPORT_HEIGHT = typeof window !== 'undefined' ? window.innerHeight : 800;

    // Center the initial view
    const initialX = -(CANVAS_SIZE / 2) + (VIEWPORT_WIDTH / 2);
    const initialY = -(CANVAS_SIZE / 2) + (VIEWPORT_HEIGHT / 2);

    const x = useMotionValue(initialX);
    const y = useMotionValue(initialY);

    const [scale, setScale] = useState(1);

    // Spring physics for smooth drag release
    const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleReset = () => {
        x.set(initialX);
        y.set(initialY);
        setScale(1);
    };

    return (
        <div className="fixed inset-0 bg-[#030014] overflow-hidden cursor-move select-none">
            {/* Background Grid - Moves with the canvas to give depth sensation */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    x: xSpring,
                    y: ySpring,
                    scale
                }}
            />

            {/* The World Container */}
            <motion.div
                ref={constraintsRef}
                drag
                dragConstraints={{
                    left: -CANVAS_SIZE + VIEWPORT_WIDTH,
                    right: 0,
                    top: -CANVAS_SIZE + VIEWPORT_HEIGHT,
                    bottom: 0,
                }}
                dragElastic={0.1}
                dragMomentum={true}
                style={{ x: xSpring, y: ySpring, scale }}
                className="relative w-[4000px] h-[4000px]"
            >
                {/* Central Anchor Point (Debug) */}
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full opacity-0" />

                {children}
            </motion.div>

            {/* HUD / Navigation Controls */}
            <div className="fixed bottom-8 right-8 flex flex-col gap-2 z-50">
                <button onClick={() => setScale(s => Math.min(s + 0.1, 1.5))} className="p-3 bg-white/10 backdrop-blur border border-white/10 rounded-full text-white hover:bg-[--neon-cyan] hover:text-black transition-colors">
                    <Plus size={20} />
                </button>
                <button onClick={() => setScale(s => Math.max(s - 0.1, 0.5))} className="p-3 bg-white/10 backdrop-blur border border-white/10 rounded-full text-white hover:bg-[--neon-cyan] hover:text-black transition-colors">
                    <Minus size={20} />
                </button>
                <button onClick={handleReset} className="p-3 bg-[--neon-cyan]/20 backdrop-blur border border-[--neon-cyan] rounded-full text-[--neon-cyan] hover:bg-[--neon-cyan] hover:text-black transition-colors">
                    <Home size={20} />
                </button>
            </div>

            {/* Instruction Banner */}
            <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur px-6 py-2 rounded-full border border-white/10 pointer-events-none z-40">
                <p className="text-[--text-muted] text-sm flex items-center gap-2">
                    <Compass size={16} className="text-[--neon-cyan]" />
                    Drag to explore the System Architecture
                </p>
            </div>
        </div>
    );
};

export default InfiniteCanvas;
