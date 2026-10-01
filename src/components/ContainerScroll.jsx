import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

// Scroll-driven 3D reveal: the device starts tilted back and settles flat as the hero scrolls.
// Pattern after Aceternity's "Container Scroll Animation" (21st.dev), rebuilt for this project.
const ContainerScroll = ({ titleComponent, children }) => {
    const containerRef = useRef(null);
    const reduceMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const rotate = useTransform(scrollYProgress, [0, 0.45], reduceMotion ? [0, 0] : [24, 0]);
    const scale = useTransform(
        scrollYProgress,
        [0, 0.45],
        reduceMotion ? [1, 1] : isMobile ? [0.9, 1] : [1.04, 1]
    );
    const headerY = useTransform(scrollYProgress, [0, 0.45], reduceMotion ? [0, 0] : [0, -60]);

    return (
        <div ref={containerRef} className="relative flex justify-center pt-4 md:pt-8 pb-16 md:pb-28">
            <div className="w-full" style={{ perspective: '1200px' }}>
                <motion.div style={{ y: headerY }} className="max-w-5xl mx-auto text-center">
                    {titleComponent}
                </motion.div>

                <motion.div
                    style={{ rotateX: rotate, scale, transformOrigin: 'center top' }}
                    className="device-frame max-w-5xl mx-auto mt-10 md:mt-14 h-[16rem] sm:h-[24rem] md:h-[34rem] p-2 md:p-3 rounded-[1.5rem] md:rounded-[2rem]"
                >
                    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#050505]">
                        {children}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContainerScroll;
