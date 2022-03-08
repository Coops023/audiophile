import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../component/Spinner";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import "./Cart.css";

export default function Cart(props) {
  console.log(props);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const cartTotal = async () => {
    try {
      setTotal(
        cart.cartItems.reduce((price, item) => item.price * item.qty + price, 0)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const removeHandler = () => {
    cartItems.splice(0, cartItems.length);
    dispatch(removeFromCart());
    setTotal(0);
  };

  useEffect(() => {
    cartTotal();
  }, []);

  return (
    <div onClick={props.showCart} className="cart">
      {cart.cartItems === undefined ? (
        ""
      ) : (
        <div className="cart-container">
          <div className="cart-heading-remove">
            <h5>Cart {`(${cart.cartItems.length})`}</h5>
            <button className="remove-btn" onClick={removeHandler}>
              Remove all
            </button>
          </div>

          {cart.cartItems == undefined ? (
            <Spinner />
          ) : (
            cartItems.map((x) => {
              return (
                <div className="cart-items">
                  <img className="prod-img" src={x.image} alt="product photo" />

                  <div className="item-name-price">
                    {x.name.includes("Headphones") ? (
                      <h5>{x.name.replace("Headphones", "")}</h5>
                    ) : x.name.includes("Earphones") ? (
                      <h5>{x.name.replace("Wireless Earphones", "")}</h5>
                    ) : x.name.includes("Speaker") ? (
                      <h5>{x.name.replace("Speaker", "")}</h5>
                    ) : (
                      ""
                    )}
                    <span>${x.price}</span>
                  </div>
                  <div className="qty-selector">
                    <input
                      className="quantity-selector"
                      type="button"
                      value="-"
                    />

                    <input
                      className="quantity-selector"
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="0"
                      value={x.qty}
                    />
                    <input
                      className="quantity-selector"
                      type="button"
                      value="+"
                    />
                  </div>
                </div>
              );
            })
          )}

          <div className="total">
            <h5>total</h5>
            <span className="total-price">${total.toLocaleString()}</span>
          </div>
          <div className="checkout-btn-wrap">
            <Link
              to="/checkout"
              className="checkout-btn"
              onClick={props.showCart}
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
