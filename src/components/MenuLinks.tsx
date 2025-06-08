import * as React from "react";
import {NavLink} from "react-router-dom";

import classes from "./MenuLinks.module.css";

const MenuLinks: React.FC = () => {
    return (
        <ul className={`${classes.menulinks} md:flex`}>
            <li className="lg:mx-4">
                <NavLink to="/" className="font-medium md:py-2 md:px-4">Home</NavLink>
            </li>
            <li className="lg:mx-4">
                <NavLink to="/shop" className="font-medium md:py-2 md:px-4">Shop</NavLink>
            </li>
            <li className="lg:mx-4">
                <NavLink to="/about" className="font-medium md:py-2 md:px-4">About us</NavLink>
            </li>
            <li className="lg:mx-4">
                <NavLink to="/services" className="font-medium md:py-2 md:px-4">Services</NavLink>
            </li>
            <li className="lg:mx-4">
                <NavLink to="/blog" className="font-medium md:py-2 md:px-4">Blog</NavLink>
            </li>
            <li className="lg:mx-4">
                <NavLink to="/contact" className="font-medium md:py-2 md:px-4">Contact us</NavLink>
            </li>
        </ul>
    );
}

export default MenuLinks;