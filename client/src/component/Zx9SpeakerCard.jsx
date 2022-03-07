import React from "react";
import "./Zx9SpeakerCard.css";
import { Link } from "react-router-dom";
import Z7xSpeakerCard from "./Z7xSpeakerCard";
import Yx1EarphoneCard from "./Yx1EarphoneCard";

export default function Zx9SpeakerCard() {
  return (
    <>
      <article className="speaker-card">
        <div className="container">
          <img src="/assets/image-speaker-zx9.png" alt="speaker" />
          <div className="zx9-wrap">
            <h3>ZX9 speaker</h3>
            <p>
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>
            <Link className="black-btn" to="#">
              {" "}
              See product
            </Link>
          </div>
        </div>
      </article>
      <Z7xSpeakerCard />
      <Yx1EarphoneCard />
    </>
  );
}
