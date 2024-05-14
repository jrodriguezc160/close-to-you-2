import "../../styles/albums.css"
import React, { useEffect, useRef, useState } from 'react';
import { getElementosUsuario } from '../../services/ElementosServices'

const AlbumShelf = ({ currentUser }) => {
  const [myFavAlbums, setMyFavAlbums] = useState([]);
  const [dotIndex, setDotIndex] = useState(4); // Estado para controlar el índice del dot activo
  const [isHovering, setIsHovering] = useState(false);
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
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 100);
  }, [])

  return (
    <div style={{ width: '100%', height: '15vw', marginTop: '2vw', display: "flex", transition: 'all 1s ease-in-out', justifyContent: 'center', overflow: 'visible', alignItems: 'center', flexDirection: 'column' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <AlbumStack myFavAlbums={myFavAlbums} setIsHovering={setIsHovering} setDotIndex={setDotIndex} dotIndex={dotIndex} />

      {/* Horizontal Scroller */}
      <div className={`horizontal-scroller ${isHovering ? 'hovering' : ''}`}>
        {myFavAlbums.map((album, index) => (
          <div className={`dot ${dotIndex === index ? 'active' : ''}`} key={index}></div>
        ))}
        <div className="scroller-icon separator">|</div>
        <div className="scroller-icon"><i data-feather="maximize-2"></i></div>
      </div>
    </div>
  );
};

const AlbumStack = ({ myFavAlbums, setIsHovering, setDotIndex, dotIndex }) => {

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
        setIsHovering(false);

        setTimeout(() => {
          card.style.animation = "";
          stack.prepend(card);
          vinyl.classList.remove('hide')

          // Buscar el índice del elemento en myFavAlbums
          const index = myFavAlbums.findIndex(album => album.id === card.getAttribute("data-album-id"));
          setDotIndex(index);
          console.log('dotIndex: ', dotIndex)
          setIsHovering(true);
        }, 700);
      }
    };

    stack.addEventListener("click", swap);

    return () => {
      stack.removeEventListener("click", swap);
    };
  }, [myFavAlbums, dotIndex, setDotIndex, setIsHovering]);

  return (
    <div className='album-stack'>
      {myFavAlbums.length > 0
        ? (
          <>
            {myFavAlbums.slice().reverse().map((album, index) => (
              <div key={album.id} className="album-card" data-album-id={album.id}>
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
