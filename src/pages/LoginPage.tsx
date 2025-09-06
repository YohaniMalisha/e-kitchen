import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LoginContext } from "../context/LoginContext";

// Color palette
const colors = {
  light: "#DAD7CD",
  lightGreen: "#A3B18A",
  mediumGreen: "#588157",
  darkGreen: "#345A40",
  darkestGreen: "#344E41",
};

// Styled components
const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 20px;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
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

const LoginLogo = styled.div`
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

const LoginForm = styled.form`
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

const LoginButton = styled.button`
  background: linear-gradient(
    135deg,
    ${colors.mediumGreen} 0%,
    ${colors.darkGreen} 100%
  );
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
    background: linear-gradient(
      135deg,
      ${colors.darkGreen} 0%,
      ${colors.mediumGreen} 100%
    );
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

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #e9ecef;
  }

  span {
    padding: 0 15px;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
`;

const SocialLogin = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 25px;
`;

const SocialButton = styled.button`
  flex: 1;
  padding: 12px;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #f8f9fa;
    transform: translateY(-2px);
  }

  &:first-child {
    color: #4267b2;
    border-color: #4267b2;

    &:hover {
      background: rgba(66, 103, 178, 0.1);
    }
  }

  &:last-child {
    color: #db4437;
    border-color: #db4437;

    &:hover {
      background: rgba(219, 68, 55, 0.1);
    }
  }
`;

const SignupPrompt = styled.div`
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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const loginCtx = useContext(LoginContext);
  if (!loginCtx) throw new Error("LoginContext not found");
  const { login } = loginCtx;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.email === email && user.password === password) {
        login(user.username); // Username is set from signup data
        // Store auth state (in a real app, you'd store a token)
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);

        // Redirect after a short delay
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setError("Invalid credentials");
      }
    } else {
      setError("User not found");
    }
  };

  const handleSocialLogin = (provider: string) => {
    setSuccess(`Logging in with ${provider}...`);
    // In a real app, this would integrate with OAuth
    setTimeout(() => {
      setError(`${provider} login is not implemented in this demo`);
      setSuccess("");
    }, 1500);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginLogo>
          <h1>
            e-<span>Kitchen</span>
          </h1>
          <p>Sign in to your account</p>
        </LoginLogo>

        {error && <ErrorMessage>⚠️ {error}</ErrorMessage>}
        {success && <SuccessMessage>✅ {success}</SuccessMessage>}

        <LoginForm onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              required
            />
          </FormGroup>

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </LoginButton>
        </LoginForm>

        <Divider>
          <span>Or continue with</span>
        </Divider>

        <SocialLogin>
          <SocialButton onClick={() => handleSocialLogin("Google")}>
            <span>G</span> Google
          </SocialButton>
          <SocialButton onClick={() => handleSocialLogin("Facebook")}>
            <span>f</span> Facebook
          </SocialButton>
        </SocialLogin>

        <SignupPrompt>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </SignupPrompt>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;
