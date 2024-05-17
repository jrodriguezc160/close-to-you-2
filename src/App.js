import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import Home from './components/Home';
import Search from './components/Search';
import Settings from './components/Settings';
import LogIn from './components/LogIn';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { getUsuarioData } from './services/UserServices';
import { Navigate } from 'react-router-dom';

function App () {
  // Estado para almacenar los datos del usuario
  const [datosUsuario, setDatosUsuario] = useState([]);

  // Estado para controlar la apertura del perfil
  const [profileOpen, setProfileOpen] = useState(false);

  // Estado para controlar el estado de carga
  const [loading, setLoading] = useState(false);

  // Estado para almacenar los datos de usuario resultantes
  const [resultUserData, setResultUserData] = useState(null);

  // Estado para almacenar el usuario actual
  const [currentUser, setCurrentUser] = useState(() => {
    const storedCurrentUser = sessionStorage.getItem('currentUser');
    return storedCurrentUser ? JSON.parse(storedCurrentUser) : null;
  });

  // Estado para almacenar el estado de inicio de sesión
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

  // Función para manejar la visualización del perfil
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
    <Router>
      {/* Barra de navegación */}
      <Navbar
        isLoggedIn={isLoggedIn}
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
      />
      <Routes>
        {/* Rutas */}
        <Route
          exact
          path="/login"
          element={<LogIn
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
          />}
        />
        <Route
          element={<ProtectedRoutes
            isLoggedIn={isLoggedIn}
          />}
        >
          <Route
            exact
            path="/"
            element={<Home
              currentUser={currentUser}
            />}
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
              currentUser={currentUser}
              profileOpen={profileOpen}
              resultUserData={resultUserData}
              handleVerPerfil={handleVerPerfil}
              loading={loading}
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
  );
}

// Componente para manejar rutas protegidas
function ProtectedRoutes ({ isLoggedIn }) {
  let currentLocation = useLocation();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    feather.replace();
  }, [currentLocation]);

  // Redireccionar a la página de inicio de sesión si no se ha iniciado sesión
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
