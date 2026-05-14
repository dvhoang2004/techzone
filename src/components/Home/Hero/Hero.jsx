import React from "react";

import "./Hero.css";
const Hero = ({ title, subtitle, link, image }) => {
  return (
    <section className="hero-section">
      <div className="align-center">
        <h2 className="title">{title}</h2>
        <p className="subtitle">{subtitle}</p>
        <a href={link} className="link">
          Buy now
        </a>
      </div>
      <div className="align-center">
        <img src={image} alt="" />
      </div>
    </section>
  );
};

export default Hero;
