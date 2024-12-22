import { Blog } from '@/pages/blogs/components/blog-cards';

export type BlogContextType = {
  blogs: Blog[] | null | undefined;
  isLoading: boolean;
  isError: boolean;
  setSearchText: (value: string | null) => void;
  selectedTagIds: number[];
  setSelectedTagIds: (
    value: number[] | ((prevTags: number[]) => number[]),
  ) => void;
};
