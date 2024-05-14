import '../../styles/posts.css'
import React, { useEffect, useState, useRef } from 'react'

const PostShowcase = ({ datosUsuario, userPosts }) => {
  const [dotIndex, setDotIndex] = useState(4);
  const stackRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const stack = stackRef.current;

    const swap = (e) => {
      const card = e.target.closest(".post-showcase-grid:last-child");
      if (!card || !stack.contains(card)) return;

      card.style.animation = "post-swap 700ms forwards";

      if (card) {
        card.style.animation = "post-swap 700ms forwards";
        setIsHovering(false)

        setTimeout(() => {
          card.style.animation = "";
          stack.prepend(card);

          // Buscar el índice del elemento en userPosts
          const index = userPosts.findIndex(post => post.id === card.getAttribute("data-post-id"));
          setDotIndex(index);
          setIsHovering(true)
        }, 700);
      }
    }

    stack.addEventListener("click", swap);

    return () => {
      stack.removeEventListener("click", swap);
    };
  }, [userPosts]);

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 100);
  }, [])


  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%', marginBottom: '2.5rem' }}>
      <div className="post-stack" ref={stackRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {userPosts.slice().reverse().map((post, index) => { // Invertir el array userPosts
          return (
            <div className="post-showcase-grid" key={post.id} data-post-id={post.id}>
              <div className="post">
                <div className="post-profile-pic">
                  <div>
                    <img src={datosUsuario?.foto_perfil} alt="profile-pic" />
                  </div>
                </div>
                <div className="post-elements">
                  <div className="post-name">{datosUsuario?.nombre_mostrado}</div>
                  <div className="post-username">@{datosUsuario?.usuario}</div>
                  <div className="post-text">{post?.contenido}</div>
                  <div className="post-content">
                    <div className="post-images">
                      <div className='post-image'>
                        <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQg6exx0ZTbGvPwynge3k-uNPIaaai_sIb9pdRXfMDgqtEMqyQKK7gCuFsc1XhNEIFgq8m2qOJIQzSzzHn-1Z-tAdylYK-AjLoXV1wmkQtjvo-NKjBpx_cu8A&usqp=CAc" alt='dune' />
                      </div>
                      <div className='post-image'>
                        <img src="https://m.media-amazon.com/images/I/718W0JbHm1L._AC_UF894,1000_QL80_.jpg" alt='normal people' />
                      </div>
                      <div className='post-image'>
                        <img src="https://m.media-amazon.com/images/I/81fS9LRN29L._AC_UF894,1000_QL80_.jpg" alt='harry potter' />
                      </div>
                    </div>

                    <div className='see-more'>
                      <div className="nav-button"><i data-feather="package"></i>Ver colección</div>
                      <div className="nav-button no-text"><i data-feather="maximize-2"></i></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className={`horizontal-scroller ${isHovering ? 'hovering' : ''}`}>
        {userPosts.map((post, index) => (
          <div className={`dot ${dotIndex === index ? 'active' : ''}`} key={index}></div>
        ))}
        <div className="scroller-icon separator">|</div>
        <div className="scroller-icon"><i data-feather="maximize-2"></i></div>
      </div>
    </div>
  )
}

export default PostShowcase;
