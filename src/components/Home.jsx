import { useEffect, useState } from 'react';
import { followUsuario, unfollowUsuario, getUsuariosSeguidos } from '../services/UserServices';
import '../styles/home.css';
import PostShowcase from './profilepage/PostShowcase';
import { getPublicacionesUsuario } from '../services/PostServices';

const Home = ({ currentUser, datosUsuario }) => {
  const [responseData, setResponseData] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuarios = await getUsuariosSeguidos(datosUsuario.id);
        const formattedData = formatUsuariosData(usuarios);

        setResponseData(formattedData.map(user => ({ ...user, isFollowed: true }))); // Inicializa el estado de seguimiento para cada usuario como falso
        console.log('Primer elemento de reponseData', responseData[2])
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
  }, [responseData])

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
      await getUsuariosSeguidos();
      const updatedResponseData = [...responseData];
      updatedResponseData[targetUserIndex] = { ...targetUser, isFollowed: true };
      setResponseData(updatedResponseData);
      console.log('Usuario seguido con éxito');
    } catch (error) {
      console.error('Error al seguir al usuario');
    }
  }

  const handleUnfollowUser = async (targetUserIndex) => {
    try {
      const targetUser = responseData[targetUserIndex];
      await unfollowUsuario(targetUser.id, currentUser);
      await getUsuariosSeguidos();
      const updatedResponseData = [...responseData];
      updatedResponseData[targetUserIndex] = { ...targetUser, isFollowed: false };
      setResponseData(updatedResponseData);
      console.log('Usuario dejado de seguir con éxito');
    } catch (error) {
      console.error('Error al dejar de seguir al usuario');
    }
  }

  const handleClickUser = async (targetUserIndex) => {
    const targetUser = responseData[targetUserIndex];

    try {
      setUserPosts(await getPublicacionesUsuario(targetUser.id));
      console.log('userPosts', userPosts)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="two-columns">
      <div className="left-column" style={{ justifyContent: 'flex-end', gap: '1rem' }}>
        {responseData.map((user, index) => {
          return (
            <div className='search-result' key={user.id} style={{ backgroundColor: 'var(--semi-transparent)' }}>
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

              <div className="nav-button no-text arrow-right" onClick={() => handleClickUser(index)}><i data-feather='arrow-right'></i></div>
            </div>
          )
        })}
      </div>

      <div className="right-column">
        {userPosts.map((post, index) => {
          return (
            <PostShowcase datosUsuario={responseData[0]} postData={post} />
          )
        })}
      </div>
    </div>
  )
}

export default Home;
