import { useEffect, useState } from 'react';

export function Orbiter({ currentAngle, angleOffset, distance, children } : { currentAngle: number; angleOffset: number; distance: number, children: React.ReactNode }) {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    useEffect(() => {
        setX(40 * distance * Math.cos(((currentAngle + angleOffset) * Math.PI) / 180));
        setY(31 * distance * Math.sin(((currentAngle + angleOffset) * Math.PI) / 180));
    }, [currentAngle]);

    return (
        <div
            className="orbiter"
            style={{transform: `translate(calc(${x}vw), calc(${30+y}vh))`}}
        >
            {children}
        </div>
    );
}