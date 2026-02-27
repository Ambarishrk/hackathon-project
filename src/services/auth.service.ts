import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase/config'

const googleProvider = new GoogleAuthProvider()

// ─────────────────────────────
// REGISTER with Email + Password
// ─────────────────────────────
export const register = async (email: string, password: string, name: string) => {
  try {
    // Step 1: Create auth account
    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    // Step 2: Set display name
    await updateProfile(user, { displayName: name })

    // Step 3: Create user profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name: name,
      email: email.toLowerCase(),
      role: 'user',            // Default role
      photoURL: null,
      bio: '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    // Step 4: Send verification email
    await sendEmailVerification(user)

    return user
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new Error(`Registration failed: ${error.message}`)
    }
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Registration failed: Unknown error')
  }
}

// ─────────────────────────────
// LOGIN with Email + Password
// ─────────────────────────────
export const login = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return user
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new Error(`Login failed: ${error.message}`)
    }
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Login failed: Unknown error')
  }
}

// ─────────────────────────────
// GOOGLE Sign In
// ─────────────────────────────
export const signInWithGoogle = async () => {
  try {
    const { user } = await signInWithPopup(auth, googleProvider)

    // Only create Firestore doc on first login
    const userDocRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userDocRef)

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        name: user.displayName || 'Unknown User',
        email: user.email || '',
        role: 'user',
        photoURL: user.photoURL || null,
        bio: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    }

    return user
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new Error(`Google Sign In failed: ${error.message}`)
    }
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Google Sign In failed: Unknown error')
  }
}

// ─────────────────────────────
// SIGN OUT
// ─────────────────────────────
export const logout = () => signOut(auth)

// ─────────────────────────────
// PASSWORD RESET EMAIL
// ─────────────────────────────
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new Error(`Password reset failed: ${error.message}`)
    }
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Password reset failed: Unknown error')
  }
}

// ─────────────────────────────
// FETCH USER PROFILE
// ─────────────────────────────
export const fetchUserProfile = async (uid: string) => {
  try {
    const userDocRef = doc(db, 'users', uid)
    const userDoc = await getDoc(userDocRef)
    
    if (!userDoc.exists()) {
      throw new Error('User profile not found')
    }
    
    return userDoc.data()
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new Error(`Failed to fetch profile: ${error.message}`)
    }
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to fetch profile: Unknown error')
  }
}
