import PostShowcase from './PostShowcase';
import ProfileCard from './ProfileCard';
import AlbumShelf from './profilepage/AlbumShelf';
import BookShelf from './profilepage/BookShelf';
import MovieShelf from './profilepage/MovieShelf';
import { useState } from 'react';

const ProfilePage = ({ datosUsuario, currentUser }) => {
  const [showBookModal, setShowBookModal] = useState(false)
  const [showMovieModal, setShowMovieModal] = useState(false)
  const [showAlbumModal, setShowAlbumModal] = useState(false)

  return (
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
      <div className="right-column">
        <PostShowcase datosUsuario={datosUsuario} />
        <div className="albums">
          <AlbumShelf currentUser={datosUsuario.id} />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;