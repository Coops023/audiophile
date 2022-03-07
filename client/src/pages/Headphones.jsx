import { useEffect, useState } from "react";
import "./Headphones.css";
import { Link } from "react-router-dom";

import ProductCard from "../component/ProductCard";
import About from "../component/About";

//  IMPORTS FOR REDUX
import { useSelector, useDispatch } from "react-redux";
import { getHeaphones as listHeadphones } from "../redux/actions/productActions";

export default function Headphones() {
  const dispatch = useDispatch();

  // getHeadphones gets the current state of headphones from server
  const getHeadphones = useSelector((state) => state.getHeadphones);
  // console.log("state line 18", getHeadphones);
  const { headphones, loading, error } = getHeadphones;

  useEffect(() => {
    dispatch(listHeadphones());
  }, [dispatch]);

  return (
    <div className="product-page">
      <div className="page-heading">
        <h2>headphones</h2>
      </div>
      {loading || headphones.item === undefined ? (
        <h1>loading...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        headphones.item
          .map((headphone) => {
            return (
              <article className="product-card" key={headphone._id}>
                <img
                  className="product-image"
                  src={headphone.image.mobile}
                  alt=""
                />

                <div className="product-content-wrap">
                  {headphone.new === true ? (
                    <h5 className="new-product">new product</h5>
                  ) : (
                    ""
                  )}
                  <h3>{headphone.name}</h3>
                  <p>{headphone.description}</p>
                  <Link
                    key={headphone._id}
                    className="orange-btn"
                    to={`/product/${headphone._id}`}
                  >
                    {" "}
                    See product
                  </Link>
                </div>
              </article>
            );
          })
          .reverse()
      )}
      <ProductCard />
      <About />
    </div>
  );
}
