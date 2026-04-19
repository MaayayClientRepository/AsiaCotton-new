import React, { useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
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
    centerPillow: { label: 'PILLOW',   desc: 'Breathable pillow for deep, restful sleep.' },
    centerBedsheet: { label: 'BEDDING', desc: 'High thread-count bedding, made to last.' },
    leftBed:       { label: 'BEDDING', desc: 'High thread-count bedding, made to last.' },
    leftPillow:    { label: 'PILLOW',   desc: 'Breathable pillow for deep, restful sleep.' },
    sofaSheet:     { label: 'THROW',   desc: 'Throw that stays soft after every wash.' },
    sofaPillow:    { label: 'CUSHION', desc: "Cushion you'll actually want to touch." },
    windowCloth:   { label: 'CURTAINS', desc: 'Curtain that filters light, holds its shape.' },
    bedMat:        { label: 'RUG',     desc: 'Dense woven rug, easy to clean.' },
    upperSheet:    { label: 'BEDDING', desc: 'High thread-count bedding, made to last.' },
};

const hotspots = [
    { id: 'centerPillow', image: centerPillowImg, hoverPath: 'M44,44 L71,44 L71,55 L44,55 Z' },
    { id: 'centerBedsheet', image: centerBedsheetImg, hoverPath: 'M29,73 L29,70 L34,60 L40,60 L45,52 L50,53 L56,54 L61,54 L66,55 L71,56 L77,63 L77,68 L77,68 L71,85 L66,78 L61,76 L56,75 L50,75 L45,74 L40,73 L34,73 L29,78 Z' },
    { id: 'leftBed', image: leftBedImg, hoverPath: 'M10,51 L38,51 L38,71 L10,71 Z' },
    { id: 'leftPillow', image: leftPillowImg, hoverPath: 'M25,49 L34,49 L34,55 L25,55 Z' },
    { id: 'sofaSheet', image: sofaSheetImg, hoverPath: 'M77,76 L88,76 L88,92 L77,92 Z' },
    { id: 'sofaPillow', image: sofaPillowImg, hoverPath: 'M83,64 L97,64 L97,85 L83,85 Z' },
    { id: 'windowCloth', image: windowClothImg, hoverPath: 'M0,0 L100,0 L100,40 L0,40 Z' },
    { id: 'bedMat', image: bedMatImg, hoverPath: 'M8,68 L82,68 L82,99 L8,99 Z' },
    { id: 'upperSheet', image: upperSheetImg, hoverPath: 'M35,59 L35,59 L40,57 L44,55 L49,55 L53,55 L58,55 L62,56 L67,56 L72,58 L76,64 L76,72 L76,73 L72,68 L67,62 L62,61 L58,61 L53,60 L49,60 L44,60 L40,60 L35,60 Z' }
];

const IntroSequence = () => {

    const [hoveredId, setHoveredId] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });   // px relative to image container
    const imageContainerRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        if (!imageContainerRef.current) return;
        const rect = imageContainerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);
    const containerRef = useRef(null);

    // Track scroll progress over a 400vh area
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Ultra-luxurious smoothing for the scroll value
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 40,
        mass: 0.5,
        restDelta: 0.0001
    });

    const [shouldStartTyping, setShouldStartTyping] = useState(false);
    const hasPausedRef = useRef(false);

    // Trigger typing and a temporary scroll lock when we reach the reveal phase
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        if (latest > 0.4 && !shouldStartTyping) {
            setShouldStartTyping(true);

            // Pause scroll for 1s once to let the typing effect breathe and complete
            if (!hasPausedRef.current) {
                hasPausedRef.current = true;
                document.body.style.overflow = 'hidden';
                setTimeout(() => {
                    document.body.style.overflow = 'unset';
                }, 1000);
            }
        }
    });

    // Phase 1 & 2: Intro Fades Out as Light Wash Fades In (15% -> 40%)
    const introOpacity = useTransform(smoothProgress, [0, 0.15, 0.35], [1, 1, 0]);
    const introScale = useTransform(smoothProgress, [0.15, 0.4], [1, 0.98]);

    // Light Wash Layer Phase (0 -> 1 -> 0 over the 15% -> 100% range)
    const lightOpacity = useTransform(smoothProgress, [0.15, 0.35, 0.6, 1], [0, 1, 1, 0]);

    // Phase 3: Home Reveal Content Phase (40% -> 75%)
    const homeRevealOpacity = useTransform(smoothProgress, [0.4, 0.7], [0, 1]);
    const homeRevealY = useTransform(smoothProgress, [0.4, 0.7], [30, 0]);
    const homeRevealBlur = useTransform(smoothProgress, [0.4, 0.7], ["4px", "0px"]);

    // Final visibility of the entire sticky container
    const sectionOpacity = useTransform(smoothProgress, [0.95, 1], [1, 1]);

    return (
        <section ref={containerRef} className="relative h-[200vh] w-full bg-white z-[60]">
            <motion.div
                style={{ opacity: sectionOpacity }}
                className="sticky top-0 h-screen w-full overflow-hidden bg-white flex items-center justify-center transform-gpu"
            >
                {/* 1. Intro Content Layer */}
                <motion.div
                    style={{
                        opacity: introOpacity,
                        scale: introScale,
                        willChange: "transform, opacity"
                    }}
                    className="absolute inset-0 w-full h-full transform-gpu"
                >
                    <motion.div
                        key="base"
                        ref={imageContainerRef}
                        initial={{ opacity: 1 }}
                        className="absolute inset-0 w-full h-full z-10"
                        onMouseMove={handleMouseMove}
                    >
                        {/* Base Image */}
                        <img
                            src={homeOldImg}
                            alt="Asia Cotton Base"
                            className="absolute inset-0 w-full h-full object-cover transform-gpu"
                        />

                        {/* Interactive Hotspot Layers */}
                        {hotspots.map((spot) => (
                            <img
                                key={spot.id}
                                src={spot.image}
                                alt={spot.id}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[0.8s] ease-in-out pointer-events-none transform-gpu ${
                                    hoveredId === spot.id ? 'opacity-100' : 'opacity-0'
                                }`}
                            />
                        ))}

                        {/* Interaction Trigger (SVG) */}
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-10">
                            {hotspots.map((spot) => (
                                <path
                                    key={spot.id}
                                    d={spot.hoverPath}
                                    fill="transparent"
                                    className="cursor-none"
                                    onMouseEnter={() => setHoveredId(spot.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                />
                            ))}
                        </svg>

                        {/* ── Mouse-following callout tooltip ── */}
                        {hoveredId && (() => {
                            const cardW = 320;
                            const cardH = 100;
                            
                            // Move card to the LEFT of the cursor to avoid right-edge cutoff
                            const OFFSET_X = -355; // -(cardW + margin)
                            const OFFSET_Y = -140;

                            const cardX = mousePos.x + OFFSET_X;
                            const cardY = mousePos.y + OFFSET_Y;

                            // Elbow connector: go LEFT from cursor dot, then up to card's right edge
                            const dotR = 4.5;
                            // Line: cursor dot → left elbow → card right-center
                            const elbowX = mousePos.x - 30;
                            const elbowY = mousePos.y;
                            const cardAnchorX = cardX + cardW;
                            const cardAnchorY = cardY + cardH / 2;

                            const pathD = `M ${mousePos.x} ${mousePos.y} L ${elbowX} ${elbowY} L ${cardAnchorX} ${cardAnchorY}`;

                            return (
                                <svg
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        width: '100%',
                                        height: '100%',
                                        pointerEvents: 'none',
                                        zIndex: 30,
                                        overflow: 'visible',
                                    }}
                                >
                                    {/* Connector line */}
                                    <path
                                        d={pathD}
                                        fill="none"
                                        stroke="#000"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ opacity: 0.45 }}
                                    />

                                    {/* Cursor dot / pin */}
                                    <circle
                                        cx={mousePos.x}
                                        cy={mousePos.y}
                                        r={dotR}
                                        fill="#E11D48"
                                    />
                                    <circle
                                        cx={mousePos.x}
                                        cy={mousePos.y}
                                        r={dotR + 3}
                                        fill="none"
                                        stroke="#E11D48"
                                        strokeWidth="1"
                                        style={{ opacity: 0.25 }}
                                    />

                                    {/* Floating text card as foreignObject */}
                                    <foreignObject
                                        x={cardX}
                                        y={cardY}
                                        width={cardW}
                                        height={cardH + 40}
                                        style={{ overflow: 'visible' }}
                                    >
                                        <div
                                            xmlns="http://www.w3.org/1999/xhtml"
                                            style={{
                                                fontFamily: "'Outfit', sans-serif",
                                                background: 'rgba(255,255,255,0.96)',
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(0,0,0,0.1)',
                                                padding: '24px 28px',
                                                borderRadius: '4px',
                                                display: 'inline-block',
                                                minWidth: '240px',
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                                            }}
                                        >
                                            {/* Red accent bar */}
                                            <div style={{
                                                width: '32px',
                                                height: '2px',
                                                background: '#E11D48',
                                                marginBottom: '12px',
                                            }} />
                                            <p style={{
                                                fontSize: '11px',
                                                fontWeight: 800,
                                                letterSpacing: '0.42em',
                                                color: '#000',
                                                textTransform: 'uppercase',
                                                marginBottom: '8px',
                                                lineHeight: 1,
                                            }}>
                                                {hotspotInfo[hoveredId]?.label}
                                            </p>
                                            <p style={{
                                                fontSize: '15px',
                                                fontWeight: 400,
                                                letterSpacing: '0.01em',
                                                color: '#000',
                                                lineHeight: 1.5,
                                                opacity: 0.85,
                                                maxWidth: '260px',
                                            }}>
                                                {hotspotInfo[hoveredId]?.desc}
                                            </p>
                                        </div>
                                    </foreignObject>
                                </svg>
                            );
                        })()}
                    </motion.div>


                </motion.div>

                {/* 2. Light Wash Overlay */}
                <motion.div
                    style={{
                        opacity: lightOpacity,
                        willChange: "opacity"
                    }}
                    className="absolute inset-0 w-full h-full bg-white z-[70] pointer-events-none shadow-[inset_0_0_100px_rgba(255,255,255,1)] transform-gpu"
                />

                {/* 3. Home Reveal (Emerging Content) */}
                <motion.div
                    style={{
                        opacity: homeRevealOpacity,
                        y: homeRevealY,
                        filter: homeRevealBlur,
                        willChange: "transform, opacity, filter"
                    }}
                    className="absolute z-[80] text-center max-w-5xl px-8 pointer-events-none transform-gpu"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={shouldStartTyping ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="flex flex-col items-center mb-10"
                    >
                        <img src={logo} alt="Asia Cotton" className="h-16 md:h-24 w-auto mb-6" />
                        <h2 className="text-[16px] md:text-[20px] font-black tracking-[0.6em] uppercase text-black font-['Outfit']">
                            ASIA COTTON
                        </h2>
                        <div className="h-[2px] w-16 bg-[#E11D48] mt-4 mb-6"></div>
                        <p className="text-[10px] font-black tracking-[0.5em] uppercase text-black/40">
                            Est. 1997
                        </p>
                    </motion.div>
                    <TextType
                        text="Crafting Sustainable Luxury Since 1997"
                        as="h1"
                        typingSpeed={60}
                        loop={false}
                        startWhen={shouldStartTyping}
                        initialDelay={300}
                        showCursor={true}
                        cursorCharacter="_"
                        cursorClassName="text-[#E11D48] font-bold"
                        className="text-3xl md:text-5xl lg:text-8xl font-black text-black leading-tight selection:bg-[#E11D48]/20"
                    />
                </motion.div>

                {/* Subtle Progress Bar */}
                <div className="absolute left-10 top-1/2 -translate-y-1/2 h-32 w-[1px] bg-neutral-100 z-[90] transform-gpu hidden md:block">
                    <motion.div
                        style={{ height: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
                        className="w-full bg-[#E11D48] origin-top transform-gpu"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default IntroSequence;
