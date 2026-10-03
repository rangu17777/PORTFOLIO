import React, { useEffect, useRef } from 'react';

const Background = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: false });
        let width, height;
        let particles = [];

        // Configuration
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 150 : 400; // Optimized for 60 FPS+
        let rafId = 0;
        const particleSpeed = 2;
        const trailOpacity = 0.08; // Lower = longer trails
        const colorBase = 'hsl(180, 100%, 50%)'; // Cyan/Teal base

        // Simple pseudo-noise function for flow field angles
        const noise = (x, y) => {
            return Math.sin(x * 0.005) + Math.cos(y * 0.005) + Math.sin((x + y) * 0.002);
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = 0;
                this.vy = 0;
                this.hue = Math.random() * 60 + 160; // 160-220 (Cyan to Blue/Purple)
            }

            update() {
                // Calculate flow angle at current position
                const angle = noise(this.x, this.y) * Math.PI * 4;

                this.vx = Math.cos(angle) * particleSpeed;
                this.vy = Math.sin(angle) * particleSpeed;

                this.x += this.vx;
                this.y += this.vy;

                // Wrap around edges
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw() {
                ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, 1)`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            // Re-init particles
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            // Fade out previous frame to create trails
            ctx.fillStyle = `rgba(3, 0, 20, ${trailOpacity})`;
            ctx.fillRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            rafId = requestAnimationFrame(animate);
        };

        // Initialize
        // Only rebuild on real width changes (mobile URL bar show/hide fires resize too).
        let lastWidth = 0;
        const onResize = () => {
            if (window.innerWidth === lastWidth) return;
            lastWidth = window.innerWidth;
            resize();
        };

        // Stop drawing while the tab is hidden.
        const onVisibility = () => {
            cancelAnimationFrame(rafId);
            if (!document.hidden) rafId = requestAnimationFrame(animate);
        };

        onResize();
        window.addEventListener('resize', onResize);
        document.addEventListener('visibilitychange', onVisibility);
        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', onResize);
            document.removeEventListener('visibilitychange', onVisibility);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#030014]">
            <canvas ref={canvasRef} className="absolute inset-0 opacity-40 mix-blend-screen" />

            {/* Deep Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/50 to-[#030014]" />
        </div>
    );
};

export default Background;
