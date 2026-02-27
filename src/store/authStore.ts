import { create } from 'zustand'
import { User } from 'firebase/auth'

export interface UserProfile {
  uid: string
  name: string
  email: string
  role: 'user' | 'admin'
  photoURL: string | null
  bio: string
  createdAt: any
  updatedAt: any
  [key: string]: any
}

interface AuthState {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setUserProfile: (profile: UserProfile | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userProfile: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setUserProfile: (userProfile) => set({ userProfile }),
}))
