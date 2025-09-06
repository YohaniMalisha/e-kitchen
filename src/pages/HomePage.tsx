import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Color Palette
const colors = {
  lightGreen: "#A3B18A",
  mediumGreen: "#588157",
  darkGreen: "#345A40",
};

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const HeroBanner = styled.div`
  background: linear-gradient(rgba(52, 78, 65, 0.7), rgba(52, 78, 65, 0.7)),
    url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80");
  background-size: cover;
  background-position: center;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  border-radius: 12px;
  margin: 20px 0;
  position: relative;
  overflow: hidden;

  @media (max-width: 992px) {
    height: 400px;
  }

  @media (max-width: 768px) {
    height: 350px;
    margin: 15px 0;
    border-radius: 8px;
  }

  @media (max-width: 576px) {
    height: 300px;
  }
`;

const BannerContent = styled.div`
  max-width: 700px;
  z-index: 2;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const BannerTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 20px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 992px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 15px;
  }

  @media (max-width: 576px) {
    font-size: 1.8rem;
    margin-bottom: 12px;
  }
`;

const BannerSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 992px) {
    font-size: 1.3rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 20px;
  }

  @media (max-width: 576px) {
    font-size: 1rem;
    margin-bottom: 15px;
  }
`;

const BannerButton = styled.button`
  background: linear-gradient(
    135deg,
    ${colors.mediumGreen} 0%,
    ${colors.darkGreen} 100%
  );
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 12px 30px;
    font-size: 1.1rem;
  }

  @media (max-width: 576px) {
    padding: 10px 25px;
    font-size: 1rem;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const ProductCard = styled.div`
  border: 1px solid ${colors.lightGreen};
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  background-color: white;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
`;

const ProductName = styled.h3`
  color: ${colors.darkGreen};
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  color: ${colors.mediumGreen};
  font-size: 1.2rem;
`;

const Button = styled.button`
  background: ${colors.mediumGreen};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${colors.darkGreen};
  }
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for products
  const products = [
    {
      id: 1,
      name: "Fresh Avocados",
      price: "$2.99",
      image:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Organic Apples",
      price: "$3.49",
      image:
        "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Strawberries",
      price: "$4.99",
      image:
        "https://images.unsplash.com/photo-1543528176-61b239494933?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <Container>
      <HeroBanner>
        <BannerContent>
          <BannerTitle>Fresh & Organic Produce</BannerTitle>
          <BannerSubtitle>
            Get the freshest fruits and vegetables delivered to your doorstep
          </BannerSubtitle>
          <BannerButton onClick={() => navigate("/products")}>
            Shop Now
          </BannerButton>
        </BannerContent>
      </HeroBanner>

      <h2>Featured Products</h2>
      <ProductsGrid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price}</ProductPrice>
            <Button onClick={() => navigate("/cart")}>Add to Cart</Button>
          </ProductCard>
        ))}
      </ProductsGrid>
    </Container>
  );
};

export default HomePage;
