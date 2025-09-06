import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
const SignUpContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 20px;
`;

const SignUpCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  padding: 40px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 576px) {
    padding: 30px 20px;
  }
`;

const SignUpLogo = styled.div`
  margin-bottom: 30px;
  
  h1 {
    font-size: 2.5rem;
    color: ${colors.darkestGreen};
    margin: 0;
    
    span {
      color: ${colors.mediumGreen};
    }
  }
  
  p {
    color: #7f8c8d;
    margin-top: 10px;
    font-size: 1.1rem;
  }
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  text-align: left;
  
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
  padding: 15px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${colors.mediumGreen};
    box-shadow: 0 0 0 3px rgba(88, 129, 87, 0.2);
  }
  
  &::placeholder {
    color: #adb5bd;
  }
`;

const SignUpButton = styled.button`
  background: linear-gradient(135deg, ${colors.mediumGreen} 0%, ${colors.darkGreen} 100%);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  
  &:hover {
    background: linear-gradient(135deg, ${colors.darkGreen} 0%, ${colors.mediumGreen} 100%);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const LoginPrompt = styled.div`
  margin-top: 25px;
  color: #7f8c8d;
  
  a {
    color: ${colors.mediumGreen};
    text-decoration: none;
    font-weight: 600;
    margin-left: 5px;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${colors.darkGreen};
      text-decoration: underline;
    }
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
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  background: rgba(39, 174, 96, 0.1);
  padding: 10px;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 0.9rem;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TermsText = styled.p`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-top: 15px;
  
  a {
    color: ${colors.mediumGreen};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess("Account created successfully! Redirecting to login...");
      
      // Save user details to localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ name, email, password })
      );
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError("An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignUpContainer>
      <SignUpCard>
        <SignUpLogo>
          <h1>e-<span>Kitchen</span></h1>
          <p>Create your account</p>
        </SignUpLogo>
        
        {error && <ErrorMessage>⚠️ {error}</ErrorMessage>}
        {success && <SuccessMessage>✅ {success}</SuccessMessage>}
        
        <SignUpForm onSubmit={handleSignUp}>
          <FormGroup>
            <label htmlFor="name">Full Name</label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="email">Email Address</label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </FormGroup>
          
          <SignUpButton type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </SignUpButton>
        </SignUpForm>
        
        <TermsText>
          By creating an account, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
        </TermsText>
        
        <LoginPrompt>
          Already have an account? <Link to="/login">Login here</Link>
        </LoginPrompt>
      </SignUpCard>
    </SignUpContainer>
  );
};

export default SignUpPage;