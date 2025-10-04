import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';
import {createNewPost, deletePost, fetchPost, updatePost} from "../api/posts";
import type {PostType} from "../types/postType.ts";
import type {PostFormType} from "../types/postFormType.ts";

export const usePosts = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation<PostType, Error, PostFormType>({
        mutationFn: createNewPost,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['posts']});
            navigate('/blog');
        }
    });
}

export const useFetchPost = () => {
    return useQuery<PostType[]>({
        queryKey: ['posts'],
        queryFn: fetchPost,
    });
}

export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation<PostType[], Error, string>({
        mutationFn: deletePost,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['posts']});
            toast.success(`The post has been successfully deleted!`);
        }
    });
}

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation<PostType, Error, Partial<PostType> & { id: string }>({
        mutationFn: updatePost,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['posts'] });
            toast.success(`The post "${data.title}" has been successfully updated!`);
            navigate('/blog');
        }
    });
}

export const useLatestPosts = (limit: number = 3) => {
    return useQuery<PostType[]>({
        queryKey: ['posts', 'latest', limit],
        queryFn: async () => {
            const posts = await fetchPost();
            // Sort by date (newest first) and limit
            return posts
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, limit);
        },
    });
}
