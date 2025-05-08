import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase-config.js';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="sign-in-form">
      <h1 className="title">AuraPulse</h1>
      <h2 className="subtitle">Sign in to explore mood-based music</h2>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <input type="submit" value="Login" className="btn solid" />
      <p className="social-text">Or sign in with your mood on:</p>
      <div className="social-media">
        <button type="button" className="social-icon" aria-label="Facebook"><i className="fab fa-facebook-f"></i></button>
        <button type="button" className="social-icon" aria-label="Twitter"><i className="fab fa-twitter"></i></button>
        <button type="button" className="social-icon" aria-label="Google"><i className="fab fa-google"></i></button>
        <button type="button" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></button>
      </div>
    </form>
  );
}

export default SignIn;