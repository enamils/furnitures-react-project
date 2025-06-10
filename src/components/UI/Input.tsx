import * as React from "react";

import classes from "./Input.module.css";

type InpuProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    id: string;
    className?: string;
}

const Input: React.FC<InpuProps> = ({label, id, className, ...rest}) => {
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