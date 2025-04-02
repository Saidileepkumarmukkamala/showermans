
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  isLoading: false,
  isAdmin: false,
  loginWithGoogle: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin
  const checkIsAdmin = async (userId: string, email?: string | null) => {
    try {
      // Special case for the admin credentials - using email here as identifier
      if (email === 'admin@example.com') {
        setIsAdmin(true);
        return;
      }
      
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      setIsAdmin(!!data && !error);
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    }
  };

  // Handle session changes (login, logout, etc.)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        setIsLoading(false);
        
        // Check if user is admin
        if (session?.user) {
          await checkIsAdmin(session.user.id, session.user.email);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // Initialize session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setIsLoading(false);
      
      // Check if user is admin
      if (session?.user) {
        checkIsAdmin(session.user.id, session.user.email);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login with email and password
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Special case for admin login
      if (email === 'adminnn' && password === 'adminshower') {
        // Use a valid email format for Supabase authentication
        const adminEmail = 'admin@example.com';
        
        // Check if admin account exists, if not create it
        const { data: existingUser, error: checkError } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password,
        });
        
        // If login fails (user doesn't exist), create the admin account
        if (checkError) {
          // Create admin account with valid email but using our special identifier
          const { error } = await supabase.auth.signUp({
            email: adminEmail,
            password,
          });
          
          if (error && error.message !== 'User already registered') throw error;
          
          // Sign in with the newly created account
          const { error: loginError } = await supabase.auth.signInWithPassword({
            email: adminEmail,
            password,
          });
          
          if (loginError) throw loginError;
          
          // Make sure this user is in the admins table
          const { data: adminData } = await supabase
            .from('admins')
            .select('*')
            .eq('user_id', (await supabase.auth.getUser()).data.user?.id || '')
            .single();
          
          if (!adminData) {
            await supabase.from('admins').insert({
              user_id: (await supabase.auth.getUser()).data.user?.id
            });
          }
        }
        
        setIsAdmin(true);
        toast.success("Admin login successful");
        return;
      }
      
      // Regular login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success("Login successful");
    } catch (error: any) {
      toast.error(error.message || "Failed to login");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register with email and password
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });
      
      if (error) throw error;
      
      toast.success("Registration successful");
    } catch (error: any) {
      toast.error(error.message || "Failed to register");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Failed to login with Google");
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to logout");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoading,
      isAdmin,
      loginWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  );
};
