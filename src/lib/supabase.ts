
import { supabase } from '@/integrations/supabase/client';

export { supabase };

// Helper types based on Supabase database
export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image: string;
  created_at: string;
  updated_at: string;
};

export type InventoryItem = {
  id: string;
  product_id: string;
  in_stock: number;
  updated_at: string;
  product?: Product;
};

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type Order = {
  id: string;
  user_id: string;
  status: OrderStatus;
  total: number;
  created_at: string;
  updated_at: string;
  user?: {
    id: string;
    email: string | null;
    full_name: string | null;
  };
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: Product;
};
