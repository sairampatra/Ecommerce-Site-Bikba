import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut ,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import { useContext, createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { getDatabase,ref,set } from "firebase/database";
import app from "../firebaseConfig" 
import { useNavigate } from "react-router-dom"


const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const navigate = useNavigate()

  const db = getDatabase(app)
  const googleProvider = new GoogleAuthProvider();

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCredentials,setUsercredentials] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // console.log('first')
      setUsercredentials(user)
      setLoading(false);
    });
    return () => unsubscribe();
  }, []); 

  async function signup(email, password) {
    try {
        const userCredentials =  await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredentials.user
          set(ref(db,`users/${user.uid}`),{
            email:user.email,
            password:password
          })
      } catch (error) {
        console.error("Signup error:", error.message);
        throw error;
      }  }

  // Log in
  async function login(email, password) {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.error("Login error:", error.message);
        throw error;
      }  }

  // Log out
  async function logout() {
    try {
       await signOut(auth);
      navigate("/")
      } catch (error) {
        console.error("Logout error:", error.message);
      }  }
      async function signinWithGoogle() {
        try {
           const user = await signInWithPopup(auth, googleProvider)
           return user
          } catch (error) {
            console.error("google signin Error:", error.message);
          }  
        }
  return (
    <AuthContext.Provider value={{ currentUser,signup,login,logout,signinWithGoogle,userCredentials }}>
      {!loading && children}
    
    </AuthContext.Provider>
  );
}
