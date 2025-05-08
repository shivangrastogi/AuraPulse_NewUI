import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Panel from "./components/Panel";
import MusicRecommendation from "./components/MusicRecommendation";

function App() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // NEW

  const toggleSignUpMode = () => setIsSignUpMode((prev) => !prev);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // when login/signup completes
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // return to sign-in page
    setIsSignUpMode(false); // optional: reset to login mode
  };

  if (isLoggedIn) {
    return <MusicRecommendation handleLogout={handleLogout} />;
  }

  return (
    <AnimatePresence mode="wait">
      {isLoggedIn ? (
        <motion.div
          key="music"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <MusicRecommendation handleLogout={handleLogout} />
        </motion.div>
      ) : (
        <motion.div
          key="auth"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
            <div className="forms-container">
              <div className="signin-signup">
                {isSignUpMode ? (
                  <SignUp onLoginSuccess={handleLoginSuccess} />
                ) : (
                  <SignIn onLoginSuccess={handleLoginSuccess} />
                )}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;

// import React, { useState } from 'react';

// import './App.css';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import Panel from './components/Panel';
// import MusicRecommendation from './components/MusicRecommendation';

// function App() {
//   const [isSignUpMode, setIsSignUpMode] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // NEW

//   const toggleSignUpMode = () => {
//     setIsSignUpMode(!isSignUpMode);
//   };

//   // Simulated login effect — in real use, pass `setIsLoggedIn(true)` after auth
//   const handleLoginSuccess = () => {
//     setIsLoggedIn(true);
//   };

//   return isLoggedIn ? (
//     <MusicRecommendation />
//   ) : (
//     <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
//       <div className="forms-container">
//         <div className="signin-signup">
//           {isSignUpMode ? (
//             <SignUp onLoginSuccess={handleLoginSuccess} />
//           ) : (
//             <SignIn onLoginSuccess={handleLoginSuccess} />
//           )}
//         </div>
//       </div>

//       <div className="panels-container">
//         <Panel
//           isSignUpMode={isSignUpMode}
//           toggleSignUpMode={toggleSignUpMode}
//           type="left"
//         />
//         <Panel
//           isSignUpMode={isSignUpMode}
//           toggleSignUpMode={toggleSignUpMode}
//           type="right"
//         />
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import './App.css';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import Panel from './components/Panel';

// function App() {
//   const [isSignUpMode, setIsSignUpMode] = useState(false);

//   const toggleSignUpMode = () => {
//     setIsSignUpMode(()=>!isSignUpMode);
//   };

//   return (
//     <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
//       <div className="forms-container">
//         <div className="signin-signup">
//           {isSignUpMode ? <SignUp /> : <SignIn />}
//         </div>
//       </div>

//       <div className="panels-container">
//         <Panel
//           isSignUpMode={isSignUpMode}
//           toggleSignUpMode={toggleSignUpMode}
//           type="left"
//           />
//         <Panel
//           isSignUpMode={isSignUpMode}
//           toggleSignUpMode={toggleSignUpMode}
//           type="right"
//           />
//       </div>
//     </div>
//   );
// }

// export default App;
