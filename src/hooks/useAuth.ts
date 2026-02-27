// src/hooks/useAuth.ts
// This hook gives any component access to the current auth state

import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useAuthStore } from '../store/authStore'

export const useAuth = () => {
  const { user, loading, setUser, setLoading } = useAuthStore()

  useEffect(() => {
    // onAuthStateChanged fires:
    //   ① On page load (restores session from localStorage)
    //   ② When user signs in
    //   ③ When user signs out
    //   ④ When token refreshes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)   // null if not logged in
      setLoading(false)
    })

    return unsubscribe  // Cleanup listener on unmount
  }, [])

  return { user, loading, isAuthenticated: !!user }
}
