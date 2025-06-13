import * as React from "react";
import clientImg from "../assets/images/user.svg";
import cartImg from "../assets/images/cart.svg";
import {NavLink} from "react-router-dom";

const ClientCart: React.FC = () => {
    return (
        <ul className="flex md:ml-10 items-center">
            <li className="mr-5">
                <button className="cursor-pointer px-2">
                    <img src={clientImg} alt="client"/>
                </button>
            </li>
            <li>
                <NavLink to="/cart" className="pl-2 pr-2">
                    <img src={cartImg} alt="cart"/>
                </NavLink>
            </li>
        </ul>
    );
}

export default ClientCart;