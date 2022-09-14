import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGooleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef =  await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGooleUser}>Sign In with google popup</button>
        </div>
    )
}

export default SignIn;