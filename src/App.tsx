import './App.css';
import Dashboard from './Dashboard/Dashboard'
import Landing from './Landing/Landing';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthenticationContext from './AuthenticationContext';

function App() {
  const login = () => {
    localStorage.setItem('loggedIn', 'true');
  }

  const logout = () => {
    localStorage.setItem('loggedIn', 'false');
  }

  return (
    <AuthenticationContext.Provider value={{login, logout}}>
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