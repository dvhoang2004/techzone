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
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<SingleProductPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/myorders" element={<MyOrderPage />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  );
};

export default Routing;
