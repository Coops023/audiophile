import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

export default function ProductCard() {
  return (
    <section className="home-section-1">
      <div className="section-1-card">
        <img
          className="section-1-img"
          src="/image-category-thumbnail-headphones.png"
          alt="image of headphones"
        />
        <h3>Headphones</h3>
        <Link className="section-1-btn" to="/headphones">
          Shop{" "}
          <svg
            className="shop-arrow"
            width="8"
            height="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.322 1l5 5-5 5"
              stroke="#D87D4A"
              stroke-width="2"
              fill="none"
              fill-rule="evenodd"
            />
          </svg>
        </Link>
      </div>
      <div className="section-1-card">
        <img
          className="section-1-img"
          src="/image-category-thumbnail-speakers.png"
          alt="image of headphones"
        />
        <h3>Speakers</h3>
        <Link className="section-1-btn" to="/speakers">
          Shop{" "}
          <svg
            className="shop-arrow"
            width="8"
            height="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.322 1l5 5-5 5"
              stroke="#D87D4A"
              stroke-width="2"
              fill="none"
              fill-rule="evenodd"
            />
          </svg>
        </Link>
      </div>
      <div className="section-1-card">
        <img
          className="section-1-img"
          src="/image-category-thumbnail-earphones.png"
          alt="image of headphones"
        />
        <h3>Earphones</h3>
        <Link className="section-1-btn" to="#">
          Shop{" "}
          <svg
            className="shop-arrow"
            width="8"
            height="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.322 1l5 5-5 5"
              stroke="#D87D4A"
              stroke-width="2"
              fill="none"
              fill-rule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
