import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";

const ProtectedRoute: React.FC = () => {
    const {isLoggedIn} = useAuth();
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{from: location}} replace />
    }

    return <Outlet/>;
}

export default ProtectedRoute;