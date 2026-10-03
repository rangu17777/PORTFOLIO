import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail, Terminal, X, Smartphone, Monitor } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const Contact = () => {
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const subject = "New project enquiry";
    const body = message || "Hi Sarang, I'd like to talk about a website project.";

    const handleEmailClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleProtocolSelect = (type) => {
        if (type === 'native') {
            window.location.href = `mailto:agencywithai@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        } else {
            const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=agencywithai@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.open(gmailLink, '_blank');
        }
        setShowModal(false);
    };

    return (
        <section id="contact" className="py-12 md:py-32 flex justify-center md:px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="w-full max-w-5xl"
            >
                <SpotlightCard className="p-6 md:p-16 relative overflow-hidden group" spotlightColor="rgba(0, 240, 255, 0.15)">
                    {/* Background Grid Accent */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none bg-[url('/grid-pattern.svg')] opacity-[0.03]" />

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-between">
                        {/* Text Area */}
                        <div className="text-center md:text-left max-w-xl">
                            <div className="inline-flex items-center gap-2 text-[--neon-cyan] font-mono text-xs tracking-[0.2em] mb-6 uppercase">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[--neon-cyan] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[--neon-cyan]"></span>
                                </span>
                                Open for new projects
                            </div>

                            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Have a project <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[--text-muted]">in mind?</span>
                            </h2>
                            <p className="text-[--text-muted] text-lg leading-relaxed">
                                Tell me about your business and the website you need. I usually reply within a day.
                            </p>
                        </div>

                        {/* Action Dock */}
                        <div className="flex flex-col gap-4 w-full md:w-auto md:min-w-[300px]">
                            {/* WhatsApp Button - Primary */}
                            <a
                                href="https://wa.me/918793198054?text=Hi%20Sarang,%20I%20have%20a%20project%20in%20mind."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn relative flex items-center justify-between px-5 md:px-8 py-4 md:py-5 bg-[--neon-cyan] text-black rounded-xl font-bold text-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <span className="flex items-center gap-3">
                                    <MessageCircle className="w-6 h-6" />
                                    Chat on WhatsApp
                                </span>
                                <ArrowUpRight />
                            </a>

                            {/* Email Button - Secondary */}
                            <a
                                href="#"
                                onClick={handleEmailClick}
                                className="group/btn flex items-center justify-between px-5 md:px-8 py-4 md:py-5 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer"
                            >
                                <span className="flex items-center gap-3">
                                    <Mail className="w-6 h-6" />
                                    Email me
                                </span>
                                <div className="opacity-0 group-hover/btn:opacity-100 transition-opacity">
                                    <ArrowUpRight />
                                </div>
                            </a>

                            {/* Terminal Input Footer */}
                            <div className="mt-4 p-4 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-[--neon-cyan] flex items-center gap-2 focus-within:border-[--neon-cyan]/50 transition-colors">
                                <Terminal size={12} className="text-[--text-dim]" />
                                <span className="text-[--text-dim]">{'>'}</span>
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Your message (optional)"
                                    className="bg-transparent border-none outline-none flex-1 text-[--neon-cyan] placeholder-[--text-dim]/50 w-full"
                                />
                                <span className="w-1.5 h-4 bg-[--neon-cyan] animate-pulse" />
                            </div>
                        </div>
                    </div>
                </SpotlightCard>
            </motion.div>

            {/* Protocol Selection Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0a0a0a] border border-[--neon-cyan]/30 rounded-2xl p-6 max-w-sm w-full shadow-[0_0_50px_rgba(0,240,255,0.15)] relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[--neon-cyan] to-transparent" />

                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 text-[--text-dim] hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h3 className="text-xl font-bold text-white mb-2">Open email in…</h3>
                            <p className="text-[--text-dim] text-sm mb-6">Pick where you want to write the email.</p>

                            <div className="space-y-3">
                                <button
                                    onClick={() => handleProtocolSelect('native')}
                                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[--neon-cyan]/50 transition-all group text-left"
                                >
                                    <div className="p-2 rounded-lg bg-[--neon-cyan]/10 text-[--neon-cyan] group-hover:scale-110 transition-transform">
                                        <Smartphone size={24} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">Mail app</div>
                                        <div className="text-xs text-[--text-dim]">Best for Mobile</div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleProtocolSelect('web')}
                                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[--neon-cyan]/50 transition-all group text-left"
                                >
                                    <div className="p-2 rounded-lg bg-[--neon-cyan]/10 text-[--neon-cyan] group-hover:scale-110 transition-transform">
                                        <Monitor size={24} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">Gmail in browser</div>
                                        <div className="text-xs text-[--text-dim]">Best for PC / Gmail Web</div>
                                    </div>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

const ArrowUpRight = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
    </svg>
);

export default Contact;
