import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithCredential,
} from "firebase/auth";
import { toast } from "react-toastify";
import { OAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../firebase-config.js";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
    } catch (err) {
      setError("Incorrect email or password. Please try again.");
      toast.error("Login failed! Incorrect email or password.");
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
    } catch (err) {
      setError("Incorrect email or password. Please try again.");
      toast.error("Login failed! Incorrect email or password.");
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, provider);
      alert("Logged in successfully!");
    } catch (err) {
      let message = "Authentication failed. Try again.";

      if (err.code === "auth/account-exists-with-different-credential") {
        try {
          const pendingCred = OAuthProvider.credentialFromError(err);
          const email = err.customData?.email;

          if (!email) throw new Error("No associated email found.");

          const methods = await fetchSignInMethodsForEmail(auth, email);

          if (methods.length > 0) {
            message = `This email is already linked with ${methods[0]}. Try logging in with that provider.`;
          }

          if (pendingCred) {
            const existingUser = await signInWithPopup(
              auth,
              new OAuthProvider(methods[0])
            );
            await linkWithCredential(existingUser.user, pendingCred);
            alert("Logged in successfully!");
            return;
          }
        } catch (linkErr) {
          console.error("Error linking account:", linkErr);
          message =
            "Account linking failed. Try logging in with your original provider.";
        }
      } else if (err.code === "auth/invalid-credential") {
        message = "Invalid credentials. Try signing in again.";
      } else if (err.code === "auth/popup-closed-by-user") {
        message = "Popup closed before completing sign-in.";
        setLoading(false);
        return;
      }

      setError(message);
      toast.error(message);
      console.error("OAuth Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="sign-in-form">
      <h1 className="title">AuraPulse</h1>
      <h2 className="subtitle">Sign in to explore mood-based music</h2>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
        />
        {emailError && <div className="error-container">{emailError}</div>}
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
        />
        {passwordError && (
          <div className="error-container">{passwordError}</div>
        )}
      </div>
      {error && <p className="error-message">{error}</p>}

      <button className="btn solid" onClick={handleLogin} disabled={loading} >
        {loading ? <div className="spinner"></div> : "Login"}
      </button>
      <p className="social-text">Or sign in with your mood on:</p>
      <div className="social-media">
        <button
          type="button"
          className="social-icon"
          aria-label="Google"
          onClick={() => handleOAuthLogin(googleProvider)}
        >
          <i className="fab fa-google"></i>
        </button>
      </div>
    </form>
  );
}

export default SignIn;
