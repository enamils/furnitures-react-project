import React, {useCallback, useId, useState} from "react";
import type {AccordionProps} from "../../types/accordionType.ts";

const Accordion: React.FC<AccordionProps> = ({title, children, className = "", defaultOpen = false, id: propId}) => {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

    const generatedId = useId();
    const id = propId || generatedId;
    const headingId = `accordion-heading-${id}`;
    const contentId = `accordion-content-${id}`;

    const toggleAccordion = useCallback(() => {
        setIsOpen(prevState => !prevState);
    }, []);

    return (
        <div className={`border border-gray-200 ${className}`} data-state-accordion={isOpen ? "open" : "closed"}>
            <button
                id={headingId}
                className="w-full text-left p-4 font-medium text-[color:var(--black)] cursor-pointer underline hover:no-underline"
                onClick={toggleAccordion}
                aria-expanded={isOpen}
                aria-controls={contentId}
                type="button">
                {title}
            </button>
            <div
                id={contentId}
                role="region"
                aria-labelledby={headingId}
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
                aria-hidden={!isOpen}>
                <div className="overflow-hidden">
                    <div className="px-4 pb-4">{children}</div>
                </div>
            </div>
        </div>
    );
}

export default Accordion;