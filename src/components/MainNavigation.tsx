import * as React from "react";
import {NavLink} from "react-router-dom";

import MenuLinks from "./MenuLinks.tsx";
import ClientCart from "./ClientCart.tsx";

import classes from "./MainNavigation.module.css";

const MainNavigation: React.FC = () => {
    return (
        <header role="banner">
            <div className={`${classes.navbar} py-4 px-10`}>
                <div className="container max-w-screen-xl md:flex items-center justify-between mx-auto">
                    <NavLink to="/" className="text-white text-3xl font-semibold grow inline-block">
                        Furni
                        <span className="opacity-40">.</span>
                    </NavLink>
                    <nav role="navigation" className="md:flex">
                        <MenuLinks/>
                        <ClientCart/>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default MainNavigation;