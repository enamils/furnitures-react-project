import * as React from "react";
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

const Modal: React.FC<{children: React.ReactNode, onClose?: () => void}> = ({children, onClose}) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const modal = dialogRef.current;
        if (modal) {
            modal.showModal();
        }

        return () => {
            if (modal) {
                modal.close();
            }
        };
    }, []);

    const handleBackdropClick = (event: React.MouseEvent) => {
        const dialogDimensions = dialogRef.current?.getBoundingClientRect();
        if (
            dialogDimensions &&
            (event.clientX < dialogDimensions.left ||
                event.clientX > dialogDimensions.right ||
                event.clientY < dialogDimensions.top ||
                event.clientY > dialogDimensions.bottom)
        ) {
            if (onClose) {
                onClose();
            }
        }
    };

    const modalElement = document.getElementById("modal") || document.body;

    return createPortal(
        <dialog className={classes.modal} ref={dialogRef} onClick={handleBackdropClick}>
            {children}
        </dialog>,
        modalElement
    );
}

export default Modal;