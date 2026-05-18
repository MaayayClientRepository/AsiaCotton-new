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
    return (
        <div className={cn("relative block md:hidden", className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className={cn(
                            "absolute flex flex-col gap-3 p-5 rounded-[2.5rem] bg-[#0A1622]/95 backdrop-blur-2xl border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.5),0_0_30px_rgba(59,103,144,0.25)]",
                            direction === "up" ? "bottom-full mb-5 right-0 w-[85vw] max-w-[340px]" : "top-full mt-5 right-0 w-[85vw] max-w-[340px]"
                        )}
                    >
                        {items.map((item, idx) => {
                            const isBrandItem = item.title === "Asia Cotton";
                            if (isBrandItem) {
                                return (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: direction === "up" ? 10 : -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: direction === "up" ? 10 : -10 }}
                                        className="mb-2 pb-3 border-b border-white/10"
                                    >
                                        <Link
                                            to={item.href}
                                            onClick={() => setOpen(false)}
                                            className="flex items-center gap-3 px-2 py-1 group"
                                        >
                                            <div className="h-10 w-10 flex items-center justify-center p-1 rounded-full bg-white/10 border border-white/20 group-hover:scale-105 group-hover:border-[#3B6790]/50 transition-all duration-300 [&_img]:object-contain">
                                                {item.icon}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black tracking-widest text-white uppercase bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text">
                                                    ASIA COTTON
                                                </span>
                                                <span className="text-[9px] font-medium tracking-[0.2em] text-[#3B6790]/80 uppercase">
                                                    Premium Quality
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            }

                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: direction === "up" ? 10 : -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{
                                        opacity: 0,
                                        y: direction === "up" ? 10 : -10,
                                        scale: 0.95,
                                        transition: { delay: idx * 0.02 },
                                    }}
                                    transition={{ delay: (items.length - 1 - idx) * 0.04, duration: 0.3 }}
                                >
                                    <Link
                                        to={item.href}
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-4 py-3.5 px-4 rounded-2xl hover:bg-white/5 transition-all duration-300 group active:scale-[0.98] border border-transparent hover:border-white/5 transform-gpu"
                                    >
                                        <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/5 text-white/70 group-hover:text-white group-hover:bg-[#3B6790] group-hover:shadow-[0_0_15px_rgba(59,103,144,0.5)] transition-all duration-300 [&_svg]:!text-white/80 group-hover:[&_svg]:!text-white group-hover:[&_svg]:scale-110">
                                            <div className="h-5 w-5 flex items-center justify-center">{item.icon}</div>
                                        </div>
                                        <span className="text-sm font-black tracking-widest uppercase text-white/70 group-hover:text-white transition-all duration-300">
                                            {item.title}
                                        </span>
                                        <span className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-white/50 text-xs transition-all duration-300">
                                            →
                                        </span>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
            
            <button
                onClick={() => setOpen(!open)}
                className="h-14 px-5 rounded-full bg-gradient-to-r from-[#3B6790] to-[#1D354E] text-white flex items-center gap-3 shadow-[0_12px_28px_rgba(59,103,144,0.4)] border border-white/20 active:scale-95 transition-all duration-300 transform-gpu cursor-pointer relative overflow-hidden group"
            >
                {/* Breathing glow animation (only when closed) */}
                {!open && (
                    <motion.div
                        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="absolute -inset-1 rounded-full bg-[#3B6790]/40 blur-md pointer-events-none"
                    />
                )}
                
                

                <div className="relative w-5 h-5 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: open ? 45 : 0, y: open ? 0 : -3 }}
                        className="absolute w-5 h-0.5 bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                    <motion.div
                        animate={{ opacity: open ? 0 : 1 }}
                        className="absolute w-5 h-0.5 bg-white rounded-full"
                        transition={{ duration: 0.15 }}
                    />
                    <motion.div
                        animate={{ rotate: open ? -45 : 0, y: open ? 0 : 3 }}
                        className="absolute w-5 h-0.5 bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
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
