import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IconArrowUpRight, IconX, IconArrowsMaximize, IconLayoutGrid } from '@tabler/icons-react';
import Folder from '../components/Folder';
import BackgroundGrid from '../components/BackgroundGrid';
import ScrollReveal from '../components/ScrollReveal';
import { TextGenerateEffect } from '../components/TextGenerateEffect';

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
        color: '#1A1A1A',
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
        id: 'cushion',
        title: 'CUSHIONS',
        tagline: 'ACCENT SOFTNESS',
        description: 'Decorative and functional cushions that provide comfort and a pop of texture to your living space.',
        color: '#B45309',
        folder: 'cushion',
        items: ["Velvet Cushions", "Embroidered Covers", "Floor Cushions"]
    },
    {
        id: 'outdoors',
        title: 'OUTDOORS',
        tagline: 'ELEGANT EXTERIORS',
        description: 'Durable, weather-resistant textiles designed to make outdoor living as comfortable as being indoors.',
        color: '#065F46',
        folder: 'Outdoors',
        items: ["Chair Pads", "Outdoor Cushions", "Patio Throws"]
    }
];

const Products = () => {
    const [activeFolderId, setActiveFolderId] = useState(null);
    const [viewedImage, setViewedImage] = useState(null);

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

    const categories = categoriesData.map(cat => ({
        ...cat,
        allImages: getCategoryImages(cat.folder),
        heroImage: getCategoryImages(cat.folder)[0] || ''
    }));

    const springTransition = {
        type: "spring",
        stiffness: 150,
        damping: 25,
        mass: 0.8
    };

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
                                    <h3 className="text-xs md:text-lg font-black uppercase tracking-tighter text-[#1A1A1A]">
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

                {/* Lightbox placeholder */}
                <AnimatePresence>
                    {viewedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center p-4"
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

            {/* IMMUTABLE STUDIO PORTAL - Rendered outside main DOM hierarchy */}
            {typeof document !== 'undefined' && ReactDOM.createPortal(
                <AnimatePresence>
                    {activeFolderId && (
                        <div
                            className="fixed inset-0 z-[99999] w-screen h-screen flex items-center justify-center overscroll-none touch-none"
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0
                            }}
                            onWheel={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            onTouchMove={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        >
                            {/* Global Backdrop - Heavy Blur Lock */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setActiveFolderId(null)}
                                className="absolute inset-0 bg-[#FDFCF0]/95 backdrop-blur-[60px] cursor-pointer"
                            />

                            {/* Static Studio Floor */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
                                className="relative z-10 w-[96vw] max-w-[1700px] h-[90vh] bg-white rounded-[40px] md:rounded-[64px] border border-black/5 shadow-[0_160px_300px_rgba(0,0,0,0.18)] flex flex-col items-center justify-end overflow-hidden pb-16 md:pb-32 cursor-default"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setActiveFolderId(null)}
                                    className="absolute top-10 right-10 z-[3000] p-6 bg-black/5 hover:bg-black/10 rounded-full text-black transition-colors"
                                >
                                    <IconX size={32} />
                                </motion.button>

                                {/* Structural Brand Watermark - Massive Scale */}
                                <div className="absolute top-[28%] left-1/2 -translate-x-1/2 opacity-[0.08] pointer-events-none select-none w-full text-center">
                                    <h2 className="text-signature text-[24vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap">
                                        ASIA COTTON
                                    </h2>
                                </div>

                                {/* Discovery Stage - Bottom Anchored */}
                                <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center pointer-events-none">
                                    {/* Category Text Reveal - Top Left Clean Layout */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute top-[10%] left-[6%] z-20 pointer-events-auto text-left"
                                    >
                                        <div className="flex items-center gap-2 mb-3 opacity-30">
                                            <div className="h-[1px] w-6 bg-black"></div>
                                            <span className="text-[9px] font-black tracking-[0.3em] uppercase">Category 0{categories.findIndex(c => c.id === activeFolderId) + 1}</span>
                                        </div>
                                        <h3 className="text-2xl md:text-4xl font-black uppercase text-[#1A1A1A] tracking-tighter mb-2 leading-[0.9]">
                                            {categories.find(c => c.id === activeFolderId)?.title}
                                        </h3>
                                        <p className="text-[10px] md:text-xs text-[#1A1A1A]/70 font-medium max-w-[200px] leading-relaxed">
                                            {categories.find(c => c.id === activeFolderId)?.description}
                                        </p>
                                    </motion.div>

                                    <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 pointer-events-auto">
                                        {activeFolderId && (
                                            <Folder
                                                color={categories.find(c => c.id === activeFolderId).color}
                                                title={categories.find(c => c.id === activeFolderId).title}
                                                images={categories.find(c => c.id === activeFolderId).allImages}
                                                size={typeof window !== 'undefined' && window.innerWidth < 768 ? 2.2 : 4.2}
                                                isOpen={true}
                                                onFolderClick={() => setActiveFolderId(null)}
                                            />
                                        )}
                                    </div>
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
