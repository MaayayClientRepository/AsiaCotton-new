import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import BackgroundGrid from '../components/BackgroundGrid';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';

// Import certification images
import cert1 from '../assets/cert/cert1.png';
import cert3 from '../assets/cert/cert3.png';
import cert4 from '../assets/cert/cert4.png';
import cert5 from '../assets/cert/cert5.png';
import cert6 from '../assets/cert/cert6.png';
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
        name: "Quality Management",
        subtitle: "Excellence Guaranteed",
        desc: "Strict adherence to international quality management systems and operational excellence.",
        image: cert8,
        color: "#EFF6FF"
    }
];

const Certifications = () => {
    const [isMobileLandscape, setIsMobileLandscape] = React.useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const handleResize = () => {
            setIsMobileLandscape(
                window.innerWidth < 1024 && window.innerHeight < 600 && window.innerWidth > window.innerHeight
            );
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-[#FEDC56] font-['Outfit'] selection:bg-[#6a6664] selection:text-[#FEDC56] relative overflow-hidden">
            <BackgroundGrid color="#000000" opacity={0.05} />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
            `}</style>

            <div className={`flex lg:flex-row lg:h-screen lg:overflow-hidden ${
                isMobileLandscape 
                    ? "flex-row h-screen overflow-hidden" 
                    : "flex-col min-h-screen"
            }`}>
                {/* Left Side: Title and Content */}
                <div className={`flex flex-col justify-center relative z-20 ${
                    isMobileLandscape 
                        ? "w-[40%] h-full px-8 py-4 justify-center" 
                        : "w-full lg:w-[40%] px-6 md:px-12 lg:px-24 pt-24 pb-8 md:pt-28 md:pb-12 lg:py-0"
                }`}>
                    <motion.div
                        initial={{ opacity: 0, x: -30, scale: 0.98 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className={`transform-gpu will-change-transform ${
                            isMobileLandscape ? "text-right items-end" : "text-center lg:text-left"
                        }`}
                    >
                        <h1 className={`${
                            isMobileLandscape 
                                ? "text-xl sm:text-2xl mb-2" 
                                : "text-[clamp(2rem,6vw,5.5rem)] mb-6 md:mb-12"
                        } font-bold leading-[0.85] tracking-tighter text-black font-['Outfit']`}>
                            our <br className={isMobileLandscape ? "hidden" : "hidden lg:block"} /> accreditations
                        </h1>
                        <p className={`${
                            isMobileLandscape 
                                ? "text-[10px] leading-relaxed max-w-xs" 
                                : "text-base md:text-xl text-black/70 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium"
                        } font-['Outfit']`}>
                            Each certification represents our unwavering commitment to excellence, quality, and sustainable practices in the textile industry.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Scroll Stack of Certificates */}
                <div className={`relative z-10 ${
                    isMobileLandscape ? "w-[60%] h-full" : "w-full lg:w-[60%] h-[65vh] md:h-[70vh] lg:h-full"
                }`}>
                    <ScrollStack
                        itemDistance={isMobileLandscape ? 30 : 40}
                        itemScale={0.02}
                        itemStackDistance={15}
                        baseScale={0.92}
                        stackPosition={isMobileLandscape ? "5%" : "15%"}
                        className="h-full"
                        innerPaddingTop={isMobileLandscape ? "pt-[4vh]" : "pt-[8vh] md:pt-[20vh]"}
                        innerPaddingX={isMobileLandscape ? "px-6" : "px-6 md:px-20"}
                    >
                        {certificationData.map((cert, idx) => (
                            <ScrollStackItem
                                key={idx}
                                itemClassName={`!h-auto !rounded-[24px] md:!rounded-[32px] bg-white border border-black/5 mx-auto shadow-2xl ${
                                    isMobileLandscape 
                                        ? "!p-4 max-w-[1800px] w-[180px]" 
                                        : "!p-6 md:!p-12 max-w-[280px] md:max-w-sm w-full"
                                }`}
                            >
                                <div className="flex items-center justify-center">
                                    <div className={`flex-shrink-0 bg-white rounded-xl shadow-sm border border-black/5 flex items-center justify-center ${
                                        isMobileLandscape ? "w-20 h-20 p-2" : "w-24 h-24 md:w-48 md:h-48 p-4 md:p-6"
                                    }`}>
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
