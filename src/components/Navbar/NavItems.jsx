import React from "react";
import { NavLink } from "react-router-dom";

import "./NavItems.css";
const NavItems = ({ title, link, sidebar }) => {
  return (
    <NavLink
      to={link}
      className={sidebar ? "align-cnter sidebar-link" : "align-center"}
    >
      {title}
    </NavLink>
  );
};

export default NavItems;
