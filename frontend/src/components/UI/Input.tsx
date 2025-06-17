import * as React from "react";
import type {InputType} from "../../types/inputType.ts";

import classes from "./Input.module.css";

const Input: React.FC<InputType> = ({label, textarea, id, className, ...rest}) => {

    return (
        <div className={className}>
            {label && <label className={classes.labelControl} htmlFor={id}>{label}</label>}
            {textarea ?
                <textarea className={classes.textareaControl} id={id} name={id} {...rest} /> :
                <input className={classes.inputControl} id={id} name={id} required {...rest} />
            }
        </div>
    );
}

export default Input;