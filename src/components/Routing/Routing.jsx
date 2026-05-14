import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "../Home/Home";
import ProductsPage from "../Products/ProductsPage/ProductsPage";
import SingleProductPage from "../SingleProduct/SingleProduct";
import CartPage from "../Cart/Cart";
import MyOrderPage from "../MyOrder/MyOrder";
import LoginPage from "../Authentication/Login/LoginPage";
import SignupPage from "../Authentication/Signup/SignupPage";
import Logout from "../Authentication/Logout/Logout";

const Routing = ({ addToCart }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route
        path="/products/:id"
        element={<SingleProductPage addToCart={addToCart} />}
      />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/myorders" element={<MyOrderPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default Routing;
