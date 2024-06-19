// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/login-signup/auth';
import Home from './components/home/home';
import Verify from './components/otp/verify';
import Blog from './components/blog/blog';
import Nav from './components/nav/nav';
import Create from './components/create/blog';
import Err from './components/error-container/err';
import Profile from './components/profile/profile';

const App = () => {
  useEffect(() => {
    window.onload = () => {
      localStorage.setItem("errors", JSON.stringify([]));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Err />
        <Nav />
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/auth' Component={Auth} />
          <Route path='/verify' Component={Verify} />
          <Route path='/blog/:id' Component={Blog} />
          <Route path='/blog/create' Component={Create} />
          <Route path='/me' Component={Profile} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
