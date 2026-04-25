import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { getUserProfile, createUserProfile } from '../services/userService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const profileData = await getUserProfile(userId);
      setProfile(profileData);
    } catch {
      try {
        const user = (await supabase.auth.getUser()).data.user;
        if (user) {
          await createUserProfile(user.id, user.email, 'user');
          const profileData = await getUserProfile(user.id);
          setProfile(profileData);
        }
      } catch (err) {
        console.error('Error creating user profile:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = profile?.role === 'admin';

  const logout = async () => {
    console.log('Logging out...');
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
      
      console.log('Sign out successful, redirecting...');
      // Use location.replace for a cleaner history
      window.location.replace('/auth');
    } catch (err) {
      console.error('Logout error:', err);
      // Fallback redirect even on error
      window.location.replace('/auth');
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Internal hook for the file if needed, but we export a helper
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
