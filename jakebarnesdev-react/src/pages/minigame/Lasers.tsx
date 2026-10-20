import LasersImage from '../../assets/minigame/lasers.png'
import './Lasers.css'

export function Lasers({
    lasersPosition,
    lasersRotation
}: {
    lasersPosition: { current: { x: number; y: number } },
    lasersRotation: { current: number }
}) {
    return (
        <div
            className="lasers"
            style={{
                left: `calc(50% + ${lasersPosition.current.x}px)`,
                top: `calc(50% + ${lasersPosition.current.y}px)`,
                transform: `translate(-50%, -50%) rotate(${lasersRotation.current}rad)`
            }}>
            <img src={LasersImage} />
        </div>
    );
}