import React, { useState } from "react";
import Input from "../../components/CommonComponents/Input/Input";
import Button from "../../components/CommonComponents/button/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogin() {
    if (email && password) {
      console.log("handling Login...");
      setLoading(true);
      try {
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        console.log("user data from login page: ", userData);
        dispatch(
          setUser({
            name: userData.name,
            email: userData.email,
            uid: userData.uid,
          })
        );
        //i am here that means login is authenticated so, navigate to profile page
        toast.success("login successful!");
        setLoading(false);

        navigate("/profile");
      } catch (e) {
        setLoading(false);
        toast.error(e.message);
        console.log("Login page error: ", e);
      }
    } else {
      //throw errors
      if (!email && !password) {
        toast.error("Email and password should not be empty!!");
      } else if (!email) {
        toast.error("Please enter email!");
      } else {
        toast.error("Please enter password!!");
      }
    }
  }
  return (
    <>
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

      <Button
        text={loading ? "loading..." : "Login Now"}
        onClick={handleLogin}
        disabled={loading}
      />
    </>
  );
};

export default LoginForm;
