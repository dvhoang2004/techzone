import React, { useState } from "react";
import { useParams } from "react-router-dom";

import "./SingleProduct.css";
import QuantityInput from "../Common/QuantityInput";
import useData from "../../hooks/useData";
import Loader from "../Common/Loader";

const SingleProduct = ({ addToCart }) => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { data: product, error, isLoading } = useData(`/products/${id}`);

  return (
    <section className="align-center single-product">
      {error && <em className="form-error">{error}</em>}
      {isLoading && <Loader />}
      {product && (
        <>
          <div className="align-center">
            <div className="single-product-thumbnails">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost:5000/products/${img}`}
                  alt={product.title}
                  className={selectedImage === i ? "selected-image" : ""}
                  onClick={() => setSelectedImage(i)}
                ></img>
              ))}
            </div>
            <img
              src={`http://localhost:5000/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single-product-display"
            />
          </div>
          <div className="single-product-details">
            <h1 className="single-product-title">{product.title}</h1>
            <p className="single-product-description">{product.description}</p>
            <p className="single-product-price">${product.price.toFixed(2)}</p>
            <h2 className="quanity-title">Quantity:</h2>
            <div className="align-center quantity-input">
              <QuantityInput
                quantity={quantity}
                setQuantity={setQuantity}
                stock={product.stock}
              />
            </div>
            <button
              className="search-button add-cart"
              onClick={() => addToCart(product, quantity)}
            >
              Add to Cart
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProduct;
