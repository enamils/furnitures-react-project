import type { ImageType} from "../types/imagePickerType.ts";
const API_URL = import.meta.env.VITE_FURNITURES_URL;

export const fetchSelectableImages = async (): Promise<ImageType[]> => {
    const response = await fetch(`${API_URL}/posts/images`);
    if (!response.ok) {
        throw new Error('Failed to fetch images');
    }

    return response.json();
}