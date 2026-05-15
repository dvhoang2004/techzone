import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";
import NavItems from "./NavItems";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";

const Navbar = () => {
  const user = useContext(UserContext);
  const { cart } = useContext(CartContext);

  return (
    <nav className="align-center navbar">
      <div className="align-center">
        <h1 className="nav-heading">Tech Zone</h1>
        <form action="" className="align-center nav-form">
          <input type="text" className="nav-search" placeholder="Search" />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
      <div className="align-center nav-links">
        <NavItems title="Home" link="/" />
        <NavItems title="Products" link="/products" />
        {!user.user && (
          <>
            <NavItems title="LogIn" link="/login" />
            <NavItems title="SignUp" link="/signup" />
          </>
        )}
        {user.user && (
          <>
            <NavItems title="My Orders" link="/myorders" />
            <NavLink to="/cart" className="align-center">
              Cart <p className="align-center cart-counts">{cart.length}</p>
            </NavLink>
            <NavItems title="Logout" link="/logout" />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
