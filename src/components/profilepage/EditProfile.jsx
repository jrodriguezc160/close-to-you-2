import { useState, useEffect } from 'react';
import { editUserProfile, getUsuarioData } from '../../services/UserServices';

const EditProfile = ({ datosUsuario, setDatosUsuario, showEditProfileModal, setShowEditProfileModal }) => {
  // Estados locales para cada campo
  const [fotoPerfil, setFotoPerfil] = useState(datosUsuario.foto_perfil);
  const [nombreMostrado, setNombreMostrado] = useState(datosUsuario.nombre_mostrado);
  const [usuario, setUsuario] = useState(datosUsuario.usuario);
  const [nombre, setNombre] = useState(datosUsuario.nombre);
  const [apellido1, setApellido1] = useState(datosUsuario.apellido1);
  const [apellido2, setApellido2] = useState(datosUsuario.apellido2);
  const [descripcion, setDescripcion] = useState(datosUsuario.descripcion);

  useEffect(() => {
    if (showEditProfileModal === false) {
      const getUserData = async () => {
        try {
          const userData = await getUsuarioData(datosUsuario.id);
          setDatosUsuario(userData);
        } catch (error) {
          console.error(error);
        }
      };
      getUserData();
    }

    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 100);
  }, [showEditProfileModal]);

  const handleSaveChanges = async () => {
    try {
      // Llama al servicio para editar el perfil del usuario
      await editUserProfile(
        datosUsuario.id,
        fotoPerfil,
        nombreMostrado,
        usuario,
        nombre,
        apellido1,
        apellido2,
        descripcion
      );

      setShowEditProfileModal(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error.message);
      // Puedes manejar el error mostrando un mensaje de error al usuario, por ejemplo
    }
  };

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

              <div className="nav-button button" onClick={handleSaveChanges}><i data-feather="check"></i> Guardar cambios</div>
            </div>

            <div className="profile-card">
              <div className="profile-pic">
                <div className="nav-button no-text"><i data-feather="camera"></i></div>
                <img src={fotoPerfil} alt="perfil" />
              </div>
            </div>
            <div className="edit-profile-fields">
              <div className="label">
                Pega la url de tu nueva foto de perfil
              </div>
              <input type="text" value={fotoPerfil} onChange={(e) => setFotoPerfil(e.target.value)} />
            </div>

            <div className="edit-profile-fields">
              <div className="label">
                Nombre mostrado
              </div>
              <input type="text" value={nombreMostrado} onChange={(e) => setNombreMostrado(e.target.value)} />
            </div>

            <div className="edit-profile-fields">
              <div className="label">
                Usuario
              </div>
              <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
            </div>

            <div className="edit-profile-fields">
              <div className="label">
                Nombre
              </div>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>

            <div className="edit-profile-fields">
              <div className="label">
                Primer apellido
              </div>
              <input type="text" value={apellido1} onChange={(e) => setApellido1(e.target.value)} />
            </div>

            <div className="edit-profile-fields">
              <div className="label">
                Segundo apellido
              </div>
              <input type="text" value={apellido2} onChange={(e) => setApellido2(e.target.value)} />
            </div>

            <div className="edit-profile-fields">
              <div className="label">
                Descripción
              </div>
              <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EditProfile;
