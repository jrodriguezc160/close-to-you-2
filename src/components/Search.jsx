import '../styles/searchpage.css';
import React, { useState, useEffect } from 'react';
import SearchBooks from './search/SearchBooks';
import SearchMovies from './search/SearchMovies';
import SearchAlbums from './search/SearchAlbums';
import SearchUsers from './search/SearchUsers';
import Result from './search/Result';

const Search = () => {
  const [search, setSearch] = useState('');
  const [searchIsFocused, setSearchIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [filtros, setFiltros] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [openResultIndex, setOpenResultIndex] = useState(0);

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
    setResponseData([]);
    setSelectedItemIndex(null);
    setOpenResultIndex(0);
  }, [filtros])

  const renderSearchComponent = () => {
    switch (filtros) {
      case 'users':
        return <SearchUsers search={search} setResponseData={setResponseData} />;
      case 'books':
        return <SearchBooks search={search} setResponseData={setResponseData} />;
      case 'movies':
        return <SearchMovies search={search} setResponseData={setResponseData} />;
      case 'albums':
        return <SearchAlbums search={search} setResponseData={setResponseData} />;
      default:
        return null;
    }
  };

  const handleResultClick = (index) => {
    setOpenResultIndex(index);
  };

  /*   const handleItemClick = async (index) => {
      setSelectedItemIndex(index);
      console.log(index, selectedItemIndex);
    } */

  return (
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
              <div className={`nav-button ${filtros === 'users' ? 'selected' : ''}`} onClick={() => setFiltros('users')}><i data-feather="user"></i>Usuarios</div>
              <div className={`nav-button ${filtros === 'books' ? 'selected' : ''}`} onClick={() => setFiltros('books')}><i data-feather="book"></i>Libros</div>
              <div className={`nav-button ${filtros === 'movies' ? 'selected' : ''}`} onClick={() => setFiltros('movies')}><i data-feather="film"></i>Películas</div>
              <div className={`nav-button ${filtros === 'albums' ? 'selected' : ''}`} onClick={() => setFiltros('albums')}><i data-feather="disc"></i>Álbumes</div>
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
              onClick={() => handleResultClick(index)}
            />
          ))}
        </div>

        {renderSearchComponent()}
      </div>
      {responseData[openResultIndex] && (
        <img src={responseData[openResultIndex].image} alt="background-gradient" className='background-gradient' />
      )}
    </>
  )
}

export default Search;
