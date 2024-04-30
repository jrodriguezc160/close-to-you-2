import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import Home from './components/Home';
import Search from './components/Search';
import Settings from './components/Settings';
import LogIn from './components/LogIn';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import { Navigate } from 'react-router-dom'; // Import the useNavigate hook

function App () {
  const [currentUser, setCurrentUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
  });

  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    feather.replace();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn onLoginSuccess={() => { setIsLoggedIn(true); console.log(isLoggedIn) }} setCurrentUser={setCurrentUser} />} />
        <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
          <Route path="/" element={<Home />} />
          <Route path="/buscar" element={<Search />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/ajustes" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

function ProtectedRoutes ({ isLoggedIn }) {
  if (!isLoggedIn) {
    // Redirige a la página de inicio de sesión si el usuario no está autenticado
    return <Navigate to="/login" />;
  }

  return (
    <>
      <ProtectedRoute path="/" element={<Home />} isLoggedIn={isLoggedIn} />
      <ProtectedRoute path="/buscar" element={<Search />} isLoggedIn={isLoggedIn} />
      <ProtectedRoute path="/perfil" element={<ProfilePage />} isLoggedIn={isLoggedIn} />
      <ProtectedRoute path="/ajustes" element={<Settings />} isLoggedIn={isLoggedIn} />
    </>
  );
}

export default App;
