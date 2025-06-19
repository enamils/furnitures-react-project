import {useQuery, type UseQueryResult} from "@tanstack/react-query";
import type {RawImageType, ImageType} from "../types/imagePickerType.ts";
import {fetchSelectableImages} from "../api/images.ts";

export const useImages = (): UseQueryResult<ImageType[]> => {
    return useQuery<ImageType[], Error>({
        queryKey: ['posts-images'],
        queryFn: async () => {
            const rawImages: RawImageType[] = await fetchSelectableImages();
            return rawImages.map((image) => ({
                path: image.path || '',
                caption: image.caption || '',
            }));
        },
    });
};