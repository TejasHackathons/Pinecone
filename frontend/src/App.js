import "./App.css";

import Navbar from "./Components/Navbar";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import LogOut from "./Components/LogOut";
import CreateDisaster from "./Components/CreateDisaster";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DisasterMap from "./Components/DisasterMap";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/disasterMap" element={<DisasterMap />} />
          <Route path="/createDisaster" element={<CreateDisaster />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
