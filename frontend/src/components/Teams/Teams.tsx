import React from "react";
import {useTeams} from "../../hooks/useTeams.ts";
import Profile from "./Profile.tsx";
import {TeamsProfileSkeleton} from "../UI/Skeleton.tsx";
import ErrorBlock from "../UI/ErrorBlock.tsx";

const Teams: React.FC = () => {
    const {data: loadedTeamsProfile = [], isLoading, error} = useTeams();

    if (isLoading) {
        return (
            <>
                <h2 className="lg:max-w-[60rem] mx-auto text-3xl text-[color:var(--dark)] text-center mb-10">Our Team</h2>
                <ul className="grid justify-center md:grid-cols-2 lg:grid-cols-4 md:gap-6">
                    {[...Array(4)].map((_, i) => (
                        <li key={i}>
                            <TeamsProfileSkeleton />
                        </li>
                    ))}
                </ul>
            </>
        )
    }

    if (error) {
        return <ErrorBlock title="An error occurred" message="Failed to fetch teams profile." />;
    }

    return (
        <>
            <h2 className="lg:max-w-[60rem] mx-auto text-3xl text-[color:var(--dark)] text-center mb-10">Our Team</h2>
            <ul className="grid justify-center md:grid-cols-2 lg:grid-cols-4 md:gap-6">
                {loadedTeamsProfile.map((profile) => (
                    <Profile key={profile.id} teams={profile} />
                ))}
            </ul>
        </>
    );
}

export default Teams;