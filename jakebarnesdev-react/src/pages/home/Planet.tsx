import { NavLink } from "react-router";
import './Planet.css';

export function Planet({ name, isExternal, link, imageSrc, color} : {
    name: string;
    isExternal: boolean;
    link: string;
    imageSrc: string;
    color: string;
}) {
    return (
        <>
            {isExternal ? (
                <a className="planet" target="_blank"
                    href={link}
                    style={{ color: color }}
                >
                    <img src={imageSrc} />
                    <p>{name}</p>
                </a>
            ) : (
                <NavLink className="planet"
                    to={link}
                    style={{ color: color }}
                >
                    <img src={imageSrc} />
                    <p>{name}</p>
                </NavLink>
            )}
        </>
    );
}