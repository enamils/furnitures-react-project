import React from "react";
import {useAuth} from "../../hooks/useAuth.ts";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const ProtectedRoute: React.FC = () => {
    const {isLoggedIn} = useAuth();
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{from: location}} replace />
    }

    return <Outlet/>;
}

export default ProtectedRoute;