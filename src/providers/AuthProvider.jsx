import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { Auth } from "../firebase/firebase.config";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  function createUser(user) {
    setLoading(true);
    return createUserWithEmailAndPassword(Auth, user.email, user.password);
  }

  function updateUser(user) {
    setLoading(true);
    return updateProfile(Auth.currentUser, user);
  }

  function signIn(user) {
    setLoading(true);
    return signInWithEmailAndPassword(Auth, user.email, user.password);
  }

  function Logout() {
    setLoading(true);
    return signOut(Auth);
  }

  function signInWithGoogle() {
    return signInWithPopup(Auth, googleProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        updateUser,
        signIn,
        Logout,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
