import * as React from "react";
import type {ImagePickerType} from "../../types/imagePickerType.ts";
import classes from "./ImagePicker.module.css";

const API_URL = import.meta.env.VITE_FURNITURES_URL;

const ImagePicker: React.FC<ImagePickerType> = ({images, selectedImage, onSelect}) => {
    return (
        <div className={`${classes.imagePicker} `}>
            <p className="text-[color:var(--black)] mt-1">Select an image</p>
            <ul className="flex flex-wrap mt-4 gap-4">
                {images.map(({path, caption}) => (
                    <li key={path}>
                        <button
                            type="button"
                            className={`${selectedImage === path ? 'selected' : undefined}`}
                            onClick={() => onSelect(path)}>
                            <img
                                src={new URL(path, API_URL).toString()}
                                alt={caption} loading="lazy"
                            />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ImagePicker;