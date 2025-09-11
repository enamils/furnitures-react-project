import * as React from "react";
import classes from "./Input.module.css";
import type { SelectProps } from "../../types/selectType";

const Select: React.FC<SelectProps> = ({ label, id, className, options, ...rest}) => {

    return (
        <div className={className}>
            {label && <label className={classes.labelControl} htmlFor={id}>{label}</label>}
            <select
                className={classes.selectControl}
                id={id}
                name={id}
                {...rest}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
