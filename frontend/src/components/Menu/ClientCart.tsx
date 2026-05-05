import React, {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import { useCartState } from "../../hooks/useCart.ts";
import type { CartProductType } from "../../types/cartProductType.ts";
import { useAuthentication } from "../../hooks/useAuthentication";
import Logout from "../UI/Logout.tsx";
import Modal from "../UI/Modal.tsx";
import Button from "../UI/Button.tsx";
import clientImg from "../../assets/images/user.svg";
import cartImg from "../../assets/images/cart.svg";

const ClientCart: React.FC = () => {
    const [isModalLogout, setIsModalLogout] = useState<boolean>(false);
    const { cart } = useCartState();
    const { isLoggedIn, logout } = useAuthentication();
    const navigate = useNavigate();

    const totalCartItems: number = cart.reduce((total: number, product: CartProductType) => total + product.quantity, 0);

    const handleLogout = () => {
        logout();
        setIsModalLogout(false);
        navigate('/');
    }

    const cancelLogout = () => {
        setIsModalLogout(false);
    }

    const confirmLogout = () => {
        setIsModalLogout(true);
    }

    return (
        <ul className="flex mt-6 md:mt-0 md:ml-10">
            <li className="mr-5">
                {isModalLogout && isLoggedIn && (
                    <Modal onClose={cancelLogout}>
                        <h2 className="text-2xl mb-2">Are you sure ?</h2>
                        <p>You will be redirected to the home page</p>
                        <p>Do you really want to logout ?</p>
                        <div className="flex space-x-2 mt-4">
                            <Button label="Cancel" onClick={cancelLogout} />
                            <Button darkButtonLink label="Logout" onClick={handleLogout} />
                        </div>
                    </Modal>
                )}
                {isLoggedIn ? (
                    <Logout onLogout={confirmLogout} />
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
                    <span className="sr-only sm:not-sr-only">Cart</span>
                </NavLink>
            </li>
        </ul>
    );
}

export default ClientCart;