/**
 * Initializes the Firebase app with the provided configuration.
 *
 * @param {Object} firebaseConfig - The Firebase configuration object.
 * @param {string} firebaseConfig.apiKey - The Firebase API key.
 * @param {string} firebaseConfig.authDomain - The Firebase authentication domain.
 * @param {string} firebaseConfig.projectId - The Firebase project ID.
 * @param {string} firebaseConfig.storageBucket - The Firebase storage bucket.
 * @param {string} firebaseConfig.messagingSenderId - The Firebase messaging sender ID.
 * @param {string} firebaseConfig.appId - The Firebase app ID.
 *
 * @returns {Object} The initialized Firebase app.
 *
 * @example
 * import { initializeApp } from "firebase/app";
 *
 * const firebaseConfig = {
 *   apiKey: process.env.FIREBASE_API_KEY,
 *   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
 *   projectId: process.env.FIREBASE_PROJECT_ID,
 *   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
 *   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
 *   appId: process.env.FIREBASE_APP_ID,
 * };
 *
 * const app = initializeApp(firebaseConfig);
 * export default app;
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
