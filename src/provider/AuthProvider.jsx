import { createContext, useEffect, useState } from "react";
import { auth } from './../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    // create user
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //login
    const userLogin = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleProvider = new GoogleAuthProvider();
    //google sign in
    const signInWithGoogle =()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    //logout
    const logOut =()=>{
        setLoading(true);
        return signOut(auth);
    }

    //update profile
    const updateUserProfile = updatedData =>{
        return updateProfile(auth.currentUser, updatedData);
    }

    const authInfo ={
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        userLogin,
        signInWithGoogle,
        logOut,
        updateUserProfile,


    }
    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('current user', currentUser);
            if(currentUser){
                // create token
                const userInfo = { email: currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                    .then(data => {
                        if(data.data.token){
                            // set token
                            localStorage.setItem('token', data.data.token);
                        }
                    })
            }else{
                // remove token
                localStorage.removeItem('token');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;