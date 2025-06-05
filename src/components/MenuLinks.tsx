import * as React from "react";
import {NavLink} from "react-router-dom";

const MenuLinks: React.FC = () => {
    return (
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/shop">Shop</NavLink>
            </li>
            <li>
                <NavLink to="/about">About us</NavLink>
            </li>
            <li>
                <NavLink to="/services">Services</NavLink>
            </li>
            <li>
                <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
                <NavLink to="/contact">Contact us</NavLink>
            </li>
        </ul>
    );
}

export default MenuLinks;