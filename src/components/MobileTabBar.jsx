import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, User, Zap, MessageCircle } from 'lucide-react';

const tabs = [
    { id: 'top', label: 'Home', href: '#', icon: Home },
    { id: 'work', label: 'Work', href: '#work', icon: Briefcase },
    { id: 'architect', label: 'About', href: '#architect', icon: User },
    { id: 'demo', label: 'Try it', href: '#demo', icon: Zap },
    { id: 'contact', label: 'Talk', href: '#contact', icon: MessageCircle },
];

// Sections without their own tab light up the nearest related tab.
const sectionToTab = { process: 'architect' };

// App-style bottom navigation, rendered on mobile only.
const MobileTabBar = () => {
    const [active, setActive] = useState('top');

    useEffect(() => {
        const sections = [...tabs.map((t) => t.id), ...Object.keys(sectionToTab)]
            .map((id) => document.getElementById(id))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(sectionToTab[entry.target.id] ?? entry.target.id);
                });
            },
            { rootMargin: '-45% 0px -50% 0px' }
        );
        sections.forEach((s) => observer.observe(s));

        const onScroll = () => {
            if (window.scrollY < 300) setActive('top');
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <nav
            aria-label="Mobile navigation"
            className="fixed bottom-0 inset-x-0 z-[60] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
            <div className="flex items-center justify-around rounded-2xl bg-[#050505]/80 backdrop-blur-xl border border-white/10 shadow-[0_-4px_30px_rgba(0,0,0,0.6)] py-1.5">
                {tabs.map(({ id, label, href, icon: Icon }) => {
                    const isActive = active === id;
                    return (
                        <a
                            key={id}
                            href={href}
                            aria-current={isActive ? 'page' : undefined}
                            className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 min-w-[56px]"
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="mobile-tab-pill"
                                    className="absolute inset-0 rounded-xl bg-[--neon-cyan]/10"
                                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                                />
                            )}
                            <Icon size={20} className={`relative transition-colors ${isActive ? 'text-[--neon-cyan]' : 'text-[--text-muted]'}`} />
                            <span className={`relative text-[10px] font-mono tracking-wide transition-colors ${isActive ? 'text-white' : 'text-[--text-dim]'}`}>
                                {label}
                            </span>
                        </a>
                    );
                })}
            </div>
        </nav>
    );
};

export default MobileTabBar;
