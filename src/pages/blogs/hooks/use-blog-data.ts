import { fetchTagsByIds, fetchUserProfile } from '@/supabase';
import { useQuery } from '@tanstack/react-query';

export const useBlogData = (userId: string, tagIds: number[]) => {
  const { data: authorProfile, isLoading: isAuthorLoading } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: !!userId,
  });

  const { data: tags, isLoading: areTagsLoading } = useQuery({
    queryKey: ['tags', tagIds],
    queryFn: () => fetchTagsByIds(tagIds || []),
    enabled: tagIds && tagIds.length > 0,
  });

  return { authorProfile, tags, isAuthorLoading, areTagsLoading };
};
