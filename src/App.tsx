import './App.css';
import Dashboard from './Dashboard/Dashboard'
import Landing from './Landing/Landing';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthenticationContext from './AuthenticationContext';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
  }

  const logout = () => {
    setLoggedIn(false);
  }

  return (
    <AuthenticationContext.Provider value={{loggedIn, login, logout}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </AuthenticationContext.Provider>
  );
}

export default App;