import '../styles/profilepage.css'

const PostShowcase = ({ datosUsuario }) => {
  return (
    <div className="posts-showcase">
      <div className="post">
        <div className="post-profile-pic">
          <div>
            <img src={datosUsuario.foto_perfil} alt="profile-pic" />
          </div>
        </div>
        <div className="post-elements">
          <div className="post-name">{datosUsuario.nombre_mostrado}</div>
          <div className="post-username">@{datosUsuario.usuario}</div>
          <div className="post-text">yo april been a good month for reading</div>
          <div className="post-content">
            <div className="post-images">
              <div className='post-image'>
                <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQg6exx0ZTbGvPwynge3k-uNPIaaai_sIb9pdRXfMDgqtEMqyQKK7gCuFsc1XhNEIFgq8m2qOJIQzSzzHn-1Z-tAdylYK-AjLoXV1wmkQtjvo-NKjBpx_cu8A&usqp=CAc" />
              </div>
              <div className='post-image'>
                <img src="https://m.media-amazon.com/images/I/718W0JbHm1L._AC_UF894,1000_QL80_.jpg" />
              </div>
              <div className='post-image'>
                <img src="https://m.media-amazon.com/images/I/81fS9LRN29L._AC_UF894,1000_QL80_.jpg" />
              </div>
            </div>

            <div className='see-more'>
              <div className="nav-button"><i data-feather="package"></i>Ver colección</div>
              <div className="nav-button no-text"><i data-feather="maximize-2"></i></div>
            </div>
          </div>
        </div>
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
    </div>
  )
}

export default PostShowcase;