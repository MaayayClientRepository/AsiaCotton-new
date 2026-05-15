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
    { id: 'windowCloth', image: windowClothImg, hoverPath: 'M37,4 L47,4 L47,85 L36,85 L36,65 L38,42 L37,20 L37,4 Z M68,4 L82,4 L82,20 L81,42 L82,65 L83,85 L68,85 L68,4 Z' },
    { id: 'centerPillow', image: centerPillowImg, hoverPath: 'M48,45 L67,45 L67,54 L48,54 Z' },
    { id: 'centerBedsheet', image: centerBedsheetImg, hoverPath: 'M30,68 L32,60 L45,52 L56,54 L70,55 L77,63 L75,75 L65,75 L50,75 L35,78 Z' },
    { id: 'leftBed', image: leftBedImg, hoverPath: 'M11,54 L35,54 L35,68 L11,68 Z' },
    { id: 'leftPillow', image: leftPillowImg, hoverPath: 'M26,51 L33,51 L33,55 L26,55 Z' },
    { id: 'sofaSheet', image: sofaSheetImg, hoverPath: 'M78,78 L95,78 L95,95 L78,95 Z' },
    { id: 'sofaPillow', image: sofaPillowImg, hoverPath: 'M85,67 L94,67 L96,75 L94,80 L84,80 L83,75 Z' },
    { id: 'bedMat', image: bedMatImg, hoverPath: 'M25,75 L75,75 L95,100 L5,100 Z' },
    { id: 'upperSheet', image: upperSheetImg, hoverPath: 'M38,58 L50,56 L62,56 L74,58 L74,68 L62,62 L50,61 L38,61 Z' }
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
                    animate={{ opacity: (activeId === spot.id || hoveredId === spot.id) ? 1 : 0 }}
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
    const introOpacity = useTransform(progress, [0, 0.01, 0.03], [1, 1, 0]);
    const brandingOpacity = useTransform(progress, [0, 0.01], [0, 1]); // Logo always visible
    const sketchX = useTransform(progress, [0.01, 0.04], ["0%", isMobile ? "0%" : "-15%"]);
    const sketchScale = useTransform(progress, [0.01, 0.04], [1, isMobile ? 1.05 : 0.85]);

    // Smooth branding motion
    const brandingX = useTransform(progress, [0, 0.01, 0.04], [isMobile ? "0%" : "-10%", isMobile ? "0%" : "-10%", "0%"]);

    const highlightColor = useTransform(progress, [0.08, 0.12], ["#000000", "#E11D48"]);

    // Tutorial Hint Visibility
    const tutorialOpacity = useTransform(progress, [0, 0.01, 0.04, 0.05], [0, 1, 1, 0]);

    // Logo Specific Cinematic Transforms (In-Place Reveal)
    const logoScale = useTransform(progress, [0, 0.01, 0.04], [0.25, 0.25, 1]);
    const logoRotate = useTransform(progress, [0.01, 0.04], [isMobile ? 0 : -10, 0]);
    const logoY = useTransform(progress, [0, 0.01, 0.04], [isMobile ? 20 : 50, isMobile ? 20 : 50, 0]);
    const logoX = useTransform(progress, [0, 0.01, 0.04], ["0px", "0px", "0px"]);
    const dividerHeight = useTransform(progress, [0.01, 0.04], ["0%", "80%"]);

    return (
        <section ref={containerRef} className="relative h-[105vh] md:h-[115vh] w-full bg-white z-[60]">
            {/* Sticky Container - Keeps everything centered while scrolling the travel distance */}
            <div className="sticky top-0 h-screen w-full overflow-hidden z-[60] bg-white flex flex-col items-center justify-center transform-gpu">

                {/* Corner Branding: Vertical Layout (Aligned below Certifications icon) - Hidden on Mobile */}
                <motion.div
                    style={{ opacity: introOpacity }}
                    className="hidden md:flex absolute top-18 md:top-22 left-12 md:left-24 z-[95] flex-col items-center pointer-events-none"
                >
                    <img
                        src={logo}
                        alt="Asia Cotton"
                        className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain"
                    />
                </motion.div>

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
                    <div className="grid grid-cols-1 md:grid-cols-[42%_58%] xl:grid-cols-[48%_52%] w-full max-w-[1800px] xl:max-w-[2200px] px-6 md:px-12 lg:px-24 h-auto md:h-screen items-center">

                        {/* Left Side: Logo (Adaptive Size) */}
                        <div className="relative flex flex-col items-center justify-center h-full md:pr-12 lg:pr-16 mb-12 md:mb-0">
                            {/* Animated Vertical Divider */}
                            <motion.div
                                style={{ height: dividerHeight }}
                                className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1.5px] bg-black/10 origin-center"
                            />

                            <div className="flex flex-col items-center">
                                <motion.div
                                    style={{
                                        scale: logoScale,
                                        rotate: logoRotate,
                                        y: logoY,
                                        x: logoX
                                    }}
                                    className="flex flex-col items-center"
                                >
                                    <img
                                        src={logo}
                                        alt="Asia Cotton"
                                        className="h-64 md:h-[50vh] lg:h-[65vh] xl:h-[75vh] 2xl:h-[80vh] w-auto drop-shadow-2xl will-change-transform object-contain"
                                    />

                                </motion.div>

                            </div>
                        </div>

                        {/* Right Side: Editorial Headline (Responsive Scaling) */}
                        <div className="flex flex-col items-center md:items-start justify-center h-full pl-0 md:pl-12 lg:pl-20">
                            <motion.h1
                                style={{ opacity: useTransform(progress, [0.01, 0.04], [0, 1]) }}
                                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-black leading-[0.9] tracking-tighter text-center md:text-left mt-6 md:mt-0"
                            >
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
                            </motion.h1>

                            {/* Premium Accent */}
                            <motion.div
                                animate={shouldStartTyping ? { width: "5rem", opacity: 1 } : { width: 0, opacity: 0 }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                                className="h-[4px] bg-[#E11D48] mt-4 md:mt-10"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Tutorial Hint: Hover/Touch to Explore */}
                <motion.div
                    style={{ opacity: tutorialOpacity }}
                    className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 z-[90] flex flex-col items-center gap-3 pointer-events-none"
                >
                    <p className="text-black/40 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] font-['Outfit']">
                        {isMobile ? "Touch to Explore" : "Hover to Explore"}
                    </p>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[1px] h-8 bg-black/20"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default IntroSequence;