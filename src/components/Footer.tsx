import * as React from "react";
import sofaImg from "../assets/images/sofa.png";
import Subscribe from "./Subscribe.tsx";

const Footer: React.FC = () => {
    return (
        <footer role="contentinfo" className="bg-white pt-20 pb-20">
            <div className="container max-w-screen-xl mx-auto relative">
                <div className="absolute -top-[200px] right-0 z-1">
                    <img src={sofaImg} alt="sofa" className="max-w-sm"/>
                </div>
            </div>
            <div className="px-10 py-4">
                <div className="container max-w-screen-xl mx-auto relative">
                    <Subscribe/>
                </div>
            </div>
        </footer>
    );
}

export default Footer;