import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import setAuthToken from "./utils/setAuthToken";
import { getJwt, getUser } from "./services/userServices";
import {
  addToCartAPI,
  getCartAPI,
  removeFromCartAPI,
  increaseProductAPI,
  decreaseProductAPI,
} from "./services/cartServices";
import UserContext from "./contexts/UserContext";
import CartContext from "./contexts/CartContext";

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

  const removeFromCart = (productId) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== productId);
    setCart(newCart);

    removeFromCartAPI(productId)
      .then(() => {
        toast.success("Product removed from cart!");
      })
      .catch((err) => {
        toast.error("Failed to remove product from cart. Please try again.");
        setCart(oldCart); //if error occurs revert back to previous cart state
      });
  };

  const updateCart = (type, productId) => {
    const oldCart = [...cart];
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === productId,
    );
    if (type === "increase") {
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);
      increaseProductAPI(productId).catch((err) => {
        toast.error("Failed to increase product quantity. Please try again.");
        setCart(oldCart); //if error occurs revert back to previous cart state
      });
    } else if (type === "decrease") {
      updatedCart[productIndex].quantity -= 1;
      setCart(updatedCart);
      decreaseProductAPI(productId).catch((err) => {
        toast.error("Failed to decrease product quantity. Please try again.");
        setCart(oldCart); //if error occurs revert back to previous cart state
      });
    }
  };

  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong. Please try again.");
      });
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user }}>
      <CartContext.Provider
        value={{
          cart,
          addToCart: addToCart,
          removeFromCart,
          updateCart,
          setCart,
        }}
      >
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer position="top-center" />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
