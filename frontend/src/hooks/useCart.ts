import { useContext } from "react";
import { CartStateContext, CartActionsContext, type CartStateContextType, type CartActionsContextType } from "../context/cartContext";

export const useCartState = (): CartStateContextType => {
    const context = useContext(CartStateContext);
    if (!context) throw new Error("useCartState must be used in CartContextProvider");
    return context;
};

export const useCartActions = (): CartActionsContextType => {
    const context = useContext(CartActionsContext);
    if (!context) throw new Error("useCartActions must be used in CartContextProvider");
    return context;
};
