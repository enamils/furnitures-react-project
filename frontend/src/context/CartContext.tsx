import {useCallback, useEffect, useMemo, useState} from "react";
import type { CartProductType } from '../types/cartProductType.ts';
import type {ChildrenType} from "../types/childrenType.ts";
import { CartStateContext, CartActionsContext, type CartStateContextType, type CartActionsContextType } from "./cartContext.ts";

const CART_STORAGE_KEY = 'cart';

const CartContextProvider = ({children}: ChildrenType) => {
    const [cart, setCart] = useState<CartProductType[]>(() => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            if (!stored) return [];
            const parsed: unknown = JSON.parse(stored);
            return Array.isArray(parsed) ? (parsed as CartProductType[]) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const addToCart = useCallback((product: CartProductType): void => {
        setCart(prev => {
            let found = false;
            const updated = prev.map(item => {
                if (item.id === product.id) {
                    found = true;
                    return {...item, quantity: item.quantity + product.quantity};
                }
                return item;
            });
            return found ? updated : [...updated, product];
        });
    }, []);

    const removeFromCart = useCallback((id: string): void => {
        setCart(prev =>
            prev
                .map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
                .filter(item => item.quantity > 0)
        );
    }, []);

    const clearCartItem = useCallback((id: string): void => {
        setCart(prev => prev.filter(item => item.id !== id));
    }, []);

    const clearCart = useCallback((): void => {
        setCart([]);
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number): void => {
        if (quantity <= 0) {
            setCart(prev => prev.filter(item => item.id !== id));
            return;
        }
        setCart(prev =>
            prev.map(item => (item.id === id ? {...item, quantity} : item))
        );
    }, []);

    const stateValue: CartStateContextType = useMemo(() => ({ cart }), [cart]);

    const actionsValue: CartActionsContextType = useMemo(() => ({
        addToCart, removeFromCart, clearCartItem, clearCart, updateQuantity,
    }), [addToCart, removeFromCart, clearCartItem, clearCart, updateQuantity]);

    return (
        <CartStateContext.Provider value={stateValue}>
            <CartActionsContext.Provider value={actionsValue}>
                {children}
            </CartActionsContext.Provider>
        </CartStateContext.Provider>
    );
}

export default CartContextProvider;
