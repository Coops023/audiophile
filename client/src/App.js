import "./quote.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Headphones from "./pages/Headphones";
import Speakers from "./pages/Speakers";
import Earphones from "./pages/Earphones";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/headphones" component={Headphones} />
        <Route exact path="/earphones" component={Earphones} />
        <Route exact path="/speakers" component={Speakers} />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
