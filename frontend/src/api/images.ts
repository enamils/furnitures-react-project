import { supabase } from "../lib/supabase";
import type { ImageType } from "../types/imagePickerType";

export const fetchSelectableImages = async (): Promise<ImageType[]> => {
  const { data, error } = await supabase
    .from('images')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch images: ${error.message}`);
  }

  return data || [];
};