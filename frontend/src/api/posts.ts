import type {PostFormType} from "../types/postFormType.ts";
import type {PostType} from "../types/postType.ts";

const API_URL = import.meta.env.VITE_FURNITURES_URL;

interface Posts extends PostFormType {
    id: string;
    date: string;
}

export const createNewPost = async (postData: PostFormType): Promise<Posts> => {
    const response = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error('Failed to create a new post');
    }

    const post = await response.json();

    return post;
}

export const fetchPost = async (): Promise<PostType[]> => {
    const response = await fetch(`${API_URL}/api/posts`);
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }

    return response.json();
}

export const deletePost = async (id: string): Promise<PostType[]> => {
    const response = await fetch(`${API_URL}/api/posts/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete post');
    }

    return response.json();
}

export const updatePost = async (postData: Partial<PostType> & { id: string }): Promise<PostType> => {
    const response = await fetch(`${API_URL}/api/posts/${postData.id}`, {
        method: "PATCH",
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error('Échec de la mise à jour du post');
    }

    return response.json();
}