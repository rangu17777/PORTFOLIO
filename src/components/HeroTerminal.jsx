import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroTerminal = () => {
    const [text, setText] = useState('');
    const fullText = "LAUNCHING AUTOMATION SYSTEMS...";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="min-h-screen flex flex-col justify-center container mx-auto px-6 relative z-10 pt-20">
            {/* Terminal Window */}
            <div className="w-full max-w-4xl mx-auto border border-zinc-800 bg-terminal/80 backdrop-blur-md rounded-lg overflow-hidden shadow-2xl">
                {/* Title Bar */}
                <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 flex items-center gap-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="text-zinc-500 font-mono text-xs flex-grow text-center">
                        root@automation-OS: ~
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 font-mono">
                    <div className="mb-6 text-neon-cyan">
                        <span className="text-green-500">➜</span> <span className="text-blue-500">~</span> ./initialize_automation.sh
                    </div>

                    <div className="mb-8 text-zinc-300">
                        {text}<span className="cursor-blink inline-block w-2 h-4 bg-neon-cyan align-middle ml-1"></span>
                    </div>

                    <div className="space-y-2 mb-12">
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">[OK]</span>
                            <span className="text-zinc-400">Core Systems .................... Online</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">[OK]</span>
                            <span className="text-zinc-400">Neural Engine ................... Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">[OK]</span>
                            <span className="text-zinc-400">Data Links ...................... Connected</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
                        I build <span className="text-neon-cyan text-glow">intelligent systems</span><br />
                        that run on autopilot.
                    </h1>

                    <p className="text-zinc-400 max-w-2xl text-lg mb-8 font-sans leading-relaxed">
                        Data-driven automation specialist. I architect custom workflows that delete manual labor and scale operations.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="bg-neon-cyan text-black px-6 py-3 font-bold text-sm tracking-wide uppercase hover:bg-white transition-colors">
                            Execute Protocol
                        </button>
                        <button className="border border-zinc-700 text-zinc-300 px-6 py-3 font-bold text-sm tracking-wide uppercase hover:border-neon-cyan hover:text-neon-cyan transition-colors">
                            View Logs
                        </button>
                    </div>
                </div>
            </div>

            {/* Background Grid Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 cyber-grid opacity-30 pointer-events-none" />
        </section>
    );
};

export default HeroTerminal;
