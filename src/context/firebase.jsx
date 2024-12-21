import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { 
  getFirestore, 
  addDoc,
  getDocs,
  doc,
  getDoc, 
  collection,
  updateDoc,
  // deleteDoc,
  setDoc
} from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";

// Firebase configuration remains the same
const firebaseConfig = {
  apiKey: "AIzaSyCJovxraK5B6oq4GaN750IqrqArvPKWqxs",
  authDomain: "pageparadise-70c6f.firebaseapp.com",
  projectId: "pageparadise-70c6f",
  storageBucket: "pageparadise-70c6f.appspot.com",
  messagingSenderId: "627451557799",
  appId: "1:627451557799:web:4191984b8f57a2b1f16882",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(firebaseApp);
const Firestore = getFirestore(firebaseApp);
const GoogleProvider = new GoogleAuthProvider();

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // Track user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
      setUser(user || null);
      if (user) {
        // Fetch cart when user logs in
        fetchUserCart(user.uid);
      } else {
        setCart([]);
      }
    });
    return () => unsubscribe();
  }, []);

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
   const fetchBookById = async (id) => {
    try {
        const docRef = doc(Firestore, "books", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
            } else {
            console.error("No such document!");
            return null;
            }
   } catch (error) {
        console.error("Error fetching book:", error);
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
  const googleLogin = async () => {
    try {
      return await signInWithPopup(FirebaseAuth, GoogleProvider);
    } catch (error) {
      console.error("Google Login Error:", error.message);
      throw error;
    }
  };

  // Fetch user's cart
  const fetchUserCart = async (userId) => {
    try {
      const cartDoc = await getDoc(doc(Firestore, "carts", userId));
      if (cartDoc.exists()) {
        const cartData = cartDoc.data();
        // Fetch full book details for each item in cart
        const cartItems = await Promise.all(
          cartData.items.map(async (item) => {
            const bookDoc = await getDoc(doc(Firestore, "books", item.bookId));
            return {
              ...item,
              book: { id: bookDoc.id, ...bookDoc.data() }
            };
          })
        );
        setCart(cartItems);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  };

  // Add item to cart
  const addToCart = async (bookId, quantity = 1) => {
    if (!user) throw new Error("Must be logged in to add to cart");

    try {
      const userId = user.uid;
      const cartRef = doc(Firestore, "carts", userId);
      const cartDoc = await getDoc(cartRef);

      if (cartDoc.exists()) {
        const existingCart = cartDoc.data();
        const existingItem = existingCart.items.find(item => item.bookId === bookId);

        if (existingItem) {
          // Update quantity if item exists
          const updatedItems = existingCart.items.map(item =>
            item.bookId === bookId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          await updateDoc(cartRef, { items: updatedItems });
        } else {
          // Add new item if it doesn't exist
          const updatedItems = [...existingCart.items, { bookId, quantity }];
          await updateDoc(cartRef, { items: updatedItems });
        }
      } else {
        // Create new cart if it doesn't exist
        await setDoc(cartRef, {
          items: [{ bookId, quantity }]
        });
      }

      // Refresh cart
      await fetchUserCart(userId);
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  // Remove item from cart
  const removeFromCart = async (bookId) => {
    if (!user) throw new Error("Must be logged in to remove from cart");

    try {
      const userId = user.uid;
      const cartRef = doc(Firestore, "carts", userId);
      const cartDoc = await getDoc(cartRef);

      if (cartDoc.exists()) {
        const existingCart = cartDoc.data();
        const updatedItems = existingCart.items.filter(item => item.bookId !== bookId);
        await updateDoc(cartRef, { items: updatedItems });
        await fetchUserCart(userId);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  };

  // Update cart item quantity
  const updateCartItemQuantity = async (bookId, quantity) => {
    if (!user) throw new Error("Must be logged in to update cart");
    if (quantity < 1) return removeFromCart(bookId);

    try {
      const userId = user.uid;
      const cartRef = doc(Firestore, "carts", userId);
      const cartDoc = await getDoc(cartRef);

      if (cartDoc.exists()) {
        const existingCart = cartDoc.data();
        const updatedItems = existingCart.items.map(item =>
          item.bookId === bookId ? { ...item, quantity } : item
        );
        await updateDoc(cartRef, { items: updatedItems });
        await fetchUserCart(userId);
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      throw error;
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (!user) throw new Error("Must be logged in to clear cart");

    try {
      const userId = user.uid;
      await setDoc(doc(Firestore, "carts", userId), { items: [] });
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  };
  const isLoggedin = !!user;
  // ... (keep all your existing functions)

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
        fetchBookById,
        // Add new cart functions
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};