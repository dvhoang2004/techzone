import React, { useState } from "react";

import "./QuantityInput.css";

const QuantityInput = ({ quantity, setQuantity, stock }) => {
  return (
    <>
      <button
        className="quantity-input-button"
        onClick={() => setQuantity((prev) => prev - 1)}
        disabled={quantity < 2}
      >
        -
      </button>
      <p className="quantity-input-count">{quantity}</p>
      <button
        className="quantity-input-button"
        disabled={quantity >= stock}
        onClick={() => setQuantity((prev) => prev + 1)}
      >
        +
      </button>
    </>
  );
};

export default QuantityInput;
