import React from "react";
import axios from "axios";

import "./ProductsSidebar.css";
import ProductTypeLink from "../../Navbar/NavItems";
import useData from "../../../hooks/useData";

const ProductsSidebar = () => {
  const { data: categories, error } = useData("/category");
  return (
    <aside className="sidebar">
      <h2>Category</h2>
      <div className="category-links">
        {error && <em className="form-error">{error}</em>}
        {categories &&
          categories.map((category) => (
            <ProductTypeLink
              key={category._id}
              title={category.name}
              link={`/products?category=${category.name}`}
              sidebar={true}
            />
          ))}
      </div>
    </aside>
  );
};

export default ProductsSidebar;
