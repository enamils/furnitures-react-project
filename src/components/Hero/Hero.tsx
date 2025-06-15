import * as React from "react";
import Button from "../UI/Button.tsx";
import heroImg from "../../assets/images/couch.png";
import classes from "./Hero.module.css";

type HeroProps = {
    title: string,
    text: string,
}

const Hero: React.FC<HeroProps> = ({title, text}) => {
    return (
        <div className={classes.hero}>
            <div className="px-10 py-4">
                <div className="container max-w-screen-xl md:flex mx-auto">
                    <div className="lg:flex w-full lg:gap-4">
                        <div className="w-full lg:w-5/12">
                            <h1 className="text-white font-bold text-3xl xl:text-5xl 2xl:text-6xl mb-8">{title}</h1>
                            <p className="mb-6">{text}</p>
                            <div>
                                <Button as="link" to="/shop" label="Shop Now" className="mr-2" />
                                <Button as="link" to="/contact" label="Explore" outlineButtonLink />
                            </div>
                        </div>
                        <div className="w-full lg:w-7/12">
                            <div className="relative">
                                <img src={heroImg} alt={title} loading="lazy"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;