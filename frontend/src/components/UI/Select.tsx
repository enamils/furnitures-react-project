import * as React from "react";
import classes from "./Input.module.css";
import type { SelectProps } from "../../types/selectType";

const Select: React.FC<SelectProps> = ({ label, id, className, options, error, ...rest}) => {
    const selectClassName = `${classes.selectControl} ${error ? 'border-red-500 border-2' : ''}`;

    return (
        <div className={className}>
            {label && <label className={classes.labelControl} htmlFor={id}>{label}</label>}
            <select
                className={selectClassName}
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
            {error && (
                <div className="text-red-500 text-sm mt-1">
                    {error}
                </div>
            )}
        </div>
    );
};

export default Select;
