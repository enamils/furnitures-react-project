import * as React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Button.module.css";
import type {ButtonProps} from "../../types/buttonType.ts";

const Button: React.FC<ButtonProps> = ({
       as = "button",
       to = "#",
       label,
       className = "",
       type = "button",
       outlineButtonLink = false,
       darkButtonLink = false,
       onClick,
       ...rest
   }) => {

    const cssButton = [
        classes.btn,
        outlineButtonLink
            ? classes.btnOutline
            : darkButtonLink
                ? classes.btnDark
                : classes.btnSecondary,
        className
    ].filter(Boolean).join(" ");

    if (as === "link") {
        return (
            <NavLink to={to} className={cssButton} {...rest}>
                {label}
            </NavLink>
        );
    }

    return (
        <button type={type} className={`${cssButton} cursor-pointer`} onClick={onClick} {...rest}>
            {label}
        </button>
    );
};

export default Button;