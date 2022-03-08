// import logo from "../logo.svg";
import "./HomePage.css";
import { Link } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import Zx9SpeakerCard from "../component/Zx9SpeakerCard";
import About from "../component/About";
import Headphones from "./Headphones";

function HomePage() {
  return (
    <>
      <header className="home-header">
        <div className="header-content-wrap">
          <span>New Product</span>
          <h1>XX99 Mark II Headphones</h1>
          <p>
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <Link className="orange-btn" to="/product/622737e754b0e992f852288b">
            See product
          </Link>
        </div>
      </header>
      <ProductCard />
      <Zx9SpeakerCard />
      <About />
    </>
  );
}

export default HomePage;
