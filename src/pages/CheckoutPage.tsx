import React, { useContext, useState, useEffect } from "react";
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
const CheckoutContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  min-height: 80vh;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const CheckoutTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: ${colors.darkestGreen};
  margin-bottom: 30px;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(
      135deg,
      ${colors.mediumGreen} 0%,
      ${colors.darkGreen} 100%
    );
    margin: 15px auto;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const CheckoutSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  color: ${colors.darkestGreen};
  margin-bottom: 20px;
  font-size: 1.5rem;
  padding-bottom: 10px;
  border-bottom: 2px solid ${colors.light};
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: ${colors.darkestGreen};
    font-size: 1rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid ${colors.light};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.mediumGreen};
    box-shadow: 0 0 0 3px rgba(88, 129, 87, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid ${colors.light};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.mediumGreen};
    box-shadow: 0 0 0 3px rgba(88, 129, 87, 0.2);
  }
`;

const RadioGroup = styled.div`
  margin-bottom: 15px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
  padding: 12px;
  border: 2px solid ${colors.light};
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.mediumGreen};
  }

  input {
    margin-right: 10px;
  }

  &.selected {
    border-color: ${colors.mediumGreen};
    background-color: rgba(88, 129, 87, 0.1);
  }
`;

const AddressCard = styled.div`
  padding: 15px;
  border: 2px solid ${colors.light};
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.mediumGreen};
  }

  &.selected {
    border-color: ${colors.mediumGreen};
    background-color: rgba(88, 129, 87, 0.1);
  }

  h4 {
    margin: 0 0 8px 0;
    color: ${colors.darkestGreen};
  }

  p {
    margin: 0;
    color: ${colors.darkGreen};
    line-height: 1.5;
  }
`;

const AddAddressButton = styled.button`
  background: transparent;
  color: ${colors.mediumGreen};
  border: 2px dashed ${colors.mediumGreen};
  padding: 12px 15px;
  border-radius: 8px;
  width: 100%;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background: rgba(88, 129, 87, 0.1);
  }
`;

const PaymentMethod = styled.div`
  padding: 15px;
  border: 2px solid ${colors.light};
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.mediumGreen};
  }

  &.selected {
    border-color: ${colors.mediumGreen};
    background-color: rgba(88, 129, 87, 0.1);
  }
`;

const PaymentTitle = styled.h4`
  display: flex;
  align-items: center;
  margin: 0 0 10px 0;
  color: ${colors.darkestGreen};

  span {
    margin-right: 10px;
    font-size: 1.2rem;
  }
`;

const PaymentForm = styled.div`
  padding: 15px;
  background: ${colors.light};
  border-radius: 8px;
  margin-top: 15px;
`;

const OrderSummary = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  height: fit-content;
  position: sticky;
  top: 20px;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.2rem;
  color: ${colors.darkestGreen};
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid ${colors.light};
`;

const PlaceOrderButton = styled.button`
  width: 100%;
  background: linear-gradient(
    135deg,
    ${colors.mediumGreen} 0%,
    ${colors.darkGreen} 100%
  );
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

const ErrorMessage = styled.div`
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
  padding: 10px;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 0.9rem;
  text-align: left;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  background: rgba(39, 174, 96, 0.1);
  padding: 10px;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 0.9rem;
  text-align: left;
`;

type CartItemType = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type AddressType = {
  id: number;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
};

const CheckoutPage: React.FC = () => {
  const { cartItems } = useContext(CartContext);
  const loginCtx = useContext(LoginContext);
  if (!loginCtx) throw new Error("LoginContext not found");
  const { isLoggedIn } = loginCtx;

  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Sample recent addresses
  const [recentAddresses] = useState<AddressType[]>([
    {
      id: 1,
      name: "Home",
      address: "123 Forest Lane",
      city: "Greenwood",
      postalCode: "12345",
      isDefault: true,
    },
    {
      id: 2,
      name: "Work",
      address: "456 Oak Avenue",
      city: "Greenwood",
      postalCode: "12346",
      isDefault: false,
    },
    {
      id: 3,
      name: "Mom's House",
      address: "789 Pine Street",
      city: "Greenwood",
      postalCode: "12347",
      isDefault: false,
    },
  ]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }

    // Set default address if available
    const defaultAddress = recentAddresses.find((addr) => addr.isDefault);
    if (defaultAddress) {
      setSelectedAddress(defaultAddress.id);
      setShippingDetails({
        name: defaultAddress.name,
        address: defaultAddress.address,
        city: defaultAddress.city,
        postalCode: defaultAddress.postalCode,
        notes: "",
      });
    }
  }, [isLoggedIn, navigate, recentAddresses]);

  const handleAddressSelect = (address: AddressType) => {
    setSelectedAddress(address.id);
    setShippingDetails({
      name: address.name,
      address: address.address,
      city: address.city,
      postalCode: address.postalCode,
      notes: "",
    });
    setShowAddressForm(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (
      !shippingDetails.name ||
      !shippingDetails.address ||
      !shippingDetails.city ||
      !shippingDetails.postalCode
    ) {
      setError("Please fill in all shipping details");
      setIsLoading(false);
      return;
    }

    if (
      paymentMethod === "card" &&
      (!cardDetails.cardNumber ||
        !cardDetails.cardName ||
        !cardDetails.expiry ||
        !cardDetails.cvv)
    ) {
      setError("Please fill in all card details");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess("Order placed successfully!");

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/order-confirmation");
      }, 1500);
    } catch (err) {
      setError("An error occurred while placing your order");
    } finally {
      setIsLoading(false);
    }
  };

  const subtotal = cartItems.reduce(
    (acc: number, item: CartItemType) => acc + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (!isLoggedIn) {
    return null; // Will redirect due to useEffect
  }

  return (
    <CheckoutContainer>
      <CheckoutTitle>Checkout</CheckoutTitle>

      {error && <ErrorMessage>⚠️ {error}</ErrorMessage>}
      {success && <SuccessMessage>✅ {success}</SuccessMessage>}

      <form onSubmit={handleSubmit}>
        <CheckoutGrid>
          <div>
            <CheckoutSection>
              <SectionTitle>Shipping Address</SectionTitle>

              <div>
                <h4>Select a saved address</h4>
                {recentAddresses.map((address) => (
                  <AddressCard
                    key={address.id}
                    className={selectedAddress === address.id ? "selected" : ""}
                    onClick={() => handleAddressSelect(address)}
                  >
                    <h4>
                      {address.name} {address.isDefault && "(Default)"}
                    </h4>
                    <p>{address.address}</p>
                    <p>
                      {address.city}, {address.postalCode}
                    </p>
                  </AddressCard>
                ))}

                <AddAddressButton
                  type="button"
                  onClick={() => setShowAddressForm(!showAddressForm)}
                >
                  {showAddressForm ? "Cancel" : "+ Add New Address"}
                </AddAddressButton>

                {(showAddressForm || selectedAddress === null) && (
                  <div>
                    <FormGroup>
                      <label>Address Name (e.g., Home, Work)</label>
                      <Input
                        type="text"
                        name="name"
                        value={shippingDetails.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Home, Work"
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Street Address</label>
                      <Input
                        type="text"
                        name="address"
                        value={shippingDetails.address}
                        onChange={handleChange}
                        required
                        placeholder="123 Main St"
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>City</label>
                      <Input
                        type="text"
                        name="city"
                        value={shippingDetails.city}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Postal Code</label>
                      <Input
                        type="text"
                        name="postalCode"
                        value={shippingDetails.postalCode}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Delivery Notes (Optional)</label>
                      <TextArea
                        name="notes"
                        value={shippingDetails.notes}
                        onChange={handleChange}
                        placeholder="Any special delivery instructions"
                      />
                    </FormGroup>
                  </div>
                )}
              </div>
            </CheckoutSection>

            <CheckoutSection>
              <SectionTitle>Payment Method</SectionTitle>

              <RadioGroup>
                {/* Only show Credit/Debit Card option */}
                <PaymentMethod
                  className={paymentMethod === "card" ? "selected" : ""}
                  onClick={() => setPaymentMethod("card")}
                >
                  <PaymentTitle>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <span>💳</span> Credit/Debit Card
                  </PaymentTitle>
                  <p>Pay securely with your credit or debit card</p>

                  {paymentMethod === "card" && (
                    <PaymentForm>
                      <FormGroup>
                        <label>Card Number</label>
                        <Input
                          type="text"
                          name="cardNumber"
                          value={cardDetails.cardNumber}
                          onChange={handleCardChange}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <label>Cardholder Name</label>
                        <Input
                          type="text"
                          name="cardName"
                          value={cardDetails.cardName}
                          onChange={handleCardChange}
                          placeholder="John Doe"
                          required
                        />
                      </FormGroup>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "15px",
                        }}
                      >
                        <FormGroup>
                          <label>Expiry Date</label>
                          <Input
                            type="text"
                            name="expiry"
                            value={cardDetails.expiry}
                            onChange={handleCardChange}
                            placeholder="MM/YY"
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>CVV</label>
                          <Input
                            type="text"
                            name="cvv"
                            value={cardDetails.cvv}
                            onChange={handleCardChange}
                            placeholder="123"
                            required
                          />
                        </FormGroup>
                      </div>
                    </PaymentForm>
                  )}
                </PaymentMethod>
              </RadioGroup>
            </CheckoutSection>
          </div>

          <OrderSummary>
            <SectionTitle>Order Summary</SectionTitle>

            {cartItems.map((item: CartItemType) => (
              <OrderItem key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <div>
                    {item.quantity} x ${item.price.toFixed(2)}
                  </div>
                </div>
                <div>${(item.quantity * item.price).toFixed(2)}</div>
              </OrderItem>
            ))}

            <OrderItem>
              <div>Subtotal</div>
              <div>${subtotal.toFixed(2)}</div>
            </OrderItem>

            <OrderItem>
              <div>Shipping</div>
              <div>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</div>
            </OrderItem>

            <OrderItem>
              <div>Tax</div>
              <div>${tax.toFixed(2)}</div>
            </OrderItem>

            <OrderTotal>
              <div>Total</div>
              <div>${total.toFixed(2)}</div>
            </OrderTotal>

            <PlaceOrderButton type="submit" disabled={isLoading}>
              {isLoading
                ? "Processing..."
                : `Place Order - $${total.toFixed(2)}`}
            </PlaceOrderButton>
          </OrderSummary>
        </CheckoutGrid>
      </form>
    </CheckoutContainer>
  );
};

export default CheckoutPage;
