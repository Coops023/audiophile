import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../pages/CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51Jey09LQy018j8J0FHpZjB9d8gBSazYLkUC29LqxEJFZcTly2A7abc8BcV0S8rRmNFjrzf6g0QLNDBBVVQbkplBd000z23Z7cW"
);

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [clientSecret, setClientSecret] = useState("");
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(50);
  const [vat, setVat] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    console.log("grand total", grandTotal);
    fetch(`/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
