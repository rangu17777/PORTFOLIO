import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Zap } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Multi-Layer Parallax: "Velocity Hierarchy"
    // Lower elements move faster to create an "Expanding Universe" effect (Prevents collisions)
    const yText1 = useTransform(scrollY, [0, 1000], [0, 60]);    // Slowest
    const yText2 = useTransform(scrollY, [0, 1000], [0, 100]);   // Medium
    const yDesc = useTransform(scrollY, [0, 1000], [0, 150]);    // Fast
    const yButtons = useTransform(scrollY, [0, 1000], [0, 220]); // Fastest (Zooms away to visual safety)

    // Card moves opposite for depth
    const yCard = useTransform(scrollY, [0, 1000], [0, -150]);
    const opacity = useTransform(scrollY, [0, 900], [1, 0]);

    return (
        <section ref={containerRef} className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20">
            {/* Ambient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[--neon-cyan] rounded-full blur-[120px] opacity-[0.08] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

                <motion.div style={{ opacity }} className="text-center lg:text-left relative">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[--neon-cyan] text-xs font-mono tracking-widest mb-8 backdrop-blur-md"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[--neon-cyan] animate-pulse" />
                        SYSTEM_OPERATIONAL
                    </motion.div>

                    {/* Layer 1: Background Text */}
                    <motion.h1 style={{ y: yText1 }} className="text-6xl md:text-8xl font-bold leading-[0.85] tracking-tight text-white mb-2">
                        Building
                    </motion.h1>

                    {/* Layer 2: Foreground Text */}
                    <motion.div style={{ y: yText2 }} className="mb-8">
                        <span className="text-6xl md:text-8xl font-bold leading-[0.85] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[--neon-cyan] to-white bg-300% animate-gradient pb-2 block">
                            Sentient Systems
                        </span>
                    </motion.div>

                    {/* Layer 3: Description */}
                    <motion.p style={{ y: yDesc }} className="text-xl text-[--text-muted] max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed font-light">
                        I replace manual labor with <strong className="text-white">Intelligent Systems</strong>.
                        The era of <strong className="text-white">Manual Workflows</strong> is over.
                        Welcome to <strong className="text-white">The Age of Orchestration</strong>.
                    </motion.p>

                </motion.div>

                {/* Right Column: The "Glass Core" */}
                <motion.div style={{ y: yCard }} className="relative hidden lg:block">
                    <SpotlightCard className="p-1 rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl skew-y-3 hover:skew-y-0 transition-all duration-700 ease-out" spotlightColor="rgba(6, 182, 212, 0.2)">
                        <div className="bg-[#050505]/80 rounded-xl p-6 h-[400px] flex flex-col relative overflow-hidden backdrop-blur-md">
                            {/* Workflow Header */}
                            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[--neon-green] animate-pulse" />
                                    <span className="text-xs font-mono text-[--neon-cyan] tracking-wider">LIVE_WORKFLOW</span>
                                </div>
                                <div className="text-[10px] font-mono text-[--text-dim]">
                                    uptime: 99.9%
                                </div>
                            </div>

                            {/* Automation Visualizer */}
                            <div className="space-y-6 relative">
                                {/* Connecting Line */}
                                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[--neon-cyan] to-transparent opacity-20" />

                                {/* Step 1: Trigger */}
                                <div className="relative flex items-center gap-4">
                                    <div className="relative z-10 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-[--neon-purple]" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-[--text-dim] mb-1">TRIGGER RECEIVED</div>
                                        <div className="text-sm text-white font-medium flex items-center gap-2">
                                            New Lead Detected
                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[--neon-purple]/20 text-[--neon-purple]">
                                                200 OK
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2: AI Processing */}
                                <div className="relative flex items-center gap-4">
                                    <div className="relative z-10 w-10 h-10 rounded-lg bg-[--neon-cyan]/10 border border-[--neon-cyan]/30 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                                        <Zap size={18} className="text-[--neon-cyan]" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-[--text-dim] mb-1">AI PROCESSING</div>
                                        <div className="text-sm text-white font-medium">
                                            Qualifying & Researching...
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3: Action */}
                                <div className="relative flex items-center gap-4 opacity-50">
                                    <div className="relative z-10 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                        <ArrowDown size={18} className="text-white/40" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-[--text-dim] mb-1">NEXT ACTION</div>
                                        <div className="text-sm text-white font-medium">
                                            Add to CRM & Draft Email
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Stats */}
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="mt-auto p-4 rounded-lg bg-white/5 border border-white/10 flex justify-between items-center"
                            >
                                <div>
                                    <div className="text-[10px] text-[--text-dim] uppercase">Est. Time Saved</div>
                                    <div className="text-lg font-bold text-white">4.5 hrs</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] text-[--text-dim] uppercase">Cost</div>
                                    <div className="text-lg font-bold text-[--neon-green]">$0.02</div>
                                </div>
                            </motion.div>
                        </div>
                    </SpotlightCard>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[--text-muted] flex flex-col items-center gap-2 cursor-pointer hover:text-white transition-colors"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <span className="text-[10px] font-mono tracking-[0.2em]">INITIALIZE_SCROLL</span>
                <ArrowDown size={14} className="animate-bounce" />
            </motion.div>
        </section>
    );
};

export default Hero;
