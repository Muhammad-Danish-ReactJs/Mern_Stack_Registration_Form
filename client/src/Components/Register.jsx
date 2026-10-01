import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from "axios";


function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    axios
      .post("http://localhost:8080/register", formData)
      // console.log(formData);
      .then((response) => {
        console.log(response.data);
        if(response.data.message="User register successfully"){
          navigate("/login")
        }
      })
      .catch((error) => {
        console.error("Error Registering User", error);
      });
    setError("");
  };


  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Create account</h2>
        <p className="login-subtitle">Sign up to get started</p>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="regName">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Muhammad Danish"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="regEmail">
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

          <Form.Group className="mb-3" controlId="regPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="regConfirm">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Repeat your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" className="login-btn w-100">
            Create Account
          </Button>
        </Form>

        <p className="signup-text">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
