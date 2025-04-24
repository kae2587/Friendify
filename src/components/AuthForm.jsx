import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

import "../App.css"

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signed up!");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in!");
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  
  return (
    <div>
      <div>
        <h2 style={{ margin: '25px' }}> Welcome to <span style={{ color: '#ad49e1' }}>Friendify</span>! </h2>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
      </div>
      <div>
        <button onClick={logIn} style={{ margin: '10px' }}>Log In</button>
        {/* <button onClick={signUp} style={{ margin: '10px' }}>Sign Up</button> */}
      </div>
      <div>
        <p style={{ margin: '10px' }}> <strong>
          Don't have an account?{' '}
          <span 
            style={{
              cursor: 'pointer',
              color: isHovered ? 'white' : '#ad49e1',
              transform: isHovered ? 'scale(1.05)' : 'none',
              display: 'inline-block',
              transition: 'transform 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={signUp}
          >
            Sign Up!
          </span>
        </strong> </p>
      </div>
    </div>
  );
};

export default AuthForm;