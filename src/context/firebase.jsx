import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, addDoc,getDocs, collection } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJovxraK5B6oq4GaN750IqrqArvPKWqxs",
  authDomain: "pageparadise-70c6f.firebaseapp.com",
  projectId: "pageparadise-70c6f",
  storageBucket: "pageparadise-70c6f.firebaseapp.com",
  messagingSenderId: "627451557799",
  appId: "1:627451557799:web:4191984b8f57a2b1f16882",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(firebaseApp);
const Firestore = getFirestore(firebaseApp);
const GoogleProvider = new GoogleAuthProvider();

// Create Context
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  // Track user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
      setUser(user || null);
      console.log("User state changed:", user);
    });
    return () => unsubscribe();
  }, []);

  // Sign up with email and password
  const signupUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      console.error("Signup Error:", error.message);
      throw error;
    }
  };

  // Login with email and password
  const loginUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  };
  const fetchBooks = async () => {
    try {
        const querySnapshot = await getDocs(collection(Firestore, "books")); // Replace 'books' with your Firestore collection name
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};

  // Add a new book to Firestore
  const HandleCreateNewBook = async (
    name,
    category,
    price,
    author,
    image,
    description
  ) => {
    try {
      const docRef = await addDoc(collection(Firestore, "books"), {
        name,
        category,
        price,
        author,
        image,
        description,
      });
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error.message);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await FirebaseAuth.signOut();
    } catch (error) {
      console.error("Logout Error:", error.message);
      throw error;
    }
  };

  // Login with Google
  const googleLogin =  () => {
    try {
      return signInWithRedirect(FirebaseAuth, GoogleProvider);
    } catch (error) {
      console.error("Google Login Error:", error.message);
      throw error;
    }
  };

  // Check if a user is logged in
  const isLoggedin = !!user;

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        loginUserWithEmailAndPassword,
        googleLogin,
        isLoggedin,
        user,
        logout,
        HandleCreateNewBook,
        fetchBooks,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
