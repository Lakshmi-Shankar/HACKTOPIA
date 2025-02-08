import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import HomePage from "./homePage";
import homeLogo from "./assets/homeLogo.png";
import "./App.css"
import BlindDate from "./blindDate";
import BookAni from "./bookAni";
import AudioBook from "./audioBook";
import Ava from "./availability";

function Home() {
  return (
    <div className="homePage">
      <img src={homeLogo} className="homeimg"></img>
      <h4 className="title">Reading meets wonder</h4>
      <nav className="options">
        <Link className="signup" to="/signup">Read</Link>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/blindDate" element={<BlindDate />} />
        <Route path="/bookAni" element={<BookAni />} />
        <Route path="/audioBook" element={<AudioBook />} />
        <Route path="/availability" element={<Ava />} />
      </Routes>
    </BrowserRouter>
  );
}
