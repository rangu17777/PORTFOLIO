import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'DEMO', href: '#demo' },
        { name: 'WORK', href: '#work' },
        { name: 'PROCESS', href: '#process' },
        { name: 'ARCHITECT', href: '#architect' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[90%] md:w-auto ${scrolled ? 'py-2' : 'py-4'
                    }`}
            >
                {/* Glass Pill Container */}
                <div className={`
                    relative flex items-center justify-between md:justify-center gap-8 px-6 py-3 
                    bg-[#050505]/60 backdrop-blur-xl border border-white/10 rounded-full 
                    shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300
                    ${mobileMenuOpen ? 'bg-black/90' : ''}
                `}>

                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2 group">
                        <div className="w-2 h-2 rounded-full bg-[--neon-cyan] group-hover:shadow-[0_0_10px_#00F0FF] transition-all" />
                        <span className="text-xs font-mono font-bold tracking-widest text-white group-hover:text-[--neon-cyan] transition-colors">
                            META_PORTFOLIO
                        </span>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-[10px] font-mono font-medium text-[--text-muted] hover:text-white transition-colors tracking-wider"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Call to Action (Desktop) */}
                    <a
                        href="#contact"
                        className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-white/5 hover:bg-[--neon-cyan] border border-white/10 hover:border-[--neon-cyan] rounded-full transition-all group"
                    >
                        <span className="text-[10px] font-bold text-white group-hover:text-black tracking-wide">LET'S TALK</span>
                        <ArrowUpRight size={12} className="text-[--text-muted] group-hover:text-black transition-colors" />
                    </a>

                    {/* Mobile Hamburger Toggle */}
                    <button
                        className="md:hidden text-white p-1"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="fixed inset-x-4 top-24 z-40 md:hidden"
                    >
                        <div className="bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden relative">
                            {/* Decorative Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                            <div className="flex flex-col gap-4 relative z-10">
                                {navLinks.map((link, i) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-lg font-mono font-bold text-white hover:text-[--neon-cyan] py-3 border-b border-white/5 flex items-center justify-between group"
                                    >
                                        <span className="flex items-center gap-3">
                                            <span className="text-[--text-dim] text-xs">0{i + 1}</span>
                                            {link.name}
                                        </span>
                                        <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[--neon-cyan]" />
                                    </a>
                                ))}
                                <a
                                    href="#contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="mt-4 w-full py-4 bg-[--neon-cyan] text-black font-bold text-center rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all flex items-center justify-center gap-2"
                                >
                                    INITIALIZE_CHAT <ArrowUpRight size={16} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
