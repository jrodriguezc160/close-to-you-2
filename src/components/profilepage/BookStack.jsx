import React, { useEffect } from 'react';
import '../../styles/bookstack.css';
// import { FiPlus } from "@react-icons/all-files/fi/FiPlus";

const BookStack = ({ myFavBooks, handleEdit, setChipVisible }) => {

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
  }, []);

  return (
    <>
      <div className='book-stack'>
        {myFavBooks.length > 0
          ? (
            myFavBooks.map((book) => (
              book && book.imagen ? (
                <div className="book-card" key={book.id} style={{ backgroundImage: `url(${book.imagen})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                </div>
              ) : (
                <div className="book-card no-cover-book-card">
                  <div style={{ width: '100%', height: 'fit-content', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', color: 'white', margin: '1vw', padding: '.5vw', textAlign: 'center', backgroundColor: 'cadetblue', fontFamily: 'serif', borderRadius: '4px' }}>
                    {book.titulo}
                  </div>
                </div>
              )
            ))
          )
          : (
            <div style={{ width: '7vw', height: '11vw', border: '2px dashed lightgray', borderRadius: '4px 16px 16px 4px' }}>
              <div style={{ width: '100%', height: '100%', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={handleEdit}>
                <i data-feather="plus-circle"></i>
              </div>
            </div>
          )}
      </div>
    </>
  )
}

export default BookStack;