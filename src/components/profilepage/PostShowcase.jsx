import '../../styles/posts.css'
import React, { useEffect, useState, useRef } from 'react'
import { addLike, deleteLike, checkUserLike, addRepost, deleteRepost, checkUserRepost } from '../../services/PostServices'; // Importa los servicios necesarios

const PostShowcase = ({ datosUsuario, userPosts, currentUser }) => {
  const [dotIndex, setDotIndex] = useState(4);
  const stackRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

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

    const fetchReposts = async () => {
      for (const post of userPosts) {
        try {
          const hasReposted = await checkUserRepost(currentUser, post.id);
          if (hasReposted) {
            console.log('User has reposted this')
            document.querySelector(`[data-post-id="${post.id}"] .repeat`).classList.add('active');
          }
        } catch (error) {
          console.error('Error al comprobar el repost:', error);
        }
      }
    };

    fetchReposts();
  }, [userPosts, currentUser]);

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleLikeClick = async (postId) => {
    try {
      const heartButton = document.querySelector(`[data-post-id="${postId}"] .heart`);
      if (heartButton.classList.contains('active')) {
        await deleteLike(currentUser, postId);
        heartButton.classList.remove('active');
      } else {
        await addLike(currentUser, postId);
        heartButton.classList.add('active');
      }
    } catch (error) {
      console.error('Error al manejar el like:', error);
    }
  };

  const handleRepostClick = async (postId) => {
    try {
      const repeatButton = document.querySelector(`[data-post-id="${postId}"] .repeat`);
      if (repeatButton.classList.contains('active')) {
        await deleteRepost(currentUser, postId);
        repeatButton.classList.remove('active');
      } else {
        await addRepost(currentUser, postId);
        repeatButton.classList.add('active');
      }
    } catch (error) {
      console.error('Error al manejar el repost:', error);
    }
  };

  const handleNext = () => {
    const card = stackRef.current.querySelector('.post-showcase-grid:last-child');
    if (!card) return;

    card.style.animation = "post-swap 700ms forwards";
    setIsHovering(false);

    setTimeout(() => {
      card.style.animation = "";
      stackRef.current.prepend(card);

      const index = userPosts.findIndex(post => post.id === card.getAttribute("data-post-id"));
      setDotIndex(index);
      setIsHovering(true);
    }, 700);
  };

  return (
    <div className='post-container' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="post-stack" ref={stackRef}>
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
                      {/* Agrega el onClick para llamar a handleLikeClick */}
                      <div className="nav-button no-text interactive heart" onClick={() => handleLikeClick(post.id)}>
                        <i data-feather="heart"></i>
                      </div>
                      <div className="nav-button no-text interactive repeat" onClick={() => handleRepostClick(post.id)}>
                        <i data-feather="repeat"></i>
                      </div>
                      <div className="nav-button no-text interactive message"><i data-feather="message-circle"></i></div>
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
        <div className="buttons-container">
          {userPosts.map((post, index) => (
            <div className={`dot ${dotIndex === index ? 'active' : ''}`} key={index}></div>
          ))}
          <div className="scroller-icon separator">|</div>
          <div className="scroller-icon"><i data-feather="maximize-2"></i></div>
        </div>

        <div className="buttons-container next" onClick={handleNext}>
          <div className="scroller-icon"><i data-feather="chevron-right"></i></div>
        </div>
      </div>
    </div>
  )
}

export default PostShowcase;
