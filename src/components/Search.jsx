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
          <div className='search-result'></div>
          <div className='search-result'></div>
          <div className='search-result'></div>
          <div className='search-result'></div>
          <div className='search-result'></div>
          <div className='search-result'></div>
          <div className='search-result'></div>
          <div className='search-result'></div>
          <div className='search-result'></div>
          <div className='search-result'></div>
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
