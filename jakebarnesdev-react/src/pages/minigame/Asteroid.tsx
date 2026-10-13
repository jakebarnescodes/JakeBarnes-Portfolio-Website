import AsteroidImage from '../../assets/minigame/asteroid.png'
import './Asteroid.css'

export function Asteroid({
    asteroidPosition,
    asteroidRotation,
    asteroidSize
}:{
    asteroidPosition: { x: number; y: number };
    asteroidRotation: number;
    asteroidSize: number;
}) {
    return (
        <div
            className="asteroid"
            style={{
                left: `calc(50% + ${asteroidPosition.x}px)`,
                top: `calc(50% + ${asteroidPosition.y}px)`,
                transform: `translate(-50%, -50%) rotate(${asteroidRotation}rad)`
            }}
        >
            <img
                src={AsteroidImage}
                alt="Asteroid"
                style={{
                    height: `calc(${asteroidSize} * 8vh)`
                }}
            />
        </div>
    );
}