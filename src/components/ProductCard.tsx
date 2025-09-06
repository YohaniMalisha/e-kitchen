import React, { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import { LoginContext } from "../context/LoginContext";

const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const ProductName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #2c3e50;
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  color: #4ecdc4;
  margin-bottom: 15px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  span {
    margin-left: 8px;
    color: #7f8c8d;
  }
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #44a08d 0%, #4ecdc4 100%);
  }

  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
`;

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  rating,
}) => {
  const { addToCart } = useContext(CartContext);
  const loginCtx = useContext(LoginContext);
  if (!loginCtx) throw new Error("LoginContext not found");
  const { isLoggedIn } = loginCtx;

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("Please login or signup to shop!");
      return;
    }
    addToCart({ id: Date.now(), name, price, image, quantity: 1 });
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push("★");
    }

    if (hasHalfStar) {
      stars.push("☆");
    }

    while (stars.length < 5) {
      stars.push("☆");
    }

    return stars.join("");
  };

  return (
    <Card>
      <ProductImage src={image} alt={name} />
      <CardContent>
        <ProductName>{name}</ProductName>
        <Rating>
          {renderStars()} <span>({rating})</span>
        </Rating>
        <ProductPrice>${price.toFixed(2)}</ProductPrice>
        <AddButton onClick={handleAddToCart} disabled={!isLoggedIn}>
          {isLoggedIn ? "Add to Cart" : "Login to Shop"}
        </AddButton>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
