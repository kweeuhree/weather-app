import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';


function App() {

  return (
    <div className="App">

    <nav>
       <NavBar />
    </nav>

       <Routes>
          <Route path="/home" element={<HomePage />} />
       </Routes>

    </div>
  )
}

export default App;
