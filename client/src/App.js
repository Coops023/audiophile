import "./quote.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Headphones from "./pages/Headphones";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/headphones" component={Headphones} />
      </Router>
    </div>
  );
}

export default App;
