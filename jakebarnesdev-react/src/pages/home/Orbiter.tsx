export function Orbiter({ currentAngle, angleOffset, distance, children } : { currentAngle: number; angleOffset: number; distance: number, children: React.ReactNode }) {
    const angle = ((currentAngle + angleOffset) * Math.PI) / 180;
    const x = 40 * distance * Math.cos(angle);
    const y = 29 * distance * Math.sin(angle);
    const scale = 1 + 0.3 * distance * Math.sin(angle);

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