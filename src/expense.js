import React from "react";

export default function Expense(props) {
  return (
    <li>
      <span className="expense-value">{props.data.Value}$</span>
      <span className="expense-disc">{props.data.Disc}</span>
      <span className="expense-date">{props.data.Date}</span>
      <button
        className="expense-btn"
        onClick={() => {
          props.handleDelete(props.index);
        }}
      >
        Delete
      </button>
    </li>
  );
}
