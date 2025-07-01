import * as React from "react";
import {type FormEvent, useState} from "react";
import Input from "../UI/Input.tsx";
import ImagePicker from "./ImagePicker.tsx";
import ErrorBlock from "../UI/ErrorBlock.tsx";
import InfoBlock from "../UI/InfoBlock.tsx";
import {ImagePickerSkeleton} from "../UI/Skeleton.tsx";
import {useImages} from "../../hooks/useImages.ts";
import type {PostFormType} from "../../types/postFormType.ts";

type PostFormProps = {
    onSubmit: (data: PostFormType) => void;
    children?: React.ReactNode;
}

const PostForm: React.FC<PostFormProps> = ({onSubmit, children}) => {
    const [selectedImage, setSelectedImage] = useState<string>('');
    const {data : loadedImages = [], isLoading, error} = useImages();

    const handleSelectImage = (imagePath: string) => {
        setSelectedImage(imagePath);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        // Extracting title and author from form data
        const title = formData.get('title')?.toString() || '';
        const author = formData.get('author')?.toString() || '';

        const postData: PostFormType = {
            title,
            author,
            image: selectedImage
        };

        onSubmit(postData);
    }

    return (
        <form className="lg:max-w-[60rem] mx-auto" onSubmit={handleSubmit}>
            <Input id="title" label="Title" type="text" />
            <Input id="author" label="Author" type="text" />

            {isLoading && (
                <ul className="flex flex-wrap mt-4 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <li className="w-60" key={i}>

                            <ImagePickerSkeleton />
                        </li>
                    ))}
                </ul>
            )}

            {error && <ErrorBlock title="An error occurred" message="Failed to load images." />}

            {!isLoading && loadedImages.length === 0 && <InfoBlock message="No Post available. Please create a new post." />}
            {!isLoading && loadedImages.length > 0 && (
                <ImagePicker
                    images={loadedImages}
                    selectedImage={selectedImage}
                    onSelect={handleSelectImage}
                />
            )}

            <div className="mt-4">
                {children}
            </div>
        </form>
    );
}

export default PostForm;