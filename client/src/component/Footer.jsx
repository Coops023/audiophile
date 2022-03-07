import React from "react";
import "./Footer.css";
import Logo from "../assets/logo.svg";
import Facebook from "../assets/icon-facebook.svg";
import Twitter from "../assets/icon-twitter.svg";
import Instagram from "../assets/icon-instagram.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="orange-top"></div>
      <img className="audio-logo" src={Logo} alt="" srcset="" />
      <div className="footer-content-wrap">
        <ul className="footer-links">
          <li>
            <Link className="footer-nav" to="">
              Home
            </Link>{" "}
          </li>
          <li>
            <Link className="footer-nav" to="">
              Headphones
            </Link>
          </li>
          <li>
            <Link className="footer-nav" to="#">
              Speakers
            </Link>
          </li>
          <li>
            <Link className="footer-nav" to="#">
              Earphones
            </Link>
          </li>
        </ul>
        <p className="footer-copy">
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we’re open 7 days a week.
        </p>
        <div className="copy-social">
          <p className="footer-copy">Copyright 2021. All Rights Reserved</p>{" "}
          <div className="logo-wrap">
            <img src={Facebook} alt="facebook logo" srcset="" />
            <img src={Twitter} alt="facebook logo" srcset="" />
            <img src={Instagram} alt="facebook logo" srcset="" />
          </div>
        </div>
      </div>
    </footer>
  );
}
