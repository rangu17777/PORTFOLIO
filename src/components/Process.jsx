import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import { Terminal, Database, Cpu, Network, Zap, CheckCircle2 } from 'lucide-react';

const steps = [
    {
        num: "01",
        id: "sys_audit",
        title: "Workflow Diagnosis",
        desc: "I analyze your current manual processes to spot where human time is being wasted.",
        metrics: "Analysis Time: ~48h",
        icon: Database
    },
    {
        num: "02",
        id: "logic_map",
        title: "Agent Architecture",
        desc: "I design the 'Brain' of the system—selecting the right LLMs and logic paths.",
        metrics: "Efficiency Gain: Projected",
        icon: Cpu
    },
    {
        num: "03",
        id: "execution",
        title: "Agent Orchestration",
        desc: "Connecting your operational stack (CRM, Slack, Email) into a self-driving ecosystem.",
        metrics: "Status: Building...",
        icon: Network
    },
    {
        num: "04",
        id: "deployment",
        title: "System Activation",
        desc: "I flip the switch. Your digital workforce begins operating 24/7.",
        metrics: "SYSTEM_ONLINE",
        icon: Zap
    }
];

const Process = () => {
    return (
        <section id="process" className="py-32 relative overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[--neon-cyan]/30 bg-[--neon-cyan]/5 text-[--neon-cyan] text-xs font-mono tracking-widest mb-6"
                    >
                        <Terminal size={12} />
                        EXECUTION_PROTOCOL
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">System Architecture</h2>
                    <p className="text-[--text-muted] max-w-2xl mx-auto text-lg leading-relaxed">
                        I don't guess. I orchestrate. A four-step protocol to transform <span className="text-white">chaos</span> into <span className="text-[--neon-cyan]">logic</span>.
                    </p>
                </div>

                <div className="relative">
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
                                            NODE Sequence: {step.num}
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3">
                                            {step.title}
                                        </h3>

                                        <p className="text-sm text-[--text-muted] leading-relaxed mb-6">
                                            {step.desc}
                                        </p>

                                        {/* HUD Footer */}
                                        <div className="mt-auto pt-4 border-t border-white/5 w-full flex justify-center">
                                            <div className="flex items-center gap-2 text-[10px] font-mono text-[--neon-green] bg-[--neon-green]/5 px-3 py-1 rounded-full border border-[--neon-green]/10">
                                                <CheckCircle2 size={10} />
                                                {step.metrics}
                                            </div>
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
                </div>
            </div>
        </section>
    );
};

export default Process;
