import { supabase } from "../lib/supabase";
import type { TeamProfile } from "../types/teamsProfileType";

export const fetchTeamsProfile = async (): Promise<TeamProfile[]> => {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch teams: ${error.message}`);
  }

  return data || [];
};