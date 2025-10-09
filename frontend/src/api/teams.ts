import type {TeamProfile} from "../types/teamsProfileType.ts";
const API_URL = import.meta.env.VITE_FURNITURES_URL;

export const fetchTeamsProfile = async (): Promise<TeamProfile[]> => {
    const response = await fetch(`${API_URL}/api/teams`);
    if (!response.ok) {
        throw new Error('Failed to fetch teams profile');
    }

    return response.json();
}