import { Tables, TablesInsert } from '@/supabase/supabase.types';

export type BlogRow = Tables<'blogs'>;
export type BlogsInsertPayload = TablesInsert<'blogs'>;
