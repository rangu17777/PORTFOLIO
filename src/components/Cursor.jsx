import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth spring physics for the light to feel "heavy"/atmospheric
    const springConfig = { damping: 25, stiffness: 100, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden mix-blend-plus-lighter">
            <motion.div
                className="absolute rounded-full"
                style={{
                    x,
                    y,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: 600,
                    height: 600,
                    background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0) 60%)",
                }}
            />
        </div>
    );
};

export default Cursor;
