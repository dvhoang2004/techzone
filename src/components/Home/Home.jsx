import React from "react";

import Hero from "./Hero/Hero";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import iphone from "../../assets/iphone17pm.jpg";
import mac from "../../assets/mac.jpg";

const Home = () => {
  return (
    <div>
      <Hero
        title="Buy iPhone 17 Pro Max"
        subtitle="The iPhone 17 Pro Max featuring 48MP triple rear cameras, and a durable aluminum unibody design."
        link="#"
        image={iphone}
      />

      <FeaturedProducts />

      <Hero
        title="Macbook Air"
        subtitle="MacBook Air is a sleek, lightweight laptop with strong performance and long battery life."
        link="#"
        image={mac}
      />
    </div>
  );
};

export default Home;
