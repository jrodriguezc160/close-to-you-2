import '../styles/searchpage.css';
import React, { useState, useEffect } from 'react';
import SearchBooks from './search/SearchBooks';

const Search = () => {
  const [search, setSearch] = useState('');
  const [searchIsFocused, setSearchIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filtros, setFiltros] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    feather.replace();
  }, [search]);

  const renderSearchComponent = () => {
    switch (filtros) {
      case 'Usuarios':
        return null; // Agrega componente de búsqueda de usuarios si es necesario
      case 'Libros':
        return <SearchBooks search={search} setResponseData={setResponseData} />;
      case 'Películas':
        return <SearchBooks search={search} setResponseData={setResponseData} />;
      case 'Álbumes':
        return <SearchBooks search={search} setResponseData={setResponseData} />;
      default:
        return null;
    }
  };

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
    console.log(index, selectedItemIndex)
  }

  return (
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
            <div className={`nav-button ${filtros === 'Usuarios' ? 'selected' : ''}`} onClick={() => setFiltros('Usuarios')}><i data-feather="user"></i>Usuarios</div>
            <div className={`nav-button ${filtros === 'Libros' ? 'selected' : ''}`} onClick={() => setFiltros('Libros')}><i data-feather="book"></i>Libros</div>
            <div className={`nav-button ${filtros === 'Películas' ? 'selected' : ''}`} onClick={() => setFiltros('Películas')}><i data-feather="film"></i>Películas</div>
            <div className={`nav-button ${filtros === 'Álbumes' ? 'selected' : ''}`} onClick={() => setFiltros('Álbumes')}><i data-feather="disc"></i>Álbumes</div>
          </div>
        </div>

        <div className="results">
          <h2>Resultados para '{search ? search : '...'}'</h2>
          {responseData.map((result, index) => (
            <div key={index} className='search-result'>
              <div className={`info ${selectedItemIndex === index ? 'selected' : ''}`}>
                <div className="cover-image">
                  <img src={result?.image} alt="cover" />
                </div>
                <p>{result?.title}</p>
              </div>

              <div className="nav-button no-text" onClick={() => handleItemClick(index)}><i data-feather="arrow-right-circle"></i></div>
            </div>
          ))}
        </div>
      </div>
      <div className="right-column">
        <div className="big-display">
          {selectedItemIndex !== null && (
            <div className='big-image'>
              <div className="cover">
                <img src={responseData[selectedItemIndex]?.image} alt="cover" />
              </div>
              <div className="ambilight">
                <img src={responseData[selectedItemIndex]?.image} alt="cover" />
              </div>
            </div>
          )}
          <h2><b>{responseData[selectedItemIndex]?.title}</b> · {responseData[selectedItemIndex]?.authors}</h2>
          {/* <h4>{responseData[selectedItemIndex]?.authors}</h4> */}
          <p>{responseData[selectedItemIndex]?.description}</p>
        </div>
      </div>
      {renderSearchComponent()}
    </div>
  )
}

export default Search;
