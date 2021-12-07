import React, { useState, useEffect, useContext, createContext } from 'react';
import {
    getAuth,
    signInWithRedirect,
    signOut,
    onAuthStateChanged,
    GithubAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    connectAuthEmulator,
} from '@firebase/auth';
import firebaseApp from './firebase';
import { createUser } from './userDb';

const provider = new GithubAuthProvider();

/**
 *  Provide authentication context
 */
const authContext = createContext();
// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

/**
 *  Consume authentication context
 */
export const useAuth = () => {
    return useContext(authContext);
};

/**
 *  Wrapper for handling user signIn, signOut and information
 */
function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleUser = (rawUser) => {
        if (rawUser) {
            const user = formatUser(rawUser);

            // add user also to database
            createUser(user.uid, user);

            setLoading(false);
            setUser(user);
            return user;
        } else {
            setLoading(false);
            setUser(false);
            return false;
        }
    };

    const registerUserWithEmailAndPassword = async (email, password) => {
        setLoading(true);

        let errorMessage = '';
        const auth = getAuth(firebaseApp);
        //connectAuthEmulator(auth, 'localhost:9099');
        //return signInWithRedirect(auth, provider).then((response) => handleUser(response.user));
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                //handleUser(user);
            })
            .catch((error) => {
                console.log(error.code + error.message);
                errorMessage = error.message;
            });

        return Promise.resolve(errorMessage);
    };

    const loginUserWithEmailAndPassword = async (email, password) => {
        setLoading(true);

        let errorMessage = '';
        const auth = getAuth(firebaseApp);
        //connectAuthEmulator(auth, 'localhost:9099');
        //return signInWithRedirect(auth, provider).then((response) => handleUser(response.user));
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                //handleUser(user);
            })
            .catch((error) => {
                console.log(error.code + error.message);
                errorMessage = error.message;
            });

        return Promise.resolve(errorMessage);
    };

    const signout = () => {
        const auth = getAuth(firebaseApp);
        signOut(auth).then(() => handleUser(false));
    };

    useEffect(() => {
        const auth = getAuth(firebaseApp);
        const unsubscribe = onAuthStateChanged(auth, handleUser);

        return () => unsubscribe();
    }, []);

    return {
        user,
        loading,
        registerUserWithEmailAndPassword,
        loginUserWithEmailAndPassword,
        signout,
    };
}

/**
 *  Extracts specific user data
 */
const formatUser = (user) => {
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
    };
};
