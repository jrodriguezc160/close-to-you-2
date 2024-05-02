import '../styles/navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  return (
    <div className={isLoggedIn ? 'navbar logged-in' : 'navbar'}>
      <div className="nav-left">
        <NavLink to="/" activeClassName="active" className='nav-button'><i data-feather="home"></i>Inicio</NavLink>
        <NavLink to="/buscar" activeClassName="active" className='nav-button'><i data-feather="compass"></i>Buscar</NavLink>
      </div>

      <div className="nav-right">
        <NavLink to="/perfil" activeClassName="active" className='nav-button'><i data-feather="user"></i>Perfil</NavLink>
        <NavLink to="/ajustes" activeClassName="active" className='nav-button no-text'><i data-feather="settings"></i></NavLink>
      </div>
    </div>
  )
}

export default Navbar;