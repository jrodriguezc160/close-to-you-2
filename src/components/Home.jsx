import { useEffect, useState } from 'react';
import { followUsuario, unfollowUsuario, searchUsuarios, getUsuariosSeguidos } from '../services/UserServices';

const Home = ({ currentUser }) => {
  const [responseData, setResponseData] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuarios = await searchUsuarios('') // Llama a la función searchUsuarios con el término de búsqueda
        const formattedData = formatUsuariosData(usuarios); // Formatea los datos de los usuarios
        setResponseData(formattedData); // Establece los datos formateados en el estado
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
      title: usuario.nombre_mostrado,
      authors: usuario.usuario,
      description: usuario.descripcion || '',
      image: usuario.foto_perfil || '',
      id: usuario.id || '',
    }));
  };

  // Seguir y dejar de seguir usuarios
  const handleFollowUser = async (targetUser) => {
    if (!isFollowed) {
      try {
        await followUsuario(targetUser.id, currentUser);
        console.log('Usuario seguido con éxito');
        await getUsuariosSeguidos();
        setIsFollowed(true)
      } catch (error) {
        console.log(targetUser.image)
        console.error('Error al seguir al usuario');
      }
    } else {
      console.warn('Ya se sigue a este usuario');
    }
  }

  const handleUnfollowUser = async (targetUser) => {
    try {
      await unfollowUsuario(targetUser.id, currentUser)
      await getUsuariosSeguidos();
      setIsFollowed(false)
      console.log('Usuario dejado de seguir con éxito');
    } catch (error) {
      console.error('Error al dejar de seguir al usuario');
    }
  }

  return (
    <div className="two-columns">
      <div className="left-column">
        <div className="results-column">
          {responseData.map((user) => {
            return (
              <div className='result'>
                <div className={`result-pic users-result`}>
                  <img src={user.image} alt="result-pic" />
                </div>
                <div className="result-text">
                  <div className="user-result-text">
                    <b>{user.title}</b>&nbsp;&nbsp;@{user.authors}
                  </div>

                  <div className="result-buttons">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                      {/* Si el usuario actual no siga al usuario mostrado... */}

                      {currentUser !== parseInt(user.id) && isFollowed && (
                        <div className='nav-button no-text selected' onClick={handleUnfollowUser(user)}><i data-feather="user-check"></i><span>Seguido</span></div>
                      )}
                      {currentUser !== parseInt(user.id) && !isFollowed && (
                        <div className='nav-button no-text' onClick={handleFollowUser(user)}><i data-feather="user-plus"></i><span>Seguir</span></div>
                      )}
                      <div className='nav-button no-text' /* onClick={() => handleVerPerfil(user.id)} */><i data-feather="external-link"></i><span>Ver perfil</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right-column">
      </div>
    </div >
  )
}

export default Home;