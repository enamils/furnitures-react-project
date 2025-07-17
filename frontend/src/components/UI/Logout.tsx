import React from 'react';
import {faSignOut} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Logout: React.FC<{onLogout: () => void}> = ({onLogout}) => {
    return (
        <button className="text-[color:var(--white)] cursor-pointer" type="button" onClick={onLogout}>
            <FontAwesomeIcon icon={faSignOut} size="2xl"/>
        </button>
    )
};

export default Logout;