import React from "react";
import "./Spinner.css";

export default function Spinner() {
  return (
    <div class="spinner-border text-dark" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  );
}
