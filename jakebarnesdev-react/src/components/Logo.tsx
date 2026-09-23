import LogoImage from '../assets/logo.png';
import './Logo.css'

export function Logo() {
    return (
        <div>
            <img className="jbd_logo" src={LogoImage} alt="" />
        </div>
    );
}