import React from "react";
import "./Button.css";
const Button = ({ text, onClick, disabled, width }) => {
  return (
    <button
      onClick={onClick}
      className="custom-btn"
      disabled={disabled}
      style={{ width: width }}
    >
      {text}
    </button>
  );
};

export default Button;
