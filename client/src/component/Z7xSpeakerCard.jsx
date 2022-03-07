import React from "react";
import "./Z7xSpeakerCard.css";
import { Link } from "react-router-dom";

export default function Z7xSpeakerCard() {
  return (
    <article className="zx7">
      <div className="container-zx7">
        <h3 className="zx7-heading">ZX7 speaker</h3>
        <Link className="transparent-btn" to="#">
          See product
        </Link>
      </div>
    </article>
  );
}
