import * as React from 'react';

import './App.css'
import Header from './components/Header';
import Main from './components/Main';
import { Route, Router, Routes } from 'react-router';

function App() {
  
  return (
    <>
    <Header/>
    
      <Routes>
        <Route path='/' element={<Main/>}/>
      </Routes>
    
    </>
    
  )
}

export default App;
