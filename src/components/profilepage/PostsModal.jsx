import { useEffect } from 'react';
import { addLike, deleteLike, checkUserLike, addRepost, deleteRepost, checkUserRepost } from '../../services/PostServices'; // Importa los servicios necesarios
import Post from './Post'; // Importa el componente Post

const PostsModal = ({ showPostsModal, setShowPostsModal, datosUsuario, currentUser, userPosts }) => {

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
          console.error('Error al comprobar el like:', error);
        }
      }
    };

    fetchReposts();
  }, [userPosts, currentUser, showPostsModal]);

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 100);
  }, [showPostsModal]);

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
              {userPosts.slice().reverse().map((post, index) => ( // Invertir el array userPosts
                <Post key={post.id} post={post} datosUsuario={datosUsuario} currentUser={currentUser} handleLikeClick={handleLikeClick} handleRepostClick={handleRepostClick} />
              ))}
            </div>
          </div>
        </div >
      )}
    </>
  )
}

export default PostsModal;
