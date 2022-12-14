import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from 'firebase/auth'
import { auth } from '../config/firebase'
import { database } from '../config/firebase'
import { doc, getDoc, deleteDoc } from "firebase/firestore"; 
import currentUserDataRequest from '../data/currectUser';

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if (user) {
        setUser(user);
        //setUser(await currentUserDataRequest())
        console.log(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    setUser(null)
    await signOut(auth)
  }

  const deleteAccount = async () => {
    const user = auth.currentUser;
    await signOut(auth)
    if (user) {
      try {
        const usersRef = doc(database, "userid", user.uid);
        const docSnap = await getDoc(usersRef)
        let username : string = docSnap.get("username")
        console.log(username)
        await deleteDoc(doc(database, "userid", user.uid))
        await deleteDoc(doc(database, "username", username))
        await deleteUser(user)
        setUser(null)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, deleteAccount }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}