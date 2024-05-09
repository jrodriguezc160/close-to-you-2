import '../styles/searchpage.css';
import React, { useState, useEffect } from 'react';
import SearchBooks from './search/SearchBooks';
import SearchMovies from './search/SearchMovies';
import SearchAlbums from './search/SearchAlbums';
import SearchUsers from './search/SearchUsers';
import Result from './search/Result';
import { getElementosUsuario } from '../services/ElementosServices';
import { getUsuariosSeguidos } from '../services/UserServices';
import ProfilePage from './ProfilePage';
import { getUsuarioData } from '../services/UserServices';

const Search = ({ currentUser }) => {
  const [search, setSearch] = useState('');
  const [searchIsFocused, setSearchIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [filtros, setFiltros] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [openResultIndex, setOpenResultIndex] = useState(0);
  const [miColeccion, setMiColeccion] = useState([]);
  const [filtroId, setFiltroId] = useState(0);
  const [showLimit, setShowLimit] = useState(false);
  const [usuariosSeguidos, setUsuariosSeguidos] = useState([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [resultUserData, setResultUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    feather.replace();
  }, [search, responseData]);

  useEffect(() => {
    setTimeout(() => {
      setShowLimit(false);
    }, 2000);
  }, [showLimit]);

  const fetchUsuariosSeguidos = async () => {
    try {
      const usuarios = await getUsuariosSeguidos(currentUser);
      setUsuariosSeguidos(usuarios);
    } catch (error) {
      console.error('Error al obtener los usuarios seguidos');
    }
  }

  const getColeccion = async () => {
    try {
      const elementos = await getElementosUsuario(currentUser, filtroId);
      setMiColeccion(elementos);
      console.log(miColeccion);
    } catch (error) {
      console.error('Error al obtener los elementos o los usuarios');
    }
  }

  const favLimit = filtroId === 4 ? 5 : 3;

  useEffect(() => {
    if (filtros === 'users') {
      fetchUsuariosSeguidos();
      console.log(getUsuariosSeguidos())
    } else {
      // Llamar a getColeccion cada vez que cambie filtroId
      getColeccion();
    }
  }, [filtroId]);

  useEffect(() => {
    setResponseData([]);
    setSelectedItemIndex(null);
    setOpenResultIndex(0);
  }, [filtros]);

  const renderSearchComponent = () => {
    switch (filtros) {
      case 'users':
        return <SearchUsers search={search} setResponseData={setResponseData} />
      case 'books':
        return <SearchBooks search={search} setResponseData={setResponseData} />
      case 'albums':
        return <SearchAlbums search={search} setResponseData={setResponseData} />
      case 'movies':
        return <SearchMovies search={search} setResponseData={setResponseData} />
      default:
        return null;
    }
  };

  const handleResultClick = (index) => {
    setOpenResultIndex(index);
  };

  const handleClickExterior = (event) => {
    if (event.target.classList.contains('modal-screen')) {
      setTimeout(() => {
        setShowLimit(false)
      }, 1000);
    }
  }

  const handleVerPerfil = async (idUsuario) => {
    // Llamara a usuarioData con idUsuario
    const getUserData = async () => {
      try {
        const userData = await getUsuarioData(idUsuario);
        console.log('Datos de usuario:', userData);
        setResultUserData(userData)
      } catch (error) {
        console.error(error);
      }
    };
    await getUserData();
    await setLoading(true);
    setTimeout(async () => {
      await setLoading(false)
      await setProfileOpen(true);
    }, 1500);
  }

  return (
    <>
      <div className={`modal-screen ${showLimit ? 'visible' : ''}`} style={{ height: '100vh', zIndex: '200', }} onClick={handleClickExterior}>
        <div className={`modal-message ${showLimit ? 'visible' : ''}`} style={{ zIndex: '201', visibility: showLimit ? 'visible' : 'hidden', opacity: showLimit ? 1 : 0 }}>
          <i data-feather="alert-triangle"></i>

          <p>Límite de favoritos: {favLimit}</p>
          <p>Elimine un favorito para continuar</p>
        </div>
      </div>

      <div className={`modal-screen ${loading ? 'visible' : ''}`} style={{ height: '100vh', zIndex: '200', }} onClick={handleClickExterior}>
        <div className={`modal-message ${loading ? 'visible' : ''}`} style={{ zIndex: '201', gap: '1rem', visibility: loading ? 'visible' : 'hidden', opacity: loading ? 1 : 0 }}>
          <i data-feather="loader" className='loader'></i>
          <p>Cargando...</p>
        </div>
      </div>

      {!profileOpen ? (
        <>
          <div className="two-columns">
            <div className="search-left-column">
              <div className={showFilters ? "wrapper expanded" : "wrapper"}>
                <h3>Busca aquí...</h3>
                <div className='input-container'>
                  <div className='form-fields search-field'>
                    <i data-feather="search"></i>
                    <label htmlFor="search" className={searchIsFocused ? 'focused' : ''}>Busca aquí</label>
                    <input type="text" placeholder='' value={search} onChange={handleInputChange} onFocus={() => setSearchIsFocused(true)} onBlur={() => { search === '' && setSearchIsFocused(false) }} />
                  </div>

                  <div className={`nav-button no-text ${showFilters && 'selected'}`} onClick={toggleFilters}><i data-feather="sliders"></i></div>
                  <div className="nav-button no-text"><i data-feather="send"></i></div>
                </div>

                <div className={showFilters ? ('search-filters visible') : ('search-filters')}>
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
              </div>
            </div>

            <div className="results-column">
              {responseData.map((result, index) => (
                <Result
                  result={result}
                  key={index}
                  filtros={filtros}
                  isFirstResult={index === 0}
                  isOpen={index === openResultIndex}
                  onClick={() => {
                    handleResultClick(index); console.log(miColeccion)
                  }}
                  miColeccion={miColeccion}
                  getColeccion={getColeccion}
                  currentUser={currentUser}
                  idColeccion={filtroId}
                  setShowLimit={setShowLimit}
                  getUsuariosSeguidos={getUsuariosSeguidos}
                  usuariosSeguidos={usuariosSeguidos}
                  handleVerPerfil={handleVerPerfil}
                />
              ))}
            </div>

            {renderSearchComponent()}
          </div>
          {responseData[openResultIndex] && (
            <img src={responseData[openResultIndex].image} alt="background-gradient" className='background-gradient' />
          )}
        </>
      ) : (
        <>
          <ProfilePage datosUsuario={resultUserData} />
        </>
      )}
    </>
  )
}

export default Search;
