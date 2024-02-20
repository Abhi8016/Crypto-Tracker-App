import React from "react";
import "./styles.css";
const Button = ({ text, onClick, outLined }) => {
  return (
    <div className={outLined ? "outLined" : "btn"} onClick={() => onClick()}>
      {text}
    </div>
  );
};

export default Button;
