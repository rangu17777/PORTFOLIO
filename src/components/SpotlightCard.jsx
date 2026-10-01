import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.1)" }) => {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setOpacity(1);
    };

    const handleBlur = () => {
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    // Randomize the breathing animation slightly for each card so they don't move in perfect sync
    const randomDuration = 4 + Math.random() * 4; // Between 4s and 8s
    const randomDelay = Math.random() * 2; // Between 0s and 2s

    return (
        <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{
                duration: randomDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: randomDelay
            }}
            className="h-full"
        >
            <div
                ref={divRef}
                onMouseMove={handleMouseMove}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`relative rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 h-full ${className}`}
            >
                <div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                    style={{
                        opacity,
                        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                    }}
                />
                {children}
            </div>
        </motion.div>
    );
};

export default SpotlightCard;
