import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Headphones from "./pages/Headphones";
import Speakers from "./pages/Speakers";
import Earphones from "./pages/Earphones";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

import ScrollToTop from "./component/ScrollToTop";
import StripeContainer from "./component/StripeContainer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutModal from "./component/CheckoutModal";

const stripePromise = loadStripe(
  "pk_test_51Jey09LQy018j8J0FHpZjB9d8gBSazYLkUC29LqxEJFZcTly2A7abc8BcV0S8rRmNFjrzf6g0QLNDBBVVQbkplBd000z23Z7cW"
);

function App() {
  const [cart, setCart] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const showCart = () => {
    if (cart) {
      setCart(false);
    } else {
      setCart(true);
    }
  };

  return (
    <div className="App">
      <ScrollToTop />

      <Navbar showCart={showCart} />
      {!cart ? "" : <Cart showCart={showCart} />}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/headphones" element={<Headphones />} />
        <Route exact path="/earphones" element={<Earphones />} />
        <Route exact path="/speakers" element={<Speakers />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/checkout" element={<StripeContainer />} />
        <Route exact path="/checkout-modal" element={<CheckoutModal />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
