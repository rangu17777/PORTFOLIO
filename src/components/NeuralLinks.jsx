import React from 'react';
import { motion } from 'framer-motion';

const NeuralLinks = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden lg:block">
            <svg className="w-full h-full absolute top-0 left-0" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="trace-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(0, 240, 255, 0)" />
                        <stop offset="50%" stopColor="rgba(0, 240, 255, 0.2)" />
                        <stop offset="100%" stopColor="rgba(188, 19, 254, 0)" />
                    </linearGradient>
                </defs>

                {/* Main Spine - Left Aligned */}
                <motion.path
                    d="M 100 0 V 4000"
                    stroke="url(#trace-gradient)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    style={{ willChange: "stroke-dashoffset" }}
                />

                {/* Moving Data Packet on Spine */}
                <motion.circle r="2" fill="#00F0FF">
                    <animateMotion
                        dur="10s"
                        repeatCount="indefinite"
                        path="M 100 0 V 4000"
                    />
                </motion.circle>

                {/* Connection Nodes (Approximate positions based on sections) */}
                {/* Hero -> Architect */}
                <motion.path
                    d="M 100 800 H 200"
                    stroke="rgba(0, 240, 255, 0.1)"
                    strokeWidth="1"
                />
                <circle cx="200" cy="800" r="3" fill="rgba(0, 240, 255, 0.3)" />

                {/* Architect -> Demo */}
                <motion.path
                    d="M 100 1600 H 200"
                    stroke="rgba(0, 240, 255, 0.1)"
                    strokeWidth="1"
                />
                <circle cx="200" cy="1600" r="3" fill="rgba(0, 240, 255, 0.3)" />

                {/* Demo -> Works */}
                <motion.path
                    d="M 100 2400 H 200"
                    stroke="rgba(0, 240, 255, 0.1)"
                    strokeWidth="1"
                />
                <circle cx="200" cy="2400" r="3" fill="rgba(0, 240, 255, 0.3)" />

                {/* Process */}
                <motion.path
                    d="M 100 3200 H 200"
                    stroke="rgba(0, 240, 255, 0.1)"
                    strokeWidth="1"
                />
                <circle cx="200" cy="3200" r="3" fill="rgba(0, 240, 255, 0.3)" />

            </svg>
        </div>
    );
};

export default NeuralLinks;
