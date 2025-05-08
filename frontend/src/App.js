import React, { useState } from 'react';
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Panel from './components/Panel';

function App() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const toggleSignUpMode = () => {
    setIsSignUpMode(()=>!isSignUpMode);
  };  
  
  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {isSignUpMode ? <SignUp /> : <SignIn />}
        </div>
      </div>

      <div className="panels-container">
        <Panel
          isSignUpMode={isSignUpMode}
          toggleSignUpMode={toggleSignUpMode}
          type="left"
          />
        <Panel
          isSignUpMode={isSignUpMode}
          toggleSignUpMode={toggleSignUpMode}
          type="right"
          />
      </div>
    </div>
  );
}

export default App;