import '../../styles/posts.css'
import React, { useEffect, useState, useRef } from 'react'

const PostShowcase = ({ datosUsuario, userPosts, handleOpenCollections }) => {
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
              <div className="post" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="post-profile-pic">
                  <div>
                    <img src={datosUsuario?.foto_perfil} alt="profile-pic" />
                  </div>
                </div>
                <div className="post-elements">
                  <div className="post-top">
                    <div className="post-username">
                      <div><b>{datosUsuario?.nombre_mostrado}</b></div>
                      <div>@{datosUsuario?.usuario}</div>
                    </div>

                    <div className="post-text">{post?.contenido}</div>
                    <div className="buttons">
                      <div className="nav-button no-text"><i data-feather="heart"></i></div>
                      <div className="nav-button no-text"><i data-feather="repeat"></i></div>
                      <div className="nav-button no-text"><i data-feather="message-circle"></i></div>
                      <span style={{ color: 'var(--gray-2)' }}>·&nbsp;&nbsp;{post?.fecha}</span>
                    </div>
                  </div>

                  <div className="post-bottom">
                    <div className="comments">
                      <span>Comentarios</span>
                      <div className="comment-bar"></div>
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
