import {createContext, type ReactNode, useState} from "react";
import type { CartProductType } from '../types/cartProductType.ts';

export type CartContextType = {
    cart: CartProductType[];
    addToCart: (product: CartProductType) => void;
    removeFromCart: (id: string) => void;
    clearCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CartContextProvider = ({children}: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartProductType[]>([]);

    const addToCartHandler = (product: CartProductType): void => {
        setCart(prev => {
            const existingProduct = prev.find(item => item.id === product.id);
            if (existingProduct) {
                return prev.map(item =>
                    item.id === product.id ? {...item, quantity: item.quantity + product.quantity} : item
                );

            }
            return [...prev, product]
        })
    }

    const removeFromCart = (id: string): void => {
        setCart(prev =>
            prev
                .map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    }

    const clearCartHandler = (id: string): void => {
        setCart(prev => prev.filter(item => item.id !== id));
    }

    const updateQuantity = (id: string, quantity: number): void => {
        setCart(prev =>
            prev.map(item => (item.id === id ? {...item, quantity} : item))
        );
    }

    const contextValue: CartContextType = {
        cart,
        addToCart: addToCartHandler,
        removeFromCart,
        clearCart: clearCartHandler,
        updateQuantity,
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;