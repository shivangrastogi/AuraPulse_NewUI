import React from 'react';
import logImg from '../assets/log.svg';
import registerImg from '../assets/register.svg';

function Panel({ type, toggleSignUpMode, isSignUpMode }) {
  return (
    <div className={`panel ${type}-panel`}>
      <div className="content">
        {type === 'left' ? (
          <>
            <h3>New to AuraPulse?</h3>
            <p>
              Discover music that matches your mood. Create an account to start your emotional audio journey.
            </p>
            <button className="btn transparent" onClick={toggleSignUpMode}>
              Sign up
            </button>
          </>
        ) : (
          <>
            <h3>Already with AuraPulse?</h3>
            <p>
              Log in and let your emotions guide your music. Feel the rhythm of your mood.
            </p>
            <button className="btn transparent" onClick={toggleSignUpMode}>
              Sign in
            </button>
          </>
        )}
      </div>
      <img
        src={type === 'left' ? logImg : registerImg}
        className="image"
        alt=""
      />
    </div>
  );
}

export default Panel;
