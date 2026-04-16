import React, { useState, useEffect } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { cn } from "@/lib/utils";
import {
    Home,
    User,
    ShoppingBag,
    Award,
    Leaf,
    Mail
} from "lucide-react";

import logo from '../assets/logo-white.png';

const Navbar = ({ isHome }) => {
    const [isVisible, setIsVisible] = useState(!isHome);

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.getElementById('main-footer');
            if (footer) {
                const rect = footer.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    setIsVisible(false);
                    return;
                }
            }
            setIsVisible(true);
        };

        // Initial check
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHome]);

    const links = [
        {
            title: "Asia Cotton",
            icon: (
                <img
                    src={logo}
                    className="h-full w-full object-contain rounded-full"
                    alt="Asia Cotton"
                />
            ),
            href: "/",
            className: "bg-white dark:bg-white",
        },
        {
            title: "Home",
            icon: (
                <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/",
        },
        {
            title: "About Us",
            icon: (
                <User className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/about",
        },
        {
            title: "Products",
            icon: (
                <ShoppingBag className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/products",
        },
        {
            title: "Certifications",
            icon: (
                <Award className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/certifications",
        },
        {
            title: "Sustainability",
            icon: (
                <Leaf className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/sustainability",
        },
        {
            title: "Contact",
            icon: (
                <Mail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/contact",
        },
    ];

    return (
        <div className={cn(
            "fixed z-50 pointer-events-none transition-all duration-500 ease-in-out",
            "bottom-6 right-6 md:bottom-auto md:right-auto md:top-8 md:left-8",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 md:translate-y-0 md:-translate-x-4"
        )}>
            <div className="pointer-events-auto">
                <FloatingDock
                    items={links}
                    mobileDirection="up"
                />
            </div>
        </div>
    );
};

export default Navbar;
