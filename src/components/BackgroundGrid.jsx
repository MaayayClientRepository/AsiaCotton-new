import React from 'react';

const BackgroundGrid = ({
    color = "#000",
    opacity = 0.1,
    cellSize = 40,
    strokeWidth = 1,
    className = ""
}) => {
    // Generate unique IDs for the pattern to avoid conflicts when multiple grids are used
    const uniqueId = React.useId().replace(/:/g, '');
    const gridPatternId = `grid-pattern-${uniqueId}`;

    return (
        <div
            className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
            style={{ zIndex: 0 }}
        >
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern
                        id={gridPatternId}
                        width={cellSize}
                        height={cellSize}
                        patternUnits="userSpaceOnUse"
                    >
                        {/* Crosshair at top-left intersection */}
                        <path
                            d="M -4 0 L 4 0 M 0 -4 L 0 4"
                            transform={`translate(0, 0)`}
                            stroke={color}
                            strokeWidth={strokeWidth * 1.5}
                            strokeLinecap="round"
                            opacity={opacity * 3}
                        />

                        {/* Dashed Grid Lines - or solid lines */}
                        <path
                            d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
                            fill="none"
                            stroke={color}
                            strokeWidth={strokeWidth}
                            opacity={opacity * 2}
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#${gridPatternId})`} />
            </svg>
        </div>
    );
};

export default BackgroundGrid;
