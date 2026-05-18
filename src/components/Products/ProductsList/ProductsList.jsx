import React, { use, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./ProductsList.css";
import ProductCard from "../ProductCard/ProductCard";
import Pagination from "../../Common/Pagination";
import useData from "../../../hooks/useData";
import ProductCardSkeleton from "../ProductCardSkeleton/ProductCardSkeleton";
import { set } from "zod";

const ProductsList = () => {
  const [search, setSearch] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);

  const category = search.get("category");
  const searchQuery = search.get("search");
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const { data, error, isLoading } = useData(
    "/products",
    { params: { search: searchQuery, category, perPage: 9, page } },
    [search, category, page],
  );

  useEffect(() => {
    setPage(1);
  }, [searchQuery, category]);

  // const handlePageChange = () => {
  //   const totalPages = Math.ceil(data?.totalProducts / 9);
  //   if (isLoading || page >= totalPages) return;

  //   const currentParams = Object.fromEntries([...search]);
  //   setSearch({ ...currentParams, page: page + 1 });
  // };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 5 &&
        !isLoading &&
        data &&
        page < data.totalPages
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, data]);

  useEffect(() => {
    if (data && data.products) {
      const products = [...data.products];

      if (sortBy === "Price desc") {
        setSortedProducts(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "Price asc") {
        setSortedProducts(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate),
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate),
        );
      } else {
        setSortedProducts(products);
      }
    }
  }, [sortBy, data]);

  return (
    <section className="products-section">
      <header className="align-center products-header">
        <h2>Products</h2>
        <select
          name="sort"
          id=""
          className="products-sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="Price desc">Price High to Low</option>
          <option value="Price asc">Price Low to High</option>
          <option value="rate asc">Rate Low to High</option>
          <option value="rate desc">Rate High to Low</option>
        </select>
      </header>
      <div className="products-list">
        {error && <em className="form-error">{error}</em>}
        {data?.products &&
          sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
      </div>
      {/* <Pagination
        totalPosts={data?.totalProducts}
        postsPerPage={9}
        onClick={handlePageChange}
        currentPage={page}
      /> */}
    </section>
  );
};

export default ProductsList;
