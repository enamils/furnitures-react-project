import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {createNewPost, fetchPost} from "../api/posts";
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
        //staleTime: 5000,
    });
}