import { useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from '../store/authStore';
import { fetchUserProfile } from '../services/auth.service';

export const useAuth = () => {
  const { user, loading, setUser, setLoading, setUserProfile } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      try {
        if (authUser) {
          setUser(authUser);
          // Fetch user profile from Firestore
          const profile = await fetchUserProfile(authUser.uid);
          setUserProfile(profile as any);
        } else {
          setUser(null);
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Error syncing auth state:', error);
        setUser(authUser);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setUser, setLoading, setUserProfile]);

  return { user, loading };
};
