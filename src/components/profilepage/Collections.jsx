import React, { useEffect, useState } from 'react';
import { getElementosUsuario } from '../../services/ElementosServices';
import { getUsuariosSeguidos } from '../../services/UserServices';

const Collections = ({ currentUser, filtros, setFiltros, showCollectionsModal, setShowCollectionsModal }) => {
  const [filtroId, setFiltroId] = useState(0);
  const [coleccion, setColeccion] = useState([]);

  useEffect(() => {
    const elements = document.querySelectorAll('.element');
    elements.forEach(el => {
      el.classList.remove('visible');
    });

    setTimeout(() => {
      if (filtros !== 'users') {
        const fetchData = async () => {
          try {
            const coleccion = await getElementosUsuario(currentUser, filtroId);
            setColeccion(coleccion);
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
  }, [currentUser, filtroId]);

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 100);

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
  }, [showCollectionsModal, filtroId])

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
                onClick={() => {
                  setFiltros('users');
                  setFiltroId(99)
                }}>
                <i data-feather="user"></i>Usuarios
              </div>
              <div
                className={`nav-button ${filtros === 'books' ? 'selected' : ''}`}
                onClick={() => {
                  setFiltros('books');
                  setFiltroId(1)
                }}>
                <i data-feather="book"></i>Libros
              </div>
              <div
                className={`nav-button ${filtros === 'movies' ? 'selected' : ''}`}
                onClick={() => {
                  setFiltros('movies');
                  setFiltroId(5)
                }}>
                <i data-feather="film"></i>Películas
              </div>
              <div
                className={`nav-button ${filtros === 'albums' ? 'selected' : ''}`}
                onClick={() => {
                  setFiltros('albums');
                  setFiltroId(4)
                }}>
                <i data-feather="disc"></i>Álbumes
              </div>
            </div>

            <div className={`collection ${filtros}`}>
              {filtros !== 'users' && coleccion.map((e, index) => (
                <div className='element'>
                  <div className='imagen'>
                    <img src={e.imagen} alt="cover" className='cover' />
                    <img src={e.imagen} alt="ambilight" className='ambilight' />
                  </div>
                  <div className='titulo'>{e.titulo}</div>
                  <div className='autor'>{e.autor}</div>
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
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Collections;