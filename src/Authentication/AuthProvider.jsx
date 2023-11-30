import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, TwitterAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "./firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const GoogleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [looding, setLooding] = useState(true);
    
    const singInWithGoogle = () =>{
        return signInWithPopup(auth, GoogleProvider);
    }

    const singInWithTwitter = () =>{
        return signInWithPopup(auth, twitterProvider);
    }

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const singIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
        return signOut(auth);
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            const userEmail = user?.email || currentUser?.email;
            const loggedUser = {email: userEmail};
            console.log(currentUser);
            setLooding(false);

            if(currentUser){
                axios.post('https://survey-sphere-server.vercel.app/jwt',loggedUser, {withCredentials: true})
                .then(res => {
                    console.log(res.data);
                })
            }
            else{
                axios.post('https://survey-sphere-server.vercel.app/logout', userEmail, {withCredentials: true})
                .then(res =>{
                    console.log('log out user and cookies:', res.data);
                })
            }
        })
        return () =>{
            return unSubscribe();
        }
    }, []);

    const authInfo = {singInWithGoogle, singInWithTwitter, createUser, singIn, logOut , user, looding}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthProvider;