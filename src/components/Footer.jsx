import React from 'react';

const links = [
    { label: 'WhatsApp', href: 'https://wa.me/918793198054' },
    { label: 'Email', href: 'mailto:agencywithai@gmail.com' },
    { label: 'Relentix', href: 'https://relentix.co.in' },
];

const Footer = () => {
    return (
        <footer className="py-10 border-t border-[rgba(255,255,255,0.05)] text-sm text-[--text-muted]">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                <div>
                    <div className="text-white font-medium">
                        Sarang Kumbhar · Founder,{' '}
                        <a href="https://relentix.co.in" target="_blank" rel="noopener noreferrer" className="text-[--neon-cyan] hover:underline underline-offset-4">Relentix</a>
                    </div>
                    <div className="mt-1">Web design studio · Pune, India</div>
                </div>

                <nav className="flex flex-wrap justify-center gap-6">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className="py-2 hover:text-[--neon-cyan] transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div>© {new Date().getFullYear()} Sarang Kumbhar</div>
            </div>
        </footer>
    );
};

export default Footer;
