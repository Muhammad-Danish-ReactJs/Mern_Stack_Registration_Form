import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from "axios";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", formData)
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "User Login Successfully") {
          navigate("/dashboard");
        }
        console.log(formData); // send to your backend here
      })
      .catch((error) => {
        console.error("User Login Error", error);
      });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Welcome back</h2>
        <p className="login-subtitle">Sign in to continue</p>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <div className="password-wrap">
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <Form.Check type="checkbox" id="remember" label="Remember me" />
            <a href="#" className="forgot-link">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="login-btn w-100">
            Sign In
          </Button>
        </Form>

        <p className="signup-text">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
