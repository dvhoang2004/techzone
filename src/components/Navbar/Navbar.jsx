import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import "./Navbar.css";
import NavItems from "./NavItems";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { getSuggestionsAPI } from "../../services/productServices";
import { el } from "zod/locales";
import { set } from "zod";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);

  const user = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (selectedItem < suggestions.length) {
      if (e.key === "ArrowDown") {
        setSelectedItem((current) =>
          current === suggestions.length - 1 ? 0 : current + 1,
        );
      } else if (e.key === "ArrowUp") {
        setSelectedItem((current) =>
          current === 0 ? suggestions.length - 1 : current - 1,
        );
      } else if (e.key === "Enter" && selectedItem >= 0) {
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`);
        setSearch("");
        setSuggestions([]);
      }
    } else {
      setSelectedItem(-1);
    }
  };

  useEffect(() => {
    const delayedSuggestions = setTimeout(() => {
      if (search.trim() !== "") {
        getSuggestionsAPI(search)
          .then((res) => setSuggestions(res.data))
          .catch((err) => console.log(err));
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delayedSuggestions);
  }, [search]);

  return (
    <nav className="align-center navbar">
      <div className="align-center">
        <h1 className="nav-heading">Tech Zone</h1>
        <form
          action=""
          className="align-center nav-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="nav-search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" className="search-button">
            Search
          </button>
          {suggestions.length > 0 && (
            <ul className="search-results">
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion._id}
                  className={
                    selectedItem === index
                      ? "search-suggestion-link active"
                      : "search-suggestion-link"
                  }
                >
                  <Link
                    to={`/products?search=${suggestion.title}`}
                    onClick={() => {
                      setSearch("");
                      setSuggestions([]);
                    }}
                  >
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
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
