import * as React from "react";
import {NavLink} from "react-router-dom";
import SpotLightedIcon from "./UI/SpotLightedIcon.tsx";
import {faFacebookF, faXTwitter, faInstagram, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";

const FooterContent: React.FC = () => {
    return (
        <div className="lg:flex gap-4 w-full">
            <div className="lg:w-4/12 mt-12 lg:mt-0">
                <NavLink to="/" className="text-[color:var(--primary)] text-3xl font-semibold grow inline-block mb-6">
                    Furni.
                </NavLink>
                <p className="leading-7 mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Beatae cupiditate distinctio dolore eum explicabo in, necessitatibus numquam praesentium repellat!
                </p>
                <ul className="flex gap-2">
                    <li>
                        <SpotLightedIcon icon={faFacebookF}/>
                    </li>
                    <li>
                        <SpotLightedIcon icon={faXTwitter}/>
                    </li>
                    <li>
                        <SpotLightedIcon icon={faInstagram}/>
                    </li>
                    <li>
                        <SpotLightedIcon icon={faLinkedinIn}/>
                    </li>
                </ul>
            </div>
            <div className="lg:w-8/12 mt-12">
                <ul className="flex flex-wrap lg:flex-nowrap gap-2 mt-3 text-[color:var(--dark)]">
                    <li className="w-5/12 lg:w-3/12">
                        <ul>
                            <li className="mb-2.5">About Us</li>
                            <li className="mb-2.5">Services</li>
                            <li className="mb-2.5">Blog</li>
                            <li>Contact us</li>
                        </ul>
                    </li>
                    <li className="w-5/12 lg:w-3/12">
                        <ul>
                            <li className="mb-2.5">Support</li>
                            <li className="mb-2.5">Knowledge base</li>
                            <li>Live chat</li>
                        </ul>
                    </li>
                    <li className="mt-4 lg:mt-0 w-5/12 lg:w-3/12">
                        <ul>
                            <li className="mb-2.5">Jobs</li>
                            <li className="mb-2.5">Our team</li>
                            <li className="mb-2.5">Leadership</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </li>
                    <li className="mt-4 lg:mt-0 w-5/12 lg:w-3/12">
                        <ul>
                            <li className="mb-2.5">Nordic Chair</li>
                            <li className="mb-2.5">Kruzo Aero</li>
                            <li>Ergonomic Chair</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default FooterContent;