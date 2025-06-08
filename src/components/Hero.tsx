import * as React from "react";
import classes from "./Hero.module.css";

import heroImg from "../assets/images/couch.png"; // Adjust the path as necessary

type heroProps = {
    title: string,
    text: string,
}

const Hero: React.FC<heroProps> = (props) => {
    return (
        <div className={classes.hero}>
            <div className="px-10 py-4">
                <div className="container max-w-6xl md:flex mx-auto">
                    <div className="lg:flex w-full lg:gap-4">
                        <div className="w-full lg:w-5/12">
                            <h1 className="text-white font-bold text-3xl xl:text-4xl 2xl:text-5xl mb-8">{props.title}</h1>
                            <p>{props.text}</p>
                        </div>
                        <div className="w-full lg:w-7/12">
                            <div className="relative">
                                <img src={heroImg} alt={props.title}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;