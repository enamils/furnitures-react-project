import * as React from "react";
import {NavLink} from "react-router-dom";

import MenuLinks from "./MenuLinks.tsx";
import ClientCart from "./ClientCart.tsx";

import classes from "./MainNavigation.module.css";
import {useState} from "react";

const MainNavigation: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(prev => !prev);
    };

    return (
        <header role="banner">
            <div className={`${classes.navbar} py-4 px-10`}>
                <div className="container max-w-screen-xl md:flex items-center justify-between mx-auto">
                    <div className="flex md:block">
                        <NavLink to="/" className="text-white text-3xl font-semibold grow inline-block">
                            Furni
                            <span className="opacity-40">.</span>
                        </NavLink>

                        <button
                            className="md:hidden text-white p-2"
                            onClick={toggleMobileMenu}
                            aria-label={mobileMenuOpen ? "Close" : "Open"}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileMenuOpen
                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                }
                            </svg>
                        </button>
                    </div>

                    <nav
                        role="navigation"
                        className={`
                            md:flex flex-col md:flex-row md:p-0 mt-4 m:mt-0
                            transition-all duration-600 ease-in-out
                            ${mobileMenuOpen
                            ? 'max-h-96 opacity-100 visible'
                            : 'max-h-0 opacity-0 invisible md:opacity-100 md:visible md:max-h-96'}
                        `}
                    >
                        <MenuLinks/>
                        <ClientCart/>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default MainNavigation;