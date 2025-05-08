// src/components/MusicRecommendation.jsx
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';

function MusicRecommendation({ handleLogout }) {
  const logout = async () => {
    try {
      await signOut(auth);
      handleLogout(); // This updates the parent App state
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="music-recommendation-page">
      <h1>Recommended Music Based on Your Mood</h1>
      <button className="btn logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default MusicRecommendation;
