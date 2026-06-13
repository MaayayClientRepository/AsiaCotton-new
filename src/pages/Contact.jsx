import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import BackgroundGrid from '../components/BackgroundGrid';

const Contact = () => {
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

    const contactDetails = [
        {
            icon: <Phone size={24} />,
            label: "Call Us",
            value: "+91 4324-235518",
            sub: "Mon-Sat, 9AM to 6PM IST"
        },
        {
            icon: <Mail size={24} />,
            label: "Email Us",
            value: "info@asiacotton.in",
            sub: "We respond within 24 hours"
        },
        {
            icon: <MapPin size={24} />,
            label: "Visit Us",
            value: "Karur, South India",
            sub: "Industrial Textile Hub"
        }
    ];

    return (
        <div className="min-h-screen bg-[#FDFBF2] font-['Outfit'] selection:bg-[#2B6B6D] selection:text-white relative overflow-x-hidden">
            <BackgroundGrid color="#2D6A6A" opacity={0.05} />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@200..900&display=swap');
                
                .serif-title {
                    font-family: 'Crimson Pro', serif;
                }

                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                input::placeholder, textarea::placeholder {
                    color: rgba(45, 106, 106, 0.3);
                }
            `}</style>

            <main className={`flex relative ${
                isMobileLandscape 
                    ? "flex-row h-screen pt-0" 
                    : "flex-col md:flex-row md:h-screen pt-16 md:pt-0"
            }`}>
                {/* Left Side: Contact Content */}
                <div className={`flex flex-col justify-center bg-white/40 backdrop-blur-xl border-r border-[#2D6A6A]/10 z-20 relative overflow-y-auto hide-scrollbar ${
                    isMobileLandscape 
                        ? "w-[40%] h-full px-6 py-4 justify-center" 
                        : "w-full md:w-[40%] md:h-full px-6 py-8 md:p-8 lg:p-12 xl:p-20 md:border-r"
                }`}>
                    <BackgroundGrid color="#2D6A6A" opacity={0.02} />

                    <div className={`relative z-10 w-full max-w-xl mx-auto ${
                        isMobileLandscape ? "text-right items-end flex flex-col" : "text-left"
                    }`}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className={isMobileLandscape ? "flex flex-col items-end" : ""}
                        >
                            <h4 className="text-[#2D6A6A] text-[9px] font-black tracking-[0.4em] uppercase mb-1 font-['Outfit']">
                                Connect with us
                            </h4>
                            <h1 className={`serif-title text-[#2D6A6A] font-bold leading-none ${
                                isMobileLandscape ? "text-2xl mb-2" : "text-3xl lg:text-5xl xl:text-7xl mb-3 md:mb-4"
                            }`}>
                                Get in <br className={isMobileLandscape ? "hidden" : "hidden xl:block"} /> Touch
                            </h1>
                            <p className={`text-[#2D6A6A]/60 leading-relaxed font-['Outfit'] ${
                                isMobileLandscape ? "text-[10px] mb-3 max-w-xs" : "text-xs lg:text-sm xl:text-base mb-6 md:mb-8"
                            }`}>
                                Have a specific requirement? Our team is ready to assist you.
                            </p>

                            {/* Contact Info Items - Compressed */}
                            <div className={`grid grid-cols-1 ${isMobileLandscape ? "gap-y-2 mb-3" : "gap-y-4 md:gap-y-6 mb-6 md:mb-10"}`}>
                                {contactDetails.map((detail, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 + 0.3 }}
                                        className={`flex gap-4 items-center ${isMobileLandscape ? "flex-row-reverse" : ""}`}
                                    >
                                        <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-white border border-[#2D6A6A]/10 flex items-center justify-center text-[#2D6A6A] shadow-sm transform scale-90">
                                            {React.cloneElement(detail.icon, { size: 16 })}
                                        </div>
                                        <div className={isMobileLandscape ? "text-right" : ""}>
                                            <h3 className="text-[8px] font-black tracking-[0.2em] uppercase text-[#2D6A6A]/40 mb-0.5 font-['Outfit']">
                                                {detail.label}
                                            </h3>
                                            <p className={`font-bold text-[#2D6A6A] leading-tight font-['Outfit'] ${
                                                isMobileLandscape ? "text-sm" : "text-base md:text-lg"
                                            }`}>
                                                {detail.value}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Location Block */}
                            <div className={`pt-3 border-t border-[#2D6A6A]/10 w-full ${isMobileLandscape ? "text-right" : ""}`}>
                                <h3 className="text-[9px] font-black tracking-[0.2em] uppercase text-[#2D6A6A]/40 mb-1.5 font-['Outfit']">
                                    Our Location
                                </h3>
                                <div className={`text-[#2D6A6A]/70 leading-snug font-medium font-['Outfit'] ${
                                    isMobileLandscape ? "text-[9px] space-y-0" : "text-[10px] md:text-xs lg:text-sm space-y-0.5 md:space-y-1"
                                }`}>
                                    <p>9/236,237,NH-44, Kakkavadi pirivu,</p>
                                    <p>Thalapatti village, Karur-639003</p>
                                    <p>Tamil Nadu, India</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side: Map */}
                <div className={`relative overflow-hidden ${
                    isMobileLandscape 
                        ? "w-[60%] h-full p-4" 
                        : "w-full md:w-[60%] h-[60vw] min-h-[300px] md:h-full p-3 md:p-6 lg:p-10"
                }`}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#2D6A6A]/5 border border-[#2D6A6A]/5 relative grayscale hover:grayscale-0 transition-all duration-1000"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7835.657579364545!2d78.02826!3d10.900613!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa25fc70dd10f9%3A0xc6022d855c058b66!2sASIA%20COTTON!5e0!3m2!1sen!2sin!4v1768881728824!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Contact;
