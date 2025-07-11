import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart.ts";
import type { CartProductType } from "../../types/cartProductType.ts";
import clientImg from "../../assets/images/user.svg";
import cartImg from "../../assets/images/cart.svg";
import { AuthContext } from "../../context/AuthContext.tsx";
import Logout from "../UI/Logout.tsx";

const ClientCart: React.FC = () => {
    const { cart } = useCart();
    const { isLoggedIn } = useContext(AuthContext);

    const totalCartItems: number = cart.reduce((total: number, product: CartProductType) => total + product.quantity, 0);

    return (
        <ul className="flex md:ml-10">
            <li className="mr-5">
                {isLoggedIn ? (
                    <Logout />
                ) : (
                    <NavLink to="/login" className="pl-2 pt-1 pr-2 flex gap-2">
                        <img src={clientImg} alt="client" loading="lazy"/>
                    </NavLink>
                )}
            </li>
            <li>
                <NavLink to="/cart" className="pl-2 pr-2 flex gap-2">
                    <img src={cartImg} alt="cart" loading="lazy"/>
                    <span className="text-white">({totalCartItems})</span>
                </NavLink>
            </li>
        </ul>
    );
}

export default ClientCart;