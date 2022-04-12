import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// import About from "../components/About";
// import ProductCard from "../components/ProductCard";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";
import Spinner from "../component/Spinner";

export default function ProductDetails() {
  // console.log(props, "line 23 props product details");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const [price, setPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);
  const [features, setFeatures] = useState("");

  const productDetails = useSelector((state) => state.getProductDetails);
  // console.log("state line 18", productDetails);
  const { product, loading, error } = productDetails;

  useEffect(() => {
    if (product && id !== product) {
      dispatch(getProductDetails(id));
      console.log(product);
    }
  }, [dispatch, id]);

  const handlePlus = () => {
    setProductQuantity(productQuantity + 1);
  };
  const handleMinus = () => {
    setProductQuantity(productQuantity - 1);
  };

  const addToCartHandler = () => {
    // console.log("product cart handler", product.item._id);
    dispatch(addToCart(product.item._id, productQuantity));
  };

  return (
    <section className="product-details">
      {loading || product === undefined || product.item === undefined ? (
        <Spinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div>
            <Link className="go-back" onClick={() => navigate(-1)} to="#">
              Go Back
            </Link>
            <div className="product-details-main">
              <img
                className="product-img"
                src={product.item.image.mobile}
                alt=""
              />
              <div className="product-right-wrap">
                {product.item.new === true ? (
                  <span className="new-product">New Product</span>
                ) : (
                  ""
                )}
                <h3>{product.item.name}</h3>
                <p>{product.item.description}</p>
                <span className="product-price">{`$ ${product.item.price.toLocaleString()}`}</span>
                <div className="quantity-input">
                  <div className="selector-wrap">
                    <input
                      className="quantity-selector"
                      onClick={handleMinus}
                      type="button"
                      value="-"
                    />

                    <input
                      className="quantity-selector"
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={productQuantity}
                      onChange={(e) => setProductQuantity(e.target.value)}
                      min="0"
                      max={product.item.countInStock}
                    />
                    <input
                      className="quantity-selector"
                      onClick={handlePlus}
                      type="button"
                      value="+"
                    />

                    <Link
                      className="orange-btn-product"
                      to="#"
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="features-contents">
              <div className="features">
                <h4>Features</h4>
                <p>{product.item.features.split(/\n/)}</p>
              </div>
              <div className="in-the-box">
                <h4>in the box</h4>
                <ul className="item-ul">
                  {product.item.includes.map((item) => {
                    return (
                      <li key={item._id} className="item-li">
                        <span className="item-quantity">{item.quantity}x</span>
                        <span className="item-name">{item.item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="photo-wrapper">
            <div className="gallery-photo">
              <img src={product.item.gallery.first.mobile} alt="stock photp" />
              <img src={product.item.gallery.second.mobile} alt="stock photp" />
            </div>
            <div className="third-photo">
              <img src={product.item.gallery.third.mobile} alt="stock photp" />
            </div>
          </div>

          <h4 className="also-like-heading">you may also like</h4>
          <div className="also-like-wrap">
            <div className="you-may-also-like">
              {product.item.others.map((item) => {
                return (
                  <div className="also-like-item">
                    <div key={item._id}>
                      <img src={item.image.mobile} alt="" srcSet="" />
                      <h5>{item.name}</h5>
                      <Link className="orange-btn" to="#">
                        see product
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* <ProductCard />
      <About /> */}
    </section>
  );
}
