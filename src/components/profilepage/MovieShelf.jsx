import "../../styles/movies.css"
import React, { useEffect, useRef, useState } from 'react';
import { getElementosUsuario } from '../../services/ElementosServices';

const MovieShelf = ({ currentUser }) => {
  const [myFavMovies, setMyFavMovies] = useState([]);
  const [chipVisible, setChipVisible] = useState(false);
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

  const handleMouseEnter = () => { setChipVisible(true) }
  const handleMouseLeave = () => { setChipVisible(false) }

  return (
    <div style={{ width: '100%', height: '100%', display: "flex", gap: ".5rem", justifyContent: 'center', marginRight: '0' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div style={{ width: '100%', height: '100%', position: 'relative', display: "flex", justifyContent: "center", alignItems: "center" }}>
        <MovieStack myFavMovies={myFavMovies} setChipVisible={setChipVisible} />
      </div>
    </div>
  );
};

const MovieStack = ({ myFavMovies, setChipVisible }) => {
  useEffect(() => {
    const stack = document.querySelector(".movie-stack");

    const swap = (e) => {
      const card = document.querySelector(".movie-card:last-child");
      if (e.target !== card) return;

      card.style.animation = "movie-swap 700ms forwards";
      setChipVisible(false);

      setTimeout(() => {
        card.style.animation = "";
        stack.prepend(card);
      }, 700);
    }

    stack.addEventListener("click", swap);

    return () => {
      stack.removeEventListener("click", swap);
    };
  }, []);

  return (
    <div className='movie-stack'>
      {myFavMovies.length > 0
        ? (
          myFavMovies.map((movie, index) => (
            <div key={index} className="movie-card" style={{ backgroundImage: `url(${movie.imagen})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
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
