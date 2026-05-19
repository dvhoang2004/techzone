import React, { memo, useContext } from "react";
import { NavLink } from "react-router-dom";

import "./ProductCard.css";
import star from "../../../assets/glowing-star.png";
import basket from "../../../assets/basket.png";
import CartContext from "../../../contexts/CartContext";
import UserContext from "../../../contexts/UserContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  return (
    <article className="product-card">
      <div className="product-image">
        <NavLink to={`/products/${product?._id}`}>
          <img
            src={`http://localhost:5000/products/${product?.images[0]}`}
            alt="product image"
          />
        </NavLink>
      </div>
      <div className="product-details">
        <h3 className="price">${product?.price}</h3>
        <p className="title">{product?.title}</p>
        <footer className="align-center info-footer">
          <div className="align-center">
            <p className="align-center rating">
              <img src={star} alt="star" /> {product?.reviews.rate}
            </p>
            <p className="review-count">{product?.reviews.counts}</p>
          </div>
          {product?.stock > 0 && user && (
            <button
              className="add-to-cart"
              onClick={() => addToCart(product, 1)}
            >
              <img src={basket} alt="add button" />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};

export default memo(ProductCard);
