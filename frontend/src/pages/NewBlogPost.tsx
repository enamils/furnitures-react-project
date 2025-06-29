import * as React from "react";
import PostForm from "../components/BlogPost/PostForm.tsx";
import Button from "../components/UI/Button.tsx";
import {usePosts} from "../hooks/usePosts.ts";
import type {PostFormType} from "../types/postFormType.ts";
import ErrorBlock from "../components/UI/ErrorBlock.tsx";

const NewBlogPostPage: React.FC = () => {

    const {mutate, isPending, isError, error} = usePosts();

    const handleSubmit = (postData: PostFormType) => {
        mutate(postData)
    }

    return (
        <>
            <h2 className="text-3xl text-[color:var(--dark)] mb-10">Create & Add a new Post on Blog</h2>
            <PostForm onSubmit={handleSubmit}>
                {isPending && <p>Submitting...</p>}
                {!isPending && (
                    <>
                        <Button as="link" label="Cancel" to="../" />
                        <Button darkButtonLink label="Create Post" type="submit" className="mx-2 md:mx-4"/>
                    </>
                )}
                {isError && (
                    <ErrorBlock
                        title="Failed to create posts"
                        message={
                            error.message || 'Failed to create posts. Please check your inputs and try again later'
                        } />
                )}
            </PostForm>
        </>
    );
}

export default NewBlogPostPage;