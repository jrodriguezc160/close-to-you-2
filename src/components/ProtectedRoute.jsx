import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ element, isLoggedIn }) => {
  // Si está autorizado, renderiza el contenido del Outlet
  // Si no, redirige a la página de inicio de sesión
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
