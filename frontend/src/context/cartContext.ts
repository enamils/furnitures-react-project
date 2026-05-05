import { createContext } from "react";
import type { CartProductType } from '../types/cartProductType.ts';

export type CartStateContextType = {
    cart: CartProductType[];
};

export type CartActionsContextType = {
    addToCart: (product: CartProductType) => void;
    removeFromCart: (id: string) => void;
    clearCartItem: (id: string) => void;
    clearCart: () => void;
    updateQuantity: (id: string, quantity: number) => void;
};

export const CartStateContext = createContext<CartStateContextType | undefined>(undefined);
export const CartActionsContext = createContext<CartActionsContextType | undefined>(undefined);
