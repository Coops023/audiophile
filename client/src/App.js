import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Headphones from "./pages/Headphones";
import Speakers from "./pages/Speakers";
import Earphones from "./pages/Earphones";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/headphones" element={<Headphones />} />
        <Route exact path="/earphones" element={<Earphones />} />
        <Route exact path="/speakers" element={<Speakers />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
