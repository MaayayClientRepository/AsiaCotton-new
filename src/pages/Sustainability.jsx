import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, Zap, Box } from 'lucide-react';
import CountUp from '../components/CountUp';
import BackgroundGrid from '../components/BackgroundGrid';
import GlassIcons from '../components/GlassIcons';
import { TextGenerateEffect } from '../components/TextGenerateEffect';

const Sustainability = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const indicators = [
        { to: 85, suffix: "%", label: "Water reduction since 2015" },
        { to: 500, suffix: "+", label: "Artisans employed" },
        { to: 65, suffix: "%", label: "Renewable energy use" },
        { to: 100, suffix: "%", label: "Organic by 2025" }
    ];

    const goals = [
        {
            year: "2027",
            title: "Material Transformation",
            points: [
                "100% organic or recycled material usage",
                "Complete phase-out of conventional cotton",
                "Supply chain transparency initiative"
            ]
        },
        {
            year: "2028",
            title: "Energy Revolution",
            points: [
                "Solar-powered production across all units",
                "75% reduction in carbon emissions",
                "Energy efficiency optimization"
            ]
        },
        {
            year: "2030",
            title: "Circular Excellence",
            points: [
                "Achieving near-zero fabric waste",
                "Closed-loop production systems",
                "Product lifecycle extension programs"
            ]
        }
    ];

    const pillars = [
        {
            id: 'sourcing',
            label: 'Sourcing',
            title: 'Responsible Sourcing',
            description: 'We ensure 100% transparency in our supply chain, prioritizing organic and BCI certified cotton to minimize environmental impact from the ground up.',
            icon: <Leaf size="24" />,
            color: 'green',
            points: ["Organic & BCI Certified", "Non-toxic Dyes", "Recycled Materials"]
        },
        {
            id: 'production',
            label: 'Production',
            title: 'Ethical Production',
            description: 'Our workforce is our family. We mandate fair wages, safe working environments, and continuous community development programs.',
            icon: <Users size="24" />,
            color: 'blue',
            points: ["Fair Wage Policy", "Safe Conditions", "Community Support"]
        },
        {
            id: 'eco',
            label: 'Eco-Tech',
            title: 'Eco Processes',
            description: 'Leveraging cutting-edge technology to reduce water consumption and harness renewable energy in every stage of manufacturing.',
            icon: <Zap size="24" />,
            color: 'orange',
            points: ["Water Recycling", "Solar Adoption", "Zero Waste"]
        },
        {
            id: 'packaging',
            label: 'Packaging',
            title: 'Sustainable Packaging',
            description: 'We have eliminated single-use plastics from our packaging, opting for biodegradable and recycled alternatives for a truly green product.',
            icon: <Box size="24" />,
            color: 'red',
            points: ["Biodegradable", "Plastic-Free", "Efficient Design"]
        }
    ];

    const [activePillar, setActivePillar] = useState(pillars[0]);

    return (
        <div className="min-h-screen bg-[#FDFBF2] font-['Outfit'] selection:bg-[#E11D48] selection:text-white">
            <main>
                {/* Hero section: Sustainable Textile Excellence */}
                <section className="min-h-screen flex flex-col lg:flex-row relative transform-gpu overflow-hidden">
                    {/* Left Column */}
                    <div className="w-full lg:w-[45%] bg-[#FDFBF2] relative flex flex-col lg:items-end flex-grow">
                        <div className="absolute inset-0 z-0">
                            <BackgroundGrid color="#2D6A6A" opacity={0.05} />
                        </div>
                        
                        <div className="w-full lg:max-w-[576px] relative z-10 flex flex-col justify-center pt-20 pb-12 md:pt-28 md:pb-20 lg:py-40 px-6 md:px-12 lg:px-10 lg:pr-12 text-left min-h-[auto] lg:min-h-[50vh] xl:px-16 xl:pr-16">
                            <motion.div
                                initial={{ opacity: 0, x: -30, scale: 0.98 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                className="transform-gpu will-change-transform flex flex-col items-start"
                            >
                                <h4 className="text-[#E11D48] text-sm font-black tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 ml-1">
                                    Sustainable cotton fields
                                </h4>
                                <h1 className="serif-title text-[#1A1A1A] text-[clamp(2rem,4vw,4.5rem)] font-bold leading-[1.05] mb-6 md:mb-8">
                                    Sustainable Textile Excellence
                                </h1>
                                <p className="text-base md:text-xl text-black/80 max-w-md leading-relaxed mb-6 md:mb-8 font-medium ml-1">
                                    At Asia Cotton, sustainability is more than a responsibility; it is a promise. Every time you choose Asia Cotton, you choose comfort with a conscience.
                                </p>
                                <div className="ml-1 pl-4 border-l-2 border-[#E11D48]">
                                    <p className="text-lg text-black/60 max-w-sm leading-relaxed italic">
                                        Bringing sustainable beauty to your home and dignity to the hands that create it.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full lg:w-[55%] bg-[#2D6A6A] relative flex flex-col lg:items-start flex-grow shadow-[inset_20px_0_40px_rgba(0,0,0,0.15)] max-lg:shadow-[inset_0_20px_40px_rgba(0,0,0,0.15)]">
                        <div className="absolute inset-0 z-0 border-l border-white/5">
                            <BackgroundGrid color="#FFFFFF" opacity={0.1} />
                        </div>
                        
                        <div className="w-full lg:max-w-[704px] relative z-10 flex flex-col items-start justify-center py-10 md:py-16 lg:py-40 px-6 md:px-12 lg:px-10 lg:pl-12 min-h-[auto] lg:min-h-[50vh] xl:px-16 xl:pl-16">
                            {/* Icons Column */}
                            <div className="w-full lg:w-2/5 xl:w-1/3 flex justify-center lg:justify-end xl:pr-6 mb-10 lg:mb-0 pl-0">
                                <GlassIcons
                                    items={pillars}
                                    className="grid-cols-2 gap-8 lg:gap-10"
                                    onHover={(item) => setActivePillar(item)}
                                />
                            </div>

                            {/* Dynamic Content Container */}
                            <div className="w-full lg:w-3/5 xl:w-2/3 pl-0 lg:pl-10 xl:pl-12 lg:border-l border-white/10 min-h-[240px] lg:min-h-[400px] flex items-start pt-4 text-white">
                                <motion.div
                                    key={activePillar.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-8"
                                >
                                    <div>
                                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                                            {activePillar.title}
                                        </h2>
                                        <div className="h-1.5 w-16 rounded-full" style={{ backgroundColor: activePillar.color === 'green' ? '#4ade80' : activePillar.color === 'blue' ? '#60a5fa' : activePillar.color === 'orange' ? '#fbbf24' : '#f87171' }} />
                                    </div>

                                    <p className="text-lg text-white/75 leading-relaxed font-light pr-4">
                                        {activePillar.description}
                                    </p>

                                    <ul className="space-y-5">
                                        {activePillar.points.map((point, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 + (idx * 0.1) }}
                                                className="flex items-center gap-4 text-sm font-bold tracking-[0.1em] uppercase text-white/90"
                                            >
                                                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs shadow-inner">
                                                    {idx + 1}
                                                </span>
                                                {point}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Commitment Section */}
                <section className="bg-white py-16 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden transform-gpu">
                    <BackgroundGrid color="#2D6A6A" opacity={0.05} />
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-20 items-center relative z-10">
                        <div className="lg:w-1/2">
                            <h2 className="serif-title text-[#1A1A1A] text-3xl md:text-5xl font-bold mb-6 md:mb-8">Our Sustainable Commitment</h2>
                            <TextGenerateEffect
                                words="At Asia Cotton, sustainability is integrated throughout our operations. We combine traditional craftsmanship with innovative technologies to minimize environmental impact while delivering premium quality textiles."
                                className="text-xl text-black/70 leading-relaxed font-light"
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <div className="border-l-4 border-[#E11D48] pl-8">
                                <TextGenerateEffect
                                    words='"Our comprehensive approach addresses every stage of production, from responsible raw material sourcing to eco-efficient manufacturing processes and sustainable packaging solutions."'
                                    className="text-xl text-black/50 leading-relaxed font-light italic"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="bg-[#6a6664] py-16 md:py-32 px-6 md:px-12 lg:px-24 text-white transform-gpu relative overflow-hidden">
                    <BackgroundGrid color="#FFFFFF" opacity={0.1} />
                    <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 text-center relative z-10">
                        {indicators.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="space-y-3 md:space-y-4 transform-gpu flex flex-col items-center justify-center p-4 md:p-8 border border-white/5 rounded-2xl md:rounded-[2rem] bg-white/[0.02] backdrop-blur-sm"
                            >
                                <h3 className="text-3xl md:text-7xl font-black text-white drop-shadow-lg">
                                    <CountUp to={stat.to} duration={2} />
                                    <span className="text-[#E11D48] ml-1">{stat.suffix}</span>
                                </h3>
                                <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-white/90 max-w-[200px] mx-auto leading-relaxed pt-2">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Goals section */}
                <section className="bg-[#FDFBF2] py-20 md:py-40 px-6 md:px-12 lg:px-24 relative overflow-hidden transform-gpu">
                    <BackgroundGrid color="#2D6A6A" opacity={0.05} />
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="mb-12 md:mb-24 text-center">
                            <h2 className="serif-title text-black text-3xl md:text-6xl font-black mb-4 md:mb-6">Our Sustainability Goals</h2>
                            <TextGenerateEffect
                                words="At Asia Cotton, we're setting bold goals to create lasting change. We believe in transparency and are committed to sharing our progress."
                                className="text-xl text-black/60 max-w-2xl mx-auto"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 transform-gpu">
                            {goals.map((goal, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -10, scale: 1.01 }}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: i * 0.1,
                                        duration: 0.8,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    className="bg-white p-8 md:p-10 lg:p-12 rounded-2xl md:rounded-[2rem] shadow-xl border border-black/5 flex flex-col h-full group transform-gpu will-change-transform relative overflow-hidden"
                                >
                                    <div className="absolute top-6 right-6 lg:top-8 lg:right-8 text-6xl lg:text-7xl font-black text-black/[0.03] group-hover:text-[#E11D48]/10 transition-colors transform-gpu z-0 pointer-events-none">
                                        {goal.year}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black text-left text-black mb-6 md:mb-8 uppercase tracking-widest transform-gpu relative z-10 pt-6 md:pt-8">
                                        {goal.title}
                                    </h3>
                                    <ul className="space-y-5 flex-grow transform-gpu pl-0 list-none m-0 text-left relative z-10">
                                        {goal.points.map((point, idx) => (
                                            <li key={idx} className="flex gap-3 items-start text-black/70 leading-relaxed font-medium">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] mt-2.5 flex-shrink-0 shadow-sm" />
                                                <span className="flex-1">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Sustainability;
