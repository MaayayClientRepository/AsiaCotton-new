import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer id="main-footer" className="bg-[#0a0a0a] border-t border-white/5 relative z-10 blueprint-grid-dark font-['Outfit']">

            {/* CTA Strip */}
            <div className="border-b border-white/5 py-16 md:py-20">
                <div className="container mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-white/30 mb-2 text-center md:text-left">Ready to order in bulk?</p>
                        <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                            Let's Build Something <span className="text-[#E11D48]">Together.</span>
                        </h3>
                    </div>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-3 bg-[#E11D48] text-white px-10 py-4 rounded-full font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#c01038] active:scale-95 transition-all duration-300 shadow-[0_8px_30px_rgba(225,29,72,0.35)] hover:shadow-[0_12px_40px_rgba(225,29,72,0.5)] hover:-translate-y-0.5 group whitespace-nowrap"
                    >
                        Request a Quote
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="py-10">
                <div className="container mx-auto px-8 md:px-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 md:gap-0">
                    <Link to="/" className="group">
                        <img src={logo} alt="Asia Cotton" className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100 invert brightness-200" />
                    </Link>
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 sm:gap-10 text-[11px] font-bold tracking-[0.5em] uppercase text-white/40">
                        <a href="#" className="hover:text-white transition-colors duration-300">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors duration-300">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-colors duration-300">E-Mail</a>
                    </div>
                    <div className="text-[9px] sm:text-[11px] font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/20 text-center md:text-right">
                        <span className="font-['Caveat'] text-2xl lowercase opacity-60 mr-4 text-white/40">Handcrafted by</span> &copy; 2026 ASIA COTTON. ALL RIGHTS RESERVED.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
