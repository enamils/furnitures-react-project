import * as React from "react";
import {NavLink} from "react-router-dom";

import classes from "./MenuLinks.module.css";

const MenuLinks: React.FC = () => {
    const isActiveState = ({ isActive }: { isActive: boolean }) => `${isActive ? classes.active : ""} font-medium md:py-2 md:px-4`;

    return (
        <ul className={`${classes.menuLinks} md:flex items-center`}>
            <li className="lg:mx-4">
                <NavLink to="/" className={isActiveState} end> Home</NavLink>
            </li>
            <li className="lg:mx-4">
                <NavLink
                    to="/shop" className={isActiveState}>Shop</NavLink>
            </li>
            <li className="lg:mx-4">
                <NavLink to="/about" className={isActiveState}>About us</NavLink>
            </li>
            <li className="lg:mx-4">
                <NavLink to="/services" className={isActiveState}>Services</NavLink>
            </li>
            <li className="lg:mx-4">
                <NavLink to="/blog" className={isActiveState}>Blog</NavLink>
            </li>
            <li className="lg:mx-4">
                <NavLink to="/contact" className={isActiveState}>Contact us</NavLink>
            </li>
        </ul>
    );
}

export default MenuLinks;