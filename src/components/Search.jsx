import '../styles/searchpage.css';
import React, { useState } from 'react';

const Search = () => {
  const [search, setSearch] = useState('');
  const [searchIsFocused, setSearchIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filtros, setFiltros] = useState('');

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterClick = (filter) => {
    // Asignar el filtro seleccionado
    setFiltros(filter);
  };

  const isFilterSelected = (filter) => {
    return filtros.includes(filter);
  };

  return (
    <div className="two-columns">
      <div className="search-left-column">
        <div className={showFilters ? "wrapper expanded" : "wrapper"}>
          <h3>Busca aquí...</h3>
          <div className='input-container'>
            <div className='form-fields search-field'>
              <i data-feather="search"></i>
              <label htmlFor="search" className={searchIsFocused ? 'focused' : ''}>Busca aquí</label>
              <input type="text" placeholder='' value={search} onChange={e => setSearch(e.target.value)} onFocus={() => setSearchIsFocused(true)} onBlur={() => { search === '' && setSearchIsFocused(false) }} />
            </div>

            <div className="nav-button no-text" onClick={toggleFilters}><i data-feather="sliders"></i></div>
            <div className="nav-button no-text"><i data-feather="send"></i></div>
          </div>

          <div className={showFilters ? ('search-filters visible') : ('search-filters')}>
            <div className={`nav-button ${isFilterSelected('Usuarios') ? 'selected' : ''}`} onClick={() => handleFilterClick('Usuarios')}><i data-feather="user"></i>Usuarios</div>
            <div className={`nav-button ${isFilterSelected('Libros') ? 'selected' : ''}`} onClick={() => handleFilterClick('Libros')}><i data-feather="book"></i>Libros</div>
            <div className={`nav-button ${isFilterSelected('Películas') ? 'selected' : ''}`} onClick={() => handleFilterClick('Películas')}><i data-feather="film"></i>Películas</div>
            <div className={`nav-button ${isFilterSelected('Álbumes') ? 'selected' : ''}`} onClick={() => handleFilterClick('Álbumes')}><i data-feather="disc"></i>Álbumes</div>
          </div>
        </div>

        <div className="results">
          <h2>Resultados para '{search ? search : '...'}'</h2>
          <div className='search-result'></div>
          <div className='search-result'></div>
          <div className='search-result'></div>
          <div className='search-result'></div>
          <div className='search-result'></div>
        </div>
      </div>
      <div className="right-column">
      </div>
    </div>
  )
}

export default Search;
