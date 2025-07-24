import * as React from "react";
import { useParams } from "react-router-dom";
import PostForm from "../components/BlogPost/PostForm.tsx";
import Button from "../components/UI/Button.tsx";
import ErrorBlock from "../components/UI/ErrorBlock.tsx";
import { useUpdatePost, useFetchPost } from "../hooks/usePosts.ts";
import type { PostFormType } from "../types/postFormType.ts";
import type { PostType } from "../types/postType.ts";
import LoadingIndicator from "../components/UI/LoadingIndicator.tsx";

const EditBlogPostPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const { data: posts = [], isLoading: isLoadingPosts, error: postsError } = useFetchPost();
    const { mutate, isPending, isError, error } = useUpdatePost();

    const post = posts.find((p: PostType) => p.id === postId);

    const handleSubmit = (postData: PostFormType) => {
        if (post) {
            mutate({ ...postData, id: post.id });
        }
    }

    if (isLoadingPosts) {
        return <LoadingIndicator />;
    }

    if (postsError) {
        return <ErrorBlock title="Loading failed" message="Unable to load post for editing" />;
    }

    if (!post) {
        return <ErrorBlock title="Post not found" message="The post you are trying to edit does not exist" />;
    }

    const initialData = {
        title: post.title,
        author: post.author,
        image: post.image
    };

    return (
        <>
            <h2 className="lg:max-w-[60rem] mx-auto text-3xl text-[color:var(--dark)] mb-10">Update the Post</h2>
            <PostForm onSubmit={handleSubmit} initialData={initialData}>
                {isPending && <p>Update in progress...</p>}
                {!isPending && (
                    <>
                        <Button as="link" label="Cancel" to="../" />
                        <Button darkButtonLink label="Update" type="submit" className="mx-2 md:mx-4"/>
                    </>
                )}
                {isError && (
                    <ErrorBlock
                        title="Update failed"
                        message={
                            error.message || 'Failed to update the post. Check your entries and try again.'
                        } />
                )}
            </PostForm>
        </>
    );
}

export default EditBlogPostPage;