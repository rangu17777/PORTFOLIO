import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        let lastY = window.scrollY;
        const handleScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 50);
            // Hide while scrolling down, reveal on any scroll up; always shown near the top.
            if (y < 120) setHidden(false);
            else if (Math.abs(y - lastY) > 6) setHidden(y > lastY);
            lastY = y;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHidden = hidden;

    const navLinks = [
        { name: 'WORK', href: '#work' },
        { name: 'ABOUT', href: '#architect' },
        { name: 'PROCESS', href: '#process' },
        { name: 'TRY IT LIVE', href: '#demo' },
    ];

    return (
        <>
            <motion.nav
                initial={false}
                animate={{ y: isHidden ? -110 : 0, opacity: isHidden ? 0 : 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ pointerEvents: isHidden ? 'none' : 'auto' }}
                onFocusCapture={() => setHidden(false)}
                className={`fixed top-6 inset-x-0 mx-auto z-50 transition-[padding] duration-500 w-fit ${scrolled ? 'py-2' : 'py-4'
                    }`}
            >
                {/* Glass Pill Container */}
                <div className={`
                    relative flex items-center justify-center gap-8 px-6 py-3 
                    bg-[#050505]/60 backdrop-blur-xl border border-white/10 rounded-full 
                    shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300
                `}>

                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2 group">
                        <div className="w-2 h-2 rounded-full bg-[--neon-cyan] group-hover:shadow-[0_0_10px_#00F0FF] transition-all" />
                        <span className="whitespace-nowrap text-xs font-mono font-bold tracking-widest text-white group-hover:text-[--neon-cyan] transition-colors">
                            SARANG KUMBHAR
                        </span>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="whitespace-nowrap py-2 text-xs font-mono font-medium text-[--text-muted] hover:text-white transition-colors tracking-wider"
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
                        <span className="whitespace-nowrap text-[10px] font-bold text-white group-hover:text-black tracking-wide">LET'S TALK</span>
                        <ArrowUpRight size={12} className="text-[--text-muted] group-hover:text-black transition-colors" />
                    </a>
                </div>
            </motion.nav>
        </>
    );
};

export default Navbar;
