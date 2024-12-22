import { createContext, useContext, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TagContextType } from '@/context/tags/types';
import { fetchAllTags, Tag } from '@/supabase';
import { TAGS_QUERY_KEYS } from '@/context/tags/enums';

const TagContext = createContext<TagContextType | null>(null);

export const TagProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data: tags } = useQuery<Tag[] | null>({
    queryKey: [TAGS_QUERY_KEYS.TAGS],
    queryFn: () => fetchAllTags(),
  });

  const tagContextValue = useMemo(
    () => ({
      tags: tags || null,
    }),
    [tags],
  );

  return (
    <TagContext.Provider value={tagContextValue}>
      {children}
    </TagContext.Provider>
  );
};

export const useTagContext = () => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error('useTagContext must be used within a TagProvider');
  }
  return context;
};
