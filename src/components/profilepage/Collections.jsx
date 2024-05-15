import React, { useEffect, useState } from 'react';
import { getElementosUsuario } from '../../services/ElementosServices';
import { followUsuario, unfollowUsuario, getUsuariosSeguidos } from '../../services/UserServices';

const Collections = ({ currentUser, filtros, setFiltros, showCollectionsModal, setShowCollectionsModal, filtroId, setFiltroId }) => {
  const [coleccion, setColeccion] = useState([]);
  const [favElementos, setFavElementos] = useState([]);

  // Eliminamos la clase .visible para los elementos de la antigua colección
  useEffect(() => {
    const elements = document.querySelectorAll('.element');
    elements.forEach(el => {
      el.classList.remove('visible');
    });
  }, [filtroId])

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 1000);
  }, [filtroId])

  // Con el cambio de colección llamamos al servicio para recibir nuevos elementos
  useEffect(() => {
    setTimeout(() => {
      if (filtros !== 'users') {
        const formatElementosData = (elementos) => {
          return elementos.map(elemento => ({
            titulo: elemento.titulo,
            autor: elemento.autor,
            imagen: elemento.imagen || '',
            id: elemento.id
          }));
        };

        const fetchData = async () => {
          try {
            // Llamada para obtener elementos favoritos
            const favElementos = await getElementosUsuario(currentUser, filtroId, 1);
            const formattedDataFav = formatElementosData(favElementos);
            setFavElementos(formattedDataFav.map(elemento => ({ ...elemento, isSaved: true })));

            const coleccion = await getElementosUsuario(currentUser, filtroId);
            const formattedData = formatElementosData(coleccion);
            const coleccionConFav = formattedData.map(elemento => ({
              ...elemento,
              isSaved: true,
              isFav: favElementos.some(fav => fav.id === elemento.id) // Comprueba si el elemento está en favElementos
            }));
            setColeccion(coleccionConFav);
          } catch (error) {
            console.error('Error al obtener los elementos o los usuarios:', error);
          }
        }

        fetchData();
      } else {
        const formatUsuariosData = (usuarios) => {
          return usuarios.map(usuario => ({
            nombre_mostrado: usuario.nombre_mostrado,
            usuario: usuario.usuario,
            descripcion: usuario.descripcion || '',
            foto_perfil: usuario.foto_perfil || '',
            id: usuario.id || '',
          }));
        };

        const fetchData = async () => {
          try {
            const usuarios = await getUsuariosSeguidos(currentUser);
            const formattedData = formatUsuariosData(usuarios);

            setColeccion(formattedData.map(user => ({ ...user, isFollowed: true }))); // Inicializa el estado de seguimiento para cada usuario como falso
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }
    }, 200);
  }, [currentUser, filtros]);

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 200);

    setTimeout(() => {
      let delay = 50;
      const elements = document.querySelectorAll('.element');
      elements.forEach(el => {
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);

        delay += 50;
      });
    }, 500);
  }, [showCollectionsModal, filtros]);

  const handleChangeFilter = (filtro, id_filtro) => {
    setFiltroId(id_filtro);
    setTimeout(() => {
      setFiltros(filtro);
    }, 200);
  }

  const handleFollowUser = async (targetUserIndex) => {
    try {
      const targetUser = coleccion[targetUserIndex];
      await followUsuario(targetUser.id, currentUser);
      await getUsuariosSeguidos();
      const updatedResponseData = [...coleccion];
      updatedResponseData[targetUserIndex] = { ...targetUser, isFollowed: true };
      setColeccion(updatedResponseData);
      console.log('Usuario seguido con éxito');
    } catch (error) {
      console.error('Error al seguir al usuario');
    }
  }

  const handleUnfollowUser = async (targetUserIndex) => {
    try {
      const targetUser = coleccion[targetUserIndex];
      await unfollowUsuario(targetUser.id, currentUser);
      await getUsuariosSeguidos();
      const updatedResponseData = [...coleccion];
      updatedResponseData[targetUserIndex] = { ...targetUser, isFollowed: false };
      setColeccion(updatedResponseData);
      console.log('Usuario dejado de seguir con éxito');
    } catch (error) {
      console.error('Error al dejar de seguir al usuario');
    }
  }

  return (
    <>
      {showCollectionsModal && (
        <div className="modal-screen visible" style={{ backdropFilter: 'blur(5rem)', zIndex: '99' }}>
          <div className="collection-modal">
            <div className="nav-button no-text back" onClick={() => setShowCollectionsModal(false)}><i data-feather="arrow-left"></i></div>
            <h2>Colecciones</h2>
            <div className='search-filters visible'>
              <div
                className={`nav-button ${filtros === 'users' ? 'selected' : ''}`}
                onClick={() => handleChangeFilter('users', 99)}>
                <i data-feather="user"></i>Usuarios
              </div>
              <div
                className={`nav-button ${filtros === 'books' ? 'selected' : ''}`}
                onClick={() => handleChangeFilter('books', 1)}>
                <i data-feather="book"></i>Libros
              </div>
              <div
                className={`nav-button ${filtros === 'movies' ? 'selected' : ''}`}
                onClick={() => handleChangeFilter('movies', 5)}>
                <i data-feather="film"></i>Películas
              </div>
              <div
                className={`nav-button ${filtros === 'albums' ? 'selected' : ''}`}
                onClick={() => handleChangeFilter('albums', 4)}>
                <i data-feather="disc"></i>Álbumes
              </div>
            </div>

            {coleccion.length > 0 ? (
              <div className={`collection ${filtros}`}>
                {filtros !== 'users' && coleccion.map((e, index) => (
                  <div className='element'>
                    <div className='imagen'>
                      <img src={e.imagen} alt="cover" className='cover' />
                      <img src={e.imagen} alt="ambilight" className='ambilight' />
                    </div>

                    <div className='titulo'>{e.titulo}</div>
                    <div className='autor'>{e.autor}</div>
                    <div className='buttons-container'>
                      {e.isSaved && (
                        <div div className='nav-button no-text selected'/*  onClick={handleDeleteElemento} */><i data-feather="check"></i></div>
                      )}
                      {!e.isSaved && (
                        <div className='nav-button no-text' /* onClick={() => handleAddElemento(0)} */><i data-feather="plus"></i></div>
                      )}

                      {e.isFav && (
                        <div className='nav-button no-text selected star' /* onClick={handleEditElemento} */><i data-feather="star"></i></div>
                      )}
                      {!e.isFav && (
                        <div className='nav-button no-text star' /* onClick={handleEditElemento} */><i data-feather="star"></i></div>
                      )}
                    </div>
                  </div>
                ))}

                {filtros === 'users' && coleccion.map((user, index) => (
                  <div className='element'>
                    <div className='imagen'>
                      <img src={user.foto_perfil} alt="cover" className='cover' />
                      <img src={user.foto_perfil} alt="ambilight" className='ambilight' />
                    </div>

                    <div className='titulo'>{user.nombre_mostrado}</div>
                    <div className='autor'>@{user.usuario}</div>

                    <div className='buttons-container'>
                      {currentUser !== user.id && user.isFollowed && (
                        <div className='nav-button no-text selected' onClick={handleUnfollowUser}><i data-feather="user-check"></i></div>
                      )}
                      {currentUser !== user.id && !user.isFollowed && (
                        <div className='nav-button no-text' onClick={handleFollowUser}><i data-feather="user-plus"></i></div>
                      )}
                      <div className='nav-button no-text'/*  onClick={() => handleVerPerfil(result.id)} */><i data-feather="external-link"></i></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-space">
                Navega por las colecciones seleccionando los filtros :)
                <div className="icon">
                  <i data-feather="folder"></i>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Collections;