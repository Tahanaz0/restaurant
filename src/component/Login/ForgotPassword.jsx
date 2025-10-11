import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import "./Login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Password reset link sent to your email!");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <div className="login-logo-container">
          <div className="logo-container">
            <img src="/images/logoo.png" alt="logo" className="login-logo-image" />
          </div>
          <div className="login-logo-text">
            <img src="/images/T3all.png" alt="" className="tall" />
          </div>
        </div>
      </div>

      <div className="login-form">
        <div className="login-form-container2">
          <h1 className="login-form-heading">Forgot Password</h1>
          <p className="login-form-subtext">
            Enter your registered email address and we’ll send you a reset link.
          </p>

          <form onSubmit={handleReset} className="login-form-container">
            <label className="login-form-label">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`login-form-input ${error ? "input-error" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && <p className="error-text">{error}</p>}
            {message && <p className="success-text">{message}</p>}

            <button type="submit" className="login-form-button">
              Send Reset Link
            </button>

            <div className="back-to-login">
              <a href="/Login">← Back to Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
