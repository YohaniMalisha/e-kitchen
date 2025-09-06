import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginProvider } from "./context/LoginContext"; // Import LoginProvider
import { CartProvider } from "./context/CartContext";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ShopsPage from "./pages/ShopsPage"; 
import ProductPage from "./pages/ProductPage"; 
import OffersPage from "./pages/OffersPage";

const App: React.FC = () => {
  return (
    <LoginProvider>
      <CartProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/shops" element={<ShopsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/offers" element={<OffersPage />} />

          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </LoginProvider>
  );
};

export default App;
