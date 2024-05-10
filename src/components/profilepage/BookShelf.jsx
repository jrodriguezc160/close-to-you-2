import "../../styles/books.css"
import React, { useEffect, useRef, useState } from 'react';
import { getElementosUsuario } from '../../services/ElementosServices';

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
    <div style={{ width: '100%', height: '100%', display: "flex", gap: "0", transition: 'all 1s ease-in-out', justifyContent: 'flex-end' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div style={{ width: '100%', height: '100%', position: 'relative', display: "flex", justifyContent: 'flex-start', alignItems: "center" }}>
        <BookStack myFavBooks={myFavBooks} setChipVisible={setChipVisible} />
      </div>
    </div>
  );
};

const BookStack = ({ myFavBooks, setChipVisible }) => {
  useEffect(() => {
    const stack = document.querySelector(".book-stack");

    const swap = (e) => {
      const card = e.target.closest(".book-card:last-child");
      if (!card || !stack.contains(card)) return;

      card.style.animation = "book-swap 700ms forwards";
      setChipVisible(false);

      if (card) {
        card.style.animation = "book-swap 700ms forwards";
        setChipVisible(false);

        setTimeout(() => {
          card.style.animation = "";
          stack.prepend(card);
        }, 700);
      }
    }

    stack.addEventListener("click", swap);

    return () => {
      stack.removeEventListener("click", swap);
    };
  }, [myFavBooks]);

  return (
    <div className='book-stack'>
      {myFavBooks.length > 0
        ? (
          myFavBooks.map((book) => (
            book && book.imagen ? (
              <div className="book-card" key={book.id} style={{ backgroundImage: `url(${book.imagen})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
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
  )
}

export default BookShelf;
