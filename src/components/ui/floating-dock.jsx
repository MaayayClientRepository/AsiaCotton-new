import { cn } from "@/lib/utils";
import { PanelBottomClose } from "lucide-react";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";

export const FloatingDock = ({
    items,
    desktopClassName,
    mobileClassName,
    mobileDirection = "down"
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} />
            <FloatingDockMobile
                items={items}
                className={mobileClassName}
                direction={mobileDirection}
            />
        </>
    );
};

const FloatingDockMobile = ({
    items,
    className,
    direction = "up"
}) => {
    const [open, setOpen] = useState(false);

    const brandItem = items.find(item => item.title === "Asia Cotton");
    const menuItems = items.filter(item => item.title !== "Asia Cotton");

    const captions = {
        "Home": "where premium quality meets comfort",
        "About Us": "our rich textile legacy and heritage",
        "Products": "explore our exceptional fabrics & yarns",
        "Certifications": "certified sustainable standards globally",
        "Sustainability": "eco-friendly and circular production",
        "Contact": "collaborate with our global network"
    };

    const containerVariants = {
        open: {
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.15
            }
        },
        closed: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, x: -35, scale: 0.95 },
        open: { 
            opacity: 1, 
            x: 0, 
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <div className={cn("relative block md:hidden", className)}>
            {typeof document !== "undefined" && createPortal(
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed inset-0 w-screen h-[100dvh] bg-[#0A0103]/98 backdrop-blur-3xl z-[9999] p-8 flex flex-col justify-between pointer-events-auto overflow-y-auto"
                        >
                            {/* Ruby & Rose Animated Ambient Light Rings */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
                                <motion.div 
                                    animate={{ 
                                        x: [0, 80, -40, 0], 
                                        y: [0, -60, 100, 0],
                                        scale: [1, 1.15, 0.95, 1]
                                    }}
                                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                                    className="absolute top-[-10%] left-[-15%] w-[80vw] h-[80vw] rounded-full bg-[#E11D48]/15 blur-[120px]"
                                />
                                <motion.div 
                                    animate={{ 
                                        x: [0, -100, 60, 0], 
                                        y: [0, 80, -50, 0],
                                        scale: [1, 0.9, 1.1, 1]
                                    }}
                                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                    className="absolute bottom-[-10%] right-[-15%] w-[80vw] h-[80vw] rounded-full bg-[#881337]/25 blur-[120px]"
                                />
                            </div>

                            {/* Top Bar / Header */}
                            <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-6">
                                {brandItem && (
                                    <Link 
                                        to={brandItem.href} 
                                        onClick={() => setOpen(false)} 
                                        className="flex items-center gap-3 active:scale-98 transition-transform duration-300"
                                    >
                                        <div className="h-10 w-10 p-1 rounded-full bg-white/10 border border-white/20 [&_img]:object-contain">
                                            {brandItem.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black tracking-widest text-white uppercase bg-gradient-to-r from-white to-white/70 bg-clip-text">
                                                ASIA COTTON
                                            </span>
                                            <span className="text-[8px] font-medium tracking-[0.2em] text-[#E11D48] uppercase">
                                                Premium Quality
                                            </span>
                                        </div>
                                    </Link>
                                )}
                                
                                <button 
                                    onClick={() => setOpen(false)}
                                    className="h-11 w-11 rounded-full border border-white/10 flex items-center justify-center text-white/80 hover:text-[#E11D48] hover:bg-[#E11D48]/10 hover:border-[#E11D48]/30 active:scale-90 transition-all duration-300 cursor-pointer"
                                >
                                    <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>

                            {/* Main Menu Links (Staggered Entrance) */}
                            <motion.nav 
                                variants={containerVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                className="relative z-10 my-auto flex flex-col gap-3 py-6"
                            >
                                {menuItems.map((item, idx) => {
                                    const serial = String(idx + 1).padStart(2, "0");
                                    const caption = captions[item.title] || "premium textile solutions";

                                    return (
                                        <motion.div
                                            key={item.title}
                                            variants={itemVariants}
                                            className="w-full"
                                        >
                                            <Link
                                                to={item.href}
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-5 py-3.5 px-4 rounded-3xl transition-all duration-300 group active:scale-[0.97] border border-transparent hover:border-[#E11D48]/20 hover:bg-white/5 transform-gpu relative overflow-hidden"
                                            >
                                                <span className="absolute inset-0 bg-gradient-to-r from-[#E11D48]/10 to-[#881337]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                                
                                                <span className="text-lg font-serif italic text-[#E11D48] group-hover:text-white transition-colors duration-300 select-none">
                                                    {serial}
                                                </span>

                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-lg font-black tracking-widest uppercase text-white/80 group-hover:text-[#FF4E7E] group-hover:translate-x-1.5 transition-all duration-300">
                                                        {item.title}
                                                    </span>
                                                    <span className="text-[9px] font-medium tracking-wider text-neutral-400 group-hover:text-[#FF8DAF] transition-colors duration-300 select-none">
                                                        {caption}
                                                    </span>
                                                </div>

                                                <div className="ml-auto opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                    <svg className="w-4 h-4 stroke-[#E11D48] group-hover:stroke-[#FF4E7E]" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </motion.nav>

                            {/* Footer Info */}
                            <div className="relative z-10 border-t border-white/5 pt-6 flex flex-col gap-3">
                                <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-[#E11D48] uppercase select-none">
                                    <span>SINCE 1997</span>
                                    <span>ASIA COTTON INC.</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px] text-neutral-400 font-medium">
                                    <a href="mailto:sales@asiacotton.com" className="hover:text-[#E11D48] transition-colors">sales@asiacotton.com</a>
                                    <div className="flex gap-3 text-neutral-500">
                                        <span className="hover:text-[#E11D48] transition-colors cursor-pointer">IG</span>
                                        <span>·</span>
                                        <span className="hover:text-[#E11D48] transition-colors cursor-pointer">LN</span>
                                    </div>
                                </div> 
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
            
            <button
                onClick={() => setOpen(!open)}
                className="h-14 w-14 rounded-full bg-gradient-to-r from-[#E11D48] to-[#9F1239] text-white flex items-center justify-center shadow-[0_12px_30px_rgba(225,29,72,0.4)] border border-white/20 active:scale-95 transition-all duration-300 transform-gpu cursor-pointer relative overflow-hidden group"
            >
                {!open && (
                    <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="absolute -inset-1 rounded-full bg-[#E11D48]/35 blur-md pointer-events-none"
                    />
                )}

                <div className="relative w-5 h-4 flex flex-col justify-between items-center z-10">
                    <span className="w-5 h-[2px] bg-white rounded-full transition-transform duration-300" />
                    <span className="w-4 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-5" />
                    <span className="w-5 h-[2px] bg-white rounded-full transition-transform duration-300" />
                </div>
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({
    items,
    className,
}) => {
    let mouseX = useMotionValue(Infinity);
    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                "hidden md:flex h-16 gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3",
                className
            )}
        >
            {items.map((item) => (
                <IconContainer mouseX={mouseX} key={item.title} {...item} />
            ))}
        </motion.div>
    );
};

function IconContainer({
    mouseX,
    title,
    icon,
    href,
    className,
}) {
    let ref = useRef(null);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return val - bounds.x - bounds.width / 2;
    });

    let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

    let width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const [hovered, setHovered] = useState(false);

    return (
        <Link to={href}>
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={cn("aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative", className)}
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: -2, x: "-50%" }}
                            className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 top-full mt-2 w-fit text-xs"
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    style={{ width: widthIcon, height: heightIcon }}
                    className="flex items-center justify-center p-2"
                >
                    {icon}
                </motion.div>
            </motion.div>
        </Link>
    );
}

const widthIcon = "100%";
const heightIcon = "100%";
