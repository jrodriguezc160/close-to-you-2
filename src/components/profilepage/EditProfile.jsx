import { useEffect } from 'react';

const EditProfile = ({ datosUsuario, showEditProfileModal, setShowEditProfileModal }) => {
  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 100);
  }, [showEditProfileModal])

  return (
    <>
      {showEditProfileModal && (
        <div className="modal-screen visible" style={{ backdropFilter: 'blur(5rem)', zIndex: '99' }}>
          <div className="collection-modal edit-profile">
            <div className="header">
              <div className='container'>
                <div className="nav-button no-text" onClick={() => setShowEditProfileModal(false)}><i data-feather="arrow-left"></i></div>
                <h2 className="title">Edit Profile</h2>
              </div>

              <div className="nav-button button" onClick={() => setShowEditProfileModal(false)}><i data-feather="check"></i> Guardar cambios</div>
            </div>

            <div className="profile-card">
              <div className="profile-pic">
                <div className="nav-button no-text" onClick={() => setShowEditProfileModal(false)}><i data-feather="camera"></i></div>
                <img src={datosUsuario.foto_perfil} alt="perfil" />
              </div>
            </div>
            <div className="edit-profile-fields">
              <div className="label">
                Pega la url de tu nueva foto de perfil
              </div>
              <input type="text" value={datosUsuario.foto_perfil} />
            </div>

            <div className="edit-profile-fields">
              <div className="label">
                Nombre mostrado
              </div>
              <input type="text" value={datosUsuario.nombre_mostrado} />
            </div>

            <div className="edit-profile-fields">
              <div className="label">
                Usuario
              </div>
              <input type="text" value={datosUsuario.usuario} />
            </div>

            <div className="edit-profile-fields">
              <div className="label">
                Nombre
              </div>
              <input type="text" value={datosUsuario.nombre} />
            </div>

            <div className="edit-profile-fields">
              <div className="label">
                Primer apellido
              </div>
              <input type="text" value={datosUsuario.apellido1} />
            </div>

            <div className="edit-profile-fields">
              <div className="label">
                Segundo apellido
              </div>
              <input type="text" value={datosUsuario.apellido2} />
            </div>

            <div className="edit-profile-fields">
              <div className="label">
                Descripción
              </div>
              <textarea>{datosUsuario.descripcion}</textarea>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default EditProfile;