// src/config/firebase.ts

import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'

// These come from your .env file (never hardcode)
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase app (only once)
const app = initializeApp(firebaseConfig)

// Initialize services
export const auth      = getAuth(app)
export const db        = getFirestore(app)
export const storage   = getStorage(app)
export const functions = getFunctions(app)

// ─────────────────────────────────────────────
// In development: connect to local emulators
// This means you don't touch real production data
// ─────────────────────────────────────────────
if (import.meta.env.DEV) {
  connectAuthEmulator(auth,      'http://localhost:9099')
  connectFirestoreEmulator(db,   'localhost', 8080)
  connectStorageEmulator(storage,'localhost', 9199)
  connectFunctionsEmulator(functions, 'localhost', 5001)
}
