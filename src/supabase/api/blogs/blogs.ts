import { BlogRow, BlogsInsertPayload } from '@/supabase/api/blogs/types';
import { supabase } from '@/supabase/auth-client';

export const uploadImage = async (imageFile: File | undefined) => {
  if (!imageFile) throw new Error('Image file is required');
  const { data, error } = await supabase.storage
    .from('blog_images')
    .upload(imageFile.name, imageFile);
  if (error) throw error;
  return data?.fullPath;
};

export const insertBlog = async (payload: BlogsInsertPayload) => {
  const { data, error } = await supabase.from('blogs').insert(payload).select();

  if (error) {
    console.error('Error inserting blog:', error.message);
    throw error;
  }

  return data;
};

export const fetchBlogs = async (): Promise<BlogRow[] | null> => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .throwOnError();

  if (error) {
    console.error('Error fetching blogs:', error.message);
    return null;
  }

  return data as BlogRow[];
};

export const searchBlogs = async (
  searchTerm: string,
  tagIds: number[],
): Promise<BlogRow[] | null> => {
  if (!searchTerm.trim() && (!tagIds || tagIds.length === 0)) {
    return [];
  }

  try {
    let query = supabase.from('blogs').select('*');

    if (searchTerm.trim()) {
      query = query.or(
        `title_en.ilike.%${searchTerm}%,description_en.ilike.%${searchTerm}%`,
      );
    }

    if (tagIds && tagIds.length > 0) {
      query = query.contains('tag_ids', tagIds);
    }

    const { data, error } = await query.throwOnError();

    if (error) {
      console.error('Error searching blogs:', error.message);
      return null;
    }

    return data as BlogRow[];
  } catch (error) {
    console.error('Error searching blogs:', error);
    return null;
  }
};

export const deleteBlog = async (blogId: number): Promise<void> => {
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', blogId)
    .throwOnError();

  if (error) {
    console.error('Error deleting blog:', error.message);
    throw error;
  }
};

export const updateBlog = async (
  blogId: number,
  title_en: string | null,
  description_en: string | null,
): Promise<BlogRow | null> => {
  const { data, error } = await supabase
    .from('blogs')
    .update({ title_en, description_en })
    .eq('id', blogId)
    .throwOnError();

  if (error) {
    console.error('Error updating blog:', error.message);
    throw error;
  }

  return data;
};
