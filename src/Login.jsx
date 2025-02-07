import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [Name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 👈 Used for redirection

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Logging in with:", { Name, password });

    // Redirect to Home Page after successful login
    navigate("/homePage");
  };

  return (
    <div className="loginPage">
      <h1>Readora</h1>
      <hr />
      <h2>Login Now!</h2>
      <form onSubmit={handleSubmit} className="login">
        <div>
          <label>Name</label><br />
          <input
            type="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div><br />
        <div>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div><br /><br /><br />

        <button type="submit">Login</button>
      </form>
      
      <p>Don&apos;t have an account? <Link to="/signup" className="link_">Sign Up</Link></p>
    </div>
  );
}
