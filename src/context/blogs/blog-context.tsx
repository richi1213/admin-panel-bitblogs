import React, { createContext, useContext, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogs, searchBlogs } from '@/supabase/api/blogs';
import { BlogContextType } from '@/context/blogs/types';
import { BLOG_QUERY_KEYS } from '@/context/blogs/enums';
const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [searchText, setSearchText] = useState<string | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [BLOG_QUERY_KEYS.BLOGS, { searchText, selectedTagIds }],
    queryFn: ({ queryKey }) => {
      const [, { searchText, selectedTagIds }] = queryKey as [
        string,
        { searchText: string; selectedTagIds: number[] },
      ];
      if (searchText || selectedTagIds?.length) {
        return searchBlogs(searchText || '', selectedTagIds);
      }

      return fetchBlogs();
    },
    staleTime: 10 * 60 * 1000,
    placeholderData: [],
  });

  const blogContextValue = useMemo(
    () => ({
      blogs,
      isLoading,
      isError,
      setSearchText,
      selectedTagIds,
      setSelectedTagIds,
    }),
    [blogs, isLoading, isError, searchText, selectedTagIds],
  );

  return (
    <BlogContext.Provider value={blogContextValue}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
};
