import { useEffect, useState } from 'react';
import { followUsuario, unfollowUsuario, getUsuariosSeguidos } from '../services/UserServices';
import '../styles/home.css';
import WritePostModal from './modals/WritePostModal';
import { addLike, deleteLike, checkUserLike, getPublicacionesUsuario } from '../services/PostServices'; // Importa los servicios necesarios
import ProfilePage from './ProfilePage';
import Loading from './modals/Loading';
import Post from './profilepage/Post';
import DeleteUserModal from './modals/DeleteUserModal';
import DeletePostModal from './modals/DeletePostModal';

const Home = ({ currentUser, setCurrentUser, datosUsuario, writePost, setWritePost, isAdmin, profileOpen, resultUserData, handleVerPerfil, loading, setIsLoggedIn }) => {
  const [responseData, setResponseData] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userOnShow, setUserOnShow] = useState();
  const [usuariosSeguidos, setUsuariosSeguidos] = useState([]);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState();
  const [deletePostId, setDeletePostId] = useState(null);
  const [deletePublicacionModal, setDeletePublicacionModal] = useState(false);

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
  }, [userPosts, currentUser, userOnShow]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosSeguidos = await getUsuariosSeguidos(currentUser);
        setUsuariosSeguidos(usuariosSeguidos);

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

  useEffect(() => {
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

  const handleDeleteUser = async (userId) => {
    setUserToDelete(userId);
    setDeleteUserModal(true)
  }

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

  const handleDeleteClick = async (postId) => {
    setDeletePostId(postId);
    setDeletePublicacionModal(true)
  }

  return (
    <>
      <DeletePostModal
        deletePostId={deletePostId}
        deletePublicacionModal={deletePublicacionModal}
        setDeletePublicacionModal={setDeletePublicacionModal}
        getPublicacionesUsuario={fetchData}
      />
      <WritePostModal writePost={writePost} setWritePost={setWritePost} datosUsuario={datosUsuario} />
      <Loading loading={loading} />
      <DeleteUserModal
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        userId={userToDelete}
        deleteUserModal={deleteUserModal}
        setDeleteUserModal={setDeleteUserModal}
        setIsLoggedIn={setIsLoggedIn}
      />

      {!profileOpen ? (
        <div className="two-columns home" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
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
                        <div>
                          <b>{user.nombre_mostrado}</b>
                        </div>

                        <div>
                          @{user.usuario}
                        </div>
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
                        <div className='nav-button no-text' onClick={() => handleVerPerfil(user.id)}><i data-feather="external-link"></i></div>
                        {isAdmin && (
                          <div className='nav-button no-text' onClick={() => handleDeleteUser(user.id)}><i data-feather="trash"></i></div>
                        )}
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
                    <Post
                      key={post.id}
                      datosUsuario={userOnShow}
                      post={post}
                      currentUser={currentUser}
                      handleLikeClick={handleLikeClick}
                      handleDeleteClick={handleDeleteClick}
                      isAdmin={isAdmin}
                    />
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
                    <div className="nav-button" onClick={() => handleVerPerfil(userOnShow.id)}><i data-feather="external-link"></i><span>Ver perfil</span></div>
                    {isAdmin && (
                      <div className='nav-button no-text' onClick={() => handleDeleteUser(userOnShow.id)}><i data-feather="trash"></i></div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div >
      ) : (
        <>
          <ProfilePage
            datosUsuario={resultUserData}
            currentUser={currentUser}
            getUsuariosSeguidos={getUsuariosSeguidos}
            usuariosSeguidos={usuariosSeguidos}
            isAdmin={isAdmin}
          />
        </>
      )}
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
