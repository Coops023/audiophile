import { useSelector, useDispatch } from "react-redux";
import CheckoutModal from "../component/CheckoutModal";
import "./Checkout.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [email, setEmail] = useState("");
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(50);
  const [vat, setVat] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const [modal, setModal] = useState(false);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmail = (e) => setEmail(e.target.value);

  const showModal = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const cartTotal = async () => {
    try {
      setTotal(
        cart.cartItems.reduce((price, item) => item.price * item.qty + price, 0)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const vatTotal = async () => {
    try {
      setVat((total * 20) / 100);
    } catch (err) {
      console.log(err);
    }
  };

  const grandTotalHandler = async () => {
    try {
      setGrandTotal(total + shipping);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    cartTotal();
    vatTotal();
    grandTotalHandler();
  }, [cart, vat, grandTotal]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(`${baseUrl}/stripe/charge`, {
          amount: 999,
          id: id,
        });

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("CheckoutForm.js 25 | payment successful!");
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div className="checkout">
      <form
        id="checkout-form"
        className="checkout-form"
        onSubmit={handleSubmit}
      >
        <h2>checkout</h2>
        <h5>billing details</h5>
        <label for="name">Name</label>
        <input
          className="form-text-input"
          name="name"
          type="text"
          placeholder="Axel Ward"
          required="true"
        />

        <label for="email">Email Address</label>
        <input
          className="form-text-input"
          name="email"
          type="text"
          value={email}
          onChange={handleEmail}
          placeholder="axel@gmail.com"
          required="true"
        />

        <label for="name">Phone Number</label>
        <input
          className="form-text-input"
          name="Phone number"
          type="text"
          placeholder="+1202-555-0136"
          required="true"
        />

        <h5>Shipping info</h5>
        <label for="address">Your address</label>
        <input
          className="form-text-input"
          name="address"
          type="text"
          placeholder="1137 Williams Avenue"
          required="true"
        />

        <label for="zip">Zip Code</label>
        <input
          className="form-text-input"
          name="sip"
          type="text"
          placeholder="1000 Wp"
          required="true"
        />

        <label for="city">City</label>
        <input
          className="form-text-input"
          name="city"
          type="text"
          placeholder="Amsterdam"
          required="true"
        />

        <label for="country">Country</label>
        <input
          className="form-text-input"
          name="country"
          type="text"
          placeholder="The Netherlands"
          required="true"
        />

        <h5>Payment Details</h5>

        <CardElement />
        <button className="orange-btn">Pay</button>

        <h3 className="summary">Summary</h3>
        {cartItems.map((item) => {
          return (
            <div className="item-wrap">
              <div className="price-qty-wrap">
                <img src={item.image} alt="" />

                <div>
                  {item.name.includes("Headphones") ? (
                    <h6>{item.name.replace("Headphones", "")}</h6>
                  ) : item.name.includes("Earphones") ? (
                    <h6>{item.name.replace("Wireless Earphones", "")}</h6>
                  ) : item.name.includes("Speaker") ? (
                    <h6>{item.name.replace("Speaker", "")}</h6>
                  ) : (
                    ""
                  )}

                  <span>{`$${item.price.toLocaleString()}`}</span>
                </div>
              </div>
              <span>x{item.qty}</span>
            </div>
          );
        })}
        <div className="total-checkout">
          <span>total</span>
          <span className="total-span">${total.toLocaleString()}</span>
        </div>
        <div className="total-checkout">
          <span>Shipping</span>
          <span className="total-span">${shipping}</span>
        </div>
        <div className="total-checkout">
          <span>Vat (included)</span>
          <span className="total-span">
            ${Math.floor(vat).toLocaleString()}
          </span>
        </div>
        <div className="total-final">
          <span>Grand total</span>
          <span className="grand-total">
            ${Math.floor(grandTotal).toLocaleString()}
          </span>
        </div>
      </form>
    </div>
  );
}
