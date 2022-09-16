import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDOVWYjWYL-mThlnojOKDjfZBu-28SuuRw",
    authDomain: "crw-clothing-db-7911d.firebaseapp.com",
    projectId: "crw-clothing-db-7911d",
    storageBucket: "crw-clothing-db-7911d.appspot.com",
    messagingSenderId: "614554922914",
    appId: "1:614554922914:web:788b1dbe1a08a0e1084cfb"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additinalInformation = {}) => {
    if(!userAuth)
        return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additinalInformation,
            })
        } catch(error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password)
        return;

   return await createUserWithEmailAndPassword(auth, email, password);
}