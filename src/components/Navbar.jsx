import { useEffect } from 'react';
import '../styles/navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = ({ isLoggedIn, profileOpen, setProfileOpen, setWritePost }) => {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    feather.replace();
  }, [profileOpen]);

  return (
    <div className={isLoggedIn ? 'navbar logged-in' : 'navbar'}>
      <div className="nav-left">
        {profileOpen &&
          <div className='nav-button no-text' style={{ margin: '0' }} onClick={() => setProfileOpen(false)}>
            <i data-feather="arrow-left" style={{ color: 'var(--gray-2)' }}></i>
          </div>}

        <NavLink to="/" activeClassName="active" className='nav-button'><i data-feather="home"></i>Inicio</NavLink>
        <NavLink to="/buscar" activeClassName="active" className='nav-button'><i data-feather="compass"></i>Buscar</NavLink>
        <div className='nav-button no-text' style={{ margin: '0' }} onClick={() => setWritePost(true)}>
          <i data-feather="plus" style={{ color: 'var(--gray-2)' }}></i>
        </div>
      </div>

      <div className="nav-right">
        <NavLink to="/perfil" activeClassName="active" className='nav-button'><i data-feather="user"></i>Perfil</NavLink>
        <div className='nav-button no-text' style={{ margin: '0' }} onClick={() => setWritePost(true)}>
          <i data-feather="moon" style={{ color: 'var(--gray-2)' }}></i>
        </div>
      </div>
    </div>
  )
}

export default Navbar;