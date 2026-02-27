# 🔥 Full-Stack Web Application
## Firebase Auth + Firestore — Complete Specification & Architecture Guide
### Step-by-Step · Modular · Crystal Clear

> **Stack:** React + TypeScript + TailwindCSS + Firebase Auth + Firestore + Cloud Functions
> **Who this is for:** Developers building a production-grade app from zero — every concept explained visually and step by step.

---

## 📋 Table of Contents

| # | Section |
|---|---|
| 1 | [The Big Picture — How Everything Connects](#1-the-big-picture) |
| 2 | [Tech Stack — Every Tool & Why](#2-tech-stack) |
| 3 | [Project Structure — Every File & Folder](#3-project-structure) |
| 4 | [Firebase Setup — Configuration & Init](#4-firebase-setup) |
| 5 | [Firebase Authentication — Full Flow](#5-firebase-authentication) |
| 6 | [Firestore Database — Schema & Rules](#6-firestore-database) |
| 7 | [Frontend Architecture — Components & Routing](#7-frontend-architecture) |
| 8 | [State Management — Data Flow](#8-state-management) |
| 9 | [Cloud Functions — Serverless Backend Logic](#9-cloud-functions) |
| 10 | [File Storage — Firebase Storage](#10-file-storage) |
| 11 | [Security Rules — Protecting Your Data](#11-security-rules) |
| 12 | [Error Handling — Graceful Failures](#12-error-handling) |
| 13 | [Real-Time Features — Live Updates](#13-real-time-features) |
| 14 | [Testing Strategy](#14-testing-strategy) |
| 15 | [Deployment — Firebase Hosting + CI/CD](#15-deployment) |
| 16 | [Performance Optimization](#16-performance-optimization) |
| 17 | [Environment Configuration](#17-environment-configuration) |
| 18 | [Step-by-Step Build Order](#18-step-by-step-build-order) |
| 19 | [Quick Reference Cheatsheet](#19-quick-reference-cheatsheet) |

---

## 1. The Big Picture

### 1.1 Traditional Backend vs Firebase

Before diving in, understand what Firebase replaces and what it provides:

```
TRADITIONAL STACK                    FIREBASE STACK
─────────────────────────────────────────────────────────────────

  Browser                              Browser
    │                                    │
    │  HTTP Request                      │  SDK Call (direct)
    ▼                                    ▼
  Your Node.js Server          ╔═══════════════════════╗
    │                          ║     FIREBASE           ║
    │  SQL Query                ║                       ║
    ▼                          ║  ┌─────────────────┐  ║
  PostgreSQL                   ║  │  Authentication  │  ║
                               ║  ├─────────────────┤  ║
You manage:                    ║  │  Firestore DB    │  ║
  ✗ Server setup               ║  ├─────────────────┤  ║
  ✗ Database admin             ║  │  Cloud Storage   │  ║
  ✗ Scaling                    ║  ├─────────────────┤  ║
  ✗ SSL certs                  ║  │  Cloud Functions │  ║
  ✗ Uptime monitoring          ║  ├─────────────────┤  ║
                               ║  │  Hosting         │  ║
                               ╚═══════════════════════╝
                               
                               Firebase manages ALL of that ✅
```

### 1.2 Full Architecture — Everything Connected

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER'S BROWSER                                 │
│                                                                             │
│   ┌───────────────────────────────────────────────────────────────────┐    │
│   │                    REACT APPLICATION                               │    │
│   │                                                                   │    │
│   │   ┌─────────────┐   ┌─────────────┐   ┌─────────────────────┐   │    │
│   │   │    Pages    │   │  Components │   │   Zustand Store      │   │    │
│   │   │  /dashboard │   │  Navbar     │   │   authStore          │   │    │
│   │   │  /profile   │   │  UserCard   │   │   userStore          │   │    │
│   │   │  /settings  │   │  PostList   │   │   uiStore            │   │    │
│   │   └──────┬──────┘   └──────┬──────┘   └──────────┬──────────┘   │    │
│   │          │                 │                       │              │    │
│   │          └─────────────────┴───────────────────────┘              │    │
│   │                            │                                      │    │
│   │                    ┌───────▼────────┐                             │    │
│   │                    │  Firebase SDK  │  (installed as npm package) │    │
│   │                    │  (firebase.ts) │                             │    │
│   └────────────────────┴───────┬────────┴─────────────────────────────┘    │
└────────────────────────────────┼────────────────────────────────────────────┘
                                 │
                    HTTPS (TLS encrypted)
                                 │
┌────────────────────────────────▼────────────────────────────────────────────┐
│                           FIREBASE PLATFORM                                 │
│                                                                             │
│  ┌──────────────────┐  ┌────────────────────┐  ┌────────────────────────┐  │
│  │   FIREBASE       │  │    FIRESTORE       │  │   CLOUD STORAGE        │  │
│  │   AUTH           │  │    DATABASE        │  │                        │  │
│  │                  │  │                    │  │  /users/{uid}/avatar   │  │
│  │  Email/Password  │  │  /users            │  │  /posts/{id}/images    │  │
│  │  Google OAuth    │  │  /posts            │  │                        │  │
│  │  GitHub OAuth    │  │  /comments         │  │  Max 5GB free tier     │  │
│  │  Phone Auth      │  │  /notifications    │  │                        │  │
│  │                  │  │                    │  │                        │  │
│  │  Issues JWT      │  │  Real-time sync ✅  │  │                        │  │
│  │  Manages tokens  │  │  Offline support ✅ │  │                        │  │
│  └──────────────────┘  └────────────────────┘  └────────────────────────┘  │
│                                                                             │
│  ┌──────────────────┐  ┌────────────────────┐  ┌────────────────────────┐  │
│  │  CLOUD FUNCTIONS │  │  FIREBASE HOSTING  │  │  FIREBASE EXTENSIONS   │  │
│  │                  │  │                    │  │                        │  │
│  │  Serverless      │  │  CDN-deployed      │  │  Stripe Payments       │  │
│  │  Node.js code    │  │  React build       │  │  Resize Images         │  │
│  │  Triggered by:   │  │  Free SSL cert     │  │  Algolia Search        │  │
│  │  - Auth events   │  │  Custom domains    │  │                        │  │
│  │  - DB writes     │  │                    │  │                        │  │
│  │  - HTTP calls    │  │                    │  │                        │  │
│  │  - Schedules     │  │                    │  │                        │  │
│  └──────────────────┘  └────────────────────┘  └────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Request Lifecycle — Step by Step

Every user action follows this path:

```
USER CLICKS "Save Post"
        │
        ▼
① React captures onClick event
        │
        ▼
② Zustand action called: postStore.createPost(data)
        │
        ▼
③ Firebase SDK called directly from browser:
   addDoc(collection(db, 'posts'), { ...data, userId: auth.currentUser.uid })
        │
        ▼
④ Firebase checks Firestore Security Rules:
   "Does this user have permission to write to /posts?"
        │
        ├── ❌ NO  → Returns permission-denied error → UI shows error toast
        │
        └── ✅ YES → Document written to Firestore
                │
                ▼
⑤ If you have real-time listener onSnapshot() → UI updates INSTANTLY
   If you used a one-time addDoc() → Manually update local state
        │
        ▼
⑥ Cloud Function triggered (optional):
   "onDocumentCreated /posts/{postId}" → Send notification emails
        │
        ▼
⑦ User sees success confirmation in UI ✅
```

---

## 2. Tech Stack

### 2.1 Every Tool, Every Purpose

```
LAYER               TOOL                  VERSION    PURPOSE
─────────────────────────────────────────────────────────────────

FRONTEND
  Framework         React                 18.x       UI components
  Language          TypeScript            5.x        Type safety
  Build Tool        Vite                  5.x        Fast dev + build
  Styling           TailwindCSS           3.x        Utility CSS
  Routing           React Router          6.x        Page navigation
  State             Zustand               4.x        Global state
  Forms             React Hook Form       7.x        Form handling
  Validation        Zod                   3.x        Schema validation
  Notifications     React Hot Toast       2.x        Toast messages
  Icons             Lucide React          latest     Icon library

FIREBASE (Backend-as-a-Service)
  Authentication    Firebase Auth         10.x       Login/signup
  Database          Firestore             10.x       NoSQL real-time DB
  Storage           Firebase Storage      10.x       File uploads
  Functions         Cloud Functions       4.x        Serverless logic
  Hosting           Firebase Hosting      —          Deploy React app

TESTING
  Unit Tests        Vitest                latest     Fast test runner
  Component Tests   React Testing Library latest     UI testing
  E2E Tests         Playwright            latest     Browser automation
  Firebase Tests    Firebase Emulator     latest     Local Firebase

TOOLING
  Package Manager   npm / pnpm            latest     Dependencies
  Linting           ESLint + Prettier     latest     Code quality
  Git Hooks         Husky + lint-staged   latest     Pre-commit checks
  CI/CD             GitHub Actions        latest     Auto deploy
```

---

## 3. Project Structure

### 3.1 Full Folder Layout — Every File Explained

```
my-firebase-app/
│
├── 📁 src/
│   │
│   ├── 📁 config/
│   │   └── firebase.ts              ← Initialize Firebase (do this ONCE)
│   │
│   ├── 📁 pages/                    ← One file per route/screen
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── PostDetailPage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── 📁 components/
│   │   ├── 📁 layout/               ← App shell components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx           ← Wraps pages with navbar+footer
│   │   │
│   │   ├── 📁 ui/                   ← Generic reusable primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Avatar.tsx
│   │   │   └── Card.tsx
│   │   │
│   │   └── 📁 features/             ← Feature-specific components
│   │       ├── 📁 auth/
│   │       │   ├── LoginForm.tsx
│   │       │   ├── RegisterForm.tsx
│   │       │   ├── GoogleSignInButton.tsx
│   │       │   └── ProtectedRoute.tsx   ← Guards logged-in routes
│   │       │
│   │       ├── 📁 posts/
│   │       │   ├── PostCard.tsx
│   │       │   ├── PostList.tsx
│   │       │   ├── PostForm.tsx
│   │       │   └── PostActions.tsx
│   │       │
│   │       └── 📁 profile/
│   │           ├── ProfileCard.tsx
│   │           ├── AvatarUpload.tsx
│   │           └── EditProfileForm.tsx
│   │
│   ├── 📁 hooks/                    ← Custom React hooks (reusable logic)
│   │   ├── useAuth.ts               ← Current user + auth state
│   │   ├── usePosts.ts              ← CRUD for posts
│   │   ├── useUser.ts               ← User profile data
│   │   ├── useFirestore.ts          ← Generic Firestore helpers
│   │   └── useStorage.ts            ← File upload helpers
│   │
│   ├── 📁 store/                    ← Zustand global state
│   │   ├── authStore.ts             ← Auth state (user, loading, error)
│   │   ├── postStore.ts             ← Posts state
│   │   └── uiStore.ts               ← UI state (modals, sidebar open)
│   │
│   ├── 📁 services/                 ← All Firestore/Storage operations
│   │   ├── auth.service.ts          ← signIn, signUp, signOut, etc.
│   │   ├── users.service.ts         ← User profile CRUD
│   │   ├── posts.service.ts         ← Posts CRUD
│   │   └── storage.service.ts       ← File upload/download
│   │
│   ├── 📁 types/                    ← TypeScript interfaces
│   │   ├── user.types.ts
│   │   ├── post.types.ts
│   │   └── common.types.ts
│   │
│   ├── 📁 utils/                    ← Pure helper functions
│   │   ├── formatters.ts            ← Date, number, text formatting
│   │   ├── validators.ts            ← Zod schemas
│   │   └── constants.ts             ← App-wide constants
│   │
│   ├── App.tsx                      ← Root: routing + providers
│   └── main.tsx                     ← Entry point: renders App
│
├── 📁 functions/                    ← Cloud Functions (serverless backend)
│   ├── 📁 src/
│   │   ├── index.ts                 ← All function exports
│   │   ├── 📁 auth/
│   │   │   └── onUserCreated.ts     ← Trigger on new signup
│   │   ├── 📁 firestore/
│   │   │   └── onPostCreated.ts     ← Trigger on new post
│   │   └── 📁 http/
│   │       └── sendEmail.ts         ← HTTP-triggered function
│   ├── package.json
│   └── tsconfig.json
│
├── firestore.rules                  ← Firestore security rules
├── storage.rules                    ← Storage security rules
├── firebase.json                    ← Firebase project config
├── .firebaserc                      ← Project aliases
├── .env                             ← Environment variables (NEVER commit)
├── .env.example                     ← Template (safe to commit)
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 3.2 The Golden Rule of This Structure

```
WHERE DOES MY CODE GO?

Q: "Does it talk to Firebase?"
   └── YES → goes in /services/
   └── NO  → keep reading

Q: "Is it logic reused across multiple components?"
   └── YES → goes in /hooks/ (if it uses React state) or /utils/ (if pure function)
   └── NO  → keep reading

Q: "Is it a full page/screen?"
   └── YES → goes in /pages/
   └── NO  → goes in /components/

Q: "Is it a generic UI piece (Button, Modal)?"
   └── YES → /components/ui/
   
Q: "Is it specific to one feature (PostCard, UserAvatar)?"
   └── YES → /components/features/{feature-name}/

Q: "Is it global app state?"
   └── YES → /store/
```

---

## 4. Firebase Setup

### 4.1 Create Firebase Project — Step by Step

```
Step 1: Go to https://console.firebase.google.com
Step 2: Click "Add project"
Step 3: Enter project name (e.g., "my-app-prod")
Step 4: Disable Google Analytics (can enable later)
Step 5: Click "Create project"

Step 6: Add a Web App
  → Click the </> (Web) icon
  → Register app name: "my-app-web"
  → ✅ Check "Also set up Firebase Hosting"
  → Copy the firebaseConfig object shown

Step 7: Enable services you need:
  → Build → Authentication → Get started → Enable Email/Password + Google
  → Build → Firestore Database → Create database → Start in production mode
  → Build → Storage → Get started
```

### 4.2 Firebase Initialization (`/src/config/firebase.ts`)

> This file runs ONCE when the app loads. Import from here everywhere.

```typescript
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
```

### 4.3 Environment Variables (`.env`)

```bash
# .env  ← NEVER commit this file — it's in .gitignore

VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=my-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=my-app-prod
VITE_FIREBASE_STORAGE_BUCKET=my-app-prod.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

```bash
# .env.example  ← Commit this — shows teammates what vars are needed

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## 5. Firebase Authentication

### 5.1 All Auth Flows Visualized

```
╔══════════════════════════════════════════════════════════════════╗
║                    EMAIL/PASSWORD SIGNUP                         ║
╚══════════════════════════════════════════════════════════════════╝

User fills form → email, password, name
        │
        ▼
Zod validates:  email format ✓  password min 8 chars ✓
        │
        ▼
authService.register(email, password, name)
        │
        ▼
Firebase Auth: createUserWithEmailAndPassword(auth, email, password)
        │
        ├── ❌ "email-already-in-use" → Show "Email taken" error
        │
        └── ✅ Returns: UserCredential { user: { uid, email, ... } }
                │
                ▼
        updateProfile(user, { displayName: name })
                │
                ▼
        Create Firestore doc at /users/{uid}
        { name, email, role: 'user', createdAt, photoURL: null }
                │
                ▼
        Send email verification: sendEmailVerification(user)
                │
                ▼
        Zustand authStore.setUser(user)
                │
                ▼
        Navigate to /dashboard ✅


╔══════════════════════════════════════════════════════════════════╗
║                    EMAIL/PASSWORD LOGIN                          ║
╚══════════════════════════════════════════════════════════════════╝

User fills form → email, password
        │
        ▼
authService.login(email, password)
        │
        ▼
Firebase Auth: signInWithEmailAndPassword(auth, email, password)
        │
        ├── ❌ "user-not-found"     → "No account with this email"
        ├── ❌ "wrong-password"     → "Incorrect password"
        ├── ❌ "too-many-requests"  → "Account temporarily locked"
        │
        └── ✅ Returns UserCredential
                │
                ▼
        Firebase automatically:
          ① Stores token in localStorage
          ② Refreshes token every hour
          ③ Restores session on page reload
                │
                ▼
        onAuthStateChanged listener fires
                │
                ▼
        authStore.setUser(user)
                │
                ▼
        Navigate to /dashboard ✅


╔══════════════════════════════════════════════════════════════════╗
║                    GOOGLE OAUTH LOGIN                            ║
╚══════════════════════════════════════════════════════════════════╝

User clicks "Sign in with Google"
        │
        ▼
authService.signInWithGoogle()
        │
        ▼
Firebase: signInWithPopup(auth, googleProvider)
        │
        ▼
Google popup opens → user selects account
        │
        ├── ❌ User closes popup → "popup-closed-by-user"
        │
        └── ✅ Returns UserCredential
                │
                ▼
        Check if first time login:
        getDoc(/users/{uid}) → exists?
                │
        ┌───────┴────────┐
       NO               YES
        │                │
        ▼                ▼
  Create user doc    Just update
  in Firestore       lastLoginAt
        │                │
        └───────┬─────────┘
                ▼
        authStore.setUser(user)
        Navigate to /dashboard ✅
```

### 5.2 Auth Service (`/src/services/auth.service.ts`)

```typescript
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
```

### 5.3 Auth Hook (`/src/hooks/useAuth.ts`)

```typescript
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
```

### 5.4 Protected Route Component

```typescript
// src/components/features/auth/ProtectedRoute.tsx

import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../../store/authStore'
import Spinner from '../../ui/Spinner'

interface Props {
  requiredRole?: 'admin' | 'user'  // Optional role guard
}

export default function ProtectedRoute({ requiredRole }: Props) {
  const { user, loading, userProfile } = useAuthStore()

  // Still checking auth state — show spinner
  if (loading) return <Spinner fullscreen />

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />

  // Role check — if admin route but user is not admin
  if (requiredRole === 'admin' && userProfile?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  // All checks passed → render the page
  return <Outlet />
}
```

---

## 6. Firestore Database

### 6.1 Firestore vs SQL — Key Differences

```
SQL DATABASE                         FIRESTORE
─────────────────────────────────────────────────────────────────

"Tables"          ←→   "Collections"   (e.g., /users, /posts)
"Rows"            ←→   "Documents"     (each doc has an ID)
"Columns"         ←→   "Fields"        (flexible — no fixed schema)
"JOIN"            ←→   Subcollections or separate queries
"WHERE clause"    ←→   .where() queries (limited compared to SQL)
"Auto-increment"  ←→   Auto-generated string IDs (e.g., "Xk92mN...")

⚠️  CRITICAL RULES FOR FIRESTORE:
  1. You cannot join collections (like SQL JOIN)
  2. You can only query on indexed fields
  3. You cannot do OR queries across different fields easily
  4. Documents should be < 1MB
  5. Structure data for HOW you read it, not how you write it
```

### 6.2 Data Schema Design

```
FIRESTORE DATABASE
│
├── 📁 users/                        (Collection)
│   └── 📄 {userId}/                 (Document — ID = Firebase Auth UID)
│       ├── uid:         "abc123"
│       ├── name:        "Alice Smith"
│       ├── email:       "alice@example.com"
│       ├── role:        "user" | "admin"
│       ├── photoURL:    "https://..." | null
│       ├── bio:         "Hello I'm Alice"
│       ├── createdAt:   Timestamp
│       └── updatedAt:   Timestamp
│
├── 📁 posts/                        (Collection)
│   └── 📄 {postId}/                 (Document — auto-generated ID)
│       ├── title:       "My First Post"
│       ├── content:     "Long text content..."
│       ├── published:   true
│       ├── coverImage:  "https://storage.googleapis.com/..." | null
│       ├── tags:        ["react", "firebase"]   ← Array field
│       ├── authorId:    "abc123"                ← Reference to users/{id}
│       ├── authorName:  "Alice Smith"           ← Denormalized for fast reads
│       ├── likeCount:   42
│       ├── commentCount:3
│       ├── createdAt:   Timestamp
│       └── updatedAt:   Timestamp
│
│       └── 📁 comments/             (Subcollection inside post)
│           └── 📄 {commentId}/
│               ├── text:      "Great post!"
│               ├── authorId:  "def456"
│               ├── authorName:"Bob"
│               └── createdAt: Timestamp
│
├── 📁 notifications/                (Collection)
│   └── 📄 {notificationId}/
│       ├── userId:     "abc123"     ← Who gets this notification
│       ├── type:       "new_comment" | "new_like" | "new_follower"
│       ├── message:    "Bob commented on your post"
│       ├── link:       "/posts/xyz"
│       ├── read:       false
│       └── createdAt:  Timestamp
│
└── 📁 likes/                        (Collection — for like tracking)
    └── 📄 {userId}_{postId}/        (Composite ID prevents duplicates)
        ├── userId:   "abc123"
        ├── postId:   "xyz789"
        └── createdAt:Timestamp
```

### 6.3 TypeScript Types (`/src/types/`)

```typescript
// src/types/user.types.ts
export interface UserProfile {
  uid:       string
  name:      string
  email:     string
  role:      'user' | 'admin'
  photoURL:  string | null
  bio:       string
  createdAt: Date
  updatedAt: Date
}

// src/types/post.types.ts
export interface Post {
  id:           string        // Firestore document ID
  title:        string
  content:      string
  published:    boolean
  coverImage:   string | null
  tags:         string[]
  authorId:     string
  authorName:   string
  likeCount:    number
  commentCount: number
  createdAt:    Date
  updatedAt:    Date
}

export interface Comment {
  id:         string
  text:       string
  authorId:   string
  authorName: string
  createdAt:  Date
}

// src/types/common.types.ts
export interface PaginationResult<T> {
  data:        T[]
  lastDoc:     any | null   // For Firestore cursor pagination
  hasMore:     boolean
}
```

### 6.4 Posts Service — Full CRUD (`/src/services/posts.service.ts`)

```typescript
// src/services/posts.service.ts
import {
  collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc,
  query, where, orderBy, limit, startAfter,
  serverTimestamp, increment, onSnapshot, QueryDocumentSnapshot
} from 'firebase/firestore'
import { db, auth } from '../config/firebase'
import { Post } from '../types/post.types'

const POSTS_COLLECTION = 'posts'

// ──────────────────────────────
// CREATE a new post
// ──────────────────────────────
export const createPost = async (data: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'likeCount' | 'commentCount'>) => {
  const user = auth.currentUser
  if (!user) throw new Error('Not authenticated')

  const docRef = await addDoc(collection(db, POSTS_COLLECTION), {
    ...data,
    authorId:     user.uid,
    authorName:   user.displayName,
    likeCount:    0,
    commentCount: 0,
    createdAt:    serverTimestamp(),
    updatedAt:    serverTimestamp(),
  })

  return docRef.id
}

// ──────────────────────────────
// READ a single post by ID
// ──────────────────────────────
export const getPostById = async (postId: string): Promise<Post | null> => {
  const docSnap = await getDoc(doc(db, POSTS_COLLECTION, postId))

  if (!docSnap.exists()) return null

  return { id: docSnap.id, ...docSnap.data() } as Post
}

// ──────────────────────────────
// READ posts with pagination
// ──────────────────────────────
export const getPosts = async (pageSize = 10, lastDoc?: QueryDocumentSnapshot) => {
  let q = query(
    collection(db, POSTS_COLLECTION),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  )

  // For pagination: start after last document from previous page
  if (lastDoc) {
    q = query(q, startAfter(lastDoc))
  }

  const snapshot = await getDocs(q)
  const posts    = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Post))

  return {
    data:    posts,
    lastDoc: snapshot.docs[snapshot.docs.length - 1] ?? null,
    hasMore: snapshot.docs.length === pageSize
  }
}

// ──────────────────────────────
// READ posts by current user
// ──────────────────────────────
export const getMyPosts = async () => {
  const user = auth.currentUser
  if (!user) throw new Error('Not authenticated')

  const q        = query(collection(db, POSTS_COLLECTION), where('authorId', '==', user.uid), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)

  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Post))
}

// ──────────────────────────────
// UPDATE a post
// ──────────────────────────────
export const updatePost = async (postId: string, data: Partial<Post>) => {
  await updateDoc(doc(db, POSTS_COLLECTION, postId), {
    ...data,
    updatedAt: serverTimestamp()
  })
}

// ──────────────────────────────
// DELETE a post
// ──────────────────────────────
export const deletePost = async (postId: string) => {
  await deleteDoc(doc(db, POSTS_COLLECTION, postId))
}

// ──────────────────────────────
// LIKE a post (atomic increment)
// ──────────────────────────────
export const likePost = async (postId: string) => {
  await updateDoc(doc(db, POSTS_COLLECTION, postId), {
    likeCount: increment(1)   // Atomic — safe for concurrent updates
  })
}

// ──────────────────────────────
// REAL-TIME listener for a post
// ──────────────────────────────
export const subscribeToPost = (postId: string, callback: (post: Post | null) => void) => {
  return onSnapshot(doc(db, POSTS_COLLECTION, postId), (snap) => {
    if (snap.exists()) {
      callback({ id: snap.id, ...snap.data() } as Post)
    } else {
      callback(null)
    }
  })
  // Returns unsubscribe function — call it in useEffect cleanup
}
```

---

## 7. Frontend Architecture

### 7.1 Component Hierarchy

```
App.tsx
  └── <BrowserRouter>
        └── <AuthProvider>  (global auth listener)
              ├── /login              → LoginPage.tsx
              ├── /register           → RegisterPage.tsx
              └── <ProtectedRoute>
                    └── <Layout>      (Navbar + Sidebar + Footer)
                          ├── /dashboard     → DashboardPage.tsx
                          │     ├── StatsRow.tsx
                          │     │     └── StatCard × 4
                          │     └── RecentPosts.tsx
                          │           └── PostCard × n
                          │
                          ├── /posts          → PostsPage.tsx
                          │     ├── PostList.tsx
                          │     │     └── PostCard × n
                          │     └── CreatePostButton.tsx
                          │
                          ├── /posts/:id      → PostDetailPage.tsx
                          │     ├── PostContent.tsx
                          │     ├── PostActions.tsx
                          │     └── CommentSection.tsx
                          │           └── CommentItem × n
                          │
                          └── /profile        → ProfilePage.tsx
                                ├── ProfileCard.tsx
                                ├── AvatarUpload.tsx
                                └── EditProfileForm.tsx
```

### 7.2 App Entry Point (`App.tsx`)

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './hooks/useAuth'

// Layout
import Layout from './components/layout/Layout'

// Auth guard
import ProtectedRoute from './components/features/auth/ProtectedRoute'

// Pages
import LoginPage    from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import PostsPage    from './pages/PostsPage'
import PostDetailPage from './pages/PostDetailPage'
import ProfilePage  from './pages/ProfilePage'
import AdminPage    from './pages/AdminPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  const { loading } = useAuth()  // Initialize auth listener at root

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>

  return (
    <BrowserRouter>
      <Toaster position="top-right" />  {/* Global toast notifications */}

      <Routes>
        {/* Public pages */}
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected pages (must be logged in) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/"          element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/posts"     element={<PostsPage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/profile"   element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Admin-only pages */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route element={<Layout />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### 7.3 Page Component Pattern

> Every page follows the same pattern: fetch data → handle states → render.

```typescript
// src/pages/PostsPage.tsx
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../services/posts.service'
import PostList from '../components/features/posts/PostList'
import Spinner  from '../components/ui/Spinner'
import Button   from '../components/ui/Button'

export default function PostsPage() {
  const [page, setPage] = useState(1)

  // useQuery handles: loading, error, caching, refetching
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts', page],
    queryFn:  () => getPosts(10),
  })

  // State 1: Loading
  if (isLoading) return <Spinner />

  // State 2: Error
  if (isError) return (
    <div className="text-red-500 p-4">
      Error: {error.message}
    </div>
  )

  // State 3: Empty
  if (!data?.data.length) return (
    <div className="text-center py-20">
      <p className="text-gray-500">No posts yet.</p>
      <Button onClick={() => {}}>Create First Post</Button>
    </div>
  )

  // State 4: Success — show data
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Button>New Post</Button>
      </div>

      <PostList posts={data.data} />

      {data.hasMore && (
        <button onClick={() => setPage(p => p + 1)} className="mt-4">
          Load More
        </button>
      )}
    </div>
  )
}
```

---

## 8. State Management

### 8.1 What Goes Where — Decision Map

```
DATA TYPE                           WHERE IT LIVES
─────────────────────────────────────────────────────────────────

Current logged-in user              Zustand authStore
User's Firestore profile            Zustand authStore
Modal open/closed                   Zustand uiStore  OR useState
Sidebar collapsed                   Zustand uiStore
Server data (posts, users)          React Query cache
Form values                         React Hook Form (local)
Input field text                    useState (local)
Scroll position                     useState or ref (local)
```

### 8.2 Auth Store (`/src/store/authStore.ts`)

```typescript
// src/store/authStore.ts
import { create } from 'zustand'
import { User } from 'firebase/auth'
import { UserProfile } from '../types/user.types'

interface AuthState {
  user:        User | null          // Firebase Auth user
  userProfile: UserProfile | null   // Firestore profile doc
  loading:     boolean

  // Actions
  setUser:        (user: User | null) => void
  setUserProfile: (profile: UserProfile | null) => void
  setLoading:     (loading: boolean) => void
  reset:          () => void        // Called on logout
}

export const useAuthStore = create<AuthState>((set) => ({
  user:        null,
  userProfile: null,
  loading:     true,  // true initially — checking auth state

  setUser:        (user) => set({ user }),
  setUserProfile: (userProfile) => set({ userProfile }),
  setLoading:     (loading) => set({ loading }),
  reset:          () => set({ user: null, userProfile: null, loading: false }),
}))
```

### 8.3 UI Store (`/src/store/uiStore.ts`)

```typescript
// src/store/uiStore.ts
import { create } from 'zustand'

interface UIState {
  sidebarOpen:    boolean
  activeModal:    string | null
  toggleSidebar:  () => void
  openModal:      (name: string) => void
  closeModal:     () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen:   true,
  activeModal:   null,

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  openModal:     (name) => set({ activeModal: name }),
  closeModal:    () => set({ activeModal: null }),
}))
```

### 8.4 Full Data Flow Diagram

```
USER ACTION: "Like a post"
        │
        ▼
PostActions.tsx  →  onClick calls  →  useMutation (React Query)
        │
        ▼
likePost(postId)  from  posts.service.ts
        │
        ▼
Firestore:  updateDoc({ likeCount: increment(1) })
        │
        ├── If real-time listener active (onSnapshot):
        │     Firestore pushes update automatically
        │     → PostCard re-renders with new count ✅
        │
        └── If one-time query used:
              React Query invalidates cache for ['posts']
              → Posts refetched → UI updates ✅
```

---

## 9. Cloud Functions

### 9.1 When To Use Cloud Functions

```
USE CLOUD FUNCTIONS WHEN:

  ✅ You need to do something AFTER a DB write
     (e.g., send email when someone comments)

  ✅ You need to run code the USER should NOT control
     (e.g., set role = 'admin', process payment)

  ✅ You need a SCHEDULED task
     (e.g., clean up expired data every night)

  ✅ You need a WEBHOOK endpoint
     (e.g., receive Stripe payment confirmation)

  ✅ You need to do something EXPENSIVE or SLOW
     (e.g., resize image, generate PDF)

DO NOT USE CLOUD FUNCTIONS FOR:
  ❌ Simple CRUD — do it directly from frontend
  ❌ Anything the Security Rules can handle
```

### 9.2 Cloud Functions Architecture

```
TRIGGERS — What starts a Cloud Function:

  ① AUTH TRIGGER
     onCreate → User signs up
     onDelete → User account deleted

  ② FIRESTORE TRIGGER
     onCreate  → New document created
     onUpdate  → Document updated
     onDelete  → Document deleted
     onWrite   → Any of the above

  ③ STORAGE TRIGGER
     onObjectFinalized → File uploaded
     onObjectDeleted   → File deleted

  ④ HTTP TRIGGER
     Any HTTP call to the function URL
     (acts like a REST endpoint)

  ⑤ SCHEDULED TRIGGER
     Cron job — runs on a schedule
     e.g., every day at midnight
```

### 9.3 Example Functions (`/functions/src/index.ts`)

```typescript
// functions/src/index.ts
import { initializeApp } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import * as functions from 'firebase-functions'

initializeApp()  // Initialize admin SDK (server-side, full access)
const db   = getFirestore()
const auth = getAuth()

// ─────────────────────────────────────────────────────────────
// TRIGGER 1: When a new user signs up → set custom claims
// Custom claims = roles embedded in the JWT token
// ─────────────────────────────────────────────────────────────
export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  // Set default role claim on the JWT
  await auth.setCustomUserClaims(user.uid, { role: 'user' })

  // Update the Firestore user doc
  await db.doc(`users/${user.uid}`).set({
    uid:       user.uid,
    email:     user.email,
    role:      'user',
    createdAt: FieldValue.serverTimestamp()
  }, { merge: true })

  console.log(`✅ New user setup: ${user.uid}`)
})

// ─────────────────────────────────────────────────────────────
// TRIGGER 2: When a comment is created → notify post author
// ─────────────────────────────────────────────────────────────
export const onCommentCreated = functions.firestore
  .document('posts/{postId}/comments/{commentId}')
  .onCreate(async (snap, context) => {
    const comment  = snap.data()
    const postId   = context.params.postId

    // Get the parent post
    const postDoc = await db.doc(`posts/${postId}`).get()
    const post    = postDoc.data()

    // Don't notify if user commenting on their own post
    if (!post || post.authorId === comment.authorId) return

    // Create notification for the post author
    await db.collection('notifications').add({
      userId:    post.authorId,
      type:      'new_comment',
      message:   `${comment.authorName} commented on "${post.title}"`,
      link:      `/posts/${postId}`,
      read:      false,
      createdAt: FieldValue.serverTimestamp()
    })

    // Increment comment count on the post
    await db.doc(`posts/${postId}`).update({
      commentCount: FieldValue.increment(1)
    })
  })

// ─────────────────────────────────────────────────────────────
// TRIGGER 3: HTTP function — promote user to admin
// Only callable by existing admins
// ─────────────────────────────────────────────────────────────
export const promoteToAdmin = functions.https.onCall(async (data, context) => {
  // Check caller is authenticated and is an admin
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Must be logged in')
  if (context.auth.token.role !== 'admin') throw new functions.https.HttpsError('permission-denied', 'Must be admin')

  const { targetUserId } = data

  // Set admin role
  await auth.setCustomUserClaims(targetUserId, { role: 'admin' })
  await db.doc(`users/${targetUserId}`).update({ role: 'admin' })

  return { success: true }
})

// ─────────────────────────────────────────────────────────────
// TRIGGER 4: Scheduled — clean up old notifications daily
// ─────────────────────────────────────────────────────────────
export const cleanupNotifications = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    const oldNotifs = await db.collection('notifications')
      .where('createdAt', '<', thirtyDaysAgo)
      .where('read', '==', true)
      .get()

    const batch = db.batch()
    oldNotifs.docs.forEach(doc => batch.delete(doc.ref))
    await batch.commit()

    console.log(`🗑️  Deleted ${oldNotifs.size} old notifications`)
  })
```

---

## 10. File Storage

### 10.1 Storage Workflow

```
USER SELECTS FILE (e.g., profile photo)
        │
        ▼
Frontend validates:
  - File type: must be image/jpeg or image/png
  - File size: must be < 5MB
        │
        ▼
Generate storage path:
  avatars/{userId}/avatar.jpg   ← Overwrites old avatar automatically
        │
        ▼
Firebase Storage: uploadBytesResumable()
        │
        ├── onProgress → Update progress bar in UI (0% → 100%)
        │
        └── onComplete → getDownloadURL() → returns public URL
                │
                ▼
        Update Firestore:
        /users/{uid}/photoURL = "https://firebasestorage.googleapis.com/..."
                │
                ▼
        Update Firebase Auth profile:
        updateProfile(user, { photoURL: downloadURL })
                │
                ▼
        UI shows new avatar ✅
```

### 10.2 Storage Service (`/src/services/storage.service.ts`)

```typescript
// src/services/storage.service.ts
import {
  ref, uploadBytesResumable, getDownloadURL, deleteObject
} from 'firebase/storage'
import { storage, auth } from '../config/firebase'

// ──────────────────────────────
// Upload avatar with progress
// ──────────────────────────────
export const uploadAvatar = (
  file: File,
  onProgress: (percent: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const user = auth.currentUser
    if (!user) return reject(new Error('Not authenticated'))

    // Validate file
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      return reject(new Error('Only JPEG, PNG, and WebP images are allowed'))
    }
    if (file.size > 5 * 1024 * 1024) {  // 5MB
      return reject(new Error('File must be smaller than 5MB'))
    }

    // Storage path — overwrites old avatar
    const storageRef  = ref(storage, `avatars/${user.uid}/avatar.jpg`)
    const uploadTask  = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',

      // Progress callback
      (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        onProgress(Math.round(percent))
      },

      // Error callback
      reject,

      // Success callback
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        resolve(downloadURL)
      }
    )
  })
}

// ──────────────────────────────
// Upload post cover image
// ──────────────────────────────
export const uploadPostImage = (
  postId: string,
  file: File,
  onProgress: (percent: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `posts/${postId}/cover.jpg`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed',
      (snap) => onProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
      reject,
      async () => resolve(await getDownloadURL(uploadTask.snapshot.ref))
    )
  })
}

// ──────────────────────────────
// Delete a file from storage
// ──────────────────────────────
export const deleteFile = async (filePath: string) => {
  await deleteObject(ref(storage, filePath))
}
```

---

## 11. Security Rules

### 11.1 Firestore Security Rules

> **Critical:** Default rules deny everything. You explicitly open what you want.

```javascript
// firestore.rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ─────────────────────────────────────────────────
    // HELPER FUNCTIONS
    // ─────────────────────────────────────────────────

    // Is the user logged in?
    function isAuth() {
      return request.auth != null;
    }

    // Is the request from this specific user?
    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    // Does the user have admin role? (set via custom claims)
    function isAdmin() {
      return request.auth.token.role == 'admin';
    }

    // Is the incoming data valid for a post?
    function isValidPost() {
      let data = request.resource.data;
      return data.title is string
          && data.title.size() > 0
          && data.title.size() <= 200
          && data.content is string
          && data.authorId == request.auth.uid;
    }

    // ─────────────────────────────────────────────────
    // USERS COLLECTION
    // /users/{userId}
    // ─────────────────────────────────────────────────
    match /users/{userId} {
      // Anyone logged in can read user profiles (for post author info, etc.)
      allow read:   if isAuth();

      // Only the user can create their own profile
      allow create: if isAuth() && isOwner(userId);

      // Only the user or an admin can update their profile
      allow update: if isAuth() && (isOwner(userId) || isAdmin());

      // Only admin can delete users
      allow delete: if isAdmin();
    }

    // ─────────────────────────────────────────────────
    // POSTS COLLECTION
    // /posts/{postId}
    // ─────────────────────────────────────────────────
    match /posts/{postId} {
      // Anyone can read published posts; author can read their own drafts
      allow read: if resource.data.published == true
                  || (isAuth() && resource.data.authorId == request.auth.uid)
                  || isAdmin();

      // Logged-in user can create — must be valid and set as their own
      allow create: if isAuth() && isValidPost();

      // Only author or admin can update
      allow update: if isAuth() && (resource.data.authorId == request.auth.uid || isAdmin());

      // Only author or admin can delete
      allow delete: if isAuth() && (resource.data.authorId == request.auth.uid || isAdmin());

      // ── Comments subcollection ──
      match /comments/{commentId} {
        // Anyone can read comments on published posts
        allow read: if get(/databases/$(database)/documents/posts/$(postId)).data.published == true;

        // Logged-in users can create comments
        allow create: if isAuth()
                      && request.resource.data.authorId == request.auth.uid
                      && request.resource.data.text.size() <= 1000;

        // Only comment author can update/delete
        allow update, delete: if isAuth() && resource.data.authorId == request.auth.uid;
      }
    }

    // ─────────────────────────────────────────────────
    // NOTIFICATIONS COLLECTION
    // /notifications/{notifId}
    // ─────────────────────────────────────────────────
    match /notifications/{notifId} {
      // Users can only read THEIR OWN notifications
      allow read:   if isAuth() && resource.data.userId == request.auth.uid;

      // Only Cloud Functions (admin SDK) can create notifications
      allow create: if false;

      // User can mark their own notification as read
      allow update: if isAuth()
                    && resource.data.userId == request.auth.uid
                    && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['read']);

      allow delete: if isAuth() && resource.data.userId == request.auth.uid;
    }
  }
}
```

### 11.2 Storage Security Rules

```javascript
// storage.rules

rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // Avatars — user can read all, write only their own, max 5MB, images only
    match /avatars/{userId}/{fileName} {
      allow read:  if request.auth != null;
      allow write: if request.auth != null
                   && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }

    // Post images — any logged-in user can read, only post author writes
    match /posts/{postId}/{fileName} {
      allow read:  if request.auth != null;
      allow write: if request.auth != null
                   && request.resource.size < 10 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

---

## 12. Error Handling

### 12.1 Firebase Error Codes → User-Friendly Messages

```typescript
// src/utils/firebase-errors.ts

export const getFirebaseErrorMessage = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    // Auth errors
    'auth/email-already-in-use':    'An account with this email already exists.',
    'auth/invalid-email':           'Please enter a valid email address.',
    'auth/user-not-found':          'No account found with this email.',
    'auth/wrong-password':          'Incorrect password. Please try again.',
    'auth/weak-password':           'Password must be at least 6 characters.',
    'auth/too-many-requests':       'Too many failed attempts. Try again later.',
    'auth/network-request-failed':  'Network error. Check your internet connection.',
    'auth/popup-closed-by-user':    'Sign in was cancelled.',
    'auth/requires-recent-login':   'Please sign in again to complete this action.',
    'auth/user-disabled':           'This account has been disabled.',

    // Firestore errors
    'permission-denied':            'You do not have permission to do that.',
    'not-found':                    'The requested data was not found.',
    'already-exists':               'This record already exists.',
    'resource-exhausted':           'Quota exceeded. Please try again later.',
    'unavailable':                  'Service temporarily unavailable.',

    // Storage errors
    'storage/unauthorized':         'You are not authorized to access this file.',
    'storage/object-not-found':     'File not found.',
    'storage/quota-exceeded':       'Storage quota exceeded.',
    'storage/invalid-file-name':    'Invalid file name.',
  }

  return errorMessages[errorCode] ?? 'Something went wrong. Please try again.'
}
```

### 12.2 Global Error Boundary

```typescript
// src/components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react'

interface Props  { children: ReactNode }
interface State  { hasError: boolean; error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    // Log to monitoring service (Sentry, etc.)
    console.error('App Error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-4">The app encountered an unexpected error.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
```

---

## 13. Real-Time Features

### 13.1 onSnapshot — Live Data Updates

```
WITHOUT real-time (one-time query):
  User A posts comment → User B's screen DOES NOT update
  User B must manually refresh to see it ❌

WITH onSnapshot (real-time listener):
  User A posts comment
        │
        Firestore detects new document
        │
        Pushes to ALL active listeners
        │
  User B's screen updates INSTANTLY ✅
  No refresh needed ✅
```

### 13.2 Real-Time Hook Pattern

```typescript
// src/hooks/useRealtimePosts.ts
import { useEffect, useState } from 'react'
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore'
import { db } from '../config/firebase'
import { Post } from '../types/post.types'

export const useRealtimePosts = (limitCount = 10) => {
  const [posts,   setPosts]   = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    )

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Post))
        setPosts(data)
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )

    // IMPORTANT: Clean up listener when component unmounts
    // Without this → memory leaks + errors on unmounted components
    return () => unsubscribe()
  }, [limitCount])

  return { posts, loading, error }
}
```

### 13.3 Notification Bell with Live Count

```typescript
// src/hooks/useUnreadNotifications.ts
import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db, auth } from '../config/firebase'

export const useUnreadNotifications = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const user = auth.currentUser
    if (!user) return

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', user.uid),
      where('read',   '==', false)
    )

    // Live count — updates instantly when new notification arrives
    const unsubscribe = onSnapshot(q, (snap) => setCount(snap.size))

    return () => unsubscribe()
  }, [])

  return count
}
```

---

## 14. Testing Strategy

### 14.1 Testing Pyramid

```
                    /\
                   /  \
                  / E2E \        ← Playwright
                 /  Tests \        5–10 critical user flows
                /──────────\
               /  Integration\   ← Vitest + Firebase Emulator
              /    Tests      \    Test services with real Firestore
             /─────────────────\
            /   Unit Tests      \  ← Vitest
           /  (most tests here)  \   Functions, hooks, validators
          /─────────────────────  \
         ──────────────────────────

RULE: More unit tests than integration. More integration than E2E.
```

### 14.2 Testing Firebase with Emulator

```typescript
// src/services/__tests__/posts.service.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing'
import { createPost, getPostById } from '../posts.service'

let testEnv: RulesTestEnvironment

beforeEach(async () => {
  // Connect to Firebase Emulator (not real Firebase!)
  testEnv = await initializeTestEnvironment({
    projectId: 'test-project',
    firestore: { host: 'localhost', port: 8080 }
  })

  // Clear all data before each test
  await testEnv.clearFirestore()
})

describe('posts.service', () => {
  it('creates a post and returns the id', async () => {
    const id = await createPost({
      title:     'Test Post',
      content:   'Some content',
      published: true,
      tags:      [],
      coverImage: null,
    })

    expect(id).toBeTruthy()
    expect(typeof id).toBe('string')
  })

  it('retrieves a post by id', async () => {
    const id   = await createPost({ title: 'Hello', content: 'World', published: true, tags: [], coverImage: null })
    const post = await getPostById(id)

    expect(post).not.toBeNull()
    expect(post?.title).toBe('Hello')
  })

  it('returns null for non-existent post', async () => {
    const post = await getPostById('does-not-exist')
    expect(post).toBeNull()
  })
})
```

---

## 15. Deployment

### 15.1 Firebase Hosting Deployment Flow

```
LOCAL DEVELOPMENT
        │
        │  git push origin main
        ▼
GITHUB ACTIONS CI/CD PIPELINE
        │
        ├── Step 1:  Install dependencies (npm ci)
        ├── Step 2:  Run linter (npm run lint)
        ├── Step 3:  Run tests (npm run test)
        ├── Step 4:  Build React app (npm run build)
        │           → Creates /dist folder
        ├── Step 5:  Deploy to Firebase Hosting
        │           firebase deploy --only hosting
        └── Step 6:  Deploy Cloud Functions
                    firebase deploy --only functions

        ▼
FIREBASE HOSTING (CDN)
  → Your /dist files served from 150+ global edge locations
  → Free SSL certificate auto-provisioned
  → Custom domain: yourapp.com
  → Fallback URL: your-project.web.app
```

### 15.2 GitHub Actions CI/CD (`.github/workflows/deploy.yml`)

```yaml
# .github/workflows/deploy.yml

name: Build and Deploy

on:
  push:
    branches: [main]  # Triggers on every push to main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test

      - name: Build React app
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY:             ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN:         ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID:          ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET:      ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID:              ${{ secrets.VITE_FIREBASE_APP_ID }}

      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken:       ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          projectId:       your-firebase-project-id
          channelId:       live
```

---

## 16. Performance Optimization

### 16.1 Firestore Query Optimization

```
PROBLEM: Reading /posts when you only need titles
─────────────────────────────────────────────────
❌ BAD — fetches entire document (content = 50KB each)
   getDocs(collection(db, 'posts'))

✅ GOOD — use field selection where possible
   Note: Firestore doesn't have native field selection
   Solution: Store summary data in a separate collection

FIRESTORE PAGINATION — never load all records
─────────────────────────────────────────────────
❌ BAD — loads ALL posts into memory
   getDocs(collection(db, 'posts'))

✅ GOOD — cursor-based pagination
   query(collection(db,'posts'), orderBy('createdAt'), limit(10))
   // Next page:
   query(collection(db,'posts'), orderBy('createdAt'), startAfter(lastDoc), limit(10))

LISTENER CLEANUP — prevent memory leaks
─────────────────────────────────────────────────
❌ BAD — listener never removed
   onSnapshot(q, callback)

✅ GOOD — cleanup in useEffect
   useEffect(() => {
     const unsub = onSnapshot(q, callback)
     return () => unsub()   // ← This runs on component unmount
   }, [])
```

### 16.2 React Performance

```
CODE SPLITTING — don't load everything upfront
─────────────────────────────────────────────────
✅ Lazy load pages so initial bundle is small:
   const DashboardPage = lazy(() => import('./pages/DashboardPage'))
   const AdminPage     = lazy(() => import('./pages/AdminPage'))

   <Suspense fallback={<Spinner />}>
     <Routes>
       <Route path="/dashboard" element={<DashboardPage />} />
     </Routes>
   </Suspense>

IMAGE OPTIMIZATION
─────────────────────────────────────────────────
✅ Use Firebase Extensions "Resize Images" — auto-generates
   thumbnail versions of uploaded images
   original:   800×600  2MB
   thumb_200:  200×150  50KB  ← Use this in lists
   thumb_800:  800×600  400KB ← Use this in detail view

CACHING with React Query
─────────────────────────────────────────────────
✅ React Query caches API responses:
   useQuery({
     queryKey: ['post', postId],
     queryFn:  () => getPostById(postId),
     staleTime: 5 * 60 * 1000,  // Data fresh for 5 minutes
     cacheTime: 10 * 60 * 1000  // Keep in memory 10 minutes
   })
```

---

## 17. Environment Configuration

### 17.1 Three Environments

```
DEVELOPMENT          STAGING                PRODUCTION
───────────────────────────────────────────────────────────
Your laptop          Preview deploys        Live app
firebase emulator    my-app-staging         my-app-prod
Port 5173            app-staging.web.app    myapp.com

Uses local           Uses real Firebase     Uses real Firebase
emulated Firebase    but separate project   production project
No real data         Test data OK           Real user data
```

### 17.2 Firebase Projects Per Environment

```bash
# .firebaserc — links aliases to project IDs
{
  "projects": {
    "default":     "my-app-prod",
    "staging":     "my-app-staging",
    "development": "my-app-dev"
  }
}

# Switch between environments:
firebase use staging
firebase use production
firebase use development
```

---

## 18. Step-by-Step Build Order

> Follow this exact order. Each step builds on the previous one.

```
PHASE 1 — PROJECT SETUP (Day 1)
─────────────────────────────────────────────────────────
 □ Step 1:  npm create vite@latest my-app -- --template react-ts
 □ Step 2:  Install dependencies (see package.json below)
 □ Step 3:  Set up TailwindCSS
 □ Step 4:  Create Firebase project in console
 □ Step 5:  Create src/config/firebase.ts
 □ Step 6:  Add .env with Firebase config values
 □ Step 7:  Install Firebase CLI: npm install -g firebase-tools
 □ Step 8:  firebase login && firebase init (select: emulators)
 □ Step 9:  Test: firebase emulators:start → should see emulator UI

PHASE 2 — AUTHENTICATION (Day 2–3)
─────────────────────────────────────────────────────────
 □ Step 10: Create authStore (Zustand)
 □ Step 11: Create auth.service.ts (register, login, logout, googleSignIn)
 □ Step 12: Create useAuth hook
 □ Step 13: Build LoginPage.tsx (form + validation)
 □ Step 14: Build RegisterPage.tsx
 □ Step 15: Build ProtectedRoute.tsx
 □ Step 16: Set up routing in App.tsx
 □ Step 17: Test: register → login → protected page → logout ✅

PHASE 3 — DATABASE & CORE FEATURES (Day 4–7)
─────────────────────────────────────────────────────────
 □ Step 18: Design Firestore collections on paper first
 □ Step 19: Write TypeScript interfaces (types/)
 □ Step 20: Create Firestore Security Rules (start strict)
 □ Step 21: Build first service (e.g., posts.service.ts)
 □ Step 22: Build first list page (e.g., PostsPage)
 □ Step 23: Build first detail page (e.g., PostDetailPage)
 □ Step 24: Build create/edit form
 □ Step 25: Add error handling + toast notifications
 □ Step 26: Test all CRUD operations ✅

PHASE 4 — REAL-TIME & STORAGE (Day 8–10)
─────────────────────────────────────────────────────────
 □ Step 27: Add onSnapshot listeners where needed
 □ Step 28: Build file upload component (AvatarUpload)
 □ Step 29: Write storage.rules
 □ Step 30: Test real-time updates in two browser tabs ✅

PHASE 5 — CLOUD FUNCTIONS (Day 11–13)
─────────────────────────────────────────────────────────
 □ Step 31: firebase init functions (TypeScript)
 □ Step 32: Write onUserCreated trigger
 □ Step 33: Write onCommentCreated trigger (notifications)
 □ Step 34: Test with emulator ✅

PHASE 6 — POLISH & DEPLOY (Day 14–15)
─────────────────────────────────────────────────────────
 □ Step 35: Add loading states everywhere
 □ Step 36: Add empty states (no data screens)
 □ Step 37: Add 404 page
 □ Step 38: Implement code splitting (lazy + Suspense)
 □ Step 39: Run lighthouse audit → fix performance issues
 □ Step 40: Set up GitHub Actions workflow
 □ Step 41: firebase deploy → First production deploy ✅
 □ Step 42: Set up custom domain in Firebase console
```

---

## 19. Quick Reference Cheatsheet

### Core Firebase Operations

```typescript
// ─── AUTH ───────────────────────────────────────────────────────
import { auth } from './config/firebase'

const user = auth.currentUser                  // Get current user (sync)
onAuthStateChanged(auth, user => {...})        // Listen to auth changes
await createUserWithEmailAndPassword(auth, email, password)
await signInWithEmailAndPassword(auth, email, password)
await signInWithPopup(auth, new GoogleAuthProvider())
await signOut(auth)
await sendPasswordResetEmail(auth, email)
await updateProfile(user, { displayName, photoURL })

// ─── FIRESTORE ──────────────────────────────────────────────────
import { db } from './config/firebase'

// References
const colRef = collection(db, 'posts')         // Collection reference
const docRef = doc(db, 'posts', 'myPostId')   // Document reference
const docRef = doc(colRef)                     // Auto-ID document ref

// Write
await setDoc(docRef, data)                     // Create (overwrites)
await setDoc(docRef, data, { merge: true })    // Create or update
await addDoc(colRef, data)                     // Create with auto-ID
await updateDoc(docRef, { field: 'value' })   // Partial update
await deleteDoc(docRef)                        // Delete

// Read (one-time)
const snap = await getDoc(docRef)
const doc  = snap.exists() ? snap.data() : null

const snaps = await getDocs(colRef)
const docs  = snaps.docs.map(d => ({ id: d.id, ...d.data() }))

// Query
query(colRef, where('field','==','value'), orderBy('date','desc'), limit(10))
query(colRef, startAfter(lastDoc))            // Pagination

// Real-time
const unsub = onSnapshot(docRef, snap => {...})   // Watch document
const unsub = onSnapshot(q,    snaps => {...})    // Watch collection
unsub()                                           // Stop listening

// Atomic operations
updateDoc(docRef, { count: increment(1) })     // Atomic increment
updateDoc(docRef, { arr: arrayUnion('x') })    // Add to array
updateDoc(docRef, { arr: arrayRemove('x') })   // Remove from array
serverTimestamp()                               // Server-side timestamp

// Batch writes (all succeed or all fail)
const batch = writeBatch(db)
batch.set(docRef1, data1)
batch.update(docRef2, data2)
batch.delete(docRef3)
await batch.commit()

// ─── STORAGE ────────────────────────────────────────────────────
import { storage } from './config/firebase'

const storageRef = ref(storage, 'path/to/file.jpg')
const uploadTask = uploadBytesResumable(storageRef, file)
uploadTask.on('state_changed', onProgress, onError, onComplete)
const url = await getDownloadURL(storageRef)
await deleteObject(storageRef)
```

### Package.json Dependencies

```json
{
  "dependencies": {
    "react":                  "^18.2.0",
    "react-dom":              "^18.2.0",
    "react-router-dom":       "^6.22.0",
    "firebase":               "^10.8.0",
    "zustand":                "^4.5.0",
    "@tanstack/react-query":  "^5.20.0",
    "react-hook-form":        "^7.51.0",
    "zod":                    "^3.22.0",
    "@hookform/resolvers":    "^3.3.0",
    "react-hot-toast":        "^2.4.0",
    "lucide-react":           "^0.356.0",
    "clsx":                   "^2.1.0"
  },
  "devDependencies": {
    "typescript":              "^5.3.0",
    "vite":                    "^5.1.0",
    "@vitejs/plugin-react":    "^4.2.0",
    "tailwindcss":             "^3.4.0",
    "autoprefixer":            "^10.4.0",
    "postcss":                 "^8.4.0",
    "vitest":                  "^1.3.0",
    "@testing-library/react":  "^14.2.0",
    "playwright":              "^1.42.0",
    "eslint":                  "^8.57.0",
    "prettier":                "^3.2.0"
  }
}
```

### Firebase CLI Commands

```bash
# Project management
firebase login                          # Login to Firebase
firebase projects:list                  # List your projects
firebase use <project-id>               # Switch active project

# Local development
firebase emulators:start                # Start all emulators
firebase emulators:start --only auth,firestore,storage

# Deploy
firebase deploy                         # Deploy everything
firebase deploy --only hosting          # Deploy frontend only
firebase deploy --only functions        # Deploy functions only
firebase deploy --only firestore:rules  # Deploy security rules only
firebase deploy --only storage          # Deploy storage rules only

# Database
firebase firestore:delete --all-collections   # Clear all data (dev only!)

# Functions
cd functions && npm run build           # Build functions TypeScript
firebase functions:log                  # View function logs
```

---

> **Built with 🔥 Firebase**
> React + TypeScript + Tailwind + Firebase Auth + Firestore + Cloud Functions
> *From zero to production — modular, scalable, secure.*
