import React from "react";
import type {TeamProfile} from "../../types/teamsProfileType.ts";

const API_URL = import.meta.env.VITE_FURNITURES_URL || 'http://localhost:5000';

type TeamItemProps = {
    teams: TeamProfile
}

const Profile: React.FC<TeamItemProps> = ({teams}) => {
    return (
        <li>
            <img className="max-w-full h-auto mb-12" src={`${API_URL}/${teams.image}`} alt={teams.name} loading="lazy"/>
            <h3 className="text-3xl text-[color:var(--dark)] underline mb-1">{teams.name}</h3>
            <p className="mb-6">{teams.job}</p>
            <p className="mb-4">{teams.resume}</p>
            <p>
                <a href="#" className="text-[color:var(--dark)] font-semibold underline hover:no-underline">Learn More</a>
            </p>
        </li>
    )
}

export default Profile;