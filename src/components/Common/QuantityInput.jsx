import React, { useState } from "react";

import "./QuantityInput.css";

const QuantityInput = ({
  quantity,
  setQuantity,
  stock,
  cartPage,
  productId,
}) => {
  return (
    <>
      <button
        className="quantity-input-button"
        onClick={() => {
          cartPage
            ? setQuantity("decrease", productId)
            : setQuantity((prev) => prev - 1);
        }}
        disabled={quantity < 2}
      >
        -
      </button>
      <p className="quantity-input-count">{quantity}</p>
      <button
        className="quantity-input-button"
        disabled={quantity >= stock}
        onClick={() => {
          cartPage
            ? setQuantity("increase", productId)
            : setQuantity((prev) => prev + 1);
        }}
      >
        +
      </button>
    </>
  );
};

export default QuantityInput;
