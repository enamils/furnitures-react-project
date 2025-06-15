import * as React from "react";

export type ButtonProps = {
    as?: "button" | "link",
    to?: string, // pour NavLink
    label: string,
    className?: string,
    type?: "button" | "submit", // pour button
    outlineButtonLink?: boolean,
    darkButtonLink?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
}