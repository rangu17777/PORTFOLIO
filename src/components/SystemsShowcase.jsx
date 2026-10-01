import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Workflow, Database, Zap, X, ChevronRight, LayoutDashboard, TrendingUp } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const projects = [
    {
        id: 1,
        title: "AI Lead Qualification & Voice Agent",
        tags: ["Make.com", "Vapi", "Airtable", "Perplexity", "PandaDoc"],
        icon: <Zap size={24} />,
        problem: "Sales reps wasted hours manually checking forms, researching companies, and making repetitive pitch calls.",
        solution: "Full automation: New Lead (Tally) → AI Research (Perplexity) → Voice Call (Vapi) → CRM (Airtable) → Custom Proposal (PandaDoc).",
        outcome: "Zero manual intervention. 24/7 Immediate lead engagement.",
        image: "/projects/lead-gen/automation-banner.png",
        links: [],
        gallery: [
            "/projects/lead-gen/make-scenario.png",
            "/projects/lead-gen/airtable-leads.png",
            "/projects/lead-gen/tally-form.png"
        ],
        manual_problem: `A human sales rep must constantly check for new form submissions, review each lead's details and evaluate if they're worth pursuing, research the company to understand how to help them, make phone calls and deliver competent pitches, then manually create custom proposals. That's hours of repetitive work... and could lead to potential leads slipping through the cracks.`,
        auto_solution: `When a new lead fills out a request form, the lead database automatically qualifies them, researches their company, then makes an automated phone call to pitch our offer. If the lead shows interest, the system saves the call outcome, summarizes the conversation, and generates a personalized proposal— all without a human having to lift a single finger, in an super scalable way.`
    },
    {
        id: 2,
        title: "Full-Stack AI Web Apps Suite",
        tags: ["React & Angular", "Google Gemini", "Vibe Coded", "Dashboard UI"],
        icon: <LayoutDashboard size={24} />,
        problem: "Traditional student portals and finance tools are clunky, disconnected, and lack intelligence.",
        solution: "Two production-grade apps shipped: 'HotelInsightPro' for education and 'FinFlow AI' for business finance.",
        outcome: "Modern, dark-mode dashboards with embedded AI Agents.",
        image: "/projects/hotel-dashboard/vibe-apps-final.jpg",
        demoLink: "https://ai.studio/apps/drive/1HUuf8uTMJe21O0D588DwT40cKJGVger0?fullscreenApplet=true",
        links: [
            { label: "HotelInsightPro Demo", url: "https://ai.studio/apps/drive/1HUuf8uTMJe21O0D588DwT40cKJGVger0?fullscreenApplet=true" },
            { label: "FinFlow AI Demo", url: "https://ai.studio/apps/drive/1trnvfpfuOJdGVG4d0FJC4Y_lTMM9LjOp?fullscreenApplet=true" }
        ],
        gallery: [
            "/projects/hotel-dashboard/login.png",
            "/projects/hotel-dashboard/ai-assistant.png",
            "/projects/finance-dashboard/dashboard-chat.png",
            "/projects/finance-dashboard/login.png"
        ],
        manual_problem: `Across industries, users are stuck with "boring" software. Hotel management students juggle physical logbooks and scattered PDFs. Small business owners drown in messy Excel sheets to track GST and expenses. In both cases, the data is static, the UI is uninspiring, and there's zero intelligence helping them make decisions.`,
        auto_solution: `I built two "Vibe Coded" solutions to solve this. HotelInsightPro: A comprehensive academic dashboard where students track assignments and training logs, with a Gemini-powered AI tutor that knows their curriculum. FinFlow AI: A dark-mode financial command center tracks invoices and expenses, but the killer feature is the AI Chat—you can literally ask "Who owes me money?" and it answers instantly.`
    },
    {
        id: 3,
        title: "AI Sales Research Agent",
        tags: ["Relevance AI", "Sales Intelligence", "Automation"],
        icon: <Workflow size={24} />,
        problem: "Sales reps typically prepare for calls by manually researching prospects, often missing key details.",
        solution: "An automated Agent that synthesizes web & LinkedIn data into a pre-call cheat sheet.",
        outcome: "Higher trust, better angles, and increased conversion rates.",
        image: "/projects/sales-agent/agent-builds.jpg",
        buttonLabel: "Visit Agent",
        demoLink: "https://app.relevanceai.com/agents/d7b62b/f84056aa-75a7-4a7a-aefb-0046e3b6307a/d3e6145d-d893-41ce-8892-559158fd1ebb/embed-chat?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=icon&primary_color=%234c2439&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=false&hide_description=false",
        gallery: [
            "/projects/sales-agent/chat.png"
        ],
        manual_problem: `Creating a competent pre-call report manually takes 10-15 minutes per prospect. Reps have to jump between LinkedIn profiles, company 'About Us' pages, and news articles to find a hook. Often, they skip this step entirely due to time pressure, leading to generic pitches that don't convert.`,
        auto_solution: `A dedicated Sales Copilot Agent. 10 minutes before a call, the rep simply pastes the Company URL and Prospect's LinkedIn URL into the chat. The agent instantly scrapes the web for recent news, analyzes the prospect's background, and generates a tailored "Pre-Call Strategy Report" with icebreakers and specific selling angles.`
    }
];

const SystemsShowcase = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);

    const handleCardClick = (project) => {
        setSelectedId(project.id);
        setActiveImage(project.image); // Reset active image to main image
    };

    return (
        <section id="work" className="py-24 relative">
            <div className="mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold mb-4"
                >
                    Proof of <span className="text-[--neon-cyan]">Systems</span>
                </motion.h2>
                <p className="text-[--text-muted] max-w-2xl">
                    I don't sell "websites". I sell efficiency. Here are live systems running in production.
                </p>
            </div>

            {/* Grid of Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {projects.map((project) => (
                    <motion.div
                        layoutId={`card-${project.id}`}
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full"
                    >
                        <motion.div
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }} // Softer Spring
                            className="h-full"
                        >
                            <SpotlightCard className="h-full cursor-pointer group relative overflow-hidden" spotlightColor="rgba(6, 182, 212, 0.15)">
                                <div
                                    onClick={() => handleCardClick(project)}
                                    className="flex flex-col h-full relative z-10"
                                >
                                    {/* Click Ripple / "Data Scan" Effect */}
                                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-[--neon-cyan]/10 to-transparent translate-x-[-150%] group-active:translate-x-[150%] transition-transform duration-700 ease-out pointer-events-none" />

                                    {/* Hover Overlay Hint */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center pointer-events-none">
                                        <span className="text-white uppercase font-mono tracking-widest text-xs border border-white/30 bg-black/50 backdrop-blur px-4 py-2 rounded-full">
                                            View Case Study
                                        </span>
                                    </div>

                                    {/* Image Showcase */}
                                    {project.image && (
                                        <div className="h-64 overflow-hidden border-b border-white/5 relative">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-100"
                                            />
                                        </div>
                                    )}

                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 bg-white/5 rounded-lg text-white group-hover:text-[--neon-cyan] transition-colors">
                                                {project.icon}
                                            </div>
                                            <ExternalLink className="text-[--text-dim] group-hover:text-white transition-colors" size={20} />
                                        </div>

                                        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[--neon-cyan] transition-colors">
                                            {project.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="text-[10px] uppercase font-mono bg-white/5 px-2 py-1 rounded text-[--text-muted] border border-white/5">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="space-y-4 mb-8 flex-grow">
                                            <div>
                                                <span className="text-xs uppercase text-[--text-dim] font-bold tracking-wider">PROBLEM</span>
                                                <p className="text-sm text-[--text-muted] mt-1 line-clamp-2">{project.problem}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs uppercase text-[--neon-green] font-bold tracking-wider">OUTCOME</span>
                                                <p className="text-sm text-white mt-1">{project.outcome}</p>
                                            </div>
                                        </div>

                                        {/* Action Footer */}
                                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between group/icon">
                                            <span className="text-[--text-main] text-sm font-medium group-hover:text-[--neon-cyan] transition-colors">View System</span>
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[--neon-cyan] group-hover:text-black transition-all">
                                                <ChevronRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Expanded Modal - Portal to break out of Canvas Transform */}
            {createPortal(
                <AnimatePresence>
                    {selectedId && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
                            />

                            {/* Modal Window */}
                            <motion.div
                                layoutId={`card-${selectedId}`}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Smooth expansion
                                className="bg-[#0a0a0a] w-full max-w-6xl h-[90vh] border border-[--text-dim] rounded-2xl relative z-10 shadow-2xl overflow-hidden flex flex-col md:flex-row"
                            >
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                    className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-[--neon-cyan] hover:text-black transition-colors z-50"
                                >
                                    <X size={24} />
                                </button>

                                {(() => {
                                    const project = projects.find(p => p.id === selectedId);
                                    const currentImage = activeImage || project.image;

                                    return (
                                        <>
                                            {/* LEFT COLUMN: Scrollable Content */}
                                            <div
                                                data-lenis-prevent
                                                className="w-full md:w-1/2 h-full overflow-y-auto p-6 md:p-8 pb-32 border-r border-[#222] custom-scrollbar bg-[#0a0a0a] overscroll-contain"
                                            >

                                                {/* Header Info */}
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2, duration: 0.5 }}
                                                    className="mb-8"
                                                >
                                                    <div className="flex items-center gap-3 text-[--neon-cyan] mb-3">
                                                        {project.icon}
                                                        <span className="font-mono text-xs tracking-widest uppercase">System Architecture</span>
                                                    </div>
                                                    <motion.h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-white">{project.title}</motion.h2>

                                                    <div className="flex flex-wrap gap-2 mb-6">
                                                        {project.tags.map(tag => (
                                                            <span key={tag} className="text-xs uppercase font-mono bg-[#1a1a1a] text-[--text-muted] px-3 py-1 rounded border border-[#333]">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {/* Demo Link Buttons */}
                                                    <div className="flex flex-wrap gap-3">
                                                        {project.links && project.links.length > 0 ? (
                                                            project.links.map((link, idx) => (
                                                                <a
                                                                    key={idx}
                                                                    href={link.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-2 bg-[--neon-cyan]/10 text-[--neon-cyan] border border-[--neon-cyan]/50 px-4 py-2 rounded-lg hover:bg-[--neon-cyan] hover:text-black transition-all font-bold text-sm"
                                                                >
                                                                    {link.label} <ExternalLink size={14} />
                                                                </a>
                                                            ))
                                                        ) : project.demoLink && (
                                                            <a
                                                                href={project.demoLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 bg-[--neon-cyan]/10 text-[--neon-cyan] border border-[--neon-cyan]/50 px-4 py-2 rounded-lg hover:bg-[--neon-cyan] hover:text-black transition-all font-bold text-sm"
                                                            >
                                                                {project.buttonLabel || "Visit Live App"} <ExternalLink size={14} />
                                                            </a>
                                                        )}
                                                    </div>
                                                </motion.div>

                                                {/* Problem / Solution Split */}
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.3, duration: 0.5 }}
                                                    className="space-y-6"
                                                >
                                                    <div className="relative pl-6 py-3 pr-4 border-l-2 border-red-500 bg-red-500/5 rounded-r-lg">
                                                        <h4 className="text-red-400 font-bold uppercase tracking-wider text-xs mb-2">The Manual Pain (Old Way)</h4>
                                                        <p className="text-[--text-muted] leading-relaxed text-sm md:text-base">{project.manual_problem}</p>
                                                    </div>

                                                    <div className="relative pl-6 py-3 pr-4 border-l-2 border-[--neon-green] bg-[--neon-green]/5 rounded-r-lg">
                                                        <h4 className="text-[--neon-green] font-bold uppercase tracking-wider text-xs mb-2">The AI Solution (New Way)</h4>
                                                        <p className="text-gray-200 leading-relaxed text-sm md:text-base">{project.auto_solution}</p>
                                                    </div>

                                                    {/* Outcome Box */}
                                                    <div className="bg-[#111] p-5 rounded-xl border border-[#222] mt-6">
                                                        <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                                                            <Zap size={14} className="text-[--neon-cyan]" /> Measured Impact
                                                        </h4>
                                                        <p className="text-[--neon-cyan] text-lg font-medium">{project.outcome}</p>
                                                    </div>
                                                </motion.div>
                                            </div>

                                            {/* RIGHT COLUMN: Image Viewer */}
                                            <div className="w-full md:w-1/2 h-full bg-[#050505] flex flex-col relative group">
                                                {/* Main Image Area */}
                                                <div
                                                    className="flex-grow flex items-center justify-center p-8 bg-[url('/grid-pattern.svg')] bg-repeat opacity-100 cursor-zoom-in relative overflow-hidden"
                                                    onClick={() => setIsZoomed(true)}
                                                >
                                                    {/* Zoom Hint */}
                                                    <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-mono backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                                                        <ExternalLink size={12} /> Click to Zoom
                                                    </div>

                                                    <AnimatePresence mode='wait'>
                                                        <motion.img
                                                            key={currentImage}
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            transition={{ duration: 0.4 }}
                                                            src={currentImage}
                                                            alt="System Preview"
                                                            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg border border-[#222]"
                                                        />
                                                    </AnimatePresence>
                                                </div>

                                                {/* Thumbnails Strip */}
                                                {project.gallery && (
                                                    <div className="h-24 border-t border-[#222] bg-[#0a0a0a] flex items-center gap-3 px-6 overflow-x-auto z-20">
                                                        {project.gallery.map((img, i) => (
                                                            <div
                                                                key={i}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setActiveImage(img);
                                                                }}
                                                                className={`h-16 aspect-video rounded-md overflow-hidden border cursor-pointer transition-all flex-shrink-0 ${activeImage === img ? 'border-[--neon-cyan] opacity-100 ring-1 ring-[--neon-cyan]' : 'border-[#333] opacity-50 hover:opacity-100'}`}
                                                            >
                                                                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    );
                                })()}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {/* Full Screen Zoom Overlay */}
            {createPortal(
                <AnimatePresence>
                    {isZoomed && selectedId && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsZoomed(false)}
                            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
                        >
                            <button
                                className="absolute top-8 right-8 p-3 bg-black/50 text-white rounded-full hover:bg-[--neon-cyan] hover:text-black transition-colors"
                            >
                                <X size={32} />
                            </button>

                            <img
                                src={activeImage || projects.find(p => p.id === selectedId)?.image}
                                alt="Full Screen Zoom"
                                className="max-w-[95vw] max-h-[95vh] object-contain shadow-2xl rounded-lg"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
};

export default SystemsShowcase;
