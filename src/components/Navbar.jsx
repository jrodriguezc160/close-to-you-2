import '../styles/navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="nav-button"><i data-feather="home"></i>Inicio</div>
        <div className="nav-button"><i data-feather="search"></i>Buscar</div>
      </div>

      <div className="nav-right">
        <div className="nav-button"><i data-feather="user"></i>Perfil</div>
        <div className="nav-button" style={{ padding: '0', width: '2rem' }}><i data-feather="settings" ></i></div>
      </div>
    </div>
  )
}

export default Navbar;