import React from "react";
import {useCartState} from "../../hooks/useCart.ts";
import Accordion from "../UI/Accordion.tsx";
import Button from "../UI/Button.tsx";
import {currencyFormatter} from "../../utils/formatting.ts";
import type {CartProductType} from "../../types/cartProductType.ts";

interface OrderProps {
    isPending: boolean;
}

const Order: React.FC<OrderProps> = ({ isPending }) => {
    const {cart} = useCartState();

    const cartSubtotal: number = cart.reduce((sum: number, product: CartProductType) => sum + product.price * product.quantity, 0);

    return (
        <div className="overflow-x-auto">
            <h2 className="text-3xl text-[color:var(--dark)] mb-4">Your Order</h2>
            <div className="bg-[color:var(--white)] p-4 lg:p-12 border-1 border-gray-200">
                <table className="min-w-full divide-y divide-black-200 overflow-x-auto block text-[color:var(--black)]">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium uppercase md:text-base w-full">Product</th>
                            <th className="px-4 py-2 text-left text-xs font-medium uppercase md:text-base w-full">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {cart.map(product => (
                            <tr key={product.id}>
                                <td className="px-2 md:px-4 py-2 whitespace-nowrap">{product.name}<span className="p-1"><span className="mx-2 font-semibold">x</span> {product.quantity}</span></td>
                                <td className="px-2 md:px-4 py-2 whitespace-nowrap">{currencyFormatter.format(product.price * product.quantity)}</td>
                            </tr>
                        ))}
                        <tr>
                            <td className="px-2 md:px-4 py-2 whitespace-nowrap font-semibold">Cart Subtotal</td>
                            <td className="px-2 md:px-4 py-2 whitespace-nowrap">{currencyFormatter.format(cartSubtotal)}</td>
                        </tr>
                        <tr>
                            <td className="px-2 md:px-4 py-2 whitespace-nowrap font-semibold">Order Total</td>
                            <td className="px-2 md:px-4 py-2 whitespace-nowrap font-semibold">{currencyFormatter.format(cartSubtotal)}</td>
                        </tr>
                    </tbody>
                </table>

                <Accordion title="Direct Bank Transfer" className="mt-4">
                    <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                </Accordion>

                <Accordion title="Cheque Payment" className="mt-4">
                    <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                </Accordion>

                <Accordion title="Paypal" className="mt-4">
                    <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                </Accordion>

                <Button
                    type="submit"
                    label={isPending ? 'Loading...' : 'Place Order'}
                    darkButtonLink
                    disabled={isPending || cart.length === 0}
                    className="mt-6"
                />
            </div>
        </div>
    )
}

export default Order