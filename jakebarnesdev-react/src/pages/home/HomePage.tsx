import { useState, useEffect } from 'react';
import { Logo } from '../../components/Logo';
import { Orbiter } from './Orbiter';
import { Planet } from './Planet';
import blueskyImage from '../../assets/planets/bluesky.png';
import githubImage from '../../assets/planets/github.png';
import linkedinImage from '../../assets/planets/linkedin.png';
import emailImage from '../../assets/planets/email.png';
import gamesImage from '../../assets/planets/games.png';
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
                <div className="mobile-planet-container">
                    <Planet
                        name="Play My Games"
                        isExternal={false}
                        link="/games"
                        imageSrc={gamesImage}
                        color="rgb(244, 45, 60)"
                    />
                    <Planet
                        name="Follow my BlueSky"
                        isExternal={true}
                        link="https://bsky.app/profile/jakebarnes.dev"
                        imageSrc={blueskyImage}
                        color="rgb(0, 106, 255)"
                    />
                    <Planet
                        name="My GitHub"
                        isExternal={true}
                        link="https://github.com/jakebarnescodes"
                        imageSrc={githubImage}
                        color="rgb(240, 81, 51)"
                    />
                    <Planet
                        name="My LinkedIn"
                        isExternal={true}
                        link="https://www.linkedin.com/in/jakesbarnes/"
                        imageSrc={linkedinImage}
                        color="rgb(2, 116, 179)"
                    />
                    <Planet
                        name="Email Me"
                        isExternal={true}
                        link="mailto:jakebarnescodes@pm.me"
                        imageSrc={emailImage}
                        color="rgb(180, 180, 180)"
                    />
                </div>
            ) : (
                <div className="orbiter-container">
                    <Orbiter currentAngle={angle} angleOffset={0} distance={0.0}>
                        <Planet
                            name="Play My Games"
                            isExternal={false}
                            link="/games"
                            imageSrc={gamesImage}
                            color="rgb(244, 45, 60)"
                        />
                    </Orbiter>
                    <Orbiter currentAngle={angle} angleOffset={0} distance={0.4}>
                        <Planet
                            name="Follow my BlueSky"
                            isExternal={true}
                            link="https://bsky.app/profile/jakebarnes.dev"
                            imageSrc={blueskyImage}
                            color="rgb(0, 106, 255)"
                        />
                    </Orbiter>
                    <Orbiter currentAngle={angle} angleOffset={90} distance={0.6}>
                        <Planet
                            name="My GitHub"
                            isExternal={true}
                            link="https://github.com/jakebarnescodes"
                            imageSrc={githubImage}
                            color="rgb(240, 81, 51)"
                        />
                    </Orbiter>
                    <Orbiter currentAngle={angle} angleOffset={180} distance={0.8}>
                        <Planet
                            name="My LinkedIn"
                            isExternal={true}
                            link="https://www.linkedin.com/in/jakesbarnes/"
                            imageSrc={linkedinImage}
                            color="rgb(2, 116, 179)"
                        />
                    </Orbiter>
                    <Orbiter currentAngle={angle} angleOffset={270} distance={1.0}>
                        <Planet
                            name="Email Me"
                            isExternal={true}
                            link="mailto:jakebarnescodes@pm.me"
                            imageSrc={emailImage}
                            color="rgb(180, 180, 180)"
                        />
                    </Orbiter>
                </div>
            )}
        </>
    );
}