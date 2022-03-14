import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Checkout from "../pages/Checkout";

const PUBLIC_KEY =
  "pk_test_51Jey09LQy018j8J0FHpZjB9d8gBSazYLkUC29LqxEJFZcTly2A7abc8BcV0S8rRmNFjrzf6g0QLNDBBVVQbkplBd000z23Z7cW";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <Checkout />
    </Elements>
  );
};
export default Stripe;
