"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ColourfulText({ text }) {
    const colors = [
        "rgb(45, 106, 106)",  // Teal
        "rgb(225, 29, 72)",   // Crimson
        "rgb(255, 255, 255)", // White
        "rgb(107, 112, 92)",  // Sage
        "rgb(255, 255, 255)", // White (Replaced Dark Slate)
        "rgb(255, 255, 255)", // White (Replaced Dark Red)
        "rgb(15, 118, 110)",  // Teal-Green
    ];

    // Shuffle colors once on mount for a unique look
    const shuffledColors = React.useMemo(() =>
        [...colors].sort(() => Math.random() - 0.5),
        []);

    return text.split("").map((char, index) => (
        <motion.span
            key={`${char}-${index}`}
            initial={{
                y: 0,
                opacity: 0,
                filter: "blur(15px)",
                scale: 0.8,
                color: "#ffffff"
            }}
            whileInView={{
                color: [
                    "#ffffff", // Start white
                    "#ffffff", // Stay white for a moment
                    shuffledColors[index % shuffledColors.length] // End with assigned color
                ],
                y: [0, -10, 0],
                scale: [1, 1.1, 1],
                filter: ["blur(15px)", "blur(2px)", "blur(0px)"],
                opacity: [0, 1, 1],
            }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
                duration: 1.2,
                delay: index * 0.03,
                times: [0, 0.4, 1], // Timing for the color and blink
                ease: [0.22, 1, 0.36, 1]
            }}
            className="inline-block whitespace-pre font-sans tracking-tight transform-gpu"
        >
            {char}
        </motion.span>
    ));
}
