// src/App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import Home from './components/Home';
import Search from './components/Search';
import Settings from './components/Settings';
import LogIn from './components/LogIn';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { getUsuarioData } from './services/UserServices';
import { ThemeProvider } from './ThemeContext';
import { jwtDecode } from 'jwt-decode';

function App () {
  const [datosUsuario, setDatosUsuario] = useState({});
  const [profileOpen, setProfileOpen] = useState(false);
  const [writePost, setWritePost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultUserData, setResultUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    const token = sessionStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    return decodedToken ? decodedToken.userId : null
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = sessionStorage.getItem('token');
    return !!token;
  });

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

  const handleVerPerfil = async (idUsuario) => {
    const getUserData = async () => {
      try {
        const userData = await getUsuarioData(idUsuario);
        setResultUserData(userData);
      } catch (error) {
        console.error(error);
      }
    };
    await getUserData();
    await setLoading(true);
    setTimeout(async () => {
      await setLoading(false);
      await setProfileOpen(true);
    }, 1000);
  };

  return (
    <ThemeProvider>
      <Router>
        <Navbar
          isLoggedIn={isLoggedIn}
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
          setWritePost={setWritePost}
        />
        <Routes>
          <Route
            exact
            path="/login"
            element={<LogIn
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
            />}
          />
          <Route
            element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}
          >
            <Route
              exact
              path="/"
              element={<Home currentUser={currentUser} datosUsuario={datosUsuario} />}
            />
            <Route
              exact
              path="/buscar"
              element={<Search
                currentUser={currentUser}
                profileOpen={profileOpen}
                setProfileOpen={setProfileOpen}
                resultUserData={resultUserData}
                handleVerPerfil={handleVerPerfil}
                loading={loading}
              />}
            />
            <Route
              exact
              path="/perfil"
              element={<ProfilePage
                datosUsuario={datosUsuario}
                setDatosUsuario={setDatosUsuario}
                currentUser={currentUser}
                profileOpen={profileOpen}
                resultUserData={resultUserData}
                handleVerPerfil={handleVerPerfil}
                loading={loading}
                setLoading={setLoading}
              />}
            />
            <Route
              exact
              path="/ajustes"
              element={<Settings />}
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
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
