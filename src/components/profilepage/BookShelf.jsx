import "../../styles/bookshelf.css"
import React, { useEffect, useRef, useState } from 'react';
// import VerticalIconbar from '../VerticalIconBar';
import BookStack from './BookStack';
import { getElementosUsuario } from '../../services/ElementosServices'

const BookShelf = ({ currentUser }) => {
  const [myFavBooks, setMyFavBooks] = useState([]);

  const [chipVisible, setChipVisible] = useState(false);
  const imagesRef = useRef(null);
  const imageWidthRef = useRef(0);
  const imageOffsetRef = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const librosFavoritos = await getElementosUsuario(currentUser, 1, 1);
        setMyFavBooks(librosFavoritos);
        const libros = await getElementosUsuario(currentUser, 1);
        // setMyBooks(libros);
      } catch (error) {
        console.error('Error al obtener los elementos o los usuarios:', error);
      }
    }

    fetchData();
  }, []);

  /*   const handleRemoveFavourite = () => {
      const updatedBooks = [...myFavBooks];
      updatedBooks.shift(); // Remove the first book
      setMyFavBooks(updatedBooks);
    } */

  useEffect(() => {
    imageWidthRef.current = imagesRef?.current?.firstElementChild?.offsetWidth;
    imageOffsetRef.current = imagesRef?.current?.firstElementChild?.offsetLeft;
  }, []);

  const handleMouseEnter = () => { setChipVisible(true) }
  const handleMouseLeave = () => { setChipVisible(false) }
  // const handleEdit = () => { setShowBookModal(!showBookModal) }

  return (
    <div style={{ width: '12vw', height: '12vw', display: "flex", gap: "0", transition: 'all 1s ease-in-out' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div style={{ width: '100%', height: '12vw', position: 'relative', display: "flex", justifyContent: 'flex-start', alignItems: "center" }}>
        <div style={{ bottom: '-1vw', right: '3vw', zIndex: '20', width: '3vw', height: '3vw', position: 'absolute' }} >
          <img src='https://em-content.zobj.net/source/apple/391/books_1f4da.png' style={{ width: 'inherit', height: 'inherit' }} />
        </div>

        <BookStack
          myFavBooks={myFavBooks}
          // handleEdit={handleEdit}
          setChipVisible={setChipVisible}
        />
      </div>
      {/* 
      <div style={{ marginTop: '.5rem' }}>
        {myFavBooks.length > 0 && <VerticalIconbar chipVisible={chipVisible} handleEdit={handleEdit} handleRemoveFavourite={handleRemoveFavourite} />}
      </div> */}
    </div >
  );
};

export default BookShelf;