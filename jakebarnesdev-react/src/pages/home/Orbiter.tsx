import { useEffect, useState } from 'react';

export function Orbiter({ currentAngle, angleOffset, distance, children } : { currentAngle: number; angleOffset: number; distance: number, children: React.ReactNode }) {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [scale, setScale] = useState(0);

    useEffect(() => {
        setX(40 * distance * Math.cos(((currentAngle + angleOffset) * Math.PI) / 180));
        setY(29 * distance * Math.sin(((currentAngle + angleOffset) * Math.PI) / 180));
        setScale(1 + 0.3 * distance * Math.sin(((currentAngle + angleOffset) * Math.PI) / 180));
    }, [currentAngle]);

    return (
        <div
            className="orbiter"
            style={{
                transform: `translate(calc(${x}vw), calc(${25+y}vh))`,
                scale: `${scale}`,
                filter: `brightness(${scale})`,
                zIndex: `${y}`
            }}
        >
            {children}
        </div>
    );
}