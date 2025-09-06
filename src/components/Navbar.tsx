import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { CartContext } from "../context/CartContext";
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
const Nav = styled.nav`
  background-color: ${colors.darkestGreen};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  color: ${colors.light};
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;

  span {
    color: ${colors.lightGreen};
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NavLinks = styled.div<{ $isMenuOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  @media (max-width: 768px) {
    display: ${(props) => (props.$isMenuOpen ? "flex" : "none")};
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: ${colors.darkestGreen};
    padding: 1rem 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)`
  color: ${colors.light};
  margin: 0 15px;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    color: ${colors.lightGreen};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${colors.lightGreen};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    margin: 10px 0;
    font-size: 1.2rem;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CartIcon = styled(Link)`
  background-color: rgba(255, 255, 255, 0.1);
  color: ${colors.light};
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(163, 177, 138, 0.2);
    transform: translateY(-2px);
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: ${colors.mediumGreen};
  color: white;
  font-size: 0.8rem;
  padding: 2px 6px;
  border-radius: 50%;
  font-weight: bold;
`;

const UserProfile = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  color: ${colors.light};
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background-color: rgba(163, 177, 138, 0.2);
    transform: translateY(-2px);
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(
    135deg,
    ${colors.mediumGreen} 0%,
    ${colors.darkGreen} 100%
  );
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Greeting = styled.p`
  color: ${colors.light};
  font-size: 1rem;
  margin: 0 15px 0 0;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 180px;
  padding: 10px 0;
  z-index: 1000;
  margin-top: 10px;

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    right: 15px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 20px;
  color: ${colors.darkestGreen};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.light};
    color: ${colors.darkGreen};
  }
`;

const DropdownButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 20px;
  background: none;
  border: none;
  color: ${colors.darkestGreen};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.light};
    color: ${colors.darkGreen};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${colors.light};
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavBar = () => {
  const loginCtx = useContext(LoginContext);
  if (!loginCtx) throw new Error("LoginContext not found");
  const { isLoggedIn, userName, logout } = loginCtx;
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems ? cartItems.length : 0;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <Nav>
      <Logo to="/">
        e-<span>Kitchen</span>
      </Logo>
      <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? "✕" : "☰"}
      </MobileMenuButton>
      <NavLinks $isMenuOpen={isMenuOpen}>
        <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/products" onClick={() => setIsMenuOpen(false)}>
          Products
        </NavLink>
        <NavLink to="/shops" onClick={() => setIsMenuOpen(false)}>
          Shops
        </NavLink>
        <NavLink to="/offers" onClick={() => setIsMenuOpen(false)}>
          Offers
        </NavLink>
        <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
          Contact
        </NavLink>
      </NavLinks>
      <RightSection>
        {isLoggedIn ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Greeting>Hello, {userName}</Greeting>
            <UserProfile onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              👤
            </UserProfile>
            {isDropdownOpen && (
              <DropdownMenu>
                <DropdownItem to="/profile">My Profile</DropdownItem>
                <DropdownItem to="/orders">My Orders</DropdownItem>
                <DropdownItem to="/wishlist">Wishlist</DropdownItem>
                <DropdownButton onClick={handleLogout}>Logout</DropdownButton>
              </DropdownMenu>
            )}
          </div>
        ) : (
          <LoginButton onClick={handleLogin}>Login</LoginButton>
        )}
        <CartIcon to="/cart">
          🛒
          <CartCount>{cartCount}</CartCount>
        </CartIcon>
      </RightSection>
    </Nav>
  );
};

export default NavBar;
