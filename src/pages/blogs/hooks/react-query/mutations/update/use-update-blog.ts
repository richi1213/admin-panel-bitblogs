import { BLOG_QUERY_KEYS } from '@/context';
import { updateBlog } from '@/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  const { mutate: updateBlogById } = useMutation({
    mutationKey: [BLOG_QUERY_KEYS.BLOGS],
    mutationFn: ({
      id,
      title_en,
      description_en,
    }: {
      id: number;
      title_en: string;
      description_en: string;
    }) => updateBlog(id, title_en, description_en),
    onSuccess: () => {
      notification.success({
        message: 'Blog updated successfully!',
        duration: 2,
      });
      queryClient.invalidateQueries({ queryKey: [BLOG_QUERY_KEYS.BLOGS] });
    },
    onError: () => {
      notification.error({
        message: 'Error updating blog',
        description: 'An error occurred while updating the blog',
        duration: 2,
      });
    },
  });

  return { updateBlogById };
};
