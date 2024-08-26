import {
  collection,
  doc,
  getDoc,
  addDoc,
  getDocs,
  getFirestore,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

/**
 * Retrieves data from a Firestore collection.
 *
 * @param {string} collectionName - The name of the Firestore collection.
 * @returns {Promise<any[]>} - A promise that resolves with an array of data objects.
 *
 * @example
 * const data = await retrieveData('users');
 * console.log(data); // [{ id: 'user1', name: 'John Doe' }, { id: 'user2', name: 'Jane Doe' }]
 */
export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

/**
 * Retrieves a single document from a Firestore collection by ID.
 *
 * @param {string} collectionName - The name of the Firestore collection.
 * @param {string} id - The ID of the document to retrieve.
 * @returns {Promise<any>} - A promise that resolves with the retrieved document data.
 *
 * @example
 * const userData = await retrieveDataByID('users', 'user1');
 * console.log(userData); // { name: 'John Doe', email: 'john@example.com' }
 */
export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

/**
 * Signs in a user with an email and password.
 */
export async function signIn(userData: { email: string }) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data) {
    return data[0];
  } else {
    return null;
  }
}

/**
 * Signs up a new user with email, fullname, password, and optional role.
 *
 * @param {{ email: string, fullname: string, password: string, role?: string }} userData - The user data object.
 * @param {(status: boolean, message: string) => void} callback - The callback function to handle sign-up result.
 *
 * @example
 * signUp(
 *   { email: 'jane@example.com', fullname: 'Jane Doe', password: 'password123' },
 *   (status, message) => {
 *     if (status) {
 *       console.log('Sign up successful!');
 *     } else {
 *       console.error('Sign up failed:', message);
 *     }
 *   }
 * );
 */
export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: Function
) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    callback(false, "Email already exists");
  } else {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";
    try {
      await addDoc(collection(firestore, "users"), userData);
      callback(true, "Register success");
    } catch (error: any) {
      callback(false, error.message);
    }
  }
}

export async function signInWithGoogle(userData: any, callback: any) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    userData.role = data[0].role;
    await updateDoc(doc(firestore, "users", data[0].id), userData)
      .then(() => {
        callback({
          status: true,
          message: "Sign in with google success",
          data: userData,
        });
      })
      .catch(() => {
        callback({
          status: false,
          message: "Sign in with google failed",
        });
      });
  } else {
    userData.role = "member";
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({
          status: true,
          message: "Sign in with google success",
          data: userData,
        });
      })
      .catch(() => {
        callback({
          status: false,
          message: "Sign in with google failed",
        });
      });
  }
}

/**
 * Signs in a user with Google authentication.
 *
 * @param {any} userData - The user data object from Google authentication.
 * @param {(status: boolean, message: string) => void} callback - The callback function to handle sign-in result.
 *
 * @example
 * SignInWithGoogle(
 *   { email: 'john@example.com', name: 'John Doe' },
 *   (result) => {
 *     if (result.status) {
 *       console.log('Sign in **/
