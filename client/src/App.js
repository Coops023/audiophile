import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Headphones from "./pages/Headphones";
import Speakers from "./pages/Speakers";
import Earphones from "./pages/Earphones";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ScrollToTop from "./component/ScrollToTop";
import StripeContainer from "./component/StripeContainer";

function App() {
  const [cart, setCart] = useState(false);

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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
