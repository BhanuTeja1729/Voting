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
import Candidate from "./components/admin/candidate";
import Election from "./components/admin/election";
import Result from "./components/admin/result";

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
            <Route path="candidate" element={<Candidate />} />
            <Route path="election" element={<Election />} />
            <Route path="result" element={<Result />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
