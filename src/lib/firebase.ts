import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Read Firebase config from Vite environment variables (VITE_ prefix)
// Provide a helpful warning if any required variable is missing.
const firebaseConfig = {
  apiKey: (import.meta.env.VITE_FIREBASE_API_KEY as string) ?? "",
  authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string) ?? "",
  projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID as string) ?? "",
  storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string) ?? "",
  messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string) ?? "",
  appId: (import.meta.env.VITE_FIREBASE_APP_ID as string) ?? ""
};

const missing = Object.entries(firebaseConfig).filter(([, v]) => !v).map(([k]) => k);
if (missing.length > 0) {
  // eslint-disable-next-line no-console
  console.warn(
    `[firebase] Missing Firebase Vite env vars: ${missing.join(", ")}.\n` +
      `Add them to a local .env file (see .env.example) as VITE_FIREBASE_...`);
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
