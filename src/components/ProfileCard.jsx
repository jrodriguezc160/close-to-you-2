// Profile Card

import { useEffect } from 'react';

const ProfileCard = ({ datosUsuario, currentUser }) => {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    feather.replace();
  }, [datosUsuario])

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
          {currentUser === datosUsuario.id ? (
            <div className="nav-button"><i data-feather="edit-3"></i><span>Editar perfil</span></div>
          ) : (
            <div className="nav-button"><i data-feather="user-plus"></i><span>Seguir</span></div>
          )}
          <div className="nav-button"><i data-feather="package"></i><span>Ver colecciones</span></div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard;