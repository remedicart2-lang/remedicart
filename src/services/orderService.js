import { supabase } from './supabase';

// Place order
export const placeOrder = async (order) => {
  const { data, error } = await supabase.from('orders').insert([order]).select();
  if (error) throw error;
  return data;
};

// Get orders for a specific user
export const getUserOrders = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, products(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

// Admin: Get all orders
export const getAllOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, products(*), users(*)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

// Admin: Update order status
export const updateOrderStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select();
  if (error) throw error;
  return data;
};
