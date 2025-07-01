import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import type { CartContextType } from "../context/CartContext";

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used in CartContextProvider");
    return context;
};