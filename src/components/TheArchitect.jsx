import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Briefcase, Database, ScanLine, Fingerprint, Lock } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const TheArchitect = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section id="architect" className="py-24 relative overflow-hidden">

            {/* Background Grid - subtle hint of the matrix */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left: The "Mission" (Philosophy) */}
                    <div className="pt-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[--neon-cyan]/10 border border-[--neon-cyan]/20 text-[--neon-cyan] text-xs font-mono mb-8"
                        >
                            <Shield size={12} />
                            AUTHENTICATED USER
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold mb-8 tracking-tight"
                        >
                            The Man Behind <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[--text-dim]">The Machine.</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6 text-lg text-[--text-muted] leading-relaxed border-l-2 border-white/5 pl-6"
                        >
                            <p>
                                <strong className="text-white">I don't sell tools. I sell outcomes.</strong><br />
                                Most agencies bill you for hours spent guessing. I bill for specific, measurable results: Automated workflows, realtime reporting, and zero manual effort.
                            </p>
                            <p>
                                My approach is singular and ruthless:
                                <br />
                                {">>"} UNDERSTAND_BUSINESS -{">"} DESIGN_SYSTEM -{">"} AUTOMATE_OUTCOME
                            </p>
                        </motion.div>
                    </div>

                    {/* Right: The "Holographic Dossier" */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="relative"
                    >
                        {/* The Glass Card Dossier */}
                        <SpotlightCard className="relative bg-black/60 backdrop-blur-2xl border border-white/10 rounded-sm overflow-hidden min-h-[500px]">

                            {/* Decorative Header (Top Secret Style) */}
                            <div className="h-12 bg-white/5 border-b border-white/10 flex items-center justify-between px-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                    </div>
                                    <span className="text-[10px] font-mono text-[--text-dim] tracking-[0.2em] uppercase">Identity_Record_#8842</span>
                                </div>
                                <div className="text-[10px] font-mono text-[--neon-cyan]/50 flex items-center gap-2">
                                    <Lock size={10} />
                                    ENCRYPTED
                                </div>
                            </div>

                            <div className="p-8 grid gap-8">

                                {/* Photo & Basic ID Info */}
                                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                                    {/* Holographic Avatar Container */}
                                    <div className="relative w-24 h-24 shrink-0 group">
                                        {/* Rotating Rings */}
                                        <div className="absolute inset-0 rounded-full border border-[--neon-cyan]/30 border-t-transparent animate-spin duration-3000" />
                                        <div className="absolute -inset-1 rounded-full border border-[--neon-purple]/20 border-b-transparent animate-spin-slow duration-5000" />

                                        <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center overflow-hidden relative z-10">
                                            <User size={40} className="text-white/80" />
                                            {/* Scan Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[--neon-cyan]/10 to-transparent animate-scan" />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-3xl font-bold text-white tracking-wide">SARANG KUMBHAR</h3>
                                        <div className="inline-block px-2 py-0.5 rounded bg-[--neon-cyan]/10 text-[--neon-cyan] text-[10px] font-mono tracking-wider border border-[--neon-cyan]/20">
                                            AUTOMATION ARCHITECT
                                        </div>
                                        <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-[--text-dim] mt-2 font-mono">
                                            <span>AGE: 19</span>
                                            <span>|</span>
                                            <span>LOC: INDIA (GLOBAL)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Data Grid - "The Specs" */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
                                    {/* Cell 1 */}
                                    <div className="bg-[#0a0a0a] p-4 hover:bg-white/5 transition-colors group">
                                        <div className="flex items-center gap-2 text-[10px] text-[--text-dim] uppercase tracking-wider mb-2">
                                            <Briefcase size={12} className="group-hover:text-[--neon-cyan] transition-colors" />
                                            Education
                                        </div>
                                        <div className="text-sm text-white font-medium">Pursuing Diploma (Comp. Eng)</div>
                                        <div className="text-[10px] text-[--neon-purple] mt-1">3rd Year Student</div>
                                    </div>

                                    {/* Cell 2 */}
                                    <div className="bg-[#0a0a0a] p-4 hover:bg-white/5 transition-colors group">
                                        <div className="flex items-center gap-2 text-[10px] text-[--text-dim] uppercase tracking-wider mb-2">
                                            <Database size={12} className="group-hover:text-[--neon-cyan] transition-colors" />
                                            Core Stack
                                        </div>
                                        <div className="text-sm text-white font-medium">Make.com / n8n / Agents</div>
                                        <div className="text-[10px] text-[--neon-green] mt-1">Full Stack Automation</div>
                                    </div>
                                </div>

                                {/* Focus Area "Analysis" */}
                                <div className="relative p-6 rounded bg-white/5 border border-white/10">
                                    <div className="absolute top-0 right-0 p-2 opacity-10">
                                        <Fingerprint size={60} />
                                    </div>
                                    <div className="font-mono text-[10px] text-[--neon-cyan] mb-3 uppercase tracking-widest border-b border-white/5 pb-2">
                                        Subject Vision Analysis
                                    </div>
                                    <p className="text-sm text-[--text-muted] leading-relaxed italic">
                                        "Currently building towards <span className="text-white not-italic">NextGen AI</span>. Focused on turning complex, repetitive business chaos into self-correcting systems."
                                    </p>
                                </div>

                            </div>

                            {/* Scan Line Animation Effect */}
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        initial={{ top: 0, opacity: 0 }}
                                        animate={{ top: "100%", opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 right-0 h-px bg-[--neon-cyan] shadow-[0_0_20px_rgba(6,182,212,0.5)] z-20 pointer-events-none"
                                    />
                                )}
                            </AnimatePresence>
                        </SpotlightCard>

                        {/* Decorative Corners */}
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-[--neon-cyan] opacity-50" />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[--neon-cyan] opacity-50" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default TheArchitect;
