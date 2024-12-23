import { userAtom } from '@/atoms';
import { BLOG_QUERY_KEYS } from '@/context';
import { BlogFormValues } from '@/pages/create-blog/components';
import { DASHBOARD_LAYOUT_PATH, DASHBOARD_PATHS } from '@/routes';
import { uploadImage, BlogsInsertPayload, insertBlog } from '@/supabase';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  const userId = user.userInfo?.id;

  return useMutation({
    mutationKey: [BLOG_QUERY_KEYS.BLOGS],
    mutationFn: async (formValues: BlogFormValues) => {
      if (formValues.imageFile) {
        const imageUrl = await uploadImage(formValues.imageFile);
        const insertBlogPayload: BlogsInsertPayload = {
          title_en: formValues.titleEn,
          title_ka: formValues.titleKa,
          description_en: formValues.descriptionEn,
          description_ka: formValues.descriptionKa,
          image_url: imageUrl || '',
          user_id: userId,
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
      navigate(`/${DASHBOARD_LAYOUT_PATH.DASHBOARD}/${DASHBOARD_PATHS.BLOGS}`);
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
