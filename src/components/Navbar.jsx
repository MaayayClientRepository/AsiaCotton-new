import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
    Home,
    User,
    ShoppingBag,
    Award,
    Leaf,
    Mail
} from "lucide-react";

import logo from '../assets/logo.png';

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

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHome]);

    const links = [
        { title: "Home", icon: <Home />, href: "/" },
        { title: "About Us", icon: <User />, href: "/about" },
        { title: "Products", icon: <ShoppingBag />, href: "/products" },
        { title: "Certifications", icon: <Award />, href: "/certifications" },
        { title: "Sustainability", icon: <Leaf />, href: "/sustainability" },
        { title: "Contact", icon: <Mail />, href: "/contact" },
    ];

    return (
        <div className={cn(
            "fixed z-[100] transition-all duration-700 ease-out",
            "top-6 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 md:top-8",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        )}>
            <div className="flex items-center gap-1.5 bg-[#111111] p-1.5 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md">
                {/* Logo Section */}
                <a
                    href="/"
                    className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 bg-white rounded-full transition-transform hover:scale-105 active:scale-95 shrink-0 shadow-sm"
                >
                    <img 
                        src={logo} 
                        alt="Asia Cotton" 
                        className="w-7 h-7 md:w-8 md:h-8 object-contain" 
                    />
                </a>

                {/* Nav Links */}
                <div className="flex items-center gap-1.5 pr-1">
                    {links.map((link, idx) => (
                        <a
                            key={idx}
                            href={link.href}
                            title={link.title}
                            className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-all group active:scale-90 shrink-0"
                        >
                            {React.cloneElement(link.icon, { 
                                className: "w-5 h-5 md:w-[22px] md:h-[22px] text-white/70 group-hover:text-white transition-colors" 
                            })}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
