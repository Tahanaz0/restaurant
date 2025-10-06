import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase";

import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  // form fields ke liye state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      alert("Please enter both email and password!");
      return;
    }

    try {
      setLoading(true);
      // ✅ Firebase login
      await signInWithEmailAndPassword(auth, email, password);

      // Optionally remember user
      if (rememberMe) {
        localStorage.setItem("userEmail", email);
      } else {
        localStorage.removeItem("userEmail");
      }

      alert("Login successful!");
      navigate("/UserManagement"); // ✅ redirect after login
    } catch (error) {
      alert(error.message);
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
              className='login-form-input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div>
              <label htmlFor="password" className='login-form-label'>Password</label>
            </div>
            <input
              type="password"
              placeholder='Password'
              className='login-form-input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

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
