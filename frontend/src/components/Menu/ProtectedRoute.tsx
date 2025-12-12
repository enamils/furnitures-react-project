import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuthentication} from "../../hooks/useAuthentication.ts";

const ProtectedRoute: React.FC = () => {
    const {isLoggedIn} = useAuthentication();
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{from: location}} replace />
    }

    return <Outlet/>;
}

export default ProtectedRoute;