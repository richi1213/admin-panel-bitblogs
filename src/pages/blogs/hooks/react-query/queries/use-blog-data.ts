import { BLOG_INFO_QUERY_KEYS } from '@/pages/blogs/hooks/react-query/queries/enums';
import { fetchTagsByIds, fetchUserProfile } from '@/supabase';
import { useQuery } from '@tanstack/react-query';

export const useBlogData = (userId: string, tagIds: number[]) => {
  const { data: authorProfile, isLoading: isAuthorLoading } = useQuery({
    queryKey: [BLOG_INFO_QUERY_KEYS.USER_PROFILE, userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: !!userId,
  });

  const { data: tags, isLoading: areTagsLoading } = useQuery({
    queryKey: [BLOG_INFO_QUERY_KEYS.TAGS, tagIds],
    queryFn: () => fetchTagsByIds(tagIds || []),
    enabled: tagIds && tagIds.length > 0,
  });

  return { authorProfile, tags, isAuthorLoading, areTagsLoading };
};
