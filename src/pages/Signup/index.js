import React from "react";
import { useState } from "react";
import Header from "../../components/CommonComponents/header/Header.js";
import "./style.css";
import SignupForm from "../../components/SignupComponents/SignupForm/index.js";
import LoginForm from "../Login/index.js";

const Signup = () => {
  const [flag, setFlag] = useState(false);
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
        {!flag ? <SignupForm /> : <LoginForm />}
        {!flag ? (
          <p>
            Already have an account? Click{" "}
            <span
              style={{ color: "dodgerblue", cursor: "pointer" }}
              onClick={() => setFlag(!flag)}
            >
              here{" "}
            </span>
            to login!
          </p>
        ) : (
          <p onClick={() => setFlag(!flag)}>
            New to Podcasts? Click{" "}
            <span
              style={{ color: "dodgerblue", cursor: "pointer" }}
              onClick={() => setFlag(!flag)}
            >
              here
            </span>{" "}
            to signup!
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
