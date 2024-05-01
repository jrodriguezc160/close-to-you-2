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
  const [currentUser, setCurrentUser] = useState();
  const [datosUsuario, setDatosUsuario] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
  });

  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      const getUserData = async () => {
        try {
          // Asegúrate de que currentUser esté definido y no sea null o undefined
          if (currentUser) {
            const userData = await getUsuarioData(currentUser);
            setDatosUsuario(userData)
          }
        } catch (error) {
          console.error(error);
        }
      };
      getUserData();
    }
  }, [isLoggedIn, currentUser]); // Agrega currentUser como dependencia del efecto

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route exact path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} />
        <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/buscar" element={<Search />} />
          <Route exact path="/perfil" element={<ProfilePage datosUsuario={datosUsuario} />} />
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
    // Redirige a la página de inicio de sesión si el usuario no está autenticado
    return <Navigate to="/login" />;
  }

  return (
    <>
      <ProtectedRoute exact path="/" element={<Home />} isLoggedIn={isLoggedIn} />
    </>
  );
}

export default App;
