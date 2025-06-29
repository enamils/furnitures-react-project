import * as React from "react";
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

const Modal: React.FC<{children: React.ReactNode}> = ({children}) => {
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

    // Récupérer l'élément modal ou utiliser document.body comme fallback
    const modalElement = document.getElementById("modal") || document.body;

    return createPortal(
        <dialog className={classes.modal} ref={dialogRef}>
            {children}
        </dialog>,
        modalElement
    );
}

export default Modal;