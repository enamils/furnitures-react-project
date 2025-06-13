import { useContext } from "react";
import { CartContext } from "../store/CartContext";

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used in CartContextProvider");
    return context;
};