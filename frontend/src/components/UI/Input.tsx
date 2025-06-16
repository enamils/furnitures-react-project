import * as React from "react";
import type {InputType} from "../../types/inputType.ts";

import classes from "./Input.module.css";

const Input: React.FC<InputType> = ({label, id, className, ...rest}) => {
    const cssInput = [
        classes.inputControl,
        className
    ].filter(Boolean).join(" ");

    return (
        <>
            {label && <label className={classes.labelControl} htmlFor={id}>{label}</label>}
            <input className={cssInput} id={id} name={id} required {...rest} />
        </>
    );
}

export default Input;