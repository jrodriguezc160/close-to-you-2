import "../../styles/books.css"
import React, { useEffect, useRef, useState } from 'react';
import { getElementosUsuario } from '../../services/ElementosServices';

const BookShelf = ({ currentUser, handleOpenCollections }) => {
  const [myFavBooks, setMyFavBooks] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const imagesRef = useRef(null);
  const imageWidthRef = useRef(0);
  const imageOffsetRef = useRef(0);
  const [dotIndex, setDotIndex] = useState(2); // Estado para controlar el índice del dot activo

  useEffect(() => {
    const fetchData = async () => {
      try {
        const librosFavoritos = await getElementosUsuario(currentUser, 1, 1);
        setMyFavBooks(librosFavoritos);
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

  useEffect(() => {
    const stack = document.querySelector(".book-stack");

    const swap = (e) => {
      const card = e.target.closest(".book-card:last-child");
      if (!card || !stack.contains(card)) return;

      card.style.animation = "book-swap 700ms forwards";
      setIsHovering(false);

      if (card) {
        card.style.animation = "book-swap 700ms forwards";
        setIsHovering(false);

        setTimeout(() => {
          card.style.animation = "";
          stack.prepend(card);

          // Buscar el índice del elemento en myFavBooks
          const index = myFavBooks.findIndex(book => book.id === card.getAttribute("data-book-id"));
          setDotIndex(index);
          console.log('dotIndex: ', dotIndex)
          setIsHovering(true);
        }, 700);
      }
    }

    stack.addEventListener("click", swap);

    return () => {
      stack.removeEventListener("click", swap);
    };
  }, [myFavBooks]);

  return (
    <div style={{ width: '100%', height: '100%', display: "flex", gap: "0", transition: 'all 1s ease-in-out', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div style={{ width: '100%', height: '87%', position: 'relative', display: "flex", justifyContent: 'flex-start', alignItems: "center" }}>
        <div className='book-stack'>
          {myFavBooks.length > 0
            ? (
              myFavBooks.slice().reverse().map((book) => (
                book && book.imagen ? (
                  <div className="book-card" key={book.id} data-book-id={book.id} style={{ backgroundImage: `url(${book.imagen})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                  </div>
                ) : (
                  <div className="book-card no-cover-book-card" key={book.id}>
                    <div style={{ width: '100%', height: 'fit-content', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', color: 'white', margin: '1vw', padding: '.5vw', textAlign: 'center', backgroundColor: 'cadetblue', fontFamily: 'serif', borderRadius: '4px' }}>
                      {book.titulo}
                    </div>
                  </div>
                )
              ))
            ) : (
              <div style={{ width: '7vw', height: '11vw', border: '2px dashed lightgray', borderRadius: '4px 16px 16px 4px' }}>
                <div style={{ width: '100%', height: '100%', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                  <i data-feather="plus-circle"></i>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Horizontal Scroller */}
      <div className={`horizontal-scroller ${isHovering ? 'hovering' : ''}`}>
        <div className="buttons-container">
          {myFavBooks.map((book, index) => (
            <div className={`dot ${dotIndex === index ? 'active' : ''}`} key={index}></div>
          ))}
          <div className="scroller-icon separator">|</div>
          <div className="scroller-icon" onClick={() => handleOpenCollections('books', 1)}><i data-feather="maximize-2"></i></div>
        </div>
      </div>
    </div>
  );
};

export default BookShelf;