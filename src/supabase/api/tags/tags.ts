import { Tag } from '@/supabase/api/tags/types';
import { supabase } from '@/supabase/auth-client';

export const fetchAllTags = async (): Promise<Tag[]> => {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .throwOnError();

  if (error) {
    console.error('Error fetching tags:', error.message);
    return [];
  }

  return data as Tag[];
};

export const fetchTagsByIds = async (tagIds: number[]): Promise<Tag[]> => {
  const { data, error } = await supabase
    .from('tags')
    .select('id, name')
    .in('id', tagIds)
    .throwOnError();

  if (error) {
    console.error('Error fetching tags:', error.message);
    return [];
  }

  return data as Tag[];
};
