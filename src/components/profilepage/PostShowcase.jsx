import React, { useEffect, useState, useRef } from 'react';
import Post from './Post'; // Importa el componente Post
import { checkUserLike } from '../../services/PostServices'; // Importa los servicios necesarios

const PostShowcase = ({ datosUsuario, userPosts, currentUser, setShowPostsModal, setDeletePublicacionModal, setDeletePostId, isAdmin }) => {
  const [dotIndex, setDotIndex] = useState(4);
  const stackRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const stack = stackRef.current;

    const swap = (e) => {
      const card = e.target.closest(".post-showcase-grid:last-child");
      const buttons = e.target.closest(".buttons");
      if (!card || buttons || !stack.contains(card)) return;

      card.style.animation = "post-swap 700ms forwards";

      if (card) {
        card.style.animation = "post-swap 700ms forwards";
        setIsHovering(false);

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

  useEffect(() => {
    const fetchLikes = async () => {
      for (const post of userPosts) {
        try {
          const hasLiked = await checkUserLike(currentUser, post.id);
          if (hasLiked) {
            document.querySelector(`[data-post-id="${post.id}"] .heart`).classList.add('active');
          }
        } catch (error) {
          console.error('Error al comprobar el like:', error);
        }
      }
    };

    fetchLikes();
  }, [userPosts, currentUser]);

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleDeleteClick = async (postId) => {
    setDeletePostId(postId);
    setDeletePublicacionModal(true)
  }

  return (
    <div className='posts-holder' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="post-stack" ref={stackRef}>
        {userPosts.reverse().slice().map((post, index) => ( // Invertir el array userPosts
          <Post
            key={post.id}
            datosUsuario={datosUsuario}
            post={post}
            currentUser={currentUser}
            handleDeleteClick={handleDeleteClick}
            isAdmin={isAdmin}
          />
        ))}
      </div>

      <div className={`horizontal-scroller ${isHovering ? 'hovering' : ''}`}>
        <div className="buttons-container">
          {userPosts.map((post, index) => (
            <div className={`dot ${dotIndex === index ? 'active' : ''}`} key={index}></div>
          ))}
          <div className="scroller-icon separator">|</div>
          <div className="scroller-icon" onClick={() => setShowPostsModal(true)}><i data-feather="maximize-2"></i></div>
        </div>
      </div>
    </div>
  )
}

export default PostShowcase;
