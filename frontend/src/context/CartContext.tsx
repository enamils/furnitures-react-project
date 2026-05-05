import {createContext, useCallback, useEffect, useMemo, useState} from "react";
import type { CartProductType } from '../types/cartProductType.ts';
import type {ChildrenType} from "../types/childrenType.ts";

export type CartContextType = {
    cart: CartProductType[];
    addToCart: (product: CartProductType) => void;
    removeFromCart: (id: string) => void;
    clearCartItem: (id: string) => void;
    clearCart: () => void;
    updateQuantity: (id: string, quantity: number) => void;
};

const CART_STORAGE_KEY = 'cart';

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CartContextProvider = ({children}: ChildrenType) => {
    const [cart, setCart] = useState<CartProductType[]>(() => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            return stored ? (JSON.parse(stored) as CartProductType[]) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

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

    const clearCartItemHandler = useCallback((id: string): void => {
        setCart(prev => prev.filter(item => item.id !== id));
    }, []);

    const clearCartHandler = useCallback((): void => {
        setCart([]);
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
        clearCartItem: clearCartItemHandler,
        clearCart: clearCartHandler,
        updateQuantity,
    }), [cart, addToCartHandler, removeFromCart, clearCartItemHandler, clearCartHandler, updateQuantity]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;