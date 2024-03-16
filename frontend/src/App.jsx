import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Main from "./components/Main";
import Header from "./components/Header";
import User from "./components/User";
import Signup from "./components/user/userSignup";
import Login from "./components/user/userLogin";
import Admin from "./components/Admin";
import AdminDash from "./components/admin/adminDash";
import AdminLogin from "./components/admin/adminLogin";
import Voter from "./components/admin/voter";

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="user" element={<User />}>
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="admin" element={<Admin />}>
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard" element={<AdminDash />} />
            <Route path="voter" element={<Voter />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
