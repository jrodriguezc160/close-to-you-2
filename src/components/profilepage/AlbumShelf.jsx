import "../../styles/albums.css"
import React, { useEffect, useRef, useState } from 'react';
import { getElementosUsuario } from '../../services/ElementosServices'

const AlbumShelf = ({ currentUser }) => {
  const [myFavAlbums, setMyFavAlbums] = useState([]);

  const [chipVisible, setChipVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const imagesRef = useRef(null);
  const imageWidthRef = useRef(0);
  const imageOffsetRef = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumesFavoritos = await getElementosUsuario(currentUser, 4, 1);
        setMyFavAlbums(albumesFavoritos);
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

  const handleMouseEnter = () => {
    setChipVisible(true)
  }

  const handleMouseLeave = () => {
    setChipVisible(false)
  }

  return (
    <div style={{ width: '100%', height: editing ? 'auto' : '18vw', display: "flex", gap: "2rem", transition: 'all 1s ease-in-out', justifyContent: 'flex-start', overflow: 'visible', alignItems: 'center' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div style={{ width: '100%', height: '100%', position: 'relative', display: "flex", justifyContent: "center", alignItems: "end" }}>
        <AlbumStack myFavAlbums={myFavAlbums} setChipVisible={setChipVisible} />
      </div>
    </div>
  );
};

const AlbumStack = ({ myFavAlbums, setChipVisible }) => {

  useEffect(() => {
    const stack = document.querySelector(".album-stack");
    if (!stack) return;

    const swap = (e) => {
      const card = e.target.closest(".album-card:last-child");
      if (!card || !stack.contains(card)) return;

      const vinyl = card.querySelector(".vinyl");
      if (card) {
        vinyl.classList.add('hide')
        card.style.animation = "album-swap 700ms forwards";
        setChipVisible(false);

        setTimeout(() => {
          card.style.animation = "";
          stack.prepend(card);
          vinyl.classList.remove('hide')
        }, 700);
      }
    };

    stack.addEventListener("click", swap);

    return () => {
      stack.removeEventListener("click", swap);
    };
  }, []);

  return (
    <div className='album-stack'>
      {myFavAlbums.length > 0
        ? (
          <>
            {myFavAlbums.map((album, index) => (
              <div key={index} className="album-card">
                <div className="album-cover" style={{ backgroundImage: `url(${album.imagen})` }}></div>
                <div className="vinyl" style={{ zIndex: '-5' }}></div>
              </div>
            ))}
          </>
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

export default AlbumShelf;
