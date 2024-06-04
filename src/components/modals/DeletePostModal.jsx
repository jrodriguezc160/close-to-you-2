import { useEffect } from 'react';
import { deletePublicacion } from '../../services/PostServices';

const DeletePostModal = ({ deletePostId, deletePublicacionModal, setDeletePublicacionModal, getPublicacionesUsuario }) => {
  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 100);
  }, [])

  const handleConfirmDelete = async () => {
    try {
      await deletePublicacion(deletePostId);
      getPublicacionesUsuario();
      setDeletePublicacionModal(false)
    } catch (error) {
      console.error('Error al eliminar la publicación:', error);
    }
  }

  return (
    <div className={`modal-screen ${deletePublicacionModal ? 'visible' : ''}`} style={{ height: '100vh', zIndex: '200', backdropFilter: 'blur(1rem)' }}>
      <div className={`modal-message ${deletePublicacionModal ? 'visible' : ''}`} style={{ zIndex: '201', gap: '1rem', visibility: deletePublicacionModal ? 'visible' : 'hidden', width: '55vh', maxWidth: '80vw', opacity: deletePublicacionModal ? 1 : 0 }}>
        <div className='modal-message-text'>Vas a eliminar una publicación. ¿Estás seguro?</div>
        <div className='modal-message-buttons'>
          <div className="nav-button on-modal publish" onClick={() => setDeletePublicacionModal(false)}>
            <i data-feather="x"></i>Cancelar
          </div>
          <div className="nav-button on-modal cancel" onClick={() => handleConfirmDelete()}>
            <i data-feather="trash"></i>Eliminar publicación
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeletePostModal;