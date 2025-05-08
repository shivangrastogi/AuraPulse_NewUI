import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  OAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Welcome to AuraPulse!");
    } catch (err) {
      setError("Sign up failed. Please try again.");
      toast.error(err.message);
      console.error("Sign up error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, provider);
      toast.success(`Logged in as ${result.user.email}`);
    } catch (err) {
      let message = "Authentication failed. Try again.";

      if (err.code === "auth/account-exists-with-different-credential") {
        try {
          const pendingCred = OAuthProvider.credentialFromError(err);
          const email = err.customData?.email;

          if (!email) throw new Error("No associated email found.");

          const methods = await fetchSignInMethodsForEmail(auth, email);

          if (methods.length > 0) {
            message = `Email is already linked with ${methods[0]}. Try logging in with that.`;
          }

          if (pendingCred) {
            const existingUser = await signInWithPopup(
              auth,
              new OAuthProvider(methods[0])
            );
            await linkWithCredential(existingUser.user, pendingCred);
            return;
          }
        } catch (linkErr) {
          console.error("Error linking account:", linkErr);
          message = "Account linking failed.";
        }
      } else if (err.code === "auth/popup-closed-by-user") {
        message = "Popup closed before completing sign-in.";
      }

      setError(message);
      toast.error(message);
      console.error("OAuth error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="sign-up-form">
      <h1 className="title">AuraPulse</h1>
      <p className="slogan">🎵 AuraPulse — Your Face. Your Feelings. Your Playlist. 🎶</p>
      <h2 className="subtitle">Create your mood-based music profile</h2>

      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {emailError && <p className="error">{emailError}</p>}

      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Choose a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {passwordError && <p className="error">{passwordError}</p>}

      <input type="submit" className="btn" value={loading ? "Signing up..." : "Sign up"} disabled={loading} />

      <p className="social-text">Or sign up with social platforms</p>
      <div className="social-media">
        <button type="button" className="social-icon" onClick={handleOAuthLogin}>
          <i className="fab fa-google"></i>
        </button>
        {/* Add more social providers as needed */}
      </div>

      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default SignUp;
