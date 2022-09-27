import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  signInAuthUserWithEmailPassword,
} from "../../utils/firebase/firebase";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

const initialFormFields = {
  email: "",
  password: "",
};

function SignInForm() {
  const [formFields, setFormFields] = useState(initialFormFields);
  const { email, password } = formFields;

  const logGoogleUser = async () => {
    await signInWithGooglePopup();
  };

  const resetFormFields = () => {
    setFormFields(initialFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect Password");
          break;
        case "auth/user-not-found":
          alert("E-mail does not exists");
          break;
        default:
          console.log(error.message);
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="E-mail"
          inputProps={{
            type: "email",
            name: "email",
            value: email,
            onChange: handleChange,
            required: true,
          }}
        />

        <FormInput
          label="Password"
          inputProps={{
            type: "password",
            name: "password",
            value: password,
            onChange: handleChange,
            required: true,
          }}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={logGoogleUser}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
