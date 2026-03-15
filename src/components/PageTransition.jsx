import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
                initial: {
                    opacity: 0,
                    y: 20,
                    scale: 0.99
                },
                animate: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1], // expoOut
                        delay: 0.1
                    }
                },
                exit: {
                    opacity: 0,
                    y: -10,
                    scale: 0.99,
                    transition: {
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                    }
                }
            }}
            style={{ willChange: "transform, opacity" }}
            className="w-full origin-top transform-gpu"
        >
            {/* Cinematic Light Wash Overlay */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="transform-gpu"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                    zIndex: 9999,
                    pointerEvents: 'none',
                    mixBlendMode: 'overlay' // Premium touch
                }}
            />
            {children}
        </motion.div>
    );
};

export default PageTransition;
