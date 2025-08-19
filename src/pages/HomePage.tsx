import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

const HomePage: React.FC = () => {
  const [products] = useState([
    { id: 1, name: "Organic Apple", price: 2.5, image: "/images/apple.jpg" },
    { id: 2, name: "Fresh Banana", price: 1.8, image: "/images/banana.jpg" },
  ]);

  return (
    <div>
      <h1>Fresh Produce Store</h1>
      <div>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
