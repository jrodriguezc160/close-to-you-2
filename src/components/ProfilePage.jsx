import PostShowcase from './profilepage/PostShowcase';
import ProfileCard from './profilepage/ProfileCard';
import AlbumShelf from './profilepage/AlbumShelf';
import BookShelf from './profilepage/BookShelf';
import MovieShelf from './profilepage/MovieShelf';
import { useEffect, useState } from 'react';
import { getPublicacionesUsuario } from '../services/PostServices';
import '../styles/profilepage.css'

const ProfilePage = ({ datosUsuario, currentUser }) => {
  const [userPosts, setUserPosts] = useState([]);

  const [showBookModal, setShowBookModal] = useState(false);
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [showAlbumModal, setShowAlbumModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await getPublicacionesUsuario(currentUser);
        // Limitar los posts a los tres primeros
        setUserPosts(posts.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="two-columns">
        <div className="left-column">
          <div style={{ height: '2rem' }}></div>
          <div className="collections">
            <div className='collection-container'>
              <BookShelf currentUser={datosUsuario.id} />
            </div>

            <div className='collection-container'>
              <MovieShelf currentUser={datosUsuario.id} />
            </div>
          </div>
          <ProfileCard datosUsuario={datosUsuario} currentUser={currentUser} />
        </div>
        <div className="right-column" style={{ overflow: 'hidden' }}>
          <div style={{
            width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', gap: '1rem'
          }}>
            <PostShowcase datosUsuario={datosUsuario} userPosts={userPosts} />
          </div>
          <div className="albums">
            <AlbumShelf currentUser={datosUsuario.id} />
          </div>
        </div>
      </div>
      <img src={datosUsuario.foto_perfil} alt="background-gradient" className='background-gradient profile' />
    </>
  )
}

export default ProfilePage;
