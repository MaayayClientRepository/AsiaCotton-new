"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export const AnimatedTestimonials = ({
    testimonials,
    autoplay = false
}) => {
    const [active, setActive] = useState(0);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const isActive = (index) => {
        return index === active;
    };

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay]);

    return (
        <div className="max-w-sm md:max-w-md mx-auto antialiased font-sans px-4 py-10">
            <div className="relative aspect-square w-full">
                <AnimatePresence>
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.src}
                            initial={{
                                opacity: 0,
                                scale: 0.9,
                                x: 20
                            }}
                            animate={{
                                opacity: isActive(index) ? 1 : 0.4,
                                scale: isActive(index) ? 1 : 0.9,
                                zIndex: isActive(index)
                                    ? 99
                                    : testimonials.length + 2 - index,
                                x: isActive(index) ? 0 : -20,
                                y: isActive(index) ? 0 : 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.95,
                                x: -20
                            }}
                            transition={{
                                duration: 0.4,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <img
                                src={testimonial.src}
                                alt={testimonial.name}
                                draggable={false}
                                className="h-full w-full rounded-3xl object-cover object-center shadow-2xl aspect-square"
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Navigation Buttons Overlay */}
                <div className="absolute bottom-4 right-4 flex gap-2 z-[100]">
                    <button
                        onClick={handlePrev}
                        className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors backdrop-blur-sm"
                    >
                        <IconArrowLeft className="h-5 w-5 text-white" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors backdrop-blur-sm"
                    >
                        <IconArrowRight className="h-5 w-5 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};
