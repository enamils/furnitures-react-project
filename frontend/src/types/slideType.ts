import React from "react";

export type SlideType = {
    content: string;
    image: string;
    name: string;
    position: string;
};

export type SliderButtonProps = {
    className: string,
    rightArrow?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

