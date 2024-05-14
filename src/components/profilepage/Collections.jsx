import React, { useEffect, useState } from 'react';
import { getElementosUsuario } from '../../services/ElementosServices';

const Collections = ({ currentUser, filtros, setFiltros, showCollectionsModal, setShowCollectionsModal }) => {
  const [filtroId, setFiltroId] = useState(0);
  const [coleccion, setColeccion] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coleccion = await getElementosUsuario(currentUser, filtroId, 0);
        setColeccion(coleccion);
      } catch (error) {
        console.error('Error al obtener los elementos o los usuarios:', error);
      }
    }

    fetchData();
  }, [currentUser]);

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 100);
  }, [showCollectionsModal])

  return (
    <>
      {showCollectionsModal && (
        <div className="modal-screen visible" style={{ backdropFilter: 'blur(5rem)', zIndex: '99' }}>
          <div className="collection-modal">
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

            <div className='collection'>
              {coleccion.map((e, index) => (
                <div >
                  <div className="poster" style={{ backgroundImage: `url(${e.imagen})` }}></div>
                  <div className="title">{e.nombre}</div>
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