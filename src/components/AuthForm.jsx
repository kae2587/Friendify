import { useState } from "react";
import { signUp, login } from "../firebase/auth"; // <-- use your own helpers
import Header from "./Header";
import "../App.css";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [signUpBut, setSignUpBut] = useState(false); // lowercase


  const handleSignUp = () => {
    setSignUpBut(true); // just open the signup form
  };
  
  const handleSignUpSubmit = async () => {
    try {
      await signUp(email, password);
      console.log("Signed up!");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };
  
 

  const handleLogIn = async () => {
    try {
      await login(email, password); // <-- use the imported login function
      console.log("Logged in!");
    } catch (err) {
      console.error("Login error:", err);
    }
  };




  return (

    !signUpBut ? (  
    <div>
      <div>
        <h2 style={{ margin: '25px' }}>Welcome to <span style={{ color: '#ad49e1' }}>Friendify</span>!</h2>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
      </div>
      <div>
        <button onClick={handleLogIn} style={{ margin: '10px' }}>Log In</button>
      </div>
      <div>
        <p style={{ margin: '10px' }}>
          <strong>
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
              onClick={handleSignUp} // <-- call handleSignUp here
            >
              Sign Up!
            </span>
          </strong>
        </p>
      </div>
    </div>



            ):
            (
    <div>
      <div>
        <h2 style={{ margin: '25px' }}>Create a <span style={{ color: '#ad49e1' }}>Friendify</span> Account!</h2>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
      </div>
      <div>
        <button onClick={handleSignUpSubmit} style={{ margin: '10px' }}>Sign Up</button>
      </div>


      
    </div>


            )
          
  );
};

export default AuthForm;
