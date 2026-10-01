import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Zap, Users } from 'lucide-react';

const MetricCard = ({ label, value, subtext, icon: Icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="bg-terminal border border-zinc-800 p-6 relative overflow-hidden group"
    >
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-neon-cyan opacity-50" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neon-cyan opacity-50" />

        <div className="flex justify-between items-start mb-4">
            <h3 className="font-mono text-zinc-500 text-sm tracking-wider uppercase">{label}</h3>
            <Icon className="text-neon-cyan opacity-80" size={18} />
        </div>

        <div className="flex items-baseline gap-2">
            <span className="text-4xl font-display font-bold text-white group-hover:text-neon-cyan transition-colors">
                {value}
            </span>
        </div>

        <p className="text-xs font-mono text-zinc-600 mt-2 border-t border-zinc-900 pt-2">
            {subtext}
        </p>

        {/* Scanline Effect on Hover */}
        <div className="absolute top-0 left-0 w-full h-1 bg-neon-cyan/20 opacity-0 group-hover:opacity-100 group-hover:translate-y-full transition-all duration-1000 ease-linear pointer-events-none" />
    </motion.div>
);

const MetricsDashboard = () => {
    return (
        <section className="container mx-auto px-6 py-24">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-zinc-800 flex-grow" />
                <span className="font-mono text-neon-cyan text-xs tracking-[0.2em] uppercase">System Metrics</span>
                <div className="h-px bg-zinc-800 flex-grow" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard
                    label="Automations Active"
                    value="250+"
                    subtext="Running on Autopilot"
                    icon={Zap}
                    delay={0.1}
                />
                <MetricCard
                    label="Hours Saved/Wk"
                    value="500h"
                    subtext="Operational Efficiency"
                    icon={Clock}
                    delay={0.2}
                />
                <MetricCard
                    label="Industries"
                    value="15+"
                    subtext="Deployed Verticals"
                    icon={Users}
                    delay={0.3}
                />
                <MetricCard
                    label="Uptime"
                    value="99.9%"
                    subtext="System Reliability"
                    icon={Activity}
                    delay={0.4}
                />
            </div>
        </section>
    );
};

export default MetricsDashboard;
