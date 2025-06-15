import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import type { CartContextType } from "../store/CartContext";

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used in CartContextProvider");
    return context;
};