import { useSelector, useDispatch } from "react-redux";
import CheckoutModal from "../component/CheckoutModal";
import "./Checkout.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [errorMessage, setErrorMessage] = useState(undefined);
  const [email, setEmail] = useState("");
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(50);
  const [vat, setVat] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [emoney, setEmoney] = useState(false);
  const [modal, setModal] = useState(false);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmail = (e) => setEmail(e.target.value);

  const showModal = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const cartTotal = async () => {
    try {
      setTotal(
        cart.cartItems.reduce((price, item) => item.price * item.qty + price, 0)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const vatTotal = async () => {
    try {
      setVat((total * 20) / 100);
    } catch (err) {
      console.log(err);
    }
  };

  const grandTotalHandler = async () => {
    try {
      setGrandTotal(total + shipping);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    cartTotal();
    vatTotal();
    grandTotalHandler();
  }, [cart, vat, grandTotal]);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page

        return_url: "http://localhost:3000/checkout-modal",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <div className="checkout">
      <form
        id="checkout-form"
        className="checkout-form"
        onSubmit={handleSubmit}
      >
        <h2>checkout</h2>
        <h5>billing details</h5>
        <label for="name">Name</label>
        <input
          className="form-text-input"
          name="name"
          type="text"
          placeholder="Axel Ward"
          required="true"
        />

        <label for="email">Email Address</label>
        <input
          className="form-text-input"
          name="email"
          type="text"
          value={email}
          onChange={handleEmail}
          placeholder="axel@gmail.com"
          required="true"
        />

        <label for="name">Phone Number</label>
        <input
          className="form-text-input"
          name="Phone number"
          type="text"
          placeholder="+1202-555-0136"
          required="true"
        />

        <h5>Shipping info</h5>
        <label for="address">Your address</label>
        <input
          className="form-text-input"
          name="address"
          type="text"
          placeholder="1137 Williams Avenue"
          required="true"
        />

        <label for="zip">Zip Code</label>
        <input
          className="form-text-input"
          name="sip"
          type="text"
          placeholder="1000 Wp"
          required="true"
        />

        <label for="city">City</label>
        <input
          className="form-text-input"
          name="city"
          type="text"
          placeholder="Amsterdam"
          required="true"
        />

        <label for="country">Country</label>
        <input
          className="form-text-input"
          name="country"
          type="text"
          placeholder="The Netherlands"
          required="true"
        />

        <h5>Payment Details</h5>

        <p>Payment method</p>
        <PaymentElement id="payment-element" />
        <button
          className="orange-btn"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}

        <h3 className="summary">Summary</h3>
        {cartItems.map((item) => {
          return (
            <div className="item-wrap">
              <div className="price-qty-wrap">
                <img src={item.image} alt="" />

                <div>
                  {item.name.includes("Headphones") ? (
                    <h6>{item.name.replace("Headphones", "")}</h6>
                  ) : item.name.includes("Earphones") ? (
                    <h6>{item.name.replace("Wireless Earphones", "")}</h6>
                  ) : item.name.includes("Speaker") ? (
                    <h6>{item.name.replace("Speaker", "")}</h6>
                  ) : (
                    ""
                  )}

                  <span>{`$${item.price.toLocaleString()}`}</span>
                </div>
              </div>
              <span>x{item.qty}</span>
            </div>
          );
        })}
        <div className="total-checkout">
          <span>total</span>
          <span className="total-span">${total.toLocaleString()}</span>
        </div>
        <div className="total-checkout">
          <span>Shipping</span>
          <span className="total-span">${shipping}</span>
        </div>
        <div className="total-checkout">
          <span>Vat (included)</span>
          <span className="total-span">
            ${Math.floor(vat).toLocaleString()}
          </span>
        </div>
        <div className="total-final">
          <span>Grand total</span>
          <span className="grand-total">
            ${Math.floor(grandTotal).toLocaleString()}
          </span>
        </div>
      </form>
    </div>
  );
}
