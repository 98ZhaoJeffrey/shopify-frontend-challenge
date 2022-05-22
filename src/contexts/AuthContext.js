import React, { useState, createContext, useEffect } from 'react';
import { 
    getAuth, 
    onAuthStateChanged, 
    GoogleAuthProvider, 
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail
 } from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    // updates usestate if we have login/logout
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return unsubscribe;
    });

    const googleLogin = () =>{
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    const emailLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    const logout = () => {
        return signOut(auth);
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }
    
    const value = {
        currentUser,
        googleLogin,
        emailLogin,
        logout,
        signup,
        resetPassword
    };

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    );
};