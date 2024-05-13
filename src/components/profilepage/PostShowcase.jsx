import '../../styles/posts.css'
import React, { useEffect } from 'react'

const PostShowcase = ({ datosUsuario, userPosts }) => {
  useEffect(() => {
    const stack = document.querySelector(".post-stack");

    const swap = (e) => {
      const card = e.target.closest(".post-showcase-grid:last-child");
      if (!card || !stack.contains(card)) return;

      card.style.animation = "post-swap 700ms forwards";

      if (card) {
        card.style.animation = "post-swap 700ms forwards";

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

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 100);
  }, [])

  return (
    <>
      <div className="post-stack">
        {userPosts.map((post, index) => {
          return (
            <div className="post-showcase-grid">
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

      <div className="horizontal-scroller">
        <div className="dot active"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="scroller-icon separator">|</div>
        <div className="scroller-icon"><i data-feather="maximize-2"></i></div>
      </div>
    </>
  )
}

export default PostShowcase;