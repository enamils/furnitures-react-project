import React from "react";

export type AccordionProps = {
    title: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    defaultOpen?: boolean;
    id?: string;
}