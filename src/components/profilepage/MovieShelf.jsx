import "../../styles/movies.css"
import React, { useEffect, useRef, useState } from 'react';
import { getElementosUsuario } from '../../services/ElementosServices';

const MovieShelf = ({ currentUser }) => {
  const [myFavMovies, setMyFavMovies] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [dotIndex, setDotIndex] = useState(0); // Estado para controlar el índice del dot activo
  const imagesRef = useRef(null);
  const imageWidthRef = useRef(0);
  const imageOffsetRef = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const peliculasFavoritas = await getElementosUsuario(currentUser, 5, 1);
        setMyFavMovies(peliculasFavoritas);
      } catch (error) {
        console.error('Error al obtener los elementos o los usuarios:', error);
      }
    }

    fetchData();
  }, [currentUser]);

  useEffect(() => {
    imageWidthRef.current = imagesRef?.current?.firstElementChild?.offsetWidth;
    imageOffsetRef.current = imagesRef?.current?.firstElementChild?.offsetLeft;
  }, []);

  const handleMouseEnter = () => { setIsHovering(true) }
  const handleMouseLeave = () => { setIsHovering(false) }

  return (
    <div style={{ width: '100%', height: '100%', display: "flex", gap: "0", justifyContent: 'center', alignItems: 'center', marginRight: '0', flexDirection: 'column' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div style={{ width: '100%', height: '87%', position: 'relative', display: "flex", justifyContent: "center", alignItems: "center" }}>
        <MovieStack myFavMovies={myFavMovies} setIsHovering={setIsHovering} isHovering={isHovering} setDotIndex={setDotIndex} />
      </div>

      {/* Horizontal Scroller */}
      <div className={`horizontal-scroller ${isHovering ? 'hovering' : ''}`}>
        {myFavMovies.map((movie, index) => (
          <div className={`dot ${dotIndex === index ? 'active' : ''}`} key={index}></div>
        ))}
        <div className="scroller-icon separator">|</div>
        <div className="scroller-icon"><i data-feather="maximize-2"></i></div>
      </div>
    </div>
  );
};

const MovieStack = ({ myFavMovies, setIsHovering, dotIndex, setDotIndex }) => {
  useEffect(() => {
    const stack = document.querySelector(".movie-stack");

    const swap = (e) => {
      const card = document.querySelector(".movie-card:last-child");
      if (e.target !== card) return;

      card.style.animation = "movie-swap 700ms forwards";
      setIsHovering(false);

      setTimeout(() => {
        card.style.animation = "";
        stack.prepend(card);

        // Buscar el índice del elemento en myFavBooks
        const index = myFavMovies.findIndex(movie => movie.id === card.getAttribute("data-movie-id"));
        setDotIndex(index);
        console.log('dotIndex: ', dotIndex)
        setIsHovering(true);
      }, 700);
    }

    stack.addEventListener("click", swap);

    return () => {
      stack.removeEventListener("click", swap);
    };
  }, [myFavMovies]);

  return (
    <div className='movie-stack'>
      {myFavMovies.length > 0
        ? (
          myFavMovies.map((movie, index) => (
            <div key={index} data-movie-id={movie.id} className="movie-card" style={{ backgroundImage: `url(${movie.imagen})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            </div>
          ))
        )
        : (
          <div style={{ width: '100%', height: '100%', border: '2px dashed lightgray', borderRadius: '8px' }}>
            <div style={{ width: '100%', height: '100%', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
              <i data-feather="plus-circle"></i>
            </div>
          </div>
        )}
    </div>
  )
}

export default MovieShelf;
