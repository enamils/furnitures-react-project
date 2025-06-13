import * as React from "react";
import Subscribe from "./Subscribe.tsx";
import FooterContent from "./FooterContent.tsx";
import sofaImg from "../../assets/images/sofa.png";

const Footer: React.FC = () => {
    return (
        <footer role="contentinfo" className="bg-white pt-20 pb-20">
            <div className="container max-w-screen-xl mx-auto relative">
                <div className="absolute -top-[200px] right-0 z-1">
                    <img src={sofaImg} alt="sofa" className="max-w-sm"/>
                </div>
            </div>
            <div className="px-10">
                <div className="container max-w-screen-xl mx-auto relative">
                    <Subscribe/>
                </div>
            </div>
            <div className="px-10 mb-12">
                <div className="container max-w-screen-xl mx-auto relative">
                    <FooterContent/>
                </div>
            </div>
            <div className="px-10">
                <div className="container max-w-screen-xl mx-auto relative border-t-1 border-[color:var(--light)]">
                    <div className="flex flex-col md:flex-row md:justify-between mt-6">
                        <p>Copyright ©2025. All Rights Reserved.</p>
                        <div className="flex gap-4 text-[color:var(--dark)]">
                            <p>Terms & Conditions</p>
                            <p>Privacy Policy</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;