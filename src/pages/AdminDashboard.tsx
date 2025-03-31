
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminInventory from '@/components/admin/AdminInventory';
import AdminOrders from '@/components/admin/AdminOrders';
import MakeAdminButton from '@/components/admin/MakeAdminButton';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

// Create a storage bucket if it doesn't exist
const createStorageBucket = async () => {
  try {
    // Check if the storage bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError);
      return;
    }
    
    const productsBucketExists = buckets?.some(bucket => bucket.name === 'products');
    
    if (!productsBucketExists) {
      // Create the bucket with public access
      const { error } = await supabase.storage.createBucket('products', {
        public: true
      });
      
      if (error) {
        console.error('Error creating products bucket:', error);
      } else {
        console.log('Products storage bucket created successfully');
      }
    }
  } catch (error) {
    console.error('Error checking/creating storage bucket:', error);
  }
};

const AdminDashboard = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('products');

  // Create storage bucket on initial load
  React.useEffect(() => {
    if (user && isAdmin) {
      createStorageBucket();
    }
  }, [user, isAdmin]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 size={40} className="animate-spin text-primary" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show admin setup page if user is logged in but not an admin
  if (user && !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-serif font-bold mb-4">Admin Access Required</h1>
            <p className="mb-6">
              You need admin privileges to access this page. If this is your first time setting up the application,
              you can make your account an admin using the button below.
            </p>
            <MakeAdminButton />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    toast.error('You must be logged in to access this page');
    return <Navigate to="/" replace />;
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-6">Admin Dashboard</h1>
          
          <Tabs 
            value={activeTab} 
            onValueChange={handleTabChange} 
            className="w-full"
          >
            <TabsList className="mb-6">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="products">
              <AdminProducts />
            </TabsContent>
            <TabsContent value="inventory">
              <AdminInventory />
            </TabsContent>
            <TabsContent value="orders">
              <AdminOrders />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
