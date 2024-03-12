import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Main from "./components/Main";
import Header from "./components/Header";
import User from "./components/User";
import Signup from "./components/user/userSignup";
import Login from "./components/user/userLogin";

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route path='user' element={<User />}>
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
