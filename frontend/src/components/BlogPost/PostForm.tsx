import * as React from "react";
import {useState} from "react";
import Input from "../UI/Input.tsx";
import {useImages} from "../../hooks/useImages.ts";
import ImagePicker from "./ImagePicker.tsx";

const PostForm: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string>('')
    const {data : loadedImages = [], isLoading, error} = useImages();

    const handleSelectImage = (imagePath: string) => {
        console.log(imagePath)
        setSelectedImage(imagePath);
    }

    return (
        <form>
            <Input id="title" label="Title" type="text" />
            <Input id="author" label="Author" type="text" />

            {isLoading && <p>Chargement des images...</p>}
            {error && <p className="text-red-500">Erreur: Impossible de charger les images</p>}

            {loadedImages.length > 0 && (
                <ImagePicker
                    images={loadedImages}
                    selectedImage={selectedImage}
                    onSelect={handleSelectImage}
                />
            )}
        </form>
    );
}

export default PostForm;