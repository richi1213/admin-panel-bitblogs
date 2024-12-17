/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_SECRVICE_ROLE_KEY: string;
  readonly VITE_SUPABASE_BLOG_IMAGES_STORAGE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
