import React, { useEffect } from 'react';

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
    <>
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
              <div style={{ width: '100%', height: '100%', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} /* onClick={handleEdit} */>
                <i data-feather="plus-circle"></i>
              </div>
            </div>
          )}
      </div>
    </>
  )
}

export default MovieStack;