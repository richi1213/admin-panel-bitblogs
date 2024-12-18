import { Tables } from '@/supabase';

export type Blog = Tables<'blogs'>;

export type BlogCardProps = {
  blog: Blog;
};
