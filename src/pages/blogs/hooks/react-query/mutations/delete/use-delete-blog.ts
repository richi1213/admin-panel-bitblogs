import { BLOG_QUERY_KEYS } from '@/context';
import { deleteBlog } from '@/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteBlogById } = useMutation({
    mutationKey: [BLOG_QUERY_KEYS.BLOGS],
    mutationFn: (id: number) => deleteBlog(id),
    onSuccess: () => {
      notification.success({
        message: 'Blog deleted successfully!',
        duration: 2,
      });
      queryClient.invalidateQueries({ queryKey: [BLOG_QUERY_KEYS.BLOGS] });
    },
    onError: () => {
      notification.error({
        message: 'Error deleting blog',
        description: 'An error occurred while deleting the blog',
        duration: 2,
      });
    },
  });

  return { deleteBlogById };
};
