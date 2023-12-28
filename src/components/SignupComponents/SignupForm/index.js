import React from "react";
import { useState } from "react";
import Input from "../../CommonComponents/Input/Input";
import Button from "../../CommonComponents/button/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SignupForm = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const toast =
  async function handleSignup() {
    console.log("handling Signup...");
    setLoading(true);
    if (name && email && password && password === confirmPassword) {
      try {
        //creating user's account on signup
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;
        console.log("user created", user);
        //saving user's details in our firebase database
        await setDoc(doc(db, "users", user.uid), {
          email: email,
          name: name,
          uid: user.uid,
        });

        //saving the logged in user details to my redux store
        dispatch(
          setUser({
            email: email,
            name: name,
            uid: user.uid,
          })
        );
        setLoading(false);
        toast.success("Account created successfully.");
        //if i am here that means signup is done, so navigate to the profile page
        navigate("/profile");
      } catch (e) {
        console.log("error", e);
        toast.error(e.message.split(":")[1]);
        setLoading(false);
      }
    } else {
      //throw error
      setLoading(false);
      if (!name || !email) {
        toast.error("Name and email should not be empty!");
      } else if (password && password !== confirmPassword) {
        //console.log("error: password and confirm password mismatch");
        toast.error("Password and confirm password should match!");
      } else if (password.length === 0) {
        //console.log("error: password should contain atleast 6 characters");
        toast.error("Please enter password!");
      } else if (password.length < 6) {
        toast.error("Password should contains atleast 6 characters!");
      }
    }
  }
  return (
    <>
      <Input
        type={"text"}
        value={name}
        setState={setName}
        placeholder={"Full Name"}
        required={true}
      />
      <Input
        type={"email"}
        value={email}
        setState={setEmail}
        placeholder={"Email"}
        required={true}
      />
      <Input
        type={"password"}
        value={password}
        setState={setPassword}
        placeholder={"Password"}
        required={true}
      />
      <Input
        type={"password"}
        value={confirmPassword}
        setState={setConfirmPassword}
        placeholder={"Confirm Password"}
        required={true}
      />
      <Button
        text={loading ? "loading..." : "Signup Now"}
        onClick={handleSignup}
        disabled={loading}
      />
    </>
  );
};

export default SignupForm;
