import * as React from "react";

export type InputType = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    id: string;
    className?: string;
}
