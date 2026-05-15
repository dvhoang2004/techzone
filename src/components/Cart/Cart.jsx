import React, { useEffect, useState } from "react";

import "./Cart.css";
import user from "../../assets/user.webp";
import remove from "../../assets/remove.png";
import Table from "../Common/Table";
import QuantityInput from "../Common/QuantityInput";

const Cart = ({ cart }) => {
  const [subTotal, setSubTotal] = useState(0);

  //change in cart will trigger recalculation of subtotal amount
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setSubTotal(total);
  }, [cart]);

  return (
    <section className="align-center cart-page">
      <div className="align-center user-info">
        <img src={user} alt="user profile" />
        <div>
          <p className="user-name">Hoang</p>
          <p className="user-email">hoangmail@gmail.com</p>
        </div>
      </div>

      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${product.price.toFixed(2)}</td>
              <td className="align-center table-quantity-input">
                <QuantityInput quantity={quantity} stock={product.stock} />
              </td>
              <td>${(product.price * quantity).toFixed(2)}</td>
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart-remove-icon"
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
      <button className="search-button checkout-button">Checkout</button>
    </section>
  );
};

export default Cart;
