import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUsuario } from '../../services/UserServices';

const DeleteUserModal = ({ currentUser, setCurrentUser, userId, deleteUserModal, setDeleteUserModal, setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 100);
  }, [])

  // En esta función añadir la llamada al servicio deleteUsuario
  const handleDeleteUser = async () => {
    try {
      // Llamada al servicio para eliminar el usuario
      await deleteUsuario(userId);

      // Limpiamos el caché y llevamos al usuario de vuelta al LogIn
      if (currentUser === userId) {
        setCurrentUser(null);
        setIsLoggedIn(false);
        sessionStorage.clear();
        navigate('/login');
      } else {
        setDeleteUserModal(false)
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  return (
    <div className={`modal-screen ${deleteUserModal ? 'visible' : ''}`} style={{ height: '100vh', zIndex: '200', backdropFilter: 'blur(1rem)' }}>
      <div className='modal-message visible' style={{ zIndex: '201', gap: '1rem', visibility: deleteUserModal ? 'visible' : 'hidden', width: '55vh', maxWidth: '80vw', opacity: deleteUserModal ? 1 : 0 }}>
        <div className='modal-message-text'>¿Seguro que quieres eliminar este usuario?<br />Esta acción no se  puede deshacer</div>

        <div className='modal-message-buttons'>
          <div className="nav-button on-modal publish" onClick={() => setDeleteUserModal(false)}>
            <i data-feather="x"></i>Cancelar
          </div>
          <div className="nav-button on-modal cancel" onClick={() => handleDeleteUser()}>
            <i data-feather="alert-triangle"></i>Eliminar usuario
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteUserModal;