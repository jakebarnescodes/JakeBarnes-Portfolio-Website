import BlueSkyIcon from '../assets/planets/bluesky.png';
import GitHubIcon from '../assets/planets/github.png';
import LinkedInIcon from '../assets/planets/linkedin.png';
import EmailIcon from '../assets/planets/email.png';
import './Footer.css'

export function Footer() {
    return (
        <div className="footer">
            <a href="https://github.com/jakebarnescodes">
                <img className="social_icon" src={GitHubIcon} alt="GitHub" />
            </a>
            <a href="https://bsky.app/profile/jakebarnes.dev">
                <img className="social_icon" src={BlueSkyIcon} alt="BlueSky" />
            </a>
            <a href="https://www.linkedin.com/in/jakesbarnes/">
                <img className="social_icon" src={LinkedInIcon} alt="LinkedIn" />
            </a>
            <a href="mailto:jakebarnescodes@pm.me">
                <img className="social_icon" src={EmailIcon} alt="Email" />
            </a>
        </div>
    );
}