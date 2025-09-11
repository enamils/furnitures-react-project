import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";
import {useCart} from "../../hooks/useCart.ts";

const ProtectedRoute: React.FC = () => {
    const {isLoggedIn} = useAuth();
    const {cart} = useCart();
    const location = useLocation();

    if (cart.length === 0) {
        return <Navigate to="/shop" state={{from: location}} replace />
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{from: location}} replace />
    }

    return <Outlet/>;
}

export default ProtectedRoute;