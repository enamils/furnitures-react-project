import {useQuery, type UseQueryResult} from "@tanstack/react-query";
import type {TeamProfile} from "../types/teamsProfileType.ts";
import {fetchTeamsProfile} from "../api/teams.ts";

export const useTeams = (): UseQueryResult<TeamProfile[], Error> => {
    return useQuery<TeamProfile[], Error>({
        queryKey: ['teams'],
        queryFn: fetchTeamsProfile,
        staleTime: 5000,
    });
};