import * as React from "react";

interface BaseInputProps {
    label?: string;
    id: string;
    className?: string;
}

type InputProps = BaseInputProps & {
    textarea?: false;
} & React.InputHTMLAttributes<HTMLInputElement>;

type TextAreaProps = BaseInputProps & {
    textarea: true;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export type InputType = InputProps | TextAreaProps;