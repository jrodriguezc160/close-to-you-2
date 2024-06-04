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
import { jwtDecode } from 'jwt-decode'; // Corrige el import

function App () {
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultUserData, setResultUserData] = useState(null);
  const [writePost, setWritePost] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.userId; // Corrige la extracción del userId
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = sessionStorage.getItem('token');
    return !!token;
  });

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      console.log('currentUser', currentUser);

      const getUserData = async () => {
        try {
          const userData = await getUsuarioData(currentUser);
          setDatosUsuario(userData);
          userData.admin === '1' && setIsAdmin(true);

          console.log('userData', userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
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
        console.error('Error fetching user data:', error);
      }
    };

    await getUserData();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setProfileOpen(true);
    }, 1000);
  };

  useEffect(() => {
    datosUsuario && setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [datosUsuario])

  return (
    <ThemeProvider>
      <Router>
        {datosUsuario && (
          <Navbar
            isLoggedIn={isLoggedIn}
            profileOpen={profileOpen}
            setProfileOpen={setProfileOpen}
            setWritePost={setWritePost}
            isAdmin={isAdmin}
          />
        )}
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
              element={<Home
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                datosUsuario={datosUsuario}
                writePost={writePost}
                setWritePost={setWritePost}
                isAdmin={isAdmin}
                profileOpen={profileOpen}
                resultUserData={resultUserData}
                handleVerPerfil={handleVerPerfil}
                loading={loading}
                setIsLoggedIn={setIsLoggedIn}
              />}
            />
            <Route
              exact
              path="/buscar"
              element={<Search
                currentUser={currentUser}
                profileOpen={profileOpen}
                resultUserData={resultUserData}
                handleVerPerfil={handleVerPerfil}
                loading={loading}
                datosUsuario={datosUsuario}
                writePost={writePost}
                setWritePost={setWritePost}
                isAdmin={isAdmin}
              />}
            />
            <Route
              exact
              path="/perfil"
              element={<ProfilePage
                datosUsuario={datosUsuario}
                setDatosUsuario={setDatosUsuario}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                profileOpen={profileOpen}
                resultUserData={resultUserData}
                handleVerPerfil={handleVerPerfil}
                loading={loading}
                setLoading={setLoading}
                writePost={writePost}
                setWritePost={setWritePost}
                isAdmin={isAdmin}
                setIsLoggedIn={setIsLoggedIn}
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