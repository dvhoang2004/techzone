import React from "react";

import "./MyOrder.css";
import Table from "../Common/Table";
import useData from "../../hooks/useData";
import Loader from "../Common/Loader";

const MyOrder = () => {
  const { data: orders, error, isLoading } = useData("/order");

  const getProductString = (order) => {
    const productStringsArr = order.products.map(
      (item) => `${item.product.title}-${item.quantity}`,
    );
    return productStringsArr.join(", ");
  };

  return (
    <section className="align-center my-order-page">
      {isLoading && <Loader />}
      {error && <em className="form-error">{error}</em>}
      {orders && (
        <Table headings={["Order", "Products", "Total", "Status"]}>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{getProductString(order)}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </section>
  );
};

export default MyOrder;
