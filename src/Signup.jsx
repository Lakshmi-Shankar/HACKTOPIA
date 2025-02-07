import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== Cpassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Signup Data:", { username, email, phone, password });

    // Redirect to Home Page after successful signup
    navigate("/homePage");
  };

  return (
    <div className="signupPage">
      <h1>Readora</h1>
      <hr />
      <h2>Create Account Now!</h2>
      <form onSubmit={handleSubmit} className="signupDetails">
        <div>
          <label>Full Name</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div><br />
        <div>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div><br />
        <div>
          <label>Phone Number</label><br />
          <input
            type="tel"
            value={phone}
            pattern="[0-9]{10}"
            onChange={(e) => setPhone(e.target.value)}
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
        </div><br />
        <div>
          <label>Confirm Password</label><br />
          <input
            type="password"
            value={Cpassword}
            onChange={(e) => setCpassword(e.target.value)}
            required
          />
        </div><br /><br /><br />

        <button type="submit" className="buttonSign">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login" className="link_">Login</Link></p>
    </div>
  );
}
