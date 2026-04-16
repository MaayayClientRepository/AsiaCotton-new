"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Navbar = ({ children, className }) => {
    return (
        <nav className={cn("sticky top-0 inset-x-0 z-50 w-full px-4 md:px-6 py-4", className)}>
            <div className="mx-auto max-w-7xl backdrop-blur-md bg-white/70 dark:bg-[#6a6664]/70 border border-black/5 dark:border-white/5 rounded-2xl shadow-sm px-4 py-2">
                {children}
            </div>
        </nav>
    );
};

export const NavBody = ({ children, className }) => {
    return (
        <div className={cn("hidden lg:flex items-center justify-between w-full h-full", className)}>
            {children}
        </div>
    );
};

export const NavItems = ({ items, className }) => {
    return (
        <div className={cn("flex items-center gap-8", className)}>
            {items.map((item, idx) => (
                <Link
                    key={idx}
                    to={item.link}
                    className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
                >
                    {item.name}
                </Link>
            ))}
        </div>
    );
};

export const NavbarLogo = ({ className, children }) => {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            {children || <span className="text-xl font-bold">Logo</span>}
        </div>
    );
};

export const NavbarButton = ({ children, className, variant = "primary", onClick }) => {
    const variants = {
        primary: "bg-[#6a6664] text-white dark:bg-white dark:text-black shadow-md hover:opacity-90",
        secondary: "bg-transparent text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800",
    };
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                variants[variant],
                className
            )}
        >
            {children}
        </button>
    );
};

export const MobileNav = ({ children, className }) => {
    return (
        <div className={cn("lg:hidden flex flex-col w-full", className)}>
            {children}
        </div>
    );
};

export const MobileNavHeader = ({ children, className }) => {
    return (
        <div className={cn("flex items-center justify-between w-full", className)}>
            {children}
        </div>
    );
};

export const MobileNavToggle = ({ isOpen, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={cn("p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors", className)}
        >
            {/* Dynamic icon import handling, assuming Lucide is used */}
            <div className="relative w-6 h-6 flex flex-col justify-center items-center overflow-hidden">
                <motion.div
                    animate={isOpen ? "open" : "closed"}
                    className="w-full h-full flex flex-col justify-center gap-1.5"
                >
                    <motion.span
                        variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 8 } }}
                        className="w-full h-0.5 bg-current block origin-center transition-transform"
                    />
                    <motion.span
                        variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                        className="w-full h-0.5 bg-current block"
                    />
                    <motion.span
                        variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -8 } }}
                        className="w-full h-0.5 bg-current block origin-center transition-transform"
                    />
                </motion.div>
            </div>
        </button>
    );
};

export const MobileNavMenu = ({ isOpen, onClose, children, className }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={cn("overflow-hidden w-full", className)}
                >
                    <div className="flex flex-col gap-4 py-4 border-t border-neutral-200 dark:border-neutral-800 mt-2">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
