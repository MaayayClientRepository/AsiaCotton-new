import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, useMotionValue, AnimatePresence } from 'framer-motion';
import TextType from './TextType';
import logo from '../assets/logo.png';
// Import images from assets/intro
import homeOldImg from '../assets/intro/home-old.jpg';
import centerBedsheetImg from '../assets/intro/center-bedsheet.jpg';
import centerPillowImg from '../assets/intro/centerbed-pillow.jpg';
import leftBedImg from '../assets/intro/left-bed.jpg';
import leftPillowImg from '../assets/intro/left-pillow.jpg';
import sofaPillowImg from '../assets/intro/sofa-pillow.jpg';
import sofaSheetImg from '../assets/intro/sofa-bedsheet.jpg';
import windowClothImg from '../assets/intro/window-screencloth.jpg';
import bedMatImg from '../assets/intro/bedmat.jpg';
import upperSheetImg from '../assets/intro/upper-bedsheet.jpg';
const hotspotInfo = {
    centerPillow: { label: 'PILLOW', desc: 'Breathable pillow for deep, restful sleep.' },
    centerBedsheet: { label: 'BEDDING', desc: 'High thread-count bedding, made to last.' },
    leftBed: { label: 'BEDDING', desc: 'High thread-count bedding, made to last.' },
    leftPillow: { label: 'PILLOW', desc: 'Breathable pillow for deep, restful sleep.' },
    sofaSheet: { label: 'THROW', desc: 'Throw that stays soft after every wash.' },
    sofaPillow: { label: 'CUSHION', desc: "Cushion you'll actually want to touch." },
    windowCloth: { label: 'CURTAINS', desc: 'Curtain that filters light, holds its shape.' },
    bedMat: { label: 'RUG', desc: 'Dense woven rug, easy to clean.' },
    upperSheet: { label: 'BEDDING', desc: 'High thread-count bedding, made to last.' },
};

const hotspots = [
    { id: 'centerPillow', image: centerPillowImg, hoverPath: 'M44,44 L71,44 L71,55 L44,55 Z' },
    { id: 'centerBedsheet', image: centerBedsheetImg, hoverPath: 'M29,73 L29,70 L34,60 L40,60 L45,52 L50,53 L56,54 L61,54 L66,55 L71,56 L77,63 L77,68 L77,68 L71,85 L66,78 L61,76 L56,75 L50,75 L45,74 L40,73 L34,73 L29,78 Z' },
    { id: 'leftBed', image: leftBedImg, hoverPath: 'M10,51 L38,51 L38,71 L10,71 Z' },
    { id: 'leftPillow', image: leftPillowImg, hoverPath: 'M25,49 L34,49 L34,55 L25,55 Z' },
    { id: 'sofaSheet', image: sofaSheetImg, hoverPath: 'M77,76 L88,76 L88,92 L77,92 Z' },
    { id: 'sofaPillow', image: sofaPillowImg, hoverPath: 'M83,64 L97,64 L97,85 L83,85 Z' },
    { id: 'windowCloth', image: windowClothImg, hoverPath: 'M12,0 L42,0 L42,40 L30,40 L12,25 Z M70,0 L90,0 L90,45 L70,45 Z' },
    { id: 'bedMat', image: bedMatImg, hoverPath: 'M8,68 L82,68 L82,99 L8,99 Z' },
    { id: 'upperSheet', image: upperSheetImg, hoverPath: 'M35,59 L35,59 L40,57 L44,55 L49,55 L53,55 L58,55 L62,56 L67,56 L72,58 L76,64 L76,72 L76,73 L72,68 L67,62 L62,61 L58,61 L53,60 L49,60 L44,60 L40,60 L35,60 Z' }
];

const InteractiveHotspotLayer = ({ isMobile }) => {
    const [hoveredId, setHoveredId] = useState(null);
    const [tappedId, setTappedId] = useState(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const imageContainerRef = useRef(null);
    const tapTimeoutRef = useRef(null);
    const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || isMobile);

    const handleMouseMove = useCallback((e) => {
        if (!imageContainerRef.current) return;
        const rect = imageContainerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    }, [mouseX, mouseY]);

    const handleTap = useCallback((id) => {
        if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
        setTappedId(prev => (prev === id ? null : id));
        tapTimeoutRef.current = setTimeout(() => setTappedId(null), 3000);
    }, []);

    useEffect(() => {
        return () => {
            if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
        };
    }, []);

    const activeId = hoveredId || tappedId;
    const activeHotspot = useMemo(() => hotspots.find(s => s.id === activeId), [activeId]);

    // Dynamically calculate the connector line path based on flip state
    const absolutePathD = useTransform([mouseX, mouseY], ([x, y]) => {
        const isLeft = x < 380;
        const isTop = y < 200;
        const horizontalDir = isLeft ? 30 : -30;
        const verticalDir = isTop ? 40 : -90;
        const secondPointX = isLeft ? 35 : -35;
        return `M ${x} ${y} L ${x + horizontalDir} ${y} L ${x + secondPointX} ${y + verticalDir}`;
    });

    const cardLeft = useTransform(mouseX, val => val + (val < 380 ? 35 : -355));
    const cardTop = useTransform(mouseY, val => val + (val < 200 ? 40 : -140));

    // Unified transition for perfect synchronization - Snappier for 'seamless' feel
    const transition = { duration: 0.2, ease: "easeOut" }; 

    return (
        <div
            ref={imageContainerRef}
            className="absolute inset-0 w-full h-full z-10 overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Base Image */}
            <img
                src={homeOldImg}
                alt="Asia Cotton Base"
                className="absolute inset-0 w-full h-full object-cover transform-gpu pointer-events-none"
            />

            {/* Darkening Overlay (Faster than filter) */}
            <motion.div
                animate={{ opacity: activeId ? 0.3 : 0 }}
                transition={transition}
                className="absolute inset-0 bg-black z-[5] pointer-events-none will-change-[opacity]"
            />

            {/* Pre-rendered Hotspot Images (Zero-lag switching) */}
            {hotspots.map((spot) => (
                <motion.img
                    key={`highlight-${spot.id}`}
                    src={spot.image}
                    alt={spot.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeId === spot.id ? 1 : 0 }}
                    transition={transition}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none transform-gpu z-[6] will-change-[opacity]"
                />
            ))}

            {/* Interaction Trigger (SVG) */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-20">
                {hotspots.map((spot) => (
                    <path
                        key={spot.id}
                        d={spot.hoverPath}
                        fill="transparent"
                        className="cursor-none"
                        onMouseEnter={() => !isTouchDevice && setHoveredId(spot.id)}
                        onMouseLeave={() => !isTouchDevice && setHoveredId(null)}
                        onClick={() => handleTap(spot.id)}
                    />
                ))}
            </svg>

            {/* Optimized Tooltip Layer (Pre-rendered for zero lag) */}
            {hotspots.map((spot) => (
                <motion.div
                    key={`tooltip-container-${spot.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === spot.id && !isMobile ? 1 : 0 }}
                    transition={transition}
                    className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
                >
                    {/* Connector Line SVG (Lightweight) */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                        <motion.path
                            d={absolutePathD}
                            fill="none"
                            stroke="#E11D48"
                            strokeWidth="1.5"
                            style={{ opacity: 0.4 }}
                        />
                        <motion.circle cx={mouseX} cy={mouseY} r={3} fill="#E11D48" />
                    </svg>

                    {/* High-Performance Tooltip Card */}
                    <motion.div
                        style={{ 
                            x: cardLeft,
                            y: cardTop,
                            willChange: "transform"
                        }}
                        className="absolute p-6 bg-white/95 backdrop-blur-md border border-black/5 rounded shadow-2xl min-w-[280px]"
                    >
                        <div className="w-8 h-[2px] bg-[#E11D48] mb-3" />
                        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-black mb-2">
                            {hotspotInfo[spot.id]?.label}
                        </p>
                        <p className="text-[14px] font-medium text-black/80 leading-relaxed">
                            {hotspotInfo[spot.id]?.desc}
                        </p>
                    </motion.div>
                </motion.div>
            ))}

            {/* Mobile Tooltip (Optimized for zero-lag) */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: tappedId && isMobile ? 1 : 0, y: tappedId && isMobile ? 0 : 10 }}
                transition={transition}
                className="absolute bottom-[16%] left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5 bg-white/95 backdrop-blur-md border border-black/10 rounded-full px-6 py-2.5 shadow-xl whitespace-nowrap pointer-events-none"
            >
                <span className="text-[9px] font-extrabold tracking-[0.4em] text-[#E11D48] uppercase">
                    {hotspotInfo[tappedId]?.label}
                </span>
                <span className="text-[13px] font-normal text-black/75 tracking-tight">
                    {hotspotInfo[tappedId]?.desc}
                </span>
            </motion.div>
        </div>
    );
};

// ── Typing Animation Helper ──
const AnimatedText = ({ text, shouldStart, delay = 0, colorStyle = {} }) => {
    const characters = text.split("");
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay * i },
        }),
    };

    const childVariants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.span
            style={{ display: "inline-block", ...colorStyle }}
            variants={containerVariants}
            initial="hidden"
            animate={shouldStart ? "visible" : "hidden"}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={childVariants}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

const IntroSequence = () => {
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const containerRef = useRef(null);

    // Track scroll progress over a 200vh area
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Use raw scroll progress to avoid 'shaking' or lag from spring smoothing
    const progress = scrollYProgress;

    const [shouldStartTyping, setShouldStartTyping] = useState(false);

    // Trigger typing reveal when branding reveal phase starts (using direct progress)
    useMotionValueEvent(progress, "change", (latest) => {
        if (latest > 0.05 && !shouldStartTyping) {
            setShouldStartTyping(true);
        }
    });

    // ── Editorial Reveal Logic: Grid/Split Layout + Color Animation ──
    const introOpacity = useTransform(progress, [0, 0.05, 0.12], [1, 1, 0]);
    const brandingOpacity = useTransform(progress, [0.05, 0.12], [0, 1]);
    
    // Adaptive Layout Shift: Slide left only on desktop
    const sketchX = useTransform(progress, [0.05, 0.12], ["0%", isMobile ? "0%" : "-15%"]);
    const sketchScale = useTransform(progress, [0.05, 0.12], [1, isMobile ? 1.05 : 0.85]);
    
    // Smooth branding motion
    const brandingX = useTransform(progress, [0.05, 0.12], [isMobile ? "0%" : "10%", "0%"]);
    
    const highlightColor = useTransform(progress, [0.08, 0.12], ["#000000", "#E11D48"]);

    // Logo Specific Cinematic Transforms
    const logoScale = useTransform(progress, [0.05, 0.12], [0.6, 1]);
    const logoRotate = useTransform(progress, [0.05, 0.12], [isMobile ? 0 : -10, 0]);
    const logoY = useTransform(progress, [0.05, 0.12], [isMobile ? 20 : 50, 0]);
    const dividerHeight = useTransform(progress, [0.07, 0.12], ["0%", "80%"]);

    return (
        <section ref={containerRef} className="relative h-[115vh] w-full bg-white z-[60]">
            {/* Sticky Container - Keeps everything centered while scrolling the travel distance */}
            <div className="sticky top-0 h-screen w-full overflow-hidden z-[60] bg-white flex flex-col items-center justify-center transform-gpu">
                
                {/* Layer 1: Interactive Sketch Image (Slides Left) */}
                <motion.div
                    style={{ 
                        opacity: introOpacity,
                        x: sketchX,
                        scale: sketchScale
                    }}
                    className="absolute inset-0 w-full h-full transform-gpu origin-center"
                >
                    <InteractiveHotspotLayer isMobile={isMobile} />
                </motion.div>

                {/* Layer 2: Editorial Branding Reveal (Adaptive Layout) */}
                <motion.div
                    style={{ 
                        opacity: brandingOpacity,
                        x: brandingX
                    }}
                    className="absolute inset-0 z-[80] w-full h-full pointer-events-none transform-gpu flex items-center justify-center will-change-[transform,opacity]"
                >
                    <div className="grid grid-cols-1 md:grid-cols-[40%_60%] w-full max-w-[1600px] px-6 md:px-12 lg:px-20 h-auto md:h-[50vh] items-center">
                        
                        {/* Left Side: Logo (Adaptive Size) */}
                        <div className="relative flex flex-col items-center md:items-end justify-center h-full md:pr-16 lg:pr-24 mb-12 md:mb-0">
                            {/* Animated Vertical Divider */}
                            <motion.div 
                                style={{ height: dividerHeight }}
                                className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1.5px] bg-black/10 origin-center"
                            />

                            <div className="flex flex-col items-center md:items-end">
                                <motion.div 
                                    style={{ 
                                        scale: logoScale,
                                        rotate: logoRotate,
                                        y: logoY
                                    }}
                                    className="mb-10 md:mb-12"
                                >
                                    <img 
                                        src={logo} 
                                        alt="Asia Cotton" 
                                        className="h-32 sm:h-40 md:h-48 lg:h-56 w-auto drop-shadow-2xl will-change-transform" 
                                    />
                                </motion.div>
                                <motion.h2 
                                    style={{ opacity: brandingOpacity }}
                                    className="text-[16px] sm:text-[18px] md:text-[22px] font-black uppercase text-black font-['Outfit'] tracking-[0.4em] opacity-40"
                                >
                                    ASIA COTTON
                                </motion.h2>
                            </div>
                        </div>

                        {/* Right Side: Editorial Headline (Responsive Scaling) */}
                        <div className="flex flex-col items-center md:items-start justify-center h-full pl-0 md:pl-16 lg:pl-24">
                            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-black leading-[0.9] tracking-tighter text-center md:text-left mt-10 md:mt-0">
                                <AnimatedText text="Crafting" shouldStart={shouldStartTyping} />
                                <br />
                                <AnimatedText 
                                    text="Sustainable" 
                                    shouldStart={shouldStartTyping} 
                                    delay={0.3}
                                    colorStyle={{ color: highlightColor }} 
                                />
                                <br />
                                <AnimatedText 
                                    text="Luxury" 
                                    shouldStart={shouldStartTyping} 
                                    delay={0.6}
                                    colorStyle={{ color: highlightColor }} 
                                />
                                <br />
                                <AnimatedText text="Since 1997" shouldStart={shouldStartTyping} delay={0.9} />
                            </h1>

                            {/* Premium Accent */}
                            <motion.div
                                animate={shouldStartTyping ? { width: "5rem", opacity: 1 } : { width: 0, opacity: 0 }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                                className="h-[4px] bg-[#E11D48] mt-10"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default IntroSequence;
