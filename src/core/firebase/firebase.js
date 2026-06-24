import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || "",
  authDomain: import.meta.env.VITE_AUTH_DOMAIN || "",
  databaseURL: import.meta.env.VITE_DATABASE_URL || "",
  projectId: import.meta.env.VITE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_APP_ID || ""
};

Object.entries(firebaseConfig).forEach(([key, value]) => {
  if (!value) {
    console.warn(`⚠️ Missing Firebase env variable: ${key}`);
  }
});

const required = ["apiKey", "databaseURL", "projectId", "appId"];

required.forEach((key) => {
  if (!firebaseConfig[key]) {
    console.error(`❌ Missing required Firebase config: ${key}`);
  }
});

let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getDatabase(app);
} catch (error) {
  // note: initialization failed - bad apiKey, databaseURL
  console.error("Firebase init failed:", error);
}

export { db };