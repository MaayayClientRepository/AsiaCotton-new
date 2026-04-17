import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer id="main-footer" className="py-24 bg-[#0a0a0a] border-t border-white/5 relative z-10 blueprint-grid-dark">
            <div className="container mx-auto px-8 md:px-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <Link to="/" className="mb-8 md:mb-0 group">
                    <img src={logo} alt="Asia Cotton" className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100 invert brightness-200" />
                </Link>
                <div className="flex space-x-12 mb-8 md:mb-0 text-[11px] font-bold tracking-[0.5em] uppercase text-white/40">
                    <a href="#" className="hover:text-white transition-colors duration-300">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors duration-300">LinkedIn</a>
                    <a href="#" className="hover:text-white transition-colors duration-300">E-Mail</a>
                </div>
                <div className="text-[11px] font-bold tracking-[0.4em] uppercase text-white/20">
                    <span className="font-['Caveat'] text-2xl lowercase opacity-60 mr-4 text-white/40">Handcrafted by</span> &copy; 2026 ASIA COTTON
                </div>
            </div>
        </footer>
    );
};

export default Footer;
