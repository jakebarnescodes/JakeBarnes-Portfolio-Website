import { useEffect, useRef, useState } from "react";
import { Lasers } from "./Lasers";
import { PlayerShip } from "./PlayerShip";
import { Asteroid } from "./Asteroid";
import HeartImage from '../../assets/minigame/heart.png'
import './Gameplay.css'

export function Gameplay() {
    const [, setRenderFrame] = useState(0);
    const keysPressed = useRef<Record<string, boolean>>({});

    const playerPosition = useRef({ x: 0, y: 0 });
    const playerRotation = useRef(0);
    const playerMovementSpeed = 0.2;
    const playerRotationSpeed = 0.005;
    const playerHitboxBaseRadius = 0.03;

    const lasersShot = useRef(false);
    const lasersPosition = useRef({ x: 0, y: 0 });
    const lasersRotation = useRef(0);
    const lasersMovementSpeed = 0.4;
    const lasersHitboxBaseRadius = 0.03;

    type AsteroidData = {
        id: string;
        position: { x: number; y: number };
        rotation: number;
        movementSpeed: number;
        size: number;
    };
    const asteroids = useRef<AsteroidData[]>([]);
    const [asteroidsState, setAsteroidsState] = useState<AsteroidData[]>([]);
    const asteroidHitboxBaseRadius = 0.03;
    const maxAsteroidCount = 200;

    const [lives, setLives] = useState(3);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key.startsWith('Arrow')) {
                event.preventDefault();
            }
            else if (event.key === ' ') {
                event.preventDefault();
                if (!event.repeat && !lasersShot.current) {
                    lasersShot.current = true;
                }
            }
            keysPressed.current[event.key] = true;
        }

        function handleKeyUp(event: KeyboardEvent) {
            keysPressed.current[event.key] = false;
        }

        function createAsteroid(size: number = 1, spawnPosition: { x: number; y: number } | null = null) {
            let rotation = Math.random() * 2 * Math.PI;
            let x = -window.innerWidth / 2;
            let y = -window.innerHeight / 2;
            if (spawnPosition === null) {
                if (Math.random() > 0.5) {
                    // Top or Bottom
                    if (Math.random() > 0.5) {
                        // Bottom
                        y = window.innerHeight / 2;
                    }
                    x = (Math.random() * window.innerWidth) - (window.innerWidth / 2);
                }
                if (Math.random() > 0.5) {
                    // Left or Right
                    if (Math.random() > 0.5) {
                        // Right
                        x = window.innerWidth / 2;
                    }
                    y = (Math.random() * window.innerHeight) - (window.innerHeight / 2);
                }
            }
            else {
                x = spawnPosition.x;
                y = spawnPosition.y;
            }
            const newAsteroid: AsteroidData = {
                id: crypto.randomUUID(),
                position: { x: x, y: y },
                rotation: rotation,
                movementSpeed: Math.random() * 0.2,
                size: size
            };
            //setAsteroids((prev) => [...prev, newAsteroid]);
            asteroids.current.push(newAsteroid);
            return newAsteroid;
        }

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        let animationId: number;
        let lastTime: number | null = null;
        function gameLoop(currentTime: number) {
            const deltaTime = lastTime === null ? 0 : currentTime - lastTime;
            lastTime = currentTime;

            const halfWidth = window.innerWidth / 2;
            const halfHeight = window.innerHeight / 2;

            // Player Update
            let playerHitboxCalculatedRadius = playerHitboxBaseRadius * window.innerHeight;
            if (keysPressed.current['ArrowLeft']) {
                playerRotation.current -= playerRotationSpeed * deltaTime;
            }
            if (keysPressed.current['ArrowRight']) {
                playerRotation.current += playerRotationSpeed * deltaTime;
            }
            if (keysPressed.current['ArrowUp']) {
                playerPosition.current.x += Math.cos(playerRotation.current) * playerMovementSpeed * deltaTime;
                playerPosition.current.y += Math.sin(playerRotation.current) * playerMovementSpeed * deltaTime;
            }
            //if (keysPressed.current['ArrowDown']) {
            //    playerPosition.current.x -= Math.cos(playerRotation.current) * playerMovementSpeed * deltaTime;
            //    playerPosition.current.y -= Math.sin(playerRotation.current) * playerMovementSpeed * deltaTime;
            //}
            if (playerPosition.current.x < -halfWidth) playerPosition.current.x = halfWidth;
            if (playerPosition.current.x > halfWidth) playerPosition.current.x = -halfWidth;
            if (playerPosition.current.y < -halfHeight) playerPosition.current.y = halfHeight;
            if (playerPosition.current.y > halfHeight) playerPosition.current.y = -halfHeight;

            // Lasers Update
            let lasersHitboxCalculatedRadius = lasersHitboxBaseRadius * window.innerHeight;
            if (lasersShot.current) {
                lasersPosition.current.x += Math.cos(lasersRotation.current) * lasersMovementSpeed * deltaTime;
                lasersPosition.current.y += Math.sin(lasersRotation.current) * lasersMovementSpeed * deltaTime;
                if (lasersPosition.current.x < -halfWidth || lasersPosition.current.x > halfWidth || lasersPosition.current.y < -halfHeight || lasersPosition.current.y > halfHeight) {
                    lasersShot.current = false;
                }
            }

            // Asteroids Update
            const newAsteroids: AsteroidData[] = [];
            asteroids.current = asteroids.current.filter((asteroid) => {
                asteroid.position.x += Math.cos(asteroid.rotation) * asteroid.movementSpeed * deltaTime;
                asteroid.position.y += Math.sin(asteroid.rotation) * asteroid.movementSpeed * deltaTime;
                if (asteroid.position.x < -halfWidth) asteroid.position.x = halfWidth;
                if (asteroid.position.x > halfWidth) asteroid.position.x = -halfWidth;
                if (asteroid.position.y < -halfHeight) asteroid.position.y = halfHeight;
                if (asteroid.position.y > halfHeight) asteroid.position.y = -halfHeight;
                let asteroidHitboxCalculatedRadius = asteroidHitboxBaseRadius * window.innerHeight * asteroid.size;
                // Lasers Collision
                if (lasersShot.current) {
                    const dx = asteroid.position.x - lasersPosition.current.x;
                    const dy = asteroid.position.y - lasersPosition.current.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < asteroidHitboxCalculatedRadius + lasersHitboxCalculatedRadius) {
                        lasersShot.current = false;
                        if (asteroid.size > 0.6 && asteroids.current.length < maxAsteroidCount) {
                            newAsteroids.push(createAsteroid(asteroid.size * 0.75, { x: asteroid.position.x, y: asteroid.position.y }));
                            newAsteroids.push(createAsteroid(asteroid.size * 0.75, { x: asteroid.position.x, y: asteroid.position.y }));
                        }
                        return false;
                    }
                }
                // Player Collision
                {
                    const dx = asteroid.position.x - playerPosition.current.x;
                    const dy = asteroid.position.y - playerPosition.current.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < asteroidHitboxCalculatedRadius + playerHitboxCalculatedRadius) {
                        setLives(lives - 1);
                        if (lives <= 0) {
                            console.log("Game Over");
                        }
                        return false;
                    }
                }
                return true;
            });
            asteroids.current.push(...newAsteroids);
            setAsteroidsState(asteroids.current);

            if (asteroids.current.length <= 1) {
                createAsteroid(1, null);
            }

            animationId = requestAnimationFrame(gameLoop);
            setRenderFrame(frame => frame + 1);
        }
        animationId = requestAnimationFrame(gameLoop);

        const spawnTimer : number = 5;
        const spawnInterval = window.setInterval(() => {
            if (asteroids.current.length < maxAsteroidCount) {
                createAsteroid(1, null);
            }
        }, 1000 * spawnTimer);

        return () => {
            cancelAnimationFrame(animationId);
            window.clearInterval(spawnInterval);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [lives]);

    useEffect(() => {
        console.log(lasersShot);
        lasersRotation.current = playerRotation.current.valueOf();
        lasersPosition.current.x = playerPosition.current.x;
        lasersPosition.current.y = playerPosition.current.y;
    }, [lasersShot.current]);

    return (
        <div>
            <div className="hearts-container">
                {lives >= 1 ? (<img src={HeartImage} alt="Heart" />) : null}
                {lives >= 2 ? (<img src={HeartImage} alt="Heart" />) : null}
                {lives >= 3 ? (<img src={HeartImage} alt="Heart" />) : null}
            </div>
            <p>{asteroids.current.length}</p>
            <p>{asteroidsState.length}</p>
            <PlayerShip
                playerPosition={playerPosition}
                playerRotation={playerRotation}
            />
            {lasersShot.current &&
                <Lasers
                    lasersPosition={lasersPosition}
                    lasersRotation={lasersRotation}
                />
            }
            {asteroidsState.map((asteroid) => (
                <Asteroid
                    key={asteroid.id}
                    asteroidPosition={asteroid.position}
                    asteroidRotation={asteroid.rotation}
                    asteroidSize={asteroid.size}
                />
            ))}
        </div>
    );
}