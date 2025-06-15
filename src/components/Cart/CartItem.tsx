import * as React from "react";
import toast from 'react-hot-toast';
import {useCart} from "../../hooks/useCart.ts";
import {currencyFormatter} from "../../utils/formatting.ts";
import type {CartProductType} from "../../types/cartProductType.ts";

type ProductItemProps = {
    product: CartProductType;
};

const CartItem: React.FC<ProductItemProps> = ({product}) => {
    const {addToCart, removeFromCart, clearCart} = useCart();

    const totalPrice: number = product.price * product.quantity;

    const clearCartHandler: () => void = () => {
        clearCart(product.id);
        toast.success(`${product.name} removed from cart!`);
    }

    return (
        <tr>
            <td className="px-4 py-2 whitespace-nowrap">
                <img src={`http://localhost:5000/${product.image}`} alt={product.name} className="w-16 h-16 md:w-25 md:h-25 object-contain" loading="lazy"/>
            </td>
            <td className="px-4 py-2 whitespace-nowrap">{product.name}</td>
            <td className="px-4 py-2 whitespace-nowrap text-center">{currencyFormatter.format(product.price)}</td>
            <td className="px-4 py-2 whitespace-nowrap">
                <div className="flex gap-2 items-center justify-center">
                    <button onClick={() => removeFromCart(product.id)} className="text-xl text-[color:var(--black)] cursor-pointer">-</button>
                    <span className="p-1">{product.quantity}</span>
                    <button onClick={() => addToCart({ ...product, quantity: 1 })} className="text-xl text-[color:var(--black)] cursor-pointer">+</button>
                </div>
            </td>
            <td className="px-4 py-2 whitespace-nowrap text-center">{currencyFormatter.format(totalPrice)}</td>
            <td className="px-4 py-2 whitespace-nowrap text-center">
                <button onClick={clearCartHandler}
                        className="text-[color:var(--black)] cursor-pointer">X
                </button>
            </td>
        </tr>
    );
}

export default CartItem;