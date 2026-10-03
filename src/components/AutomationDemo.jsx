import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Send, CheckCircle, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useWebhook } from '../hooks/useWebhook';
import { useTerminal } from '../hooks/useTerminal';

const AutomationDemo = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        painPoint: '',
        depth: 'concise', // Default value must be set here to send to Webhook
        industry: ''
    });
    const { loading, success, error, triggerWebhook, reset } = useWebhook();
    const { displayedLines, startTyping, isTyping } = useTerminal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.painPoint) return;

        // 1. Start Visual Processing
        startTyping([
            '> Sending your request...',
            '> Reading your task...',
            '> Finding what can be automated...',
            '> Writing your plan...',
            '> Done. Check your inbox.'
        ]);

        // 2. Trigger "Backend" (Real Make.com Connection)
        await triggerWebhook(formData, false);
    };

    return (
        <section id="demo" className="py-12 md:py-24 relative border-t border-[rgba(255,255,255,0.05)]">
            <div className="grid md:grid-cols-2 gap-16 items-center">

                {/* Left: Context */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-3 text-[--neon-cyan] mb-4">
                        <Terminal size={24} />
                        <span className="font-mono font-bold tracking-wider">TRY IT LIVE</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-6">See the automation <br /> work on you.</h2>
                    <p className="text-[--text-muted] text-lg mb-8 leading-relaxed">
                        This form is connected to a real automation. Describe a task your team does by hand, and my AI agent will write a plan to automate it and email it to you in a minute.
                    </p>


                </motion.div>

                {/* Right: The Terminal Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Neon Border */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[--neon-cyan] to-[--neon-purple] rounded-xl blur opacity-20" />

                    <div className="relative bg-[#050505] border border-[#333] rounded-xl p-5 md:p-8 font-mono">
                        {/* Header */}
                        <div className="flex gap-2 mb-6 border-b border-[#333] pb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>

                        {/* Steps */}
                        {/* Form State */}
                        {!loading && !success && !error && (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase text-[--text-muted] mb-2">FULL NAME</label>
                                        <input
                                            type="text"
                                            className="w-full bg-[#111] border border-[#333] p-3 text-white focus:border-[--neon-cyan] focus:outline-none transition-colors rounded"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase text-[--text-muted] mb-2">EMAIL ADDRESS</label>
                                        <input
                                            type="email"
                                            className="w-full bg-[#111] border border-[#333] p-3 text-white focus:border-[--neon-cyan] focus:outline-none transition-colors rounded"
                                            placeholder="you@company.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase text-[--text-muted] mb-2">STRATEGY DEPTH</label>
                                        <select
                                            className="w-full bg-[#111] border border-[#333] p-3 text-white focus:border-[--neon-cyan] focus:outline-none transition-colors rounded appearance-none"
                                            value={formData.depth || 'concise'}
                                            onChange={(e) => setFormData({ ...formData, depth: e.target.value })}
                                        >
                                            <option value="concise">⚡ Quick Win (Concise)</option>
                                            <option value="detailed">🧠 Deep Dive (Detailed)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase text-[--text-muted] mb-2">INDUSTRY / NICHE (OPTIONAL)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-[#111] border border-[#333] p-3 text-white focus:border-[--neon-cyan] focus:outline-none transition-colors rounded"
                                            placeholder="e.g. Real Estate, SaaS"
                                            value={formData.industry || ''}
                                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase text-[--text-muted] mb-2">TASK YOU DO BY HAND</label>
                                    <textarea
                                        rows="3"
                                        className="w-full bg-[#111] border border-[#333] p-3 text-white focus:border-[--neon-cyan] focus:outline-none transition-colors rounded"
                                        placeholder="e.g. We copy every website enquiry into Excel and call them back manually"
                                        value={formData.painPoint}
                                        onChange={(e) => setFormData({ ...formData, painPoint: e.target.value })}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="relative z-20 w-full bg-[--neon-cyan] text-black font-bold py-4 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 group rounded"
                                >
                                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                                    EMAIL ME THE PLAN
                                </button>
                                <p className="text-[10px] text-[--text-dim] text-center">Your plan arrives by email. No spam, no sales calls.</p>
                            </form>
                        )}

                        {/* Processing State */}
                        {(loading || isTyping) && (
                            <div className="min-h-[300px] flex flex-col justify-center">
                                {displayedLines.map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-[--neon-green] text-sm mb-2 font-mono"
                                    >
                                        {line}
                                    </motion.div>
                                ))}
                                <div className="mt-4 flex items-center gap-2 text-[--text-muted] text-xs animate-pulse">
                                    <Loader2 size={12} className="animate-spin" />
                                    Working on it...
                                </div>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-red-500 mb-4"
                                >
                                    <AlertCircle size={48} />
                                </motion.div>
                                <h3 className="text-xl text-white font-bold mb-2">Something went wrong</h3>
                                <p className="text-red-400 font-mono text-xs mb-6 max-w-xs mx-auto">
                                    Error: {error}
                                </p>
                                <button
                                    onClick={reset}
                                    className="flex items-center gap-2 px-6 py-2 bg-[#333] hover:bg-[#444] text-white rounded transition-all text-sm font-bold"
                                >
                                    <RefreshCw size={14} />
                                    TRY AGAIN
                                </button>
                            </div>
                        )}

                        {/* Success State */}
                        {success && !isTyping && (
                            <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-[--neon-green] mb-4"
                                >
                                    <CheckCircle size={48} />
                                </motion.div>
                                <h3 className="text-xl text-white font-bold mb-2">Plan sent</h3>
                                <p className="text-[--text-muted] text-sm mb-8">
                                    Check your inbox. Your automation plan has been sent to <span className="text-white">{formData.email}</span>.
                                </p>
                                <button
                                    onClick={reset}
                                    className="flex items-center gap-2 px-6 py-2 border border-[--neon-cyan] text-[--neon-cyan] hover:bg-[--neon-cyan] hover:text-black rounded transition-all text-sm font-bold"
                                >
                                    <RefreshCw size={14} />
                                    TRY ANOTHER TASK
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section >
    );
};

export default AutomationDemo;
