import { Blog } from '@/pages/home/components/blog-card-wrapper/blog-card/blog-card.types';

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
