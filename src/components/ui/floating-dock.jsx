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
                            "absolute flex flex-col gap-3 p-4 rounded-[2rem] bg-white/80 backdrop-blur-2xl border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.15)]",
                            direction === "up" ? "bottom-full mb-4 right-0 w-[75vw] max-w-[320px]" : "top-full mt-4 right-0 w-[75vw] max-w-[320px]"
                        )}
                    >
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: direction === "up" ? 10 : -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{
                                    opacity: 0,
                                    y: direction === "up" ? 10 : -10,
                                    scale: 0.95,
                                    transition: { delay: idx * 0.03 },
                                }}
                                transition={{ delay: (items.length - 1 - idx) * 0.05, duration: 0.4 }}
                            >
                                <Link
                                    to={item.href}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-4 py-3 px-4 rounded-2xl hover:bg-[#6a6664]/5 transition-colors group active:scale-[0.98] transform-gpu"
                                >
                                    <div className="h-6 w-6 flex items-center justify-center text-neutral-600 group-hover:text-black transition-colors">{item.icon}</div>
                                    <span className="text-sm font-bold tracking-widest uppercase text-neutral-500 group-hover:text-black transition-colors">{item.title}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className="h-14 w-14 rounded-full bg-white/90 backdrop-blur-xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-black/5 active:scale-90 transition-all duration-300 transform-gpu"
            >
                <div className="relative w-6 h-6 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: open ? 45 : 0, y: open ? 0 : -2 }}
                        className="absolute w-5 h-0.5 bg-[#6a6664] rounded-full"
                    />
                    <motion.div
                        animate={{ opacity: open ? 0 : 1 }}
                        className="absolute w-5 h-0.5 bg-[#6a6664] rounded-full"
                    />
                    <motion.div
                        animate={{ rotate: open ? -45 : 0, y: open ? 0 : 2 }}
                        className="absolute w-5 h-0.5 bg-[#6a6664] rounded-full"
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
                "mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3",
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
