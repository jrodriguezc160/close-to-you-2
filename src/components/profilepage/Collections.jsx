import React, { useEffect, useState } from 'react';
import { getElementosUsuario } from '../../services/ElementosServices';
import { followUsuario, unfollowUsuario, getUsuariosSeguidos } from '../../services/UserServices';
import { addElemento, deleteElemento, editElemento } from '../../services/ElementosServices';
import LimitModal from '../LimitModal';
import ProfilePage from '../ProfilePage';

const Collections = ({ currentUser, filtros, setFiltros, showCollectionsModal, setShowCollectionsModal, filtroId, setFiltroId, profileOpen, resultUserData, handleVerPerfil, datosUsuario }) => {
  // Se definen las variables de estado
  // Se incluyen las que corresponden al usuario actual (current user o CU)
  const [coleccion, setColeccion] = useState([]);
  const [coleccionCU, setColeccionCU] = useState([]);
  const [showLimit, setShowLimit] = useState(false);

  const getColeccion = async () => {
    setTimeout(() => {
      if (filtros !== 'users') {
        const formatElementosData = (elementos) => {
          return elementos.map(elemento => ({
            titulo: elemento.titulo,
            autor: elemento.autor,
            imagen: elemento.imagen || '',
            id: elemento.id,
            id_api: elemento.id_api,
          }));
        };

        const fetchData = async () => {
          try {
            // Guardamos los elementos favoritos del current user (usuario con quien se ha iniciado sesión)
            const favElementosCU = await getElementosUsuario(currentUser, filtroId, 1);

            // Guardamos todos los elementos del current user
            const coleccionCU = await getElementosUsuario(currentUser, filtroId);
            const formattedDataCU = formatElementosData(coleccionCU);
            const formattedFavDataCU = formatElementosData(favElementosCU);

            const coleccion = await getElementosUsuario(datosUsuario.id, filtroId);
            const formattedData = formatElementosData(coleccion);
            const coleccionConFav = formattedData.map(elemento => {
              const isSaved = formattedDataCU.some(cuUser => cuUser.id === elemento.id);
              const isFav = formattedFavDataCU.some(cuUser => cuUser.id === elemento.id);

              return { ...elemento, isSaved, isFav };
            });

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
            // Traemos los usuarios seguidos por el usuario en cuyo perfil estamos
            const usuarios = await getUsuariosSeguidos(datosUsuario.id);
            const formattedData = formatUsuariosData(usuarios);

            // Traemos los usuarios seguidos por el usuario con el que hemos iniciado sesión (current user)
            const usuariosCU = await getUsuariosSeguidos(currentUser);
            const formattedDataCU = formatUsuariosData(usuariosCU);

            const coleccionActualizada = formattedData.map(user => {
              const isFollowed = formattedDataCU.some(cuUser => cuUser.id === user.id);
              return { ...user, isFollowed };
            });

            setColeccion(coleccionActualizada);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }
    }, 200);
  }

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
    }, 50);
  }, [filtroId, coleccion])

  // Con el cambio de colección llamamos al servicio para recibir nuevos elementos
  useEffect(() => {
    setTimeout(() => {
      if (filtros !== 'users') {
        const formatElementosData = (elementos) => {
          return elementos.map(elemento => ({
            titulo: elemento.titulo,
            autor: elemento.autor,
            imagen: elemento.imagen || '',
            id: elemento.id,
            id_api: elemento.id_api,
          }));
        };

        const fetchData = async () => {
          try {
            // Guardamos los elementos favoritos del current user (usuario con quien se ha iniciado sesión)
            const favElementosCU = await getElementosUsuario(currentUser, filtroId, 1);

            // Guardamos todos los elementos del current user
            const coleccionCU = await getElementosUsuario(currentUser, filtroId);
            const formattedDataCU = formatElementosData(coleccionCU);
            const formattedFavDataCU = formatElementosData(favElementosCU);

            const coleccion = await getElementosUsuario(datosUsuario.id, filtroId);
            const formattedData = formatElementosData(coleccion);
            const coleccionConFav = formattedData.map(elemento => {
              const isSaved = formattedDataCU.some(cuUser => cuUser.id === elemento.id);
              const isFav = formattedFavDataCU.some(cuUser => cuUser.id === elemento.id);

              return { ...elemento, isSaved, isFav };
            });

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
            // Traemos los usuarios seguidos por el usuario en cuyo perfil estamos
            const usuarios = await getUsuariosSeguidos(datosUsuario.id);
            const formattedData = formatUsuariosData(usuarios);

            // Traemos los usuarios seguidos por el usuario con el que hemos iniciado sesión (current user)
            const usuariosCU = await getUsuariosSeguidos(currentUser);
            const formattedDataCU = formatUsuariosData(usuariosCU);

            const coleccionActualizada = formattedData.map(user => {
              const isFollowed = formattedDataCU.some(cuUser => cuUser.id === user.id);
              return { ...user, isFollowed };
            });

            setColeccion(coleccionActualizada);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }
    }, 200);
  }, [currentUser, filtros, filtroId, resultUserData, profileOpen]);

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
  }, [showCollectionsModal, filtros, profileOpen]);

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

  // Guardar en colección, destacar y eliminar elementos
  const handleAddElemento = async (target, favorito) => {
    try {
      await addElemento(currentUser, filtroId, target.titulo, target.autor, target.imagen, target.id_api, favorito);
      await getColeccion();
      console.log('Elemento agregado con éxito');
    } catch (error) {
      console.log(target.image)
      console.error('Error al agregar el elemento');
    }
  }

  const handleDeleteElemento = async (target) => {
    try {
      await deleteElemento(currentUser, target.id_api);
      await getColeccion();
      const updatedCollection = coleccion.filter(item => item.id !== target.id);
      setColeccion(updatedCollection);
    } catch (error) {
      console.error('Error al eliminar el elemento:', error);
    }
  }

  const handleEditElemento = async (target) => {
    if (!target) {
      console.error('El elemento objetivo es undefined');
      return;
    }

    const isFav = target.isFav === true;
    const isSaved = coleccion.find(item => item.id === target.id);

    // Verificar el número de elementos favoritos en la colección del usuario
    const favCount = coleccion.filter(item => item.isFav === true).length;
    const favLimit = filtroId === 4 ? 5 : 3;

    let favorito = isSaved ? (isFav ? 0 : 1) : 0; // Si está guardado y no es favorito, marcar como favorito (1), de lo contrario, no (0)

    if (favCount >= favLimit && favorito === 1) {
      setShowLimit(true);
    } else {
      try {
        if (!isSaved) {
          await handleAddElemento(target, favorito);
        } else {
          await editElemento(currentUser, target.id_api, filtroId, favorito);
          await getColeccion();
        }
      } catch (error) {
        console.error('Error al editar el elemento:', error);
      }

      // Actualiza el estado de la colección para reflejar los cambios
      const updatedCollection = coleccion.map(item => {
        if (item.id === target.id) {
          return {
            ...item,
            isFav: favorito === 1
          };
        }
        return item;
      });
      setColeccion(updatedCollection);

      // eslint-disable-next-line no-undef
      feather.replace();
    }
  }

  const favLimit = filtroId === 4 ? 5 : 3;

  return (
    <>
      {!profileOpen ? (
        <>
          <LimitModal showLimit={showLimit} setShowLimit={setShowLimit} favLimit={favLimit} />

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
                            <div div className='nav-button no-text selected' onClick={() => handleDeleteElemento(e)}><i data-feather="check"></i></div>
                          )}
                          {!e.isSaved && (
                            <div className='nav-button no-text' onClick={() => handleAddElemento(e, 0)}><i data-feather="plus"></i></div>
                          )}

                          {e.isFav && (
                            <div className='nav-button no-text selected star' onClick={() => handleEditElemento(e)}><i data-feather="star"></i></div>
                          )}
                          {!e.isFav && (
                            <div className='nav-button no-text star' onClick={() => handleEditElemento(e)}><i data-feather="star"></i></div>
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
                            <div className='nav-button no-text selected' onClick={() => handleUnfollowUser(index)}><i data-feather="user-check"></i></div>
                          )}
                          {currentUser !== user.id && !user.isFollowed && (
                            <div className='nav-button no-text' onClick={() => handleFollowUser(index)}><i data-feather="user-plus"></i></div>
                          )}
                          <div className='nav-button no-text' onClick={() => handleVerPerfil(user.id)}><i data-feather="external-link"></i></div>
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
      ) : (
        <>
          <ProfilePage
            datosUsuario={resultUserData}
            currentUser={currentUser}
            getUsuariosSeguidos={getUsuariosSeguidos}
          />
        </>
      )}
    </>
  )
}

export default Collections;