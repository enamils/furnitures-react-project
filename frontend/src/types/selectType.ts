import * as React from "react";

export type SelectOptionType = {
    value: string;
    label: string;
};

export type SelectProps = {
    label?: string;
    id: string;
    className?: string;
    options: SelectOptionType[];
    error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;
