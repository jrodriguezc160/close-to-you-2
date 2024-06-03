import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const Post = ({ datosUsuario, post, currentUser, handleLikeClick, handleDeleteClick, isAdmin }) => {
  useEffect(() => {
    console.log(datosUsuario)

    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 100);
  }, [datosUsuario])

  // Calcula la fecha de la publicación ajustando a la zona horaria española
  const postDate = new Date(post.fecha);
  postDate.setMinutes(postDate.getMinutes() + 120); // Ajustar 120 minutos (2 horas)

  let formattedDate;

  const now = new Date();
  const diffInMinutes = Math.floor((now - postDate) / 1000 / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) {
    formattedDate = 'Justo ahora';
  } else if (diffInMinutes < 60) {
    formattedDate = `Hace ${diffInMinutes} minutos`;
  } else if (diffInHours < 24) {
    formattedDate = `Hace ${diffInHours} horas`;
  } else if (diffInDays < 7) {
    formattedDate = `Hace ${diffInDays} días`;
  } else {
    formattedDate = format(postDate, "d 'de' MMMM 'de' yyyy", { locale: es });
  }

  return (
    <div className="post-showcase-grid" key={post.id} data-post-id={post.id}>
      <div className="post" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="post-profile-pic">
          <div>
            <img src={datosUsuario?.foto_perfil} alt="profile-pic" />
          </div>
        </div>
        <div className="post-elements">
          <div className="post-top">
            <div className="post-username">
              <div><b>{datosUsuario?.nombre_mostrado}</b></div>
              <div style={{ color: 'var(--gray-2)' }}>@{datosUsuario?.usuario}</div>
            </div>

            <div className="post-text">{post?.contenido}</div>
            <div className="buttons">
              {/* Agrega el onClick para llamar a handleLikeClick */}
              <div className="nav-button interactive heart" onClick={() => handleLikeClick(post.id)}>
                {post.likes}
                <i data-feather="heart"></i>
              </div>

              <div className="nav-button interactive" style={{ cursor: 'auto' }}>
                <i data-feather="clock"></i>
                <span style={{ color: 'var(--gray-2)' }}>{formattedDate}</span>
              </div>
              {(isAdmin || currentUser === parseInt(post.id_usuario)) && (
                <div className="nav-button no-text interactive trash" onClick={() => handleDeleteClick(post.id)}>
                  <i data-feather="trash"></i>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
