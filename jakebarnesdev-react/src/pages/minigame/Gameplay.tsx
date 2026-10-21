import { useEffect, useRef, useState } from "react";
import { Lasers } from "./Lasers";
import { PlayerShip } from "./PlayerShip";
import { Asteroid } from "./Asteroid";
import HeartImage from '../../assets/minigame/heart.png'
import LasersSound from '../../assets/minigame/lasers.wav'
import ExplosionSound from '../../assets/minigame/explosion.wav'
import HitSound from '../../assets/minigame/hit.wav'
import './Gameplay.css'

export function Gameplay({
    score,
    setScene
}: {
    score: React.RefObject<number>;
    setScene: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [, setRenderFrame] = useState(0);
    const fps = useRef(0);
    const displayedFPS = useRef(0);
    const keysPressed = useRef<Record<string, boolean>>({});

    const playerPosition = useRef({ x: 0, y: 0 });
    const playerRotation = useRef(Math.random() * 2 * Math.PI);
    const playerMovementSpeed = 0.0005;
    const playerRotationSpeed = 0.005;
    const playerHitboxBaseRadius = 0.027;
    const playerVelocity = useRef({ x: 0, y: 0 });
    const playerMaxVelocity = 0.8;

    const lasersShot = useRef(true);
    const lasersPosition = useRef({ x: 0, y: 0 });
    const lasersRotation = useRef(0);
    const lasersMovementSpeed = playerMaxVelocity * 1.1;
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
    const asteroidHitboxBaseRadius = 0.027;
    const maxAsteroidCount = 200;
    const asteroidSpawnTimer = useRef(5 * 1000);

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
                    playSound(LasersSound);
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
                else {
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
                movementSpeed: Math.random() * 0.3,
                size: size
            };
            //setAsteroids((prev) => [...prev, newAsteroid]);
            asteroids.current.push(newAsteroid);
            return newAsteroid;
        }

        let playedSounds: Record<string, HTMLAudioElement> = {};
        function playSound(sound : string) {
            if (!playedSounds[sound]) {
                playedSounds[sound] = new Audio(sound);
            }
            playedSounds[sound].play();
        }

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        let animationId: number;
        let lastTime: number | null = null;
        function gameLoop(currentTime: number) {
            const deltaTime = lastTime === null ? 0 : currentTime - lastTime;
            fps.current = 1000 / deltaTime;
            lastTime = currentTime;

            const halfWidth = window.innerWidth / 2;
            const halfHeight = window.innerHeight / 2;

            let playerHit = false;

            // Check for Game Over
            if (lives <= 0) {
                setScene("gameover");
            }

            // Player Update
            let playerHitboxCalculatedRadius = playerHitboxBaseRadius * window.innerHeight;
            if (keysPressed.current['ArrowLeft']) {
                playerRotation.current -= playerRotationSpeed * deltaTime;
            }
            if (keysPressed.current['ArrowRight']) {
                playerRotation.current += playerRotationSpeed * deltaTime;
            }
            if (keysPressed.current['ArrowUp']) {
                playerVelocity.current.x += Math.cos(playerRotation.current) * playerMovementSpeed * deltaTime;
                playerVelocity.current.y += Math.sin(playerRotation.current) * playerMovementSpeed * deltaTime;
            }
            else {
                playerVelocity.current.x *= 0.99;
                playerVelocity.current.y *= 0.99;
            }
            let velocityMagnitude = Math.sqrt(playerVelocity.current.x * playerVelocity.current.x + playerVelocity.current.y * playerVelocity.current.y);
            if (velocityMagnitude > playerMaxVelocity) {
                playerVelocity.current.x = (playerVelocity.current.x / velocityMagnitude) * playerMaxVelocity;
                playerVelocity.current.y = (playerVelocity.current.y / velocityMagnitude) * playerMaxVelocity;
            }
            playerPosition.current.x += playerVelocity.current.x * deltaTime;
            playerPosition.current.y += playerVelocity.current.y * deltaTime;
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
            let newAsteroids: AsteroidData[] = [];
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
                        playSound(HitSound);
                        lasersShot.current = false;
                        score.current += 1;
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
                        playerHit = true;
                        return false;
                    }
                }
                return true;
            });

            // Check for Respawn
            if (playerHit) {
                playSound(ExplosionSound);
                setLives(lives - 1);
                playerVelocity.current = { x: 0, y: 0 };
                playerPosition.current = { x: 0, y: 0 };
                playerRotation.current = Math.random() * 2 * Math.PI;
                asteroids.current = [];
                playerHit = false;
            }

            asteroids.current.push(...newAsteroids);
            setAsteroidsState(asteroids.current);

            if (asteroids.current.length < 4) {
                createAsteroid(1, null);
            }

            animationId = requestAnimationFrame(gameLoop);
            setRenderFrame(frame => frame + 1);
        }
        animationId = requestAnimationFrame(gameLoop);

        const spawnInterval = window.setInterval(() => {
            if (asteroids.current.length < maxAsteroidCount) {
                createAsteroid(Math.random() + 0.5, null);
            }
            asteroidSpawnTimer.current = Math.max(1, 0.98 * asteroidSpawnTimer.current);
        }, asteroidSpawnTimer.current);

        return () => {
            cancelAnimationFrame(animationId);
            window.clearInterval(spawnInterval);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [lives, asteroidSpawnTimer.current]);

    useEffect(() => {
        lasersRotation.current = playerRotation.current.valueOf();
        lasersPosition.current.x = playerPosition.current.x;
        lasersPosition.current.y = playerPosition.current.y;
    }, [lasersShot.current]);

    useEffect(() => {
        setInterval(() => {
            displayedFPS.current = fps.current;
        }, 100);
    }, []);

    return (
        <div>
            <div className="hearts-container">
                {lives >= 1 ? (<img src={HeartImage} alt="Heart" />) : null}
                {lives >= 2 ? (<img src={HeartImage} alt="Heart" />) : null}
                {lives >= 3 ? (<img src={HeartImage} alt="Heart" />) : null}
            </div>
            
            <p
                className="instructions-container"
            >Arrow Keys to Move. Spacebar to Shoot.</p>
            <p
                className="score-text"
            >{"Score: " + score.current}</p>
            <p
                className="fps-counter"
            >{displayedFPS.current.toFixed(0)} FPS
            </p>
            <button className="menu-button" onClick={() => window.location.href = '/'}>
                Exit Minigame
            </button>
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