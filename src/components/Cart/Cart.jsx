import React from "react";

import "./Cart.css";
import user from "../../assets/user.webp";
import remove from "../../assets/remove.png";
import Table from "../Common/Table";
import QuantityInput from "../Common/QuantityInput";

const Cart = () => {
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
          <tr>
            <td>iPhone 17</td>
            <td>$999</td>
            <td className="align-center table-quantity-input">
              <QuantityInput />
            </td>
            <td>$999</td>
            <td>
              <img
                src={remove}
                alt="remove icon"
                className="cart-remove-icon"
              />
            </td>
          </tr>
        </tbody>
      </Table>

      <table className="cart-bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>$99.9</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5</td>
          </tr>
          <tr className="cart-bill-total">
            <td>Total</td>
            <td>$104.9</td>
          </tr>
        </tbody>
      </table>
      <button className="search-button checkout-button">Checkout</button>
    </section>
  );
};

export default Cart;
