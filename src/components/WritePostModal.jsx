import { useEffect, useState } from 'react';
import { addPublicacion } from '../services/PostServices'; // Asegúrate de ajustar la ruta según corresponda
import '../styles/posts.css';
import '../styles/writepostmodal.css';

const WritePostModal = ({ writePost, setWritePost, datosUsuario }) => {
  const [postContent, setPostContent] = useState('');

  const handleClickExterior = (event) => {
    if (event.target.classList.contains('modal-screen')) {
      setTimeout(() => {
        setWritePost(false);
      }, 1000);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    feather.replace();
  }, [writePost]);

  const handlePublish = async () => {
    try {
      const message = await addPublicacion(datosUsuario.id, postContent);
      alert(message);
      setWritePost(false);
    } catch (error) {
      console.error('Error al agregar la publicación:', error.message);
    }
  };

  const currentDate = new Date().toDateString();

  return (
    <>
      <div className={`modal-screen ${writePost ? 'visible' : ''}`} style={{ height: '100vh', zIndex: '200', backdropFilter: 'blur(1rem)' }} onClick={handleClickExterior}>
        <div className="post-showcase-grid on-modal">
          <div className="post" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <div className="post-profile-pic">
              <div>
                <img src={datosUsuario?.foto_perfil} alt="profile-pic" />
              </div>
            </div>
            <div className="post-elements">
              <div className="post-top" style={{ paddingRight: '0', width: 'calc(100% - 1rem)' }}>
                <div className="post-username">
                  <div><b>{datosUsuario?.nombre_mostrado}</b></div>
                  <div>@{datosUsuario?.usuario}</div>
                </div>

                <div className="post-text">
                  <input
                    type="text"
                    placeholder='¿En qué estás pensando?'
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </div>
                <div className="buttons-bottom">
                  <div className="left">
                    <div className="nav-button on-modal no-text"><i data-feather="heart"></i></div>
                    <div className="nav-button on-modal no-text"><i data-feather="repeat"></i></div>
                    <div className="nav-button on-modal no-text"><i data-feather="message-circle"></i></div>
                    <span style={{ color: 'var(--gray-2)' }}>·&nbsp;&nbsp;{currentDate}</span>
                  </div>

                  <div className='right'>
                    <div className="nav-button on-modal cancel" onClick={() => setWritePost(false)}>
                      <i data-feather="x"></i>Cancelar
                    </div>
                    <div className="nav-button on-modal publish" onClick={handlePublish}>
                      <i data-feather="send"></i>Publicar
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WritePostModal;
