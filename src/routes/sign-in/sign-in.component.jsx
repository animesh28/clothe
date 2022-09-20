import React from "react";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase";

function SignIn() {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userRef = await createUserDocFromAuth(user);
    console.log(userRef);
  };

  return (
    <div>
      SignIn Page
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  );
}

export default SignIn;
