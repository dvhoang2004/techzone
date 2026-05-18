import React from "react";
import { Link } from "react-router-dom";

import "./Hero.css";
const Hero = ({ title, subtitle, link, image }) => {
  return (
    <section className="hero-section">
      <div className="align-center">
        <h2 className="title">{title}</h2>
        <p className="subtitle">{subtitle}</p>
        <Link to={link} className="link">
          Buy now
        </Link>
      </div>
      <div className="align-center">
        <img src={image} alt="" />
      </div>
    </section>
  );
};

export default Hero;
