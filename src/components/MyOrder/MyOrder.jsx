import React from "react";

import "./MyOrder.css";
import Table from "../Common/Table";

const MyOrder = () => {
  return (
    <section className="align-center my-order-page">
      <Table headings={["Order", "Products", "Total", "Status"]}>
        <tbody>
          <tr>
            <td>1</td>
            <td>iPhone, Power bank</td>
            <td>$1299</td>
            <td>Shipped</td>
          </tr>
        </tbody>
      </Table>
    </section>
  );
};

export default MyOrder;
