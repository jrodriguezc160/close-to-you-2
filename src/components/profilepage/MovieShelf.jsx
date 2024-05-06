import "../../styles/movies.css"
import React, { useEffect, useRef, useState } from 'react';
// import VerticalIconbar from '../VerticalIconBar';
import MovieStack from './MovieStack';
import { getElementosUsuario } from '../../services/ElementosServices'

const MovieShelf = ({ currentUser }) => {
  const [myFavMovies, setMyFavMovies] = useState([]);
  const [chipVisible, setChipVisible] = useState(false);
  const imagesRef = useRef(null);
  const imageWidthRef = useRef(0);
  const imageOffsetRef = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const librosFavoritos = await getElementosUsuario(currentUser, 5, 1);
        setMyFavMovies(librosFavoritos);
        // const libros = await getElementosUsuario(currentUser, 5);
        // setMyMovies(libros);
      } catch (error) {
        console.error('Error al obtener los elementos o los usuarios:', error);
      }
    }

    fetchData();
  }, [currentUser]);

  /*   const handleRemoveFavourite = () => {
      const updatedMovies = [...myFavMovies];
      updatedMovies.shift(); // Remove the first Movie
      setMyFavMovies(updatedMovies);
    };
   */

  useEffect(() => {
    imageWidthRef.current = imagesRef?.current?.firstElementChild?.offsetWidth;
    imageOffsetRef.current = imagesRef?.current?.firstElementChild?.offsetLeft;
  }, []);

  const handleMouseEnter = () => {
    setChipVisible(true);
  };

  const handleMouseLeave = () => {
    setChipVisible(false);
  };

  /*   const handleEdit = () => {
      setShowMovieModal(!showMovieModal)
    } */

  return (
    <div style={{ width: "12vw", height: "12vw", display: "flex", gap: ".5rem", justifyContent: 'center', marginRight: '0' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/*       <div style={{ marginTop: '.5rem', marginRight: '0' }}>
        {myFavMovies.length > 0 && <VerticalIconbar chipVisible={chipVisible} handleEdit={handleEdit} handleRemoveFavourite={handleRemoveFavourite} movie={myFavMovies && myFavMovies.length > 0 ? myFavMovies[0] : null} />}
      </div> */}

      <div style={{ width: '100%', height: '12vw', position: 'relative', display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/*       <div style={{ bottom: '-0.5vw', right: '3vw', zIndex: '20', width: '3vw', height: '3vw', position: 'absolute' }} >
          <img src='https://em-content.zobj.net/source/apple/391/film-frames_1f39e-fe0f.png' style={{ width: 'inherit', height: 'inherit' }} alt='Películas' />
        </div> */}

        <MovieStack
          myFavMovies={myFavMovies}
          setChipVisible={setChipVisible}
        />
      </div>
    </div>
  );
};

export default MovieShelf;