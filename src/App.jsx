import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { getJwt, getUser } from "./services/userServices";
import setAuthToken from "./utils/setAuthToken";
import { addToCartAPI } from "./services/cartServices";

setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  //checking whether a JWT token is expired when the component mounts.
  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      }
      setUser(jwtUser);
    } catch (err) {}
  }, []);

  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id,
    );

    //if product doesn't exist in cart add new entry else update quantity of existing product
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else updatedCart[productIndex].quantity += quantity;

    setCart(updatedCart);

    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("Product added to cart!");
      })
      .catch((err) => {
        toast.error("Failed to add product to cart. Please try again.");
        setCart(cart); //if error occurs revert back to previous cart state
      });
  };

  return (
    <div className="app">
      <Navbar user={user} cartCount={cart.length} />
      <main>
        <ToastContainer />
        <Routing addToCart={addToCart} />
      </main>
    </div>
  );
};

export default App;
