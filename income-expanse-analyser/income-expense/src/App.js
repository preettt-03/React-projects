
import './App.css';
import Signup from './components/signup/Signup';
import Home from './components/Home';
import Login from './components/login/Login';
import { ExpenseTracker } from './components/ExpenseTracker/ExpenseTracker';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
function App() {
  const [userName, setUserName] = useState("");
    useEffect(() =>{
      auth.onAuthStateChanged((user) => {
        if(user){
          setUserName(user.displayName);
        }else setUserName("");
      });
    },[])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/" element={<Home name={userName} />} />
          <Route path="/expenseTracker" element={<xpenseTracker/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
