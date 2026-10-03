import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import useIsMobile from '../hooks/useIsMobile';
import { Database, Cpu, Network, Zap } from 'lucide-react';

const steps = [
    {
        num: "01",
        id: "sys_audit",
        title: "Discovery",
        desc: "A call to understand your business, your customers and what the website needs to do for you.",
        metrics: "a clear scope & quote",
        icon: Database
    },
    {
        num: "02",
        id: "logic_map",
        title: "Design",
        desc: "Layout, content and look designed around your brand. You review and approve before any build starts.",
        metrics: "an approved design",
        icon: Cpu
    },
    {
        num: "03",
        id: "execution",
        title: "Build",
        desc: "A fast, mobile-first website with WhatsApp and contact forms built in, so customers can reach you easily.",
        metrics: "a working preview link",
        icon: Network
    },
    {
        num: "04",
        id: "deployment",
        title: "Launch & Support",
        desc: "We go live on your domain, then stay on hand for updates and fixes.",
        metrics: "a live site + support",
        icon: Zap
    }
];

// Mobile only: a vertical timeline with a rail that fills as you scroll.
const MobileTimeline = () => (
    <ol className="relative ml-5">
        <div className="absolute left-0 top-2 bottom-2 w-px bg-white/10" />
        <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-[--neon-cyan] to-[--neon-purple]"
        />
        {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
                <motion.li
                    key={step.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="relative pl-8 pb-8 last:pb-0"
                >
                    <span className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-[#050505] border border-[--neon-cyan]/50 flex items-center justify-center shadow-[0_0_14px_rgba(6,182,212,0.25)]">
                        <Icon size={16} className="text-[--neon-cyan]" />
                    </span>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="text-[10px] font-mono text-[--text-dim] mb-1">STEP {step.num}</div>
                        <h3 className="text-lg font-bold text-white mb-1.5">{step.title}</h3>
                        <p className="text-sm text-[--text-muted] leading-relaxed">{step.desc}</p>
                        <div className="mt-3 pt-3 border-t border-white/5 text-xs">
                            <span className="font-mono uppercase text-[--text-muted]">You get: </span>
                            <span className="text-[--neon-green]">{step.metrics}</span>
                        </div>
                    </div>
                </motion.li>
            );
        })}
    </ol>
);

const Process = () => {
    const isMobile = useIsMobile();
    return (
        <section id="process" className="py-16 md:py-32 relative overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-12 md:mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="slant-tag mb-6"
                    >
                        <span>PROCESS</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">How we work</h2>
                    <p className="text-[--text-muted] max-w-2xl mx-auto text-lg leading-relaxed">
                        Four steps from first call to a <span className="text-white">live website</span> you're <span className="text-[--neon-cyan]">proud to share</span>.
                    </p>
                </div>

                {isMobile ? <MobileTimeline /> : <div className="relative">
                    {/* The Connecting Pipeline (Desktop) */}
                    <div className="hidden md:block absolute top-[24px] left-[10%] right-[10%] h-0.5 bg-white/10 overflow-hidden">
                        <motion.div
                            initial={{ x: "-100%" }}
                            whileInView={{ x: "100%" }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[--neon-cyan] to-transparent opacity-50"
                        />
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.15 }}
                                    className="relative group"
                                >
                                    {/* Holographic Node Point */}
                                    <div className="flex justify-center mb-8 relative">
                                        <div className="relative z-10 w-12 h-12 rounded-full bg-[#050505] border border-[--neon-cyan]/30 flex items-center justify-center group-hover:border-[--neon-cyan] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-500">
                                            <Icon size={20} className="text-[--text-dim] group-hover:text-[--neon-cyan] transition-colors duration-500" />
                                        </div>
                                        {/* Pulse Effect */}
                                        <div className="absolute inset-0 rounded-full bg-[--neon-cyan]/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    </div>

                                    {/* Glass Projection Card */}
                                    <SpotlightCard className="h-full flex flex-col p-6 rounded border border-white/5 bg-white/[0.02] backdrop-blur-sm group-hover:bg-white/[0.04] transition-colors text-center" spotlightColor="rgba(6, 182, 212, 0.15)">

                                        <div className="inline-block px-2 py-0.5 rounded bg-white/5 mx-auto mb-4 text-[10px] font-mono text-[--text-dim] group-hover:text-[--neon-cyan] transition-colors border border-transparent group-hover:border-[--neon-cyan]/20">
                                            Step {step.num}
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3">
                                            {step.title}
                                        </h3>

                                        <p className="text-sm text-[--text-muted] leading-relaxed mb-6">
                                            {step.desc}
                                        </p>

                                        {/* HUD Footer */}
                                        <div className="mt-auto pt-4 border-t border-white/5 w-full text-center">
                                            <div className="text-[10px] font-mono uppercase tracking-wider text-[--text-muted] mb-1">You get</div>
                                            <div className="text-sm text-[--neon-green] leading-snug">{step.metrics}</div>
                                        </div>
                                    </SpotlightCard>

                                    {/* Connecting Line (Mobile Vertical) */}
                                    {idx < steps.length - 1 && (
                                        <div className="md:hidden absolute bottom-[-32px] left-1/2 -translate-x-1/2 w-0.5 h-8 bg-white/10" />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>}
            </div>
        </section>
    );
};

export default Process;
