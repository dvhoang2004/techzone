import React from "react";

import "./Table.css";

const Table = ({ headings, children }) => {
  return (
    <table className="common-table">
      <thead>
        <tr>
          {headings.map((item, idx) => (
            <th key={idx}>{item}</th>
          ))}
        </tr>
      </thead>
      {children}
    </table>
  );
};

export default Table;
