import { supabase } from "../lib/supabase";
import type { PostFormType } from "../types/postFormType";
import type { PostType } from "../types/postType";

export const fetchPost = async (): Promise<PostType[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }

  return data || [];
};

export const createNewPost = async (postData: PostFormType): Promise<PostType> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User must be authenticated to create a post');
  }

  const newPost = {
    id: crypto.randomUUID(),
    author: postData.author,
    title: postData.title,
    image: postData.image,
    date: new Date().toISOString(),
    user_id: user.id,
  };

  const { data, error } = await supabase
    .from('posts')
    .insert([newPost])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create post: ${error.message}`);
  }

  return data;
};

export const updatePost = async (postData: Partial<PostType> & { id: string }): Promise<PostType> => {
  const updateData: Record<string, unknown> = {};
  
  if (postData.author !== undefined) updateData.author = postData.author;
  if (postData.title !== undefined) updateData.title = postData.title;
  if (postData.image !== undefined) updateData.image = postData.image;

  const { data, error } = await supabase
    .from('posts')
    .update(updateData)
    .eq('id', postData.id)
    .select();

  if (error) {
    throw new Error(`Échec de la mise à jour du post: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error(`Échec de la mise à jour du post: aucune ligne mise à jour`);
  }

  return data[0];
};

export const deletePost = async (id: string): Promise<PostType[]> => {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete post: ${error.message}`);
  }

  // Return updated list of posts
  return fetchPost();
};