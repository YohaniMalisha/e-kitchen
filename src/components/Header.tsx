import React from "react";
import { Link } from "react-router-dom";
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
const HeaderContainer = styled.header`
  background-color: ${colors.darkGreen};
  padding: 15px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Logo = styled(Link)`
  color: ${colors.light};
  font-size: 1.8rem;
  font-weight: 700;
  
  span {
    color: ${colors.lightGreen};
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 25px;

  @media (max-width: 576px) {
    gap: 15px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NavLink = styled(Link)`
  color: ${colors.light};
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: ${colors.lightGreen};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${colors.lightGreen};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          e-<span>Kitchen</span>
        </Logo>
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
          <NavLink to="/account">Account</NavLink>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;