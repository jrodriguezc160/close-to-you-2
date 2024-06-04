import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import '../styles/navbar.css';

const Navbar = ({ isLoggedIn, profileOpen, setProfileOpen, setWritePost, isAdmin }) => {
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    feather.replace();
    console.log(isAdmin)
  }, [profileOpen, isDark, isAdmin]); // Asegúrate de incluir isAdmin aquí

  const handleCloseModals = () => {
    setProfileOpen(false);
    setWritePost(false);
  };

  const handleToggleTheme = () => {
    handleCloseModals();
    toggleTheme();
  };

  return (
    <div className={isLoggedIn ? 'navbar logged-in' : 'navbar'}>
      <div className="nav-left">
        {profileOpen &&
          <div className='nav-button no-text' style={{ margin: '0' }} onClick={handleCloseModals}>
            <i data-feather="arrow-left" style={{ color: 'var(--gray-2)' }}></i>
          </div>}
        <NavLink to="/" activeClassName="active" className='nav-button' onClick={handleCloseModals}><i data-feather="home"></i><span>Inicio</span></NavLink>
        <NavLink to="/buscar" activeClassName="active" className='nav-button' onClick={handleCloseModals}><i data-feather="compass"></i><span>Buscar</span></NavLink>
        <div className='nav-button no-text' style={{ margin: '0' }} onClick={() => setWritePost(true)}>
          <i data-feather="plus" style={{ color: 'var(--gray-2)' }}></i>
        </div>
      </div>
      <div className="nav-right">
        <NavLink to="/perfil" activeClassName="active" className='nav-button' onClick={handleCloseModals}>
          <i data-feather={isAdmin === true ? 'user-check' : 'user'}></i><span>Perfil</span></NavLink>
        <div className='nav-button no-text' style={{ margin: '0' }} onClick={handleToggleTheme}>
          <i data-feather={isDark ? 'sun' : 'moon'} style={{ color: 'var(--gray-2)' }}></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
