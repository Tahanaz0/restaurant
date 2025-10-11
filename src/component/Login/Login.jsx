import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase";

import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ error state for fields
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    if (email.trim() === "" || password.trim() === "") {
      if (email.trim() === "") setEmailError("Email is required");
      if (password.trim() === "") setPasswordError("Password is required");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

      if (rememberMe) {
        localStorage.setItem("userEmail", email);
      } else {
        localStorage.removeItem("userEmail");
      }

      navigate("/UserManagement");
    } catch (error) {
      // ✅ Firebase errors ko show karo
      if (error.code === "invalid email or password") {
        setEmailError("Invalid email format");
      } else if (error.code === "auth/user-not-found") {
        setEmailError("No account found with this email");
      } else if (error.code === "auth/wrong-password") {
        setPasswordError("Incorrect password");
      } else {
        setGeneralError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-logo'>
        <div className='login-logo-container'>
          <div className='logo-container'>
            <img src='/images/logoo.png' alt="logo" className='login-logo-image' />
          </div>
          <div className='login-logo-text'>
            <img src="/images/T3all.png" alt="" className='tall' />
          </div>
        </div>
      </div>

      <div className='login-form'>
        <div className='login-form-container2'>
          <h1 className='login-form-heading'>Login</h1>

          <form className='login-form-container' onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className='login-form-label'>Email</label>
            </div>
            <input
              type="email"
              placeholder='Email'
              className={`login-form-input ${emailError ? "input-error" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error-text">{emailError}</p>}

            <div>
              <label htmlFor="password" className='login-form-label'>Password</label>
            </div>
            <input
              type="password"
              placeholder='Password'
              className={`login-form-input ${passwordError ? "input-error" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="error-text">{passwordError}</p>}

            {generalError && <p className="error-text">{generalError}</p>}

            <div className="remember-forget">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember" className="remember">Remember Me</label>
              </div>

              <div className="forget-password">
                <a href="/forgot-password">Forgot Password?</a>
              </div>
            </div>

            <button type='submit' className='login-form-button' disabled={loading}>
              {loading ? "Logging in..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
