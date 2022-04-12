import React from "react";
import "./Spinner.css";

export default function Spinner() {
  return (
    <div className="spinner-border text-dark" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
