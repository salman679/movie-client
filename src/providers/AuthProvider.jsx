import { useEffect, useState } from "react";
import { AuthContext } from "../context/AllContext";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Auth } from "../firebase/firebase.config";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function createUser(user) {
    setUser(user);
    setLoading(false);
    return createUserWithEmailAndPassword(Auth, user.email, user.password);
  }

  function signIn(user) {
    setUser(user);
    setLoading(false);
    return signInWithEmailAndPassword(Auth, user.email, user.password);
  }

  function Logout() {
    setUser(null);
    setLoading(false);
    return signOut(Auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
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
      value={{ user, setUser, loading, setLoading, createUser, signIn, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
