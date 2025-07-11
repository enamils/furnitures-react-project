import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {faSignOut} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Logout: React.FC = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        authCtx.logout();
        navigate('/');
    };

    return (
        <button className="text-[color:var(--white)] cursor-pointer" type="button" onClick={logoutHandler}>
            <FontAwesomeIcon icon={faSignOut} size="2xl"/>
        </button>
    )
};

export default Logout;