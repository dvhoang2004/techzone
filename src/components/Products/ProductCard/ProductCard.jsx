import React from "react";
import { NavLink } from "react-router-dom";

import "./ProductCard.css";
import star from "../../../assets/glowing-star.png";
import basket from "../../../assets/basket.png";

const ProductCard = ({
  id,
  image,
  price,
  title,
  rating,
  ratingCounts,
  stock,
}) => {
  return (
    <article className="product-card">
      <div className="product-image">
        <NavLink to={`/products/${id}`}>
          <img
            src={`http://localhost:5000/products/${image}`}
            alt="product image"
          />
        </NavLink>
      </div>
      <div className="product-details">
        <h3 className="price">${price}</h3>
        <p className="title">{title}</p>
        <footer className="align-center info-footer">
          <div className="align-center">
            <p className="align-center rating">
              <img src={star} alt="star" /> {rating}
            </p>
            <p className="review-count">{ratingCounts}</p>
          </div>
          {stock > 0 && (
            <button className="add-to-cart">
              <img src={basket} alt="add button" />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
