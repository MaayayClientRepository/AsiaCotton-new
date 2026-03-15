import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Folder = ({
    color = '#5227FF',
    size = 1,
    images = [],
    className = '',
    title = '',
    isOpen: controlledOpen,
    onFolderClick
}) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

    const folderBackColor = "#050505"; // Pure black silhouette
    const paperColor = '#ffffff';

    const handleClick = (e) => {
        e.stopPropagation();
        if (onFolderClick) onFolderClick(e);
        else setInternalOpen(prev => !prev);
    };

    // Pre-calculate arc values to avoid overhead during render
    const arcData = useMemo(() => {
        const total = images.length;
        const radius = 260; // Much tighter radius to bring images down
        const spread = 1.8; // Compact spread
        const startAngle = -Math.PI / 2 - spread / 2;

        return images.map((_, index) => {
            const angle = startAngle + (index / Math.max(total - 1, 1)) * spread;
            return {
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                r: (angle + Math.PI / 2) * (180 / Math.PI)
            };
        });
    }, [images.length]);

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <motion.div
                initial={false}
                animate={{
                    scale: open ? size * 0.4 : size,
                    y: open ? 0 : 0 // Positioning now handled by Discovery Stage parent
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 32,
                    mass: 0.5 // Lower mass for snappier, less "heavy" feel
                }}
                className="relative cursor-pointer select-none transform-gpu"
                onClick={handleClick}
                onHoverStart={() => !open && setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <div
                    className="relative w-[130px] h-[90px] rounded-tl-0 rounded-tr-[12px] rounded-br-[12px] rounded-bl-[12px] shadow-2xl transition-colors duration-500"
                    style={{ backgroundColor: folderBackColor }}
                >
                    <span
                        className="absolute z-0 bottom-[98%] left-0 w-[45px] h-[14px] rounded-tl-[8px] rounded-tr-[8px]"
                        style={{ backgroundColor: folderBackColor }}
                    ></span>

                    {/* Product Image Samples */}
                    <AnimatePresence>
                        {images.map((img, i) => {
                            const arc = arcData[i];
                            return (
                                <motion.div
                                    key={i}
                                    initial={false}
                                    animate={{
                                        opacity: open ? 1 : (i < 2 ? 0.3 : 0),
                                        scale: open ? 1 : 0.35,
                                        x: open ? `calc(-50% + ${arc.x}px)` : '-50%',
                                        y: open ? `${arc.y + 150}px` : (isHovered && i < 2 ? -15 + (i * -4) : 8),
                                        rotate: open ? arc.r : (isHovered && i < 2 ? (i - 0.5) * 4 : 0),
                                        zIndex: open ? 100 + i : 10 - i
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 280,
                                        damping: 28,
                                        mass: 0.5,
                                        delay: open ? i * 0.02 : 0
                                    }}
                                    whileHover={open ? {
                                        scale: 1.25, // Stronger pop-out
                                        zIndex: 1000,
                                        boxShadow: "0 60px 120px rgba(0,0,0,0.5)",
                                        y: arc.y + 110, // Gentle lift from +150 base
                                        transition: { type: "spring", stiffness: 400, damping: 25 }
                                    } : {}}
                                    whileTap={open ? { scale: 0.98 } : {}}
                                    className={`absolute bottom-[20%] left-1/2 overflow-hidden shadow-2xl border border-black/5 transform-gpu
                             ${open ? 'w-[130px] h-[180px] cursor-zoom-in' : 'w-[100px] h-[80px] pointer-events-none'}`}
                                    style={{
                                        backgroundColor: paperColor,
                                        borderRadius: open ? '32px' : '16px',
                                        willChange: 'transform, opacity',
                                        backfaceVisibility: 'hidden'
                                    }}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover pointer-events-none" loading="eager" />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {/* Symmetrical Splayed Flaps */}
                    <motion.div
                        animate={{
                            skewX: open ? 18 : (isHovered ? 4 : 0),
                            scaleY: open ? 0.6 : (isHovered ? 0.96 : 1),
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute inset-0 z-40 w-full h-full origin-bottom"
                        style={{ backgroundColor: color, borderRadius: '5px 12px 12px 12px' }}
                    />
                    <motion.div
                        animate={{
                            skewX: open ? -18 : (isHovered ? -4 : 0),
                            scaleY: open ? 0.6 : (isHovered ? 0.96 : 1),
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute inset-0 z-40 w-full h-full origin-bottom flex items-center justify-center overflow-hidden"
                        style={{ backgroundColor: color, borderRadius: '5px 12px 12px 12px' }}
                    >
                        {!open && title && (
                            <span className="text-white text-[11px] font-black uppercase text-center tracking-wider px-2 leading-none opacity-90">
                                {title}
                            </span>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Folder;
