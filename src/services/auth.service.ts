// src/services/auth.service.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  User
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

const googleProvider = new GoogleAuthProvider()

// ─────────────────────────────
// REGISTER with Email + Password
// ─────────────────────────────
export const register = async (email: string, password: string, name: string) => {
  // Step 1: Create auth account
  const { user } = await createUserWithEmailAndPassword(auth, email, password)

  // Step 2: Set display name
  await updateProfile(user, { displayName: name })

  // Step 3: Create user profile in Firestore
  await setDoc(doc(db, 'users', user.uid), {
    uid:         user.uid,
    name:        name,
    email:       email.toLowerCase(),
    role:        'user',            // Default role
    photoURL:    null,
    bio:         '',
    createdAt:   serverTimestamp(),
    updatedAt:   serverTimestamp(),
  })

  // Step 4: Send verification email
  await sendEmailVerification(user)

  return user
}

// ─────────────────────────────
// LOGIN with Email + Password
// ─────────────────────────────
export const login = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  return user
}

// ─────────────────────────────
// GOOGLE Sign In
// ─────────────────────────────
export const signInWithGoogle = async () => {
  const { user } = await signInWithPopup(auth, googleProvider)

  // Only create Firestore doc on first login
  const userDocRef = doc(db, 'users', user.uid)
  const userDoc    = await getDoc(userDocRef)

  if (!userDoc.exists()) {
    await setDoc(userDocRef, {
      uid:       user.uid,
      name:      user.displayName,
      email:     user.email,
      role:      'user',
      photoURL:  user.photoURL,
      bio:       '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  }

  return user
}

// ─────────────────────────────
// SIGN OUT
// ─────────────────────────────
export const logout = () => signOut(auth)

// ─────────────────────────────
// PASSWORD RESET EMAIL
// ─────────────────────────────
export const resetPassword = (email: string) =>
  sendPasswordResetEmail(auth, email)
