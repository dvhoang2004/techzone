import React, { useContext, useMemo, memo } from "react";
import { toast } from "react-toastify";

import "./Cart.css";
import remove from "../../assets/remove.png";
import Table from "../Common/Table";
import QuantityInput from "../Common/QuantityInput";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { checkoutAPI } from "../../services/orderServices";

const Cart = () => {
  const user = useContext(UserContext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);

  //calculate subtotal using useMemo to optimize performance by avoiding unnecessary recalculations on every render
  const subTotal = useMemo(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  }, [cart]);

  const checkout = () => {
    const oldCart = [...cart];
    setCart([]); //clear cart after successful checkout
    checkoutAPI()
      .then(() => {
        toast.success("Order placed successfully!");
      })
      .catch(() => {
        toast.error("Failed to place order. Please try again.");
        setCart(oldCart); //if error occurs revert back to previous cart state
      });
  };

  return (
    <section className="align-center cart-page">
      <div className="align-center user-info">
        <img
          src={`http://localhost:5000/profile/${user?.user?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user-name">User name: {user?.user?.name}</p>
          <p className="user-email">Email: {user?.user?.email}</p>
        </div>
      </div>

      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${product.price.toFixed(2)}</td>
              <td className="align-center table-quantity-input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productId={product._id}
                />
              </td>
              <td>${(product.price * quantity).toFixed(2)}</td>
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart-remove-icon"
                  onClick={() => removeFromCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <table className="cart-bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subTotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5</td>
          </tr>
          <tr className="cart-bill-total">
            <td>Total</td>
            <td>${(subTotal + 5).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <button className="search-button checkout-button" onClick={checkout}>
        Checkout
      </button>
    </section>
  );
};

export default memo(Cart);
