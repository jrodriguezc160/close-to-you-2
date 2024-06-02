import { useEffect, useState } from 'react';
import { followUsuario, unfollowUsuario, getUsuariosSeguidos } from '../../services/UserServices';

const ProfileCard = ({ datosUsuario, currentUser, handleOpenCollections, setShowEditProfileModal, setLogOutModal }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [usuariosSeguidos, setUsuariosSeguidos] = useState([]);

  useEffect(() => {
    const checkIfFollowed = async () => {
      try {
        const isFollowed = usuariosSeguidos.some(item => item.id === datosUsuario.id);
        setIsFollowed(isFollowed);
      } catch (error) {
        console.error('Error al verificar si el usuario es seguido')
      }
    }

    checkIfFollowed();
    // eslint-disable-next-line no-undef
    feather.replace();
  }, [usuariosSeguidos])

  useEffect(() => {
    // eslint-disable-next-line no-undef
    feather.replace();
  }, [datosUsuario, usuariosSeguidos])

  // Función para detectar enlaces
  const Linkify = ({ children }) => {
    if (typeof children !== 'string') {
      return children;
    }

    const isUrl = word => {
      const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
      return word.match(urlPattern)
    }

    const addMarkup = word => {
      return isUrl(word) ?
        `<a href="${word}">${word}</a>` :
        word
    }

    const words = children.split(' ')
    const formatedWords = words.map((w, i) => addMarkup(w))
    const html = formatedWords.join(' ')
    return (<span dangerouslySetInnerHTML={{ __html: html }} />)
  }

  const resultId = parseInt(datosUsuario.id);

  const fetchUsuariosSeguidos = async () => {
    try {
      const usuarios = await getUsuariosSeguidos(currentUser);
      setUsuariosSeguidos(usuarios);
    } catch (error) {
      console.error('Error al obtener los usuarios seguidos');
    }
  }

  useEffect(() => {
    fetchUsuariosSeguidos();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 100);
  }, [isFollowed])

  // Seguir y dejar de seguir usuarios
  const handleFollowUser = async () => {
    if (!isFollowed) {
      try {
        await followUsuario(datosUsuario.id, currentUser);
        console.log('Usuario seguido con éxito');
        await getUsuariosSeguidos();
        setIsFollowed(true)
      } catch (error) {
        console.error('Error al agregar el elemento');
      }
    } else {
      console.warn('Ya existe este elemento');
    }
  }

  const handleUnfollowUser = async () => {
    try {
      await unfollowUsuario(datosUsuario.id, currentUser)
      await getUsuariosSeguidos();
      setIsFollowed(false)
      console.log('Elemento agregado con éxito');
    } catch (error) {
      console.error('Error al agregar el elemento');
    }
  }

  return (
    <div className="profile-card">
      <div className="profile-pic">
        <img src={datosUsuario.foto_perfil} alt="profile-pic" />
      </div>
      <div className="profile-text">
        <div className="profile-name">{datosUsuario.nombre_mostrado}</div>
        <div className="profile-username">@{datosUsuario.usuario}</div>
        <div className="profile-desc">
          <Linkify>{datosUsuario.descripcion}</Linkify>
        </div>

        <div className="profile-buttons">
          {currentUser === resultId && (
            <div className="nav-button" onClick={() => setShowEditProfileModal(true)}><i data-feather="edit-3"></i><span>Editar perfil</span></div>
          )}
          {currentUser !== resultId && isFollowed && (
            <div className='nav-button selected' onClick={handleUnfollowUser}><i data-feather="user-check"></i><span>Seguido</span></div>
          )}
          {currentUser !== resultId && !isFollowed && (
            <div className='nav-button' onClick={handleFollowUser}><i data-feather="user-plus"></i><span>Seguir</span></div>
          )}
          <div className="nav-button" onClick={() => handleOpenCollections()}><i data-feather="package"></i><span>Ver colecciones</span></div>
          <div className="nav-button" onClick={() => setLogOutModal(true)}><i data-feather="log-out"></i><span>Salir</span></div>
        </div>
      </div >
    </div >
  )
}

export default ProfileCard;