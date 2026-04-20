import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import textileHeritageImg from '../assets/textile-heritage.png';
import factoryExteriorImg from '../assets/factory-exterior.png';
import factory1 from '../assets/factory/1.jpg';
import factory2 from '../assets/factory/2.jpg';
import factory3 from '../assets/factory/3.jpg';
import factory4 from '../assets/factory/4.jpg';
import CountUp from '../components/CountUp';
import BounceCards from '../components/BounceCards';
import { AnimatedTestimonials } from '../components/ui/animated-testimonials';
import BackgroundGrid from '../components/BackgroundGrid';

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const features = [
        { title: "Consistent Product Quality", icon: "💎" },
        { title: "Competitive Pricing", icon: "🏷️" },
        { title: "Reliable Delivery", icon: "🚚" },
        { title: "Flexible, Custom Designs", icon: "✨" }
    ];

    const factoryImagesData = [
        {
            quote: "Our facility houses cutting-edge weaving and processing units, ensuring every thread meets global standards of strength and durability.",
            name: "Precision Engineering",
            designation: "Advanced Machinery",
            src: factory1
        },
        {
            quote: "We prioritize filtered water systems and renewable energy, minimizing our carbon footprint while maximizing efficiency.",
            name: "Sustainable Practices",
            designation: "Eco-friendly Processing",
            src: factory2
        },
        {
            quote: "Our dedicated workforce combines traditional expertise with modern techniques to deliver textiles of unmatched quality.",
            name: "Skilled Craftsmanship",
            designation: "Expert Team",
            src: factory3
        },
        {
            quote: "Every batch undergoes stringent quality checks in our in-house labs, guaranteeing zero-defect products for our clients.",
            name: "Quality Control",
            designation: "Rigorous Testing",
            src: factory4
        }
    ];

    return (
        <div className="bg-[#F9FAFB] min-h-screen font-['Inter'] overflow-x-hidden transform-gpu">
            {/* Part 1: Integrated Hero Split View (Brand + Factory) */}
            <section className="flex flex-col lg:flex-row min-h-[auto] md:min-h-[80vh] lg:min-h-[90vh] pt-0 pb-12 lg:pb-0 transform-gpu overflow-hidden">
                {/* Left Side: Brand Heritage (Cream) */}
                <div className="w-full lg:w-1/2 bg-[#FDFCF0] px-6 py-10 md:px-12 lg:p-24 flex flex-col justify-center relative overflow-hidden transform-gpu pt-20 md:pt-24 lg:pt-24">
                    <BackgroundGrid color="#2D6A6A" opacity={0.05} />
                    {/* Decorative background elements */}
                    <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#2D6A6A] rounded-full blur-[120px] opacity-10 transform-gpu"></div>

                    <div className="relative z-10 space-y-8 transform-gpu max-w-xl mx-auto text-center flex flex-col items-center">
                        <motion.h1
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[#2D6A6A] text-3xl md:text-6xl font-black leading-none tracking-tight transform-gpu will-change-transform"
                        >
                            MORE THAN <br /> FABRIC
                        </motion.h1>

                        <div className="space-y-6 max-w-lg transform-gpu">
                            <h2 className="text-[#2D6A6A] text-lg md:text-xl font-bold tracking-[0.2em] uppercase opacity-90">Our Textile Heritage</h2>
                            <p className="text-[#1A1A1A]/70 text-base md:text-lg leading-relaxed font-medium">
                                Since 1997 in Karur, we've been crafting premium textiles that blend traditional craftsmanship with modern innovation. Our journey reflects our commitment to quality and innovation.
                            </p>
                        </div>

                        <Link to="/products">
                            <motion.button
                                whileHover={{ y: -5, scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex flex-col items-center gap-4 text-[#2D6A6A] font-black uppercase tracking-widest text-xs pt-4 group cursor-pointer transform-gpu outline-none"
                            >
                                <span className="underline decoration-2 underline-offset-8">Explore Our Journey</span>
                                <span className="bg-[#2D6A6A] text-white rounded-full w-10 h-10 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 transform-gpu text-xl shadow-xl mt-2">→</span>
                            </motion.button>
                        </Link>
                    </div>
                </div>

                {/* Right Side: Factory Showcase (Teal) */}
                <div className="w-full lg:w-1/2 bg-[#2D6A6A] text-white px-6 py-10 md:px-12 lg:p-24 flex flex-col justify-center relative transform-gpu overflow-hidden">
                    <BackgroundGrid color="#FFFFFF" opacity={0.08} />
                    {/* Decorative blur */}
                    <div className="absolute top-1/2 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[120px] opacity-10 transform-gpu"></div>

                    <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col h-full justify-center">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-8">
                            <div className="space-y-4 transform-gpu flex-1">
                                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Our <span className="text-[#FACC15]">Factory</span></h2>
                                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                                    Our state-of-the-art manufacturing facility is equipped with advanced technology.
                                </p>
                            </div>

                            {/* Integrated Compact Stats */}
                            <div className="flex gap-4 shrink-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="p-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm transform-gpu"
                                >
                                    <h4 className="text-[#FACC15] text-xl font-black mb-1 leading-none"><CountUp to={100} suffix="%" duration={2} /></h4>
                                    <p className="text-[9px] uppercase tracking-widest text-white/40">Quality</p>
                                </motion.div>

                            </div>
                        </div>

                        {/* Interactive Folder Animation for Factory Showcase - Desktop */}
                        <div className="hidden lg:flex w-full items-center justify-center relative transform-gpu bg-gradient-to-b from-white/5 to-transparent p-1 rounded-2xl border border-white/5">
                            <div className="w-full overflow-hidden rounded-xl">
                                <AnimatedTestimonials
                                    testimonials={factoryImagesData}
                                    autoplay={true}
                                />
                            </div>
                        </div>

                        {/* Mobile Fallback or simpler view */}
                        <div className="lg:hidden relative group perspective-1000 transform-gpu max-w-lg mx-auto w-full">
                            <motion.div
                                whileHover={{ rotateY: 5, rotateX: 5 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 transform-gpu will-change-transform aspect-video"
                            >
                                <img src={factoryExteriorImg} alt="Factory Exterior" className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-[1s] ease-in-out transform-gpu" />

                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#6a6664]/90 to-transparent translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 transform-gpu">
                                    <p className="text-[#FACC15] font-bold tracking-widest text-[10px] uppercase mb-1">Facility Node 01</p>
                                    <h3 className="text-lg font-bold text-white">State-of-the-Art Hub</h3>
                                </div>
                            </motion.div>
                            <div className="absolute inset-0 border-2 border-white/20 translate-x-4 translate-y-4 rounded-2xl -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-all duration-500 transform-gpu"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Part 2: Commitment Section (Stay as requested with Bounce cards) */}
            <section className="py-12 md:py-20 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 transform-gpu relative overflow-hidden">
                <BackgroundGrid color="#000000" opacity={0.03} />
                <div className="flex flex-col space-y-12 items-center transform-gpu relative z-10">
                    <div className="space-y-4 text-center max-w-2xl transform-gpu">
                        <h2 className="text-[#1A1A1A] text-2xl md:text-5xl font-black uppercase tracking-tight leading-none">Our <br /><span className="text-[#2D6A6A]">Commitment</span></h2>
                        <div className="w-16 h-1 bg-[#2D6A6A] mx-auto"></div>
                        <p className="text-gray-600 text-lg leading-relaxed font-medium">
                            For over 25 years since our founding, we are driven by a passion to produce exceptional textiles while staying true to our values of responsibility, innovation, and integrity.
                        </p>
                    </div>

                    <div className="w-full flex justify-center overflow-hidden scale-75 sm:scale-90 md:scale-100 origin-top">
                        <BounceCards
                            data={features}
                            containerWidth="100%"
                            containerHeight={400}
                        />
                    </div>
                </div>
            </section>

            {/* Part 3: Sustainability */}
            <section className="py-12 md:py-20 bg-[#2D6A6A] text-white transform-gpu relative overflow-hidden">
                <BackgroundGrid color="#FFFFFF" opacity={0.1} />
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center transform-gpu relative z-10">
                    <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="text-5xl mb-6 block filter brightness-0 invert opacity-90 transform-gpu"
                    >
                        🌿
                    </motion.span>
                    <h2 className="text-2xl md:text-5xl font-black uppercase mb-6">Ethical & Sustainable <br /><span className="text-[#FACC15]">Manufacturing</span></h2>
                    <p className="text-lg font-medium leading-relaxed opacity-90 max-w-2xl mx-auto mb-16">
                        Every product is crafted with care, using responsibly sourced materials and environmentally mindful processes, reflecting our deep commitment to ethical and sustainable manufacturing.
                    </p>


                </div>
            </section>

            {/* Styles for specific 3D effects if needed */}
            <style>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .rotate-y-12 {
                    transform: rotateY(12deg);
                }
            `}</style>
        </div>
    );
};

export default AboutPage;
