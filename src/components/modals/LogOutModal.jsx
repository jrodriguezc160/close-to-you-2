import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogOutModal = ({ setCurrentUser, logOutModal, setLogOutModal, setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 100);
  }, [])

  const handleLogOut = () => {
    try {
      setCurrentUser(null);
      setIsLoggedIn(false);
      sessionStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  return (
    <div className={`modal-screen ${logOutModal ? 'visible' : ''}`} style={{ height: '100vh', zIndex: '200', backdropFilter: 'blur(1rem)' }}>
      <div className='modal-message visible' style={{ zIndex: '201', gap: '1rem', visibility: logOutModal ? 'visible' : 'hidden', width: '55vh', maxWidth: '80vw', opacity: logOutModal ? 1 : 0 }}>
        <div className='modal-message-text'>¿Quieres cerrar tu sesión?</div>
        <div className='modal-message-buttons'>
          <div className="nav-button on-modal publish" onClick={() => setLogOutModal(false)}>
            <i data-feather="x"></i>Cancelar
          </div>
          <div className="nav-button on-modal cancel" onClick={() => handleLogOut()}>
            <i data-feather="log-out"></i>Cerrar sesión
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogOutModal;