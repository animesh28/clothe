import { useState } from "react";
import {
  createAuthUserWithEmailPassword,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";

const initialFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUpForm() {
  const [formFields, setFormFields] = useState(initialFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(initialFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password != confirmPassword) {
      alert("Passwords don't match!");
    }

    try {
      const { user } = await createAuthUserWithEmailPassword(email, password);
      await createUserDocFromAuth(user, { displayName });
      alert("User Registered");
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else {
        console.log("Error creating user with email/password: ", error.message);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          inputProps={{
            type: "text",
            name: "displayName",
            value: displayName,
            onChange: handleChange,
            required: true,
          }}
        />

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

        <FormInput
          label="Confirm Password"
          inputProps={{
            type: "password",
            name: "confirmPassword",
            value: confirmPassword,
            onChange: handleChange,
            required: true,
          }}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
