import PostShowcase from './profilepage/PostShowcase';
import ProfileCard from './profilepage/ProfileCard';
import AlbumShelf from './profilepage/AlbumShelf';
import BookShelf from './profilepage/BookShelf';
import MovieShelf from './profilepage/MovieShelf';
import { useEffect, useState } from 'react';
import { getPublicacionesUsuario } from '../services/PostServices';
import '../styles/profilepage.css'
import Collections from './profilepage/Collections';
import EditProfile from './profilepage/EditProfile';
import Loading from './Loading';

const ProfilePage = ({ datosUsuario, currentUser, resultUserData, handleVerPerfil, loading, profileOpen }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [filtros, setFiltros] = useState('');
  const [showCollectionsModal, setShowCollectionsModal] = useState(false);
  const [filtroId, setFiltroId] = useState(0);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await getPublicacionesUsuario(datosUsuario.id);
        // Limitar los posts a los tres primeros
        setUserPosts(posts.slice(0, 5));
      } catch (error) {
        console.error("Error fetching user's posts' data:", error);
      }
    };

    fetchData();
  }, [datosUsuario]);

  const handleOpenCollections = (filtro, filtroId) => {
    setShowCollectionsModal(true);
    setFiltros(filtro);
    setFiltroId(filtroId)
  }

  return (
    <>
      <Loading loading={loading} />

      <EditProfile
        datosUsuario={datosUsuario}
        showEditProfileModal={showEditProfileModal}
        setShowEditProfileModal={setShowEditProfileModal}
      />

      <Collections
        currentUser={datosUsuario.id}
        showCollectionsModal={showCollectionsModal}
        setShowCollectionsModal={setShowCollectionsModal}
        filtros={filtros}
        setFiltros={setFiltros}
        filtroId={filtroId}
        setFiltroId={setFiltroId}
        handleVerPerfil={handleVerPerfil}
        loading={loading}
        profileOpen={profileOpen}
        resultUserData={resultUserData}
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
          <ProfileCard datosUsuario={datosUsuario} currentUser={currentUser} handleOpenCollections={handleOpenCollections} setShowEditProfileModal={setShowEditProfileModal} />
        </div>
        <div className="right-column" style={{ overflow: 'hidden' }}>
          <div style={{
            width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', gap: '1rem'
          }}>
            <PostShowcase datosUsuario={datosUsuario} userPosts={userPosts} handleOpenCollections={handleOpenCollections} />
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
