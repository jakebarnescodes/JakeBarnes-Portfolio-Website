import PlayerShipImage from '../../assets/minigame/playerShip.png'
import './PlayerShip.css';

export function PlayerShip({
    playerPosition,
    playerRotation
} : {
    playerPosition: { current: { x: number; y: number } };
    playerRotation: { current: number };
}) {
    return (
        <div
            className="player-ship"
            style={{
                left: `calc(50% + ${playerPosition.current.x}px)`,
                top: `calc(50% + ${playerPosition.current.y}px)`,
                transform: `translate(-50%, -50%) rotate(${playerRotation.current}rad)`
            }}
        >
            <img src={PlayerShipImage} />
        </div>
    );
}