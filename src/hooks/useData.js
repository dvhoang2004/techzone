import React, { useEffect, useState } from "react";

import apiClient from "../utils/api-client";

const useData = (endpoint, customConfig, deps) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get(endpoint, customConfig)
      .then((res) => {
        if (
          endpoint === "/products" &&
          data &&
          data.products &&
          customConfig?.params?.page !== 1
        ) {
          setData((prevData) => {
            if (customConfig?.params?.page <= 1 || !prevData?.products)
              return res.data;

            const existingIds = new Set(prevData.products.map((p) => p._id));
            const newProducts = res.data.products.filter(
              (p) => !existingIds.has(p._id),
            );
            return {
              ...res.data,
              products: [...prevData.products, ...newProducts],
            };
          });
        } else setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, deps ?? []);

  return { data, error, isLoading };
};

export default useData;
