export type RawImageType = {
    path?: string;
    caption?: string;
};

export type ImageType = {
    path: string;
    caption: string;
}

export type ImagePickerType = {
    images: ImageType[];
    selectedImage: string;
    onSelect: (path: string) => void;
}