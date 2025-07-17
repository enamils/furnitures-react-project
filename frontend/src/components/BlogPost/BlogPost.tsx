import * as React from "react";
import {useState} from "react";
import Post from "./Post.tsx";
import ErrorBlock from "../UI/ErrorBlock.tsx";
import {PostSkeleton} from "../UI/Skeleton.tsx";
import InfoBlock from "../UI/InfoBlock.tsx";
import Button from "../UI/Button.tsx";
import Modal from "../UI/Modal.tsx";
import {useDeletePost, useFetchPost} from "../../hooks/usePosts.ts";
import type {PostType} from "../../types/postType.ts";

const BlogPost: React.FC = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
    const {data: loadedPost = [], isLoading, error: errorFetch} = useFetchPost();
    const {mutate, isPending, isError, error: errorDelete} = useDeletePost();

    const handleDeleteClick = () => {
        if (postIdToDelete) {
            mutate(postIdToDelete);
            setIsDeleting(false);
        }
    };

    const confirmDelete = (id: string) => {
        setPostIdToDelete(id);
        setIsDeleting(true);
    };

    const cancelDelete = () => {
        setIsDeleting(false);
        setPostIdToDelete(null);
    };

    if (isLoading) {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-5">
                {[...Array(7)].map((_, i) => (
                    <PostSkeleton key={i} />
                ))}
            </div>
        )
    }

    if (errorFetch) {
        return <ErrorBlock title="An error occurred" message="Failed to fetch posts." />
    }

    return (
        <>
            {isDeleting && (
                <Modal onClose={cancelDelete}>
                    <h2 className="text-2xl mb-2">Are you sure ?</h2>
                    <p>Do you really want to delete this post? This action cannot be undone.</p>
                    {isPending && <p>Deleting, please wait...</p>}
                    {!isPending && (
                        <div className="flex space-x-2 mt-4">
                            <Button label="Cancel" onClick={cancelDelete} />
                            <Button darkButtonLink label="Delete" onClick={handleDeleteClick} />
                        </div>
                    )}
                    {isError && (
                        <ErrorBlock
                            title="Failed to delete posts"
                            message={errorDelete.message || "Failed to delete the post. Please try again later."} />
                    )}
                </Modal>
            )}
            {loadedPost.length === 0 && <InfoBlock message="No Post available. Please create a new one !"/>}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-5">
                {loadedPost.map((post: PostType) => (
                    <Post key={post.id} posts={post} onDelete={confirmDelete} />
                ))}
            </div>
        </>
    );
}

export default BlogPost