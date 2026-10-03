import { useEffect, useState, useRef } from 'react';
import PlayerShipImage from '../../assets/planets/games.png'

export function PlayerShip() {
    const [, setRenderFrame] = useState(0);
    const keysPressed = useRef<Record<string, boolean>>({});
    const playerPosition = useRef({ x: 0, y: 0 });
    const playerRotation = useRef(0);
    const playerElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key.startsWith('Arrow')) {
                event.preventDefault();
            }
            keysPressed.current[event.key] = true;
        }

        function handleKeyUp(event: KeyboardEvent) {
            keysPressed.current[event.key] = false;
        }
        
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        
        let animationId: number;
        let lastTime: number | null = null;
        function gameLoop(currentTime: number) {
            const deltaTime = lastTime === null ? 0 : currentTime - lastTime;
            lastTime = currentTime;

            // Movement Input
            if (keysPressed.current['ArrowLeft']) {
                playerRotation.current -= 0.1 * deltaTime;
            }
            if (keysPressed.current['ArrowRight']) {
                playerRotation.current += 0.1 * deltaTime;
            }
            if (keysPressed.current['ArrowUp']) {
                const angleInRadians = playerRotation.current * Math.PI / 180;
                const movementSpeed = 0.2;
                playerPosition.current.x += Math.cos(angleInRadians) * movementSpeed * deltaTime;
                playerPosition.current.y += Math.sin(angleInRadians) * movementSpeed * deltaTime;
            }

            // Bound to window edges
            const width = playerElement.current?.offsetWidth ?? 0;
            const height = playerElement.current?.offsetHeight ?? 0;
            const angleInRadians = playerRotation.current * Math.PI / 180;
            const halfWidth = (
                Math.abs(Math.cos(angleInRadians)) * width +
                Math.abs(Math.sin(angleInRadians)) * height
            ) / 2;
            const halfHeight = (
                Math.abs(Math.sin(angleInRadians)) * width +
                Math.abs(Math.cos(angleInRadians)) * height
            ) / 2;
            const maxX = window.innerWidth / 2 - halfWidth;
            const maxY = window.innerHeight / 2 - halfHeight;

            playerPosition.current.x = maxX >= 0
                ? Math.max(-maxX, Math.min(maxX, playerPosition.current.x))
                : 0;
            playerPosition.current.y = maxY >= 0
                ? Math.max(-maxY, Math.min(maxY, playerPosition.current.y))
                : 0;

            animationId = requestAnimationFrame(gameLoop);
            setRenderFrame(frame => frame + 1);
        }
        animationId = requestAnimationFrame(gameLoop);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return (
        <div
            ref={playerElement}
            style={{
                position: 'fixed',
                left: `calc(50% + ${playerPosition.current.x}px)`,
                top: `calc(50% + ${playerPosition.current.y}px)`,
                transform: `translate(-50%, -50%) rotate(${playerRotation.current}deg)`
            }}
        >
            <img src={PlayerShipImage} />
        </div>
    );
}