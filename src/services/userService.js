import { supabase } from './supabase';

// Admin: Get all users
export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

// Admin: Update user role
export const updateUserRole = async (id, role) => {
  const { data, error } = await supabase
    .from('users')
    .update({ role })
    .eq('id', id)
    .select();
  if (error) throw error;
  return data;
};

// Create user profile in users table (called after signup)
export const createUserProfile = async (userId, email, role = 'user') => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ id: userId, email, role }])
    .select();
  if (error) throw error;
  return data;
};

// Get user profile by id
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
};
