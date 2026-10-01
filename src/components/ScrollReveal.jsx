import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ScrollReveal = ({ children, width = "100%" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} style={{ width, position: 'relative', overflow: 'hidden' }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Heavy Ease Out (Smooth)
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ScrollReveal;
