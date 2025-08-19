import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CheckoutPage: React.FC = () => {
  const { cartItems } = useContext(CartContext);

  const handleSubmit = () => {
    alert("Order placed successfully!");
  };

  const totalAmount = cartItems.reduce(
    (acc: number, item: { price: number; quantity: number }) =>
      acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          <h3>Order Summary</h3>
          {cartItems.map(
            (item: {
              id: number;
              name: string;
              quantity: number;
              price: number;
            }) => (
              <div key={item.id}>
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.price * item.quantity}</p>
              </div>
            )
          )}
          <h3>Total Amount: ${totalAmount}</h3>
          <button onClick={handleSubmit}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
