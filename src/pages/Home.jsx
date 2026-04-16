import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import IntroSequence from '../components/IntroSequence';
import CountUp from '../components/CountUp';
import { TextGenerateEffect } from '../components/TextGenerateEffect';
import ScrollReveal from '../components/ScrollReveal';
import BackgroundGrid from '../components/BackgroundGrid';
import { ArrowRight, History, Factory, Globe, Leaf, ShieldCheck } from 'lucide-react';
import Folder from '../components/Folder';
import GlassIcons from '../components/GlassIcons';

import cottonBg from '../assets/factory/cotton-bg.png';

const Home = () => {
    const [storyTextDone, setStoryTextDone] = React.useState(false);
    const [factoryTextDone, setFactoryTextDone] = React.useState(false);

    const handleStoryComplete = React.useCallback(() => setStoryTextDone(true), []);
    const handleFactoryComplete = React.useCallback(() => setFactoryTextDone(true), []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFBF2] font-['Outfit'] selection:bg-[#2B6B6D] selection:text-white">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@200..900&display=swap');
                
                .serif-title {
                    font-family: 'Crimson Pro', serif;
                }
            `}</style>

            <main>
                {/* 1. Intro Sequence */}
                <IntroSequence />

                {/* 2. Unified Story & Factory Section */}
                <section className="pt-8 pb-16 md:pt-12 md:pb-32 px-6 md:px-12 lg:px-24 bg-white overflow-hidden transform-gpu relative">
                    <BackgroundGrid color="#2D6A6A" opacity={0.05} />
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative z-10">
                        {/* Left Side: Our Story */}
                        <motion.div
                            initial={{ opacity: 0, x: -30, scale: 0.98 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full text-center flex flex-col items-center h-full transform-gpu will-change-transform"
                        >
                            <div className="flex-1">
                                <h4 className="text-[#E11D48] text-xs font-black tracking-[0.4em] uppercase mb-6 flex items-center justify-center gap-2">
                                    <History size={16} /> Since 1997
                                </h4>
                                <h2 className="serif-title text-[#2D6A6A] text-3xl md:text-6xl lg:text-7xl font-bold leading-none mb-6 md:mb-8">
                                    Our Story
                                </h2>
                                <div className="max-w-xl mx-auto">
                                    <TextGenerateEffect
                                        words="Founded in 1997 in Karur, the textile hub of South India, we've grown from a small workshop to a globally recognized brand through dedication to quality and innovation."
                                        className="text-base md:text-xl text-black font-medium leading-relaxed"
                                        filter={false}
                                        onComplete={handleStoryComplete}
                                    />
                                </div>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={storyTextDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mt-8 md:mt-12 flex justify-center w-full"
                            >
                                <Link
                                    to="/about"
                                    className="inline-flex items-center gap-3 bg-[#E11D48] text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-[#6a6664] transition-all duration-300 shadow-xl group"
                                >
                                    Learn More
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Right Side: Our Factory */}
                        <motion.div
                            initial={{ opacity: 0, x: 30, scale: 0.98 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full text-center flex flex-col items-center h-full transform-gpu will-change-transform"
                        >
                            <div className="flex-1">
                                <h4 className="text-[#E11D48] text-xs font-black tracking-[0.4em] uppercase mb-6 flex items-center justify-center gap-2">
                                    <Factory size={16} /> Advanced Facility
                                </h4>
                                <h2 className="serif-title text-[#2D6A6A] text-3xl md:text-6xl lg:text-7xl font-bold leading-none mb-6 md:mb-8">
                                    Our Factory
                                </h2>
                                <div className="max-w-xl mx-auto">
                                    <TextGenerateEffect
                                        words="Our state-of-the-art facility combines advanced technology with skilled craftsmanship to produce premium textiles that meet international standards."
                                        className="text-base md:text-xl text-black/80 font-medium leading-relaxed mb-8 md:mb-12"
                                        filter={false}
                                        onComplete={handleFactoryComplete}
                                    />
                                </div>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={factoryTextDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mt-8 md:mt-12 flex justify-center w-full"
                            >
                                <Link
                                    to="/products"
                                    className="inline-flex items-center gap-3 bg-[#E11D48] text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-[#6a6664] transition-all duration-300 shadow-xl group"
                                >
                                    Explore Products
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>



                {/* 4. Numbers Section - Sustainability & Impact */}
                <section className="py-16 md:py-32 px-6 md:px-12 lg:px-24 bg-[#2D6A6A] transform-gpu relative overflow-hidden">
                    <BackgroundGrid color="#FFFFFF" opacity={0.1} />
                    {/* Decorative Blur */}
                    <div className="absolute -top-24 -left-20 w-96 h-96 bg-white rounded-full blur-[160px] opacity-10 pointer-events-none transform-gpu"></div>

                    <div className="max-w-7xl mx-auto text-center relative z-10">
                        <ScrollReveal
                            as="h4"
                            textClassName="text-[10px] font-black tracking-[0.4em] uppercase text-white/50"
                            containerClassName="mb-6"
                        >
                            Our Textile Journey in Numbers
                        </ScrollReveal>

                        <ScrollReveal
                            as="h2"
                            textClassName="text-white font-black serif-title leading-tight text-4xl md:text-6xl"
                            containerClassName="mb-10 md:mb-20 max-w-4xl mx-auto"
                        >
                            Quality and excellence measured through decades of dedication.
                        </ScrollReveal>

                        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
                            {[
                                { value: 25, suffix: "+", label: "Years of Excellence", sub: "Since 1997" },
                                { value: 500, suffix: "+", label: "Artisans Employed", sub: "Craftsmanship" }
                            ].map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: idx * 0.1,
                                        duration: 0.8,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    className="flex flex-col items-center transform-gpu will-change-transform"
                                >
                                    <h3 className="text-3xl md:text-6xl lg:text-7xl font-black text-white mb-2 md:mb-4">
                                        <CountUp to={stat.value} duration={2} />
                                        {stat.suffix}
                                    </h3>
                                    <div className="space-y-1">
                                        <p className="text-[11px] md:text-xs font-black tracking-[0.2em] uppercase text-white">
                                            {stat.label}
                                        </p>
                                        <p className="text-[9px] font-bold tracking-[0.1em] uppercase text-white/40">
                                            {stat.sub}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Connect Section */}
                <section className="py-16 md:py-32 px-6 md:px-12 lg:px-24 bg-white border-y border-[#2D6A6A]/5 transform-gpu relative">
                    <BackgroundGrid color="#2D6A6A" opacity={0.05} />
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="transform-gpu will-change-transform"
                        >
                            <h2 className="serif-title text-[#2D6A6A] text-3xl md:text-6xl font-bold mb-6 md:mb-8">Connect With Us</h2>
                            <p className="text-base md:text-xl text-black leading-relaxed font-light mb-6 md:mb-8">
                                Located in the heart of Karur's textile district, we welcome partners and clients to experience our operations firsthand and discuss collaborations.
                            </p>

                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="aspect-video bg-[#2D6A6A] rounded-2xl md:rounded-[3rem] overflow-hidden relative shadow-2xl group transform-gpu will-change-transform"
                        >
                            <img src={cottonBg} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s] transform-gpu" />
                            <div className="absolute inset-0 bg-[#6a6664]/20 flex items-center justify-center">
                                <Globe className="text-white w-32 h-32 animate-spin-slow opacity-20 transform-gpu" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 6. CTA Section */}
                <section id="main-footer" className="pt-20 md:pt-40 pb-8 px-6 md:px-12 lg:px-24 bg-[#6a6664] text-white transform-gpu relative overflow-hidden">>
                    <BackgroundGrid color="#FFFFFF" opacity={0.1} />
                    <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.98, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="serif-title text-3xl md:text-6xl lg:text-7xl font-black leading-[0.9] transform-gpu will-change-transform text-white"
                        >
                            Ready to Transform <br />
                            Your Space?
                        </motion.h2>
                        <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto text-white">
                            Seeking premium home textiles in bulk? We specialize in high-quality home products. Visit our Karur facility or contact us today for bulk orders.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center mt-12 md:mt-20 border-t border-white/10 pt-10 md:pt-16">
                            {/* Address */}
                            <div className="space-y-6">
                                <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-white">Headquarters</h4>
                                <div className="space-y-4">
                                    <p className="text-white font-medium">Delivering Excellence Since 1997</p>
                                    <address className="not-italic text-white leading-relaxed">
                                        9/236,237, NH-44,<br />
                                        Kakkavadi pirivu,<br />
                                        Thalapatti village,<br />
                                        Karur, TamilNadu - 639003<br />
                                        India
                                    </address>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="space-y-6">
                                <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-white">Contact Us</h4>
                                <div className="space-y-4 text-white">
                                    <a href="tel:+914324235518" className="block hover:text-white/80 transition-colors">+91 4324 235518</a>
                                    <a href="mailto:info@asiacotton.in" className="block hover:text-white/80 transition-colors">info@asiacotton.in</a>
                                    <p>Mon-Fri: 9:00 AM – 5:00 PM</p>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="space-y-6">
                                <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-white">Quick Links</h4>
                                <nav className="flex flex-col space-y-4 text-white items-center">
                                    <Link to="/about" className="hover:text-white/80 transition-colors">About Us</Link>
                                    <Link to="/products" className="hover:text-white/80 transition-colors">Our Products</Link>
                                    <Link to="/sustainability" className="hover:text-white/80 transition-colors">Sustainability</Link>
                                    <Link to="/certifications" className="hover:text-white/80 transition-colors">Certifications</Link>
                                    <Link to="/contact" className="hover:text-white/80 transition-colors">Contact</Link>
                                </nav>
                            </div>
                        </div>

                        <div className="pt-8 md:pt-12 border-t border-white/10 flex flex-col justify-center items-center gap-6 text-xs text-white font-bold tracking-widest uppercase">
                            <p>© 2025 ASIA COTTON. All Rights Reserved.</p>
                        </div>
                    </div>
                </section>
            </main>

            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 10s linear infinite;
                }
                .animate-bounce-slow {
                    animation: bounce 3s infinite;
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
                    50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
                }
            `}</style>
        </div>
    );
};

export default Home;
