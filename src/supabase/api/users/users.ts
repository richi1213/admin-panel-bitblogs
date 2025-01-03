import {
  CreateUserPayload,
  UpdateFieldPayload,
  User,
} from '@/supabase/api/users/types';
import { supabase } from '@/supabase/auth-client';

export const fetchAllUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.error('Error fetching users:', error.message);
  }

  const users = data?.users || [];

  return users as User[];
};

export const fetchUserById = async (userId: string): Promise<User> => {
  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (error) {
    console.error('Error fetching user:', error.message);
  }

  const user = data?.user;

  return user as User;
};

export const updateUserEmail = async ({
  userId,
  newField,
}: UpdateFieldPayload) => {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    email: newField,
  });

  if (error) {
    console.error('Error updating user email:', error);
    throw new Error('Failed to update user email');
  }

  return data;
};

export const updateUserFullNameEn = async ({
  userId,
  newField,
}: UpdateFieldPayload) => {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { full_name_en: newField },
  });

  if (error) {
    console.error('Error updating full name en:', error);
    throw new Error('Failed to update user full name en');
  }

  return data;
};

export const updateUserFullNameKa = async ({
  userId,
  newField,
}: UpdateFieldPayload) => {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { full_name_ka: newField },
  });

  if (error) {
    console.error('Error updating full name ka:', error);
    throw new Error('Failed to update user full name ka');
  }

  return data;
};

export const updateUserUsername = async ({
  userId,
  newField,
}: UpdateFieldPayload) => {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { username: newField },
  });

  if (error) {
    console.error('Error updating username:', error);
    throw new Error('Failed to update user username');
  }

  return data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    console.error('Error deleting user:', error.message);
    throw new Error('Failed to delete user');
  }

  console.log(`User with ID ${userId} deleted successfully`);
};

export const createUser = async ({
  email,
  password,
  fullNameEn,
  fullNameKa,
  username,
}: CreateUserPayload): Promise<User | null> => {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: {
      full_name_en: fullNameEn,
      full_name_ka: fullNameKa,
      username: username,
    },
  });

  if (error) {
    console.error('Error creating user:', error.message);
    throw new Error('Failed to create user');
  }

  const user = data?.user;

  if (!user) {
    return null;
  }

  return user as User;
};
