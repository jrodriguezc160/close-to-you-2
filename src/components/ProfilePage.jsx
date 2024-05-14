import PostShowcase from './profilepage/PostShowcase';
import ProfileCard from './profilepage/ProfileCard';
import AlbumShelf from './profilepage/AlbumShelf';
import BookShelf from './profilepage/BookShelf';
import MovieShelf from './profilepage/MovieShelf';
import { useEffect, useState } from 'react';
import { getPublicacionesUsuario } from '../services/PostServices';
import '../styles/profilepage.css'
import Collections from './profilepage/Collections';

const ProfilePage = ({ datosUsuario, currentUser }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [filtros, setFiltros] = useState('');
  const [showCollectionsModal, setShowCollectionsModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await getPublicacionesUsuario(currentUser);
        // Limitar los posts a los tres primeros
        setUserPosts(posts.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleOpenCollections = (filtro) => {
    setShowCollectionsModal(true);
    setFiltros(filtro)
  }

  return (
    <>
      <Collections
        showCollectionsModal={showCollectionsModal}
        setShowCollectionsModal={setShowCollectionsModal}
        filtros={filtros}
      />

      <div className="two-columns">
        <div className="left-column">
          <div style={{ height: '2rem' }}></div>
          <div className="collections">
            <div className='collection-container'>
              <BookShelf currentUser={datosUsuario.id} handleOpenCollections={handleOpenCollections} />
            </div>

            <div className='collection-container'>
              <MovieShelf currentUser={datosUsuario.id} handleOpenCollections={handleOpenCollections} />
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
            <AlbumShelf currentUser={datosUsuario.id} handleOpenCollections={handleOpenCollections} />
          </div>
        </div>
      </div>
      <img src={datosUsuario.foto_perfil} alt="background-gradient" className='background-gradient profile' />
    </>
  )
}

export default ProfilePage;
