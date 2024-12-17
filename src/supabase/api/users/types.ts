type AppMetadata = {
  provider: string;
  providers: string[];
};

type UserMetadata = {
  email: string;
  email_verified: boolean;
  full_name_en: string;
  full_name_ka: string;
  phone_verified: boolean;
  sub: string;
  username: string;
};

type IdentityData = {
  avatar_url: string | null;
  email: string;
  email_verified: boolean;
  full_name_en: string;
  full_name_ka: string;
  phone_verified: boolean;
  sub: string;
  username: string;
};

type Identity = {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: IdentityData;
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
};

export type User = {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  identities: Identity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
};

export type UpdateEmailPayload = {
  userId: string;
  newEmail: string;
};

// export type UpdateEmailResponse = {
//   data: {
//     user: User | null;
//   };
//   error: string | null;
// };
