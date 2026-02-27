// src/store/authStore.ts
import { create } from 'zustand'
import { User } from 'firebase/auth'

interface UserProfile {
  role: 'user' | 'admin'
  // Add any other profile fields here
}

interface AuthState {
  user:        User | null
  userProfile: UserProfile | null
  loading:     boolean
  setUser:     (user: User | null) => void
  setLoading:  (loading: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user:        null,
  userProfile: null,
  loading:     true, // Load initial auth state
  setUser:     (user) => set({ user }),
  setLoading:  (loading) => set({ loading }),
}))
