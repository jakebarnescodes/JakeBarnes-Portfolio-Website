import { useState } from 'react';
import LogoImageJB from '../assets/logo_JAKEBARNES.png';
import LogoImageD from '../assets/logo_DEV.png';
import './Logo.css'

export function Logo() {
    const [rotation, setRotation] = useState(0);

    const addRotation = () => {
        setRotation(rotation + 20);
    }

    return (
        <div className="jbd_logo">
            <img className="jbd_logo_jb" src={LogoImageJB} alt="" />
            <img
                className="jbd_logo_d"
                src={LogoImageD}
                alt="" 
                style={{ transform: `rotate(${rotation}deg)` }}
                onClick={addRotation}
            />
        </div>
    );
}