import { BLOG_QUERY_KEYS } from '@/context';
import { uploadImage, BlogsInsertPayload, insertBlog } from '@/supabase';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { notification } from 'antd';

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [BLOG_QUERY_KEYS.BLOGS],
    mutationFn: async (formValues: any) => {
      if (formValues.imageFile) {
        const imageUrl = await uploadImage(formValues.imageFile);
        const insertBlogPayload: BlogsInsertPayload = {
          title_en: formValues.titleEn,
          title_ka: formValues.titleKa,
          description_en: formValues.descriptionEn,
          description_ka: formValues.descriptionKa,
          image_url: imageUrl || '',
          user_id: formValues.userId,
          tag_ids: formValues.tags_ids,
        };
        return await insertBlog(insertBlogPayload);
      }
    },
    onSuccess: () => {
      notification.success({
        message: 'Blog Created',
        description: 'You have successfully posted your blog!',
      });
      queryClient.invalidateQueries({ queryKey: [BLOG_QUERY_KEYS.BLOGS] });
    },
    onError: (error: Error) => {
      console.error(error);
      notification.error({
        message: 'Error',
        description: error.message || 'Failed to create blog.',
      });
    },
  });
};
