import { useEffect, useState } from "react";
import "./Earphones.css";
import { Link } from "react-router-dom";

import ProductCard from "../component/ProductCard";
import About from "../component/About";

import { useSelector, useDispatch } from "react-redux";
import { getEarphones as listEarphones } from "../redux/actions/productActions";

export default function Earphones() {
  const dispatch = useDispatch();
  const getEarphones = useSelector((state) => state.getEarphones);
  console.log("state line 18", getEarphones);
  const { earphones, loading, error } = getEarphones;

  useEffect(() => {
    dispatch(listEarphones());
  }, [dispatch]);

  return (
    <>
      <div className="page-heading">
        <h2>Earphones</h2>
      </div>
      {loading || earphones.item === undefined ? (
        <h1>loading...</h1>
      ) : error ? (
        <h1>error</h1>
      ) : (
        earphones.item
          .map((earphone) => {
            return (
              <article className="product-card" key={earphone.id}>
                <img
                  className="product-image"
                  src={earphone.image.mobile}
                  alt="earphone"
                />

                <div className="product-content-wrap">
                  {earphone.new === true ? (
                    <h5 className="new-product">new product</h5>
                  ) : (
                    ""
                  )}
                  <h3>{earphone.name}</h3>
                  <p>{earphone.description}</p>
                  <Link className="orange-btn" to={`/product/${earphone._id}`}>
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
    </>
  );
}
