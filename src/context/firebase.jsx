import { createContext, useContext ,useState ,useEffect } from "react";
import { initializeApp } from "firebase/app";
import {getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword ,GoogleAuthProvider ,signInWithPopup  ,onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJovxraK5B6oq4GaN750IqrqArvPKWqxs",
  authDomain: "pageparadise-70c6f.firebaseapp.com",
  projectId: "pageparadise-70c6f",
  storageBucket: "pageparadise-70c6f.firebasestorage.app",
  messagingSenderId: "627451557799",
  appId: "1:627451557799:web:4191984b8f57a2b1f16882"
};


const firebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(firebaseApp);
const GoogleProvider = new GoogleAuthProvider();

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);


export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, (user) => {
            if (user)setUser(user);
            else setUser(null);
            console.log(user);
        });
    }, []);

    const signupUserWithEmailAndPassword = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
            return userCredential;
        } catch (error) {
            console.error("Signup Error:", error.message);
            throw error; 
        }
    };
    
    const loginUserWithEmailAndPassword = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(FirebaseAuth, email, password);
            return userCredential;
        } catch (error) {
            console.error("Login Error:", error.message);
            throw error;
        }
    };
    const logout = () => {
        return FirebaseAuth.signOut();
    };
    
    
    const googleLogin = () => {
        return signInWithPopup(FirebaseAuth, GoogleProvider);
    }
    const isLoggedin = user ? true : false;

    return (
        <FirebaseContext.Provider value={{signupUserWithEmailAndPassword, loginUserWithEmailAndPassword ,googleLogin ,isLoggedin ,user ,logout}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}
