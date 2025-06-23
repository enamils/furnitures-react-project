import {createContext, useCallback, useMemo, useState} from "react";
import type { CartProductType } from '../types/cartProductType.ts';
import type {ChildrenType} from "../types/childrenType.ts";

export type CartContextType = {
    cart: CartProductType[];
    addToCart: (product: CartProductType) => void;
    removeFromCart: (id: string) => void;
    clearCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CartContextProvider = ({children}: ChildrenType) => {
    const [cart, setCart] = useState<CartProductType[]>([]);

    const addToCartHandler = useCallback((product: CartProductType): void => {
        setCart(prev => {
            const existingProduct = prev.find(item => item.id === product.id);
            if (existingProduct) {
                return prev.map(item =>
                    item.id === product.id ? {...item, quantity: item.quantity + product.quantity} : item
                );

            }
            return [...prev, product]
        })
    }, []);

    const removeFromCart = useCallback((id: string): void => {
        setCart(prev =>
            prev
                .map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    }, []);

    const clearCartHandler = useCallback((id: string): void => {
        setCart(prev => prev.filter(item => item.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number): void => {
        setCart(prev =>
            prev.map(item => (item.id === id ? {...item, quantity} : item))
        );
    }, []);

    const contextValue: CartContextType = useMemo( () => ({
        cart,
        addToCart: addToCartHandler,
        removeFromCart,
        clearCart: clearCartHandler,
        updateQuantity,
    }), [cart, addToCartHandler, removeFromCart, clearCartHandler, updateQuantity]);

    console.log(contextValue);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;