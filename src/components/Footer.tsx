import React, { useState } from "react";
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
const FooterContainer = styled.footer`
  background-color: ${colors.darkestGreen};
  color: ${colors.light};
  padding: 50px 0 20px;
  margin-top: 50px;

  @media (max-width: 768px) {
    padding: 40px 0 15px;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: ${colors.lightGreen};
    margin-bottom: 20px;
    font-size: 1.3rem;
    position: relative;
    padding-bottom: 10px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 2px;
      background-color: ${colors.mediumGreen};
    }
  }

  ul {
    list-style: none;
    
    li {
      margin-bottom: 12px;
      
      a {
        color: ${colors.light};
        text-decoration: none;
        transition: all 0.3s ease;
        display: inline-block;
        
        &:hover {
          color: ${colors.lightGreen};
          transform: translateX(5px);
        }
      }
    }
  }

  p {
    line-height: 1.6;
    margin-bottom: 15px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: ${colors.light};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${colors.mediumGreen};
      transform: translateY(-3px);
    }
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    padding: 12px 15px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${colors.mediumGreen};
    }
  }

  button {
    background: linear-gradient(135deg, ${colors.mediumGreen} 0%, ${colors.darkGreen} 100%);
    color: white;
    border: none;
    padding: 12px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, ${colors.darkGreen} 0%, ${colors.mediumGreen} 100%);
    }
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 30px auto 0;
  padding: 20px 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
`;

const Copyright = styled.p`
  margin: 0;
  font-size: 0.9rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 10px;
  }

  a {
    color: ${colors.light};
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;

    &:hover {
      color: ${colors.lightGreen};
    }
  }
`;

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>e-Kitchen</h3>
          <p>Your one-stop shop for fresh, organic produce delivered right to your doorstep.</p>
          <SocialLinks>
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Pinterest">📌</a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/shops">Shops</Link></li>
            <li><Link to="/offers">Offers</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Categories</h3>
          <ul>
            <li><Link to="/category/vegetables">Vegetables</Link></li>
            <li><Link to="/category/fruits">Fruits</Link></li>
            <li><Link to="/category/dry-products">Dry Products</Link></li>
            <li><Link to="/category/spices-herbs">Spices & Herbs</Link></li>
            <li><Link to="/category/organic">Organic Products</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Newsletter</h3>
          <p>Subscribe to our newsletter for updates on new products and special offers.</p>
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </NewsletterForm>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <Copyright>&copy; 2025 e-Kitchen. All rights reserved.</Copyright>
        <FooterLinks>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact Us</Link>
        </FooterLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;