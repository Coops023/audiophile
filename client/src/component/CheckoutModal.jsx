import { useState, useEffect } from "react";
import "./CheckoutModal.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCoffee } from "@fortawesome/free-solid-svg-icons";

export default function CheckoutModal(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <div className="checkout-modal">
      <div className="checkout-modal-wrap">
        <div className="tick-circle">
          <span>
            <FontAwesomeIcon icon={faCheck} />
          </span>
        </div>
        <h2>Thank you for your order</h2>
        <p>You will recieve an email confirmation shortly.</p>

        {cartItems[0] == undefined ? (
          <h2>Cart Empty</h2>
        ) : (
          <>
            <div className="item-wrap-modal">
              <div className="modal-wrap">
                <div className="price-qty-wrap">
                  <img src={cartItems[0].image} alt="" />
                  <div>
                    {cartItems[0].name.includes("Headphones") ? (
                      <h6>{cartItems[0].name.replace("Headphones", "")}</h6>
                    ) : cartItems[0].name.includes("Earphones") ? (
                      <h6>
                        {cartItems[0].name.replace("Wireless Earphones", "")}
                      </h6>
                    ) : cartItems[0].name.includes("Speaker") ? (
                      <h6>{cartItems.name[0].replace("Speaker", "")}</h6>
                    ) : (
                      ""
                    )}
                    <span>{`$${cartItems[0].price.toLocaleString()}`}</span>
                  </div>
                </div>
                <span>x{cartItems[0].qty}</span>
              </div>
              <hr />
              <div className="other-items">
                <p>and {cartItems.length} other item(s)</p>
              </div>
            </div>
            <div className="grand-total-wrap">
              <span>grand total</span>
              <span className="g-total">${props.total.toLocaleString()}</span>
            </div>
          </>
        )}

        <Link className="home-btn" to="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
