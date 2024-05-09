import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import Home from './components/Home';
import Search from './components/Search';
import Settings from './components/Settings';
import LogIn from './components/LogIn';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import { Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { getUsuarioData } from './services/UserServices';

function App () {
  const [datosUsuario, setDatosUsuario] = useState([]);
  const [profileOpen, setProfileOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    const storedCurrentUser = sessionStorage.getItem('currentUser');
    return storedCurrentUser ? JSON.parse(storedCurrentUser) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
  });

  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      const getUserData = async () => {
        try {
          const userData = await getUsuarioData(currentUser);
          setDatosUsuario(userData);
        } catch (error) {
          console.error(error);
        }
      };
      getUserData();
    }
  }, [isLoggedIn, currentUser]);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} profileOpen={profileOpen} setProfileOpen={setProfileOpen} />
      <Routes>
        <Route exact path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} />
        <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/buscar" element={<Search currentUser={currentUser} profileOpen={profileOpen} setProfileOpen={setProfileOpen} />} />
          <Route exact path="/perfil" element={<ProfilePage datosUsuario={datosUsuario} currentUser={currentUser} />} />
          <Route exact path="/ajustes" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

function ProtectedRoutes ({ isLoggedIn }) {
  let currentLocation = useLocation();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    feather.replace();
  }, [currentLocation]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <ProtectedRoute exact path="/" element={<Home />} isLoggedIn={isLoggedIn} />
    </>
  );
}

export default App;
