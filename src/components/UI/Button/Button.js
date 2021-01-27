import React from "react";
import classes from "./Button.module.css";

const Button = (props) => (
  <button
    disabled={props.disabled}
    //dynamically setting 2nd button class
    // we will hardcode a Success or Danger btnType prop when we invoke the component
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);
export default Button;
