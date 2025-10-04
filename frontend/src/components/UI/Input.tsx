import * as React from "react";
import type {InputHTMLAttributes, TextareaHTMLAttributes} from "react";
import type {InputType} from "../../types/inputType.ts";

import classes from "./Input.module.css";

const Input: React.FC<InputType> = ({label, textarea, id, className, error, ...rest}) => {
    const inputClassName = `${classes.inputControl} ${error ? 'border-red-500 border-2' : ''}`;
    const textareaClassName = `${classes.textareaControl} ${error ? 'border-red-500 border-2' : ''}`;

    return (
        <div className={className}>
            {label && <label className={classes.labelControl} htmlFor={id}>{label}</label>}
            {textarea ?
                <textarea className={textareaClassName} id={id} name={id} {...rest as TextareaHTMLAttributes<HTMLTextAreaElement>} /> :
                <input className={inputClassName} id={id} name={id} {...rest as InputHTMLAttributes<HTMLInputElement>} />
            }
            {error && (
                <div className="text-red-500 text-sm mt-1">
                    {error}
                </div>
            )}
        </div>
    );
}

export default Input;