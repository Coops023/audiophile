import React from "react";
import "./Yx1EarphoneCard.css";
import { Link } from "react-router-dom";

export default function Yx1EarphoneCard() {
  return (
    <>
      <article className="yx1">
        <div className="img-yx1"></div>
        <div className="yx1-heading-btn">
          <h3>Yx1 earphones</h3>
          <Link
            className="transparent-btn"
            to="/product/622737e754b0e992f8522872"
          >
            See product
          </Link>
        </div>
      </article>
    </>
  );
}
