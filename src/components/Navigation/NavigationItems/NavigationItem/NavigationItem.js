import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

const NavigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <NavLink
      to={props.link}
      // just relying on the automatic active class to be added with Navlink will not work
      // here because we are using css modules. We need to use the activeClassName prop
      activeClassName={classes.active}
      exact={props.exact}
    >
      {props.children}
    </NavLink>
  </li>
);

export default NavigationItem;
