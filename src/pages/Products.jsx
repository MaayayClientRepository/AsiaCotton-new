import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX } from '@tabler/icons-react';
import BackgroundGrid from '../components/BackgroundGrid';
import ScrollReveal from '../components/ScrollReveal';
import { TextGenerateEffect } from '../components/TextGenerateEffect';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';
import Folder from '../components/Folder';

// Use Vite's glob import to get all images in the products directory
const allProductImages = import.meta.glob('../assets/products/**/*.{jpg,jpeg,png}', {
    eager: true,
    query: '?url',
    import: 'default'
});

const categoriesData = [
    {
        id: 'bedding',
        title: 'BEDDING',
        tagline: 'LUXURY LINENS',
        description: 'Premium bedding solutions crafted with high thread-count cotton and artisan weaves for ultimate comfort.',
        color: '#E11D48',
        folder: 'bedding',
        items: ["Premium Duvets", "Pillow Case Sets", "Luxury Bedspreads"]
    },
    {
        id: 'kitchen',
        title: 'KITCHEN',
        tagline: 'ARTISANAL DINING',
        description: 'Elegant kitchen and dining textiles that combine functionality with sophisticated design.',
        color: '#6a6664',
        folder: 'Kithchen',
        items: ["Kitchen Towels", "Table Runners", "Apron Sets"]
    },
    {
        id: 'curtain',
        title: 'CURTAINS',
        tagline: 'WINDOW DRESSING',
        description: 'Exquisite window treatments that filter light beautifully while adding character to any room.',
        color: '#2D6A6A',
        folder: 'Curtain',
        items: ["Sheer Curtains", "Blackout Linens", "Hand-Printed Drapes"]
    },
    {
        id: 'throws',
        title: 'THROWS',
        tagline: 'COZY TEXTURES',
        description: 'Soft, tactile throw blankets perfect for adding warmth and texture to sofas and beds.',
        color: '#4A6741',
        folder: 'Throws',
        items: ["Cotton Throws", "Textured Knits", "Fringe Accents"]
    },
    {
        id: 'cushion-outdoors',
        title: 'CUSHIONS & OUTDOORS',
        tagline: 'COMFORT EVERYWHERE',
        description: 'Decorative cushions and durable outdoor textiles that bring style and comfort to every space, indoors and out.',
        color: '#B45309',
        folders: ['cushion', 'Outdoors'],
        items: ["Velvet Cushions", "Embroidered Covers", "Chair Pads", "Outdoor Cushions"]
    },
    {
        id: 'baby',
        title: 'BABY ESSENTIALS',
        tagline: 'GENTLE CARE',
        description: 'Ultra-soft organic cotton baby textiles designed with love for the most delicate skin.',
        color: '#9333EA',
        folder: 'baby',
        items: ["Baby Blankets", "Swaddle Wraps", "Hooded Towels", "Crib Sheets"]
    }
];

const Products = () => {
    const [activeFolderId, setActiveFolderId] = useState(null);
    const [viewedImage, setViewedImage] = useState(null);
    const [showTutorial, setShowTutorial] = useState(false);

    useEffect(() => {
        if (activeFolderId) {
            setShowTutorial(true);
            const timer = setTimeout(() => setShowTutorial(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [activeFolderId]);

    useEffect(() => {
        const html = document.documentElement;
        if (activeFolderId) {
            const scrollY = window.scrollY;
            document.body.setAttribute('data-scroll-position', scrollY.toString());
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
            html.style.overflow = 'hidden';
        } else {
            const scrollY = document.body.getAttribute('data-scroll-position');
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            html.style.overflow = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY));
            }
        }
    }, [activeFolderId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getCategoryImages = (folder) => {
        return Object.entries(allProductImages)
            .filter(([path]) => path.includes(`/products/${folder}/`))
            .map(([_, url]) => url);
    };

    const getMultiFolderImages = (folders) => {
        return folders.flatMap(folder =>
            Object.entries(allProductImages)
                .filter(([path]) => path.includes(`/products/${folder}/`))
                .map(([_, url]) => url)
        );
    };

    const categories = categoriesData.map(cat => ({
        ...cat,
        allImages: cat.folders ? getMultiFolderImages(cat.folders) : getCategoryImages(cat.folder),
        heroImage: (cat.folders ? getMultiFolderImages(cat.folders) : getCategoryImages(cat.folder))[0] || ''
    }));

    const activeCategory = categories.find(c => c.id === activeFolderId);

    return (
        <div className="min-h-screen bg-[#FDFCF0] text-[#1A1A1A] font-['Outfit'] selection:bg-[#E11D48] selection:text-white overflow-x-hidden relative">
            <BackgroundGrid color="#2D6A6A" opacity={0.03} />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
                
                .text-signature {
                    font-family: 'Outfit', sans-serif;
                    letter-spacing: -0.04em;
                    transform: translateZ(0);
                }
                
                .grain-overlay {
                    pointer-events: none;
                    position: fixed;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 99;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                    opacity: 0.03;
                    will-change: transform;
                    transform: translateZ(0);
                }
                .no-scroll {
                    overflow: hidden !important;
                    height: 100vh !important;
                    height: 100dvh !important;
                }
            `}</style>

            <div className="grain-overlay" />
            <main className="min-h-screen lg:h-screen flex flex-col lg:flex-row relative lg:overflow-hidden transform-gpu">
                {/* Left Side (25%): Navigation & Content */}
                <div className="w-full lg:w-[25%] h-auto lg:h-full p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-center bg-white/40 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-black/5 z-20 relative pt-24 lg:pt-40">
                    <BackgroundGrid color="#2D6A6A" opacity={0.02} />

                    <div className="relative z-10 text-left">
                        <ScrollReveal
                            as="h1"
                            textClassName="text-signature text-[#E11D48] text-[clamp(1.5rem,3vw,2.5rem)] font-black leading-[0.9] mb-6 uppercase"
                            containerClassName="mb-10"
                            baseRotation={2}
                        >
                            Our Signature Collection
                        </ScrollReveal>

                        <div className="mb-10">
                            <TextGenerateEffect
                                words="Discover our exquisite range of handcrafted textiles, where timeless tradition meets contemporary design. Each piece is carefully crafted using sustainable materials and artisanal techniques."
                                className="text-[10px] lg:text-xs xl:text-sm text-[#1A1A1A]/70 font-medium leading-relaxed"
                                filter={false}
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, y: [0, 5, 0] }}
                            transition={{ delay: 1, duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-8 h-[1px] bg-[#A3A3A3]"></div>
                            <p className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.3em] text-[#A3A3A3]">
                                Click or Touch folder to discover
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side (75%): Product Folders */}
                <div className="w-full lg:w-[75%] h-auto lg:h-full bg-[#FDFCF0]/50 overflow-y-auto lg:overflow-hidden transform-gpu">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full h-full">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="flex flex-col items-center justify-center border-b border-r border-black/[0.03] last:border-r-0 p-3 md:p-4 hover:bg-white/10 transition-colors duration-300"
                            >
                                <div className="h-[150px] md:h-[200px] lg:h-[240px] w-full flex items-center justify-center relative mb-2 md:mb-4">
                                    {activeFolderId === category.id ? (
                                        <div className="w-full h-full" />
                                    ) : (
                                        <motion.div
                                            layoutId={`folder-stage-${category.id}`}
                                            className="w-full h-full flex items-center justify-center"
                                        >
                                            <Folder
                                                color={category.color}
                                                title={category.title}
                                                images={category.allImages}
                                                size={typeof window !== 'undefined' && window.innerWidth < 768 ? 1.1 : 1.6}
                                                onFolderClick={() => setActiveFolderId(category.id)}
                                            />
                                        </motion.div>
                                    )}
                                </div>

                                <div className="space-y-0.5 md:space-y-1 text-center">
                                    <h3 className="text-[9px] md:text-lg font-black uppercase tracking-tighter text-[#1A1A1A]">
                                        {category.title}
                                    </h3>
                                    <p className="text-[6px] md:text-[7px] tracking-[0.4em] font-black uppercase opacity-20">
                                        {category.tagline}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lightbox */}
                <AnimatePresence>
                    {viewedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[2000] bg-[#6a6664]/95 flex items-center justify-center p-4"
                            onClick={() => setViewedImage(null)}
                        >
                            <motion.img
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                src={viewedImage}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* PRODUCT DETAIL PORTAL - ScrollStack style like Certifications */}
            {typeof document !== 'undefined' && ReactDOM.createPortal(
                <AnimatePresence>
                    {activeFolderId && activeCategory && (
                        <div
                            className="fixed inset-0 z-[99999] w-screen h-screen flex overscroll-none touch-none"
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0
                            }}
                        >
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setActiveFolderId(null)}
                                className="absolute inset-0 bg-[#6a6664]/60 backdrop-blur-md cursor-pointer"
                            />

                            {/* Content Panel - Certificate-style layout */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                style={{ backgroundColor: activeCategory.color, willChange: 'transform, opacity' }}
                                className="relative z-10 w-[98vw] md:w-[96vw] max-w-[1600px] h-[95vh] md:h-[92vh] mx-auto my-auto rounded-[24px] md:rounded-[48px] border border-white/10 shadow-[0_80px_200px_rgba(0,0,0,0.4)] flex flex-col lg:flex-row overflow-hidden cursor-default transform-gpu"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <BackgroundGrid color="#FFFFFF" opacity={0.08} />

                                {/* Close Button */}
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setActiveFolderId(null)}
                                    className="absolute top-6 right-6 md:top-10 md:right-10 z-[3000] p-4 md:p-6 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
                                >
                                    <IconX size={24} />
                                </motion.button>

                                {/* Left Side: Category Info */}
                                <div className="w-full lg:w-[35%] flex flex-col justify-center px-5 md:px-12 lg:px-14 pt-16 pb-4 md:pt-14 md:pb-8 lg:py-0 relative z-20">
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        className="transform-gpu will-change-transform text-center lg:text-left"
                                    >
                                        <div className="flex items-center gap-2 mb-4 opacity-50 justify-center lg:justify-start">
                                            <div className="h-[1px] w-6 bg-white"></div>
                                            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white">
                                                Category 0{categories.findIndex(c => c.id === activeFolderId) + 1}
                                            </span>
                                        </div>

                                        <h1 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[0.85] tracking-tighter text-white mb-4 md:mb-8">
                                            {activeCategory.title.toLowerCase()}
                                        </h1>

                                        <p className="text-sm md:text-lg text-white/70 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium mb-6 md:mb-10">
                                            {activeCategory.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                            {activeCategory.items.map((item, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase text-white/90 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Tutorial Overlay */}
                                <AnimatePresence>
                                    {showTutorial && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[4000] pointer-events-none"
                                        >
                                            <p className="text-white text-xs font-black uppercase tracking-[0.4em] animate-pulse">
                                                Scroll to explore
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Right Side: ScrollStack of product images */}
                                <div className="w-full lg:w-[65%] h-[55vh] md:h-[60vh] lg:h-full relative z-10">
                                    <ScrollStack
                                        itemDistance={150}
                                        itemScale={0}
                                        itemStackDistance={0}
                                        baseScale={1}
                                        stackPosition={typeof window !== 'undefined' && window.innerWidth < 1024 ? "20%" : "12%"}
                                        className="h-full"
                                    >
                                        {activeCategory.allImages.map((img, idx) => (
                                            <ScrollStackItem
                                                key={idx}
                                                itemClassName="!h-auto !p-3 md:!p-6 !rounded-[20px] md:!rounded-[28px] bg-white border border-black/5 max-w-[85vw] md:max-w-sm lg:max-w-md mx-auto shadow-2xl transition-shadow duration-500"
                                            >
                                                <div
                                                    className="flex items-center justify-center cursor-pointer group"
                                                    onClick={() => setViewedImage(img)}
                                                >
                                                    <div className="w-full aspect-[4/5] flex-shrink-0 bg-[#F9FAFB] rounded-lg md:rounded-xl overflow-hidden shadow-sm border border-black/5 flex items-center justify-center group-hover:shadow-lg transition-all duration-500 ease-out">
                                                        <img
                                                            src={img}
                                                            alt={`${activeCategory.title} product ${idx + 1}`}
                                                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                                                        />
                                                    </div>
                                                </div>
                                            </ScrollStackItem>
                                        ))}
                                    </ScrollStack>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default Products;
