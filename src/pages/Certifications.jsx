import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import BackgroundGrid from '../components/BackgroundGrid';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';

// Import certification images
import cert1 from '../assets/cert/cert1.png';
import cert2 from '../assets/cert/cert2.png';
import cert3 from '../assets/cert/cert3.png';
import cert4 from '../assets/cert/cert4.png';
import cert5 from '../assets/cert/cert5.png';
import cert6 from '../assets/cert/cert6.png';
import cert7 from '../assets/cert/cert7.png';
import cert8 from '../assets/cert/cert8.png';

const certificationData = [
    {
        name: "amfori BSCI",
        subtitle: "Supply Chain Compliance",
        desc: "Monitoring and improving social performance in our human rights activities.",
        image: cert1,
        color: "#FDFBF2"
    },
    {
        name: "Sedex",
        subtitle: "Responsible Trade",
        desc: "Empowering responsible supply chains through data-driven collaboration.",
        image: cert2,
        color: "#F0F9FF"
    },
    {
        name: "GOTS",
        subtitle: "Organic Textile Standard",
        desc: "The world-leading processing standard for textiles made from organic fibers.",
        image: cert3,
        color: "#F0FDF4"
    },
    {
        name: "Better Cotton",
        subtitle: "Sustainable Production",
        desc: "Promoting better standards in cotton farming and practices across 21 countries.",
        image: cert4,
        color: "#FFFBEB"
    },
    {
        name: "OEKO-TEX",
        subtitle: "Confidence in Textiles",
        desc: "Ensuring our products are free from harmful substances and safe for human use.",
        image: cert5,
        color: "#FAFAF9"
    },
    {
        name: "CE Mark",
        subtitle: "European Conformity",
        desc: "Meeting high safety, health, and environmental protection requirements in Europe.",
        image: cert6,
        color: "#FDF2F8"
    },
    {
        name: "Facility Authorization",
        subtitle: "Facility Compliance",
        desc: "Authorized manufacturing facility meeting rigorous global compliance standards.",
        image: cert7,
        color: "#F5F3FF"
    },
    {
        name: "Quality Management",
        subtitle: "Excellence Guaranteed",
        desc: "Strict adherence to international quality management systems and operational excellence.",
        image: cert8,
        color: "#EFF6FF"
    }
];

const Certifications = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#FEDC56] font-['Outfit'] selection:bg-black selection:text-[#FEDC56] relative overflow-hidden">
            <BackgroundGrid color="#000000" opacity={0.05} />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
                
                body {
                    background-color: #FEDC56;
                    overflow: hidden;
                }
            `}</style>

            <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen">
                {/* Left Side: Title and Content */}
                <div className="w-full lg:w-[40%] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 pb-12 lg:py-0 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30, scale: 0.98 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="transform-gpu will-change-transform text-center lg:text-left"
                    >
                        <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.85] tracking-tighter text-black mb-8 md:mb-12">
                            our <br className="hidden lg:block" /> accreditations
                        </h1>
                        <p className="text-base md:text-xl text-black/70 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
                            Each certification represents our unwavering commitment to excellence, quality, and sustainable practices in the textile industry.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Scroll Stack of Certificates */}
                <div className="w-full lg:w-[60%] h-[60vh] lg:h-full relative z-10">
                    <ScrollStack
                        itemDistance={40}
                        itemScale={0.02}
                        itemStackDistance={20}
                        baseScale={0.92}
                        stackPosition={typeof window !== 'undefined' && window.innerWidth < 1024 ? "25%" : "15%"}
                        className="h-full"
                    >
                        {certificationData.map((cert, idx) => (
                            <ScrollStackItem
                                key={idx}
                                itemClassName="!h-auto !p-6 md:!p-12 !rounded-[32px] bg-white border border-black/5 max-w-[280px] md:max-w-sm mx-auto shadow-2xl"
                            >
                                <div className="flex items-center justify-center">
                                    <div className="w-24 h-24 md:w-48 md:h-48 flex-shrink-0 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-black/5 flex items-center justify-center">
                                        <img
                                            src={cert.image}
                                            alt={cert.name}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                </div>
                            </ScrollStackItem>
                        ))}
                    </ScrollStack>
                </div>
            </div>
        </div>
    );
};

export default Certifications;
