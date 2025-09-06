import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { LoginContext } from "../context/LoginContext";
import styled from "styled-components";

// Color palette
const colors = {
  light: "#DAD7CD",
  lightGreen: "#A3B18A",
  mediumGreen: "#588157",
  darkGreen: "#345A40",
  darkestGreen: "#344E41",
};

// Styled components
const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 70vh;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const CartTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: ${colors.darkestGreen};
  margin-bottom: 30px;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, ${colors.mediumGreen} 0%, ${colors.darkGreen} 100%);
    margin: 15px auto;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 50px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  p {
    font-size: 1.2rem;
    color: ${colors.darkestGreen};
    margin-bottom: 30px;
  }

  button {
    background: linear-gradient(135deg, ${colors.mediumGreen} 0%, ${colors.darkGreen} 100%);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 25px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
  }
`;

const CartItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const CartItemsList = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr auto auto;
  gap: 20px;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 80px 1fr;
    grid-template-rows: auto auto auto;
    gap: 10px;
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    grid-row: 1 / 3;
  }
`;

const ItemDetails = styled.div`
  h3 {
    color: ${colors.darkestGreen};
    margin-bottom: 8px;
    font-size: 1.2rem;
  }

  p {
    color: ${colors.mediumGreen};
    font-weight: 600;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    grid-column: 2 / 3;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    grid-column: 1 / 3;
    justify-self: center;
    margin-top: 10px;
  }
`;

const QuantityButton = styled.button`
  background: ${colors.light};
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background: ${colors.lightGreen};
    color: white;
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  text-align: center;
  padding: 5px;
  border: 2px solid ${colors.light};
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${colors.mediumGreen};
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: 1px solid #e74c3c;
  color: #e74c3c;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e74c3c;
    color: white;
  }

  @media (max-width: 768px) {
    grid-column: 1 / 3;
    justify-self: center;
    margin-top: 10px;
  }
`;

const OrderSummary = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  height: fit-content;
  position: sticky;
  top: 20px;

  h3 {
    color: ${colors.darkestGreen};
    margin-bottom: 20px;
    font-size: 1.5rem;
    text-align: center;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
    font-weight: bold;
    font-size: 1.2rem;
    color: ${colors.darkestGreen};
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, ${colors.mediumGreen} 0%, ${colors.darkGreen} 100%);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ContinueShopping = styled.button`
  width: 100%;
  background: transparent;
  color: ${colors.mediumGreen};
  border: 2px solid ${colors.mediumGreen};
  padding: 12px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 15px;

  &:hover {
    background: ${colors.mediumGreen};
    color: white;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: ${colors.darkestGreen};
`;

type CartItemType = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeItem } = useContext(CartContext);
  const loginCtx = useContext(LoginContext);
  if (!loginCtx) throw new Error("LoginContext not found");
  const { isLoggedIn } = loginCtx;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      // Simulate loading
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [isLoggedIn, navigate]);

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const totalAmount = cartItems.reduce(
    (acc: number, item: CartItemType) => acc + item.price * item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (acc: number, item: CartItemType) => acc + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.08; // 8% tax

  if (isLoading) {
    return (
      <CartContainer>
        <LoadingSpinner>Loading your cart...</LoadingSpinner>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartTitle>Your Cart</CartTitle>
      {cartItems.length === 0 ? (
        <EmptyCart>
          <p>Your cart is empty!</p>
          <button onClick={handleContinueShopping}>Continue Shopping</button>
        </EmptyCart>
      ) : (
        <CartItemsContainer>
          <CartItemsList>
            {cartItems.map((item: CartItemType) => (
              <CartItem key={item.id}>
                <ItemImage src={item.image} alt={item.name} />
                <ItemDetails>
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </ItemDetails>
                <QuantityControls>
                  <QuantityButton 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    -
                  </QuantityButton>
                  <QuantityInput
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    min="1"
                  />
                  <QuantityButton 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </QuantityButton>
                </QuantityControls>
                <RemoveButton onClick={() => removeItem(item.id)}>
                  Remove
                </RemoveButton>
              </CartItem>
            ))}
          </CartItemsList>

          <OrderSummary>
            <h3>Order Summary</h3>
            <SummaryRow>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Total</span>
              <span>${(subtotal + shipping + tax).toFixed(2)}</span>
            </SummaryRow>
            
            <CheckoutButton onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </CheckoutButton>
            <ContinueShopping onClick={handleContinueShopping}>
              Continue Shopping
            </ContinueShopping>
          </OrderSummary>
        </CartItemsContainer>
      )}
    </CartContainer>
  );
};

export default CartPage;