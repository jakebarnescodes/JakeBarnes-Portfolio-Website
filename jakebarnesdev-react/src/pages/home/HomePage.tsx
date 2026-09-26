import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { Logo } from '../../components/Logo';
import { Orbiter } from './Orbiter';
import blueskyImage from '../../assets/planets/bluesky.png';
import githubImage from '../../assets/planets/github.png';
import linkedinImage from '../../assets/planets/linkedin.png';
import emailImage from '../../assets/planets/email.png';
import gamesImage from '../../assets/planets/games.png';
import menuButtonImage from '../../assets/menu_button.webp';
import './HomePage.css'

export function HomePage({ isMobile }: { isMobile: boolean }) {
    const [angle, setAngle] = useState(0);


    useEffect(() => {
        setInterval(() => {
            setAngle((prevAngle) => (prevAngle + 0.125) % 360);
        }, 50);
    }, []);

    return (
        <>
            <Logo />
            {isMobile ? (
                <div className="mobile-menu-container">
                    <Link className="mobile-menu-option" to="/games"
                            style={{ color: 'rgb(255, 80, 80)' }}
                        >
                        <img src={menuButtonImage} />
                        <h2>Play My Games</h2>
                    </Link>
                    <a className="mobile-menu-option" target="_blank"
                        href="https://bsky.app/profile/jakebarnes.dev"
                            style={{ color: 'rgb(0, 121, 129)' }}
                        >
                        <img src={menuButtonImage} />
                        <h2>Follow on BlueSky</h2>
                    </a>
                    <a className="mobile-menu-option" target="_blank"
                        href="https://github.com/jakebarnescodes"
                            style={{ color: 'rgb(0, 0, 0)' }}
                        >
                        <img src={menuButtonImage} />
                        <h2>My GitHub</h2>
                    </a>
                    <a className="mobile-menu-option" target="_blank"
                        href="https://www.linkedin.com/in/jakesbarnes/"
                            style={{ color: 'rgb(0, 132, 255)' }}
                        >
                        <img src={menuButtonImage} />
                        <h2>My LinkedIn</h2>
                    </a>
                    <a className="mobile-menu-option" target="_blank"
                        href="mailto:jakebarnescodes@pm.me"
                            style={{ color: 'rgb(83, 83, 83)' }}
                        >
                        <img src={menuButtonImage} />
                        <h2>Contact Me</h2>
                    </a>
                </div>
            ) : (
                <div className="orbiter-container">
                    <Orbiter currentAngle={angle} angleOffset={0} distance={1}>
                        <a className="orbiter-content" target="_blank"
                            href="https://bsky.app/profile/jakebarnes.dev"
                            style={{ color: 'rgb(0, 238, 255)' }}
                        >
                            <img src={blueskyImage} />
                            <p>Follow on BlueSky</p>
                        </a>
                    </Orbiter>
                    <Orbiter currentAngle={angle} angleOffset={90} distance={0.8}>
                        <a className="orbiter-content" target="_blank"
                            href="https://github.com/jakebarnescodes"
                            style={{ color: 'rgb(255, 255, 255)' }}
                        >
                            <img src={githubImage} />
                            <p>My GitHub</p>
                        </a>
                    </Orbiter>
                    <Orbiter currentAngle={angle} angleOffset={180} distance={0.6}>
                        <a className="orbiter-content" target="_blank"
                            href="https://www.linkedin.com/in/jakesbarnes/"
                            style={{ color: 'rgb(0, 132, 255)' }}
                        >
                            <img src={linkedinImage} />
                            <p>My LinkedIn</p>
                        </a>
                    </Orbiter>
                    <Orbiter currentAngle={angle} angleOffset={270} distance={0.4}>
                        <a className="orbiter-content" target="_blank"
                            href="mailto:jakebarnescodes@pm.me"
                            style={{ color: 'rgb(180, 180, 180)' }}
                        >
                            <img src={emailImage} />
                            <p>Contact Me</p>
                        </a>
                    </Orbiter>
                    <Orbiter currentAngle={angle} angleOffset={0} distance={0.0}>
                        <NavLink className="orbiter-content"
                            to="/games"
                            style={{ color: 'rgb(255, 116, 116)' }}
                        >
                            <img src={gamesImage} />
                            <p>Play My Games</p>
                        </NavLink>
                    </Orbiter>
                </div>
            )}
        </>
    );
}