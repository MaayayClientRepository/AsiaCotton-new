import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function BounceCards({
    className = '',
    data = [], // Array of { title, icon }
    containerWidth = 800,
    containerHeight = 400,
    animationDelay = 0.5,
    animationStagger = 0.06,
    easeType = 'elastic.out(1, 0.8)',
    transformStyles = [
        'rotate(-10deg) translate(-250px, 20px)',
        'rotate(-5deg) translate(-120px, -10px)',
        'rotate(5deg) translate(120px, -10px)',
        'rotate(10deg) translate(250px, 20px)'
    ],
    enableHover = true
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.card',
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    stagger: animationStagger,
                    ease: easeType,
                    delay: animationDelay
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, [animationStagger, easeType, animationDelay]);

    const getNoRotationTransform = transformStr => {
        const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
        if (hasRotate) {
            return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
        } else if (transformStr === 'none') {
            return 'rotate(0deg)';
        } else {
            return `${transformStr} rotate(0deg)`;
        }
    };

    const getPushedTransform = (baseTransform, offsetX) => {
        const translateRegex = /translate\(([-0-9.]+)px(?:,\s*([-0-9.]+)px)?\)/;
        const match = baseTransform.match(translateRegex);
        if (match) {
            const currentX = parseFloat(match[1]);
            const currentY = match[2] ? parseFloat(match[2]) : 0;
            const newX = currentX + offsetX;
            return baseTransform.replace(translateRegex, `translate(${newX}px, ${currentY}px)`);
        } else {
            return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
        }
    };

    const pushSiblings = hoveredIdx => {
        if (!enableHover || !containerRef.current) return;

        const q = gsap.utils.selector(containerRef);
        data.forEach((_, i) => {
            const selector = q(`.card-${i}`);
            gsap.killTweensOf(selector);

            const baseTransform = transformStyles[i] || 'none';

            if (i === hoveredIdx) {
                const noRotation = getNoRotationTransform(baseTransform);
                gsap.to(selector, {
                    transform: noRotation,
                    scale: 1.1,
                    zIndex: 50,
                    duration: 0.4,
                    ease: 'back.out(1.4)',
                    overwrite: 'auto'
                });
            } else {
                const offsetX = i < hoveredIdx ? -100 : 100;
                const pushedTransform = getPushedTransform(baseTransform, offsetX);

                const distance = Math.abs(hoveredIdx - i);
                const delay = distance * 0.05;

                gsap.to(selector, {
                    transform: pushedTransform,
                    scale: 0.9,
                    zIndex: 10,
                    duration: 0.4,
                    ease: 'back.out(1.4)',
                    delay,
                    overwrite: 'auto'
                });
            }
        });
    };

    const resetSiblings = () => {
        if (!enableHover || !containerRef.current) return;
        const q = gsap.utils.selector(containerRef);
        data.forEach((_, i) => {
            const selector = q(`.card-${i}`);
            gsap.killTweensOf(selector);

            const baseTransform = transformStyles[i] || 'none';
            gsap.to(selector, {
                transform: baseTransform,
                scale: 1,
                zIndex: 20 + i,
                duration: 0.4,
                ease: 'back.out(1.4)',
                overwrite: 'auto'
            });
        });
    };

    return (
        <div
            className={`relative flex items-center justify-center ${className}`}
            style={{
                width: containerWidth,
                height: containerHeight
            }}
            ref={containerRef}
        >
            {data.map((item, idx) => (
                <div
                    key={idx}
                    className={`card card-${idx} absolute w-60 h-80 bg-white border-2 border-neutral-100 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center text-center p-8 transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]`}
                    style={{
                        transform: transformStyles[idx] || 'none',
                        zIndex: 20 + idx
                    }}
                    onMouseEnter={() => pushSiblings(idx)}
                    onMouseLeave={resetSiblings}
                >
                    <span className="text-6xl mb-6 filter drop-shadow-lg">{item.icon}</span>
                    <h4 className="text-[#1A1A1A] text-xs font-black uppercase tracking-[0.2em] leading-tight max-w-[150px]">{item.title}</h4>
                </div>
            ))}
        </div>
    );
}
