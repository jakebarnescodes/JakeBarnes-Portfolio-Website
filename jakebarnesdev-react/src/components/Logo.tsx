import { NavLink } from 'react-router/internal/react-server-client';
import LogoImage from '../assets/logo.png';
import './Logo.css'

export function Logo() {
    return (
        <div>
            <NavLink to="/">
                <img className="jbd_logo" src={LogoImage} alt="" />
            </NavLink>
        </div>
    );
}