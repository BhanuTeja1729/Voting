import "./App.css";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//Components
import Main from "./components/Main";
import Header from "./components/Header";
import User from "./components/User";
import Signup from "./components/user/userDash"

const App = () => {
  return (
    <>
    <Header/>
    <Router>
      <Routes>
        <Route exact path='/' Component={Main}/>
        <Route exact path='user' Component={User}>
          <Route exact path='signup' Component={Signup}/>
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App