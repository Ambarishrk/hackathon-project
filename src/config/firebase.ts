import { FirebaseError } from 'firebase/app'

// Re-export from main config
export { auth, db, storage, functions } from '../firebase/config'

// Error type for consistency
export type { FirebaseError }
