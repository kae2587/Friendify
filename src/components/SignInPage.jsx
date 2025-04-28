import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

import "../App.css"
const SignInPage = () => {

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
    

      
      return (
        <div>
          <div>
            <h2 style={{ margin: '25px' }}> Welcome to <span style={{ color: '#ad49e1' }}>Friendify</span>! </h2>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
          </div>
          <div>
            <button onClick={signUp} style={{ margin: '10px' }}>Sign up!</button>
            {/* <button onClick={signUp} style={{ margin: '10px' }}>Sign Up</button> */}
          </div>
          <div>
          </div>
        </div>
      );
    };
    
    export default SignInPage;

