
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const MakeAdminButton = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const makeUserAdmin = async () => {
    if (!user) {
      toast.error("You must be logged in to become an admin");
      return;
    }
    
    try {
      setLoading(true);
      
      // Check if user is already an admin
      const { data: existingAdmin } = await supabase
        .from('admins')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (existingAdmin) {
        toast.info("You are already an admin");
        return;
      }
      
      // Insert user into admins table
      const { error } = await supabase
        .from('admins')
        .insert([{ user_id: user.id }]);
        
      if (error) {
        throw error;
      }
      
      toast.success("You are now an admin! Please refresh the page.");
    } catch (error) {
      console.error("Error making user admin:", error);
      toast.error("Failed to make user an admin");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Button 
      onClick={makeUserAdmin} 
      disabled={loading}
      className="mt-4"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Making admin...
        </>
      ) : (
        "Make me an admin"
      )}
    </Button>
  );
};

export default MakeAdminButton;
