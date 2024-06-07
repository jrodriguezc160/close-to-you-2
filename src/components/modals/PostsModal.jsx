import { useEffect } from 'react';
import { checkUserLike } from '../../services/PostServices'; // Importa los servicios necesarios
import Post from '../profilepage/Post'; // Importa el componente Post

const PostsModal = ({ showPostsModal, setShowPostsModal, datosUsuario, currentUser, userPosts, setDeletePublicacionModal, setDeletePostId }) => {

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
  }, [userPosts, currentUser, showPostsModal]);

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 100);
  }, [showPostsModal]);

  const handleDeleteClick = async (postId) => {
    setDeletePostId(postId);
    setDeletePublicacionModal(true)
  }

  return (
    <>
      {showPostsModal && (
        <div className="modal-screen visible" style={{ backdropFilter: 'blur(5rem)', zIndex: '99' }}>
          <div className="collection-modal edit-profile" style={{ width: '65vw', alignItems: 'flex-start' }}>
            <div className="header">
              <div className='container'>
                <div className="nav-button no-text" onClick={() => setShowPostsModal(false)}><i data-feather="arrow-left"></i></div>
                <h2 className="title">Publicaciones</h2>
              </div>
            </div>

            <div className="posts-scroll">
              {userPosts.slice().map((post, index) => ( // Invertir el array userPosts
                <Post
                  key={post.id}
                  post={post}
                  datosUsuario={datosUsuario}
                  currentUser={currentUser}
                  handleDeleteClick={handleDeleteClick}
                />
              ))}
            </div>
          </div>
        </div >
      )}
    </>
  )
}

export default PostsModal;
