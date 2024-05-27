import { useEffect, useState } from 'react';
import { followUsuario, unfollowUsuario, getUsuariosSeguidos } from '../services/UserServices';
import '../styles/home.css';
import WritePostModal from './WritePostModal';
import { addLike, deleteLike, checkUserLike, addRepost, deleteRepost, checkUserRepost, getPublicacionesUsuario } from '../services/PostServices'; // Importa los servicios necesarios

const Home = ({ currentUser, datosUsuario, writePost, setWritePost }) => {
  const [responseData, setResponseData] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userOnShow, setUserOnShow] = useState();

  useEffect(() => {
    const fetchLikes = async () => {
      for (const post of userPosts) {
        try {
          const hasLiked = await checkUserLike(currentUser, post.id);
          if (hasLiked) {
            document.querySelector(`[data-post-id="${post.id}"] .heart`).classList.add('active');
          }
        } catch (error) {
          console.error('Error al comprobar el like:', error);
        }
      }
    };

    fetchLikes();

    const fetchReposts = async () => {
      for (const post of userPosts) {
        try {
          const hasReposted = await checkUserRepost(currentUser, post.id);
          if (hasReposted) {
            console.log('User has reposted this');
            document.querySelector(`[data-post-id="${post.id}"] .repeat`).classList.add('active');
          }
        } catch (error) {
          console.error('Error al comprobar el repost:', error);
        }
      }
    };

    fetchReposts();
  }, [userPosts, currentUser, userOnShow]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosSeguidos = await getUsuariosSeguidos(currentUser);
        const formattedData = formatUsuariosData(usuariosSeguidos);

        setResponseData(formattedData.map(user => ({ ...user, isFollowed: true }))); // Inicializa el estado de seguimiento para cada usuario como verdadero
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 100);
  }, [responseData, userOnShow, userPosts]);

  const formatUsuariosData = (usuarios) => {
    return usuarios.map(usuario => ({
      nombre_mostrado: usuario.nombre_mostrado,
      usuario: usuario.usuario,
      descripcion: usuario.descripcion || '',
      foto_perfil: usuario.foto_perfil || '',
      id: usuario.id || '',
    }));
  };

  const handleFollowUser = async (targetUserIndex) => {
    try {
      const targetUser = responseData[targetUserIndex];
      await followUsuario(targetUser.id, currentUser);
      await getUsuariosSeguidos(currentUser); // Actualiza los usuarios seguidos

      const updatedResponseData = [...responseData];
      updatedResponseData[targetUserIndex] = { ...targetUser, isFollowed: true };
      setResponseData(updatedResponseData);
      console.log('Usuario seguido con éxito');
    } catch (error) {
      console.error('Error al seguir al usuario');
    }
  };

  const handleUnfollowUser = async (targetUserIndex) => {
    try {
      const targetUser = responseData[targetUserIndex];
      await unfollowUsuario(targetUser.id, currentUser);
      await getUsuariosSeguidos(currentUser); // Actualiza los usuarios seguidos

      const updatedResponseData = [...responseData];
      updatedResponseData[targetUserIndex] = { ...targetUser, isFollowed: false };
      setResponseData(updatedResponseData);
      console.log('Usuario dejado de seguir con éxito');
    } catch (error) {
      console.error('Error al dejar de seguir al usuario');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userOnShow && userOnShow.id) {
        try {
          const posts = await getPublicacionesUsuario(userOnShow.id);
          // Limitar los posts a los cinco primeros
          setUserPosts(posts.slice(0, 5));
        } catch (error) {
          console.error("Error fetching user's posts' data:", error);
        }
      }
    };

    fetchData();
  }, [userOnShow]);

  const handleLikeClick = async (postId) => {
    try {
      const heartButton = document.querySelector(`[data-post-id="${postId}"] .heart`);
      if (heartButton.classList.contains('active')) {
        await deleteLike(currentUser, postId);
        heartButton.classList.remove('active');
      } else {
        await addLike(currentUser, postId);
        heartButton.classList.add('active');
      }
    } catch (error) {
      console.error('Error al manejar el like:', error);
    }
  };

  const handleRepostClick = async (postId) => {
    try {
      const repeatButton = document.querySelector(`[data-post-id="${postId}"] .repeat`);
      if (repeatButton.classList.contains('active')) {
        await deleteRepost(currentUser, postId);
        repeatButton.classList.remove('active');
      } else {
        await addRepost(currentUser, postId);
        repeatButton.classList.add('active');
      }
    } catch (error) {
      console.error('Error al manejar el repost:', error);
    }
  };

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
    <>
      <WritePostModal writePost={writePost} setWritePost={setWritePost} datosUsuario={datosUsuario} />

      <div className="two-columns" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <div className="left-column posts">
          {responseData.map((user, index) => {
            return (
              <div className='search-result' key={user.id} style={{ backgroundColor: 'var(--transparent)' }}>
                <div className="info" style={{ justifyContent: 'space-between' }}>
                  <div className="result-text">
                    <div className='result-pic users-result' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img src={user.foto_perfil} alt="result-pic" />
                    </div>
                    <div className="user-result-text">
                      <b>{user.nombre_mostrado}</b>&nbsp;&nbsp;@{user.usuario}
                    </div>
                  </div>

                  <div className="result-buttons">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                      {currentUser !== parseInt(user.id) && user.isFollowed && (
                        <div className='nav-button no-text selected' onClick={() => handleUnfollowUser(index)}><i data-feather="user-check"></i></div>
                      )}
                      {currentUser !== parseInt(user.id) && !user.isFollowed && (
                        <div className='nav-button no-text' onClick={() => handleFollowUser(index)}><i data-feather="user-plus"></i></div>
                      )}
                      <div className='nav-button no-text'><i data-feather="external-link"></i></div>
                    </div>
                  </div>
                </div>

                <div className="nav-button no-text arrow-right" onClick={() => setUserOnShow(user)}><i data-feather='arrow-right'></i></div>
              </div>
            )
          })}
        </div>

        <div className="right-column posts" style={{ height: '100%', overflow: 'auto !important' }}>
          {userOnShow && userPosts ? (
            <div className="posts-scroll" style={{ marginBottom: '2rem', padding: '0', justifyContent: 'flex-start' }}>
              {userPosts.slice().reverse().map((post, index) => { // Invertir el array userPosts
                return (
                  <div className="post-showcase-grid" key={post.id} data-post-id={post.id} style={{ maxHeight: '25vh', margin: '0' }}>
                    <div className="post" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingBottom: '1.5rem' }}>
                      <div className="post-profile-pic">
                        <div>
                          <img src={userOnShow?.foto_perfil} alt="profile-pic" />
                        </div>
                      </div>
                      <div className="post-elements">
                        <div className="post-top">
                          <div className="post-username">
                            <div><b>{userOnShow?.nombre_mostrado}</b></div>
                            <div>@{userOnShow?.usuario}</div>
                          </div>

                          <div className="post-text">{post?.contenido}</div>
                          <div className="buttons">
                            {/* Agrega el onClick para llamar a handleLikeClick */}
                            <div className="nav-button no-text interactive heart" onClick={() => handleLikeClick(post.id)}>
                              <i data-feather="heart"></i>
                            </div>
                            <div className="nav-button no-text interactive repeat" onClick={() => handleRepostClick(post.id)}>
                              <i data-feather="repeat"></i>
                            </div>
                            <div className="nav-button no-text interactive message"><i data-feather="message-circle"></i></div>
                            <span style={{ color: 'var(--gray-2)' }}>·&nbsp;&nbsp;{post?.fecha}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="empty-space" style={{ width: '75%', border: '1px solid var(--white-2)' }}>
                Selecciona un usuario para ver sus publicaciones<br /><br />
                <div className="icon">
                  <i data-feather="user"></i>
                </div>
              </div>
            </div>
          )}

          {userOnShow && (
            <div className='profile-card' style={{ width: '99%', backgroundColor: 'var(--white-1)' }}>
              <div className="profile-pic">
                <img src={userOnShow?.foto_perfil} alt="profile-pic" />
              </div>
              <div className="profile-text">
                <div className="profile-name">{userOnShow?.nombre_mostrado}</div>
                <div className="profile-username">@{userOnShow?.usuario}</div>
                <div className="profile-desc">
                  <Linkify>{userOnShow?.descripcion}</Linkify>
                </div>

                <div className="profile-buttons">
                  {currentUser === userOnShow?.id && (
                    <div className="nav-button"><i data-feather="edit-3"></i><span>Editar perfil</span></div>
                  )}
                  {currentUser !== userOnShow?.id && userOnShow?.isFollowed && (
                    <div className='nav-button selected' onClick={() => handleUnfollowUser(responseData.findIndex(user => user.id === userOnShow.id))}><i data-feather="user-check"></i><span>Seguido</span></div>
                  )}
                  {currentUser !== userOnShow?.id && !userOnShow?.isFollowed && (
                    <div className='nav-button' onClick={() => handleFollowUser(responseData.findIndex(user => user.id === userOnShow.id))}><i data-feather="user-plus"></i><span>Seguir</span></div>
                  )}
                  <div className="nav-button" ><i data-feather="package"></i><span>Ver colecciones</span></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div >
      {
        userOnShow ? (
          <img src={userOnShow.foto_perfil} alt="background-gradient" className='background-gradient' />
        ) : (
          <img src={datosUsuario?.foto_perfil} alt="background-gradient" className='background-gradient' />
        )}
    </>
  );
};

export default Home;
