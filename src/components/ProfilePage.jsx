import PostShowcase from './PostShowcase';
import ProfileCard from './ProfileCard';
import AlbumShelf from './profilepage/AlbumShelf';
import BookShelf from './profilepage/BookShelf';
import MovieShelf from './profilepage/MovieShelf';

const ProfilePage = ({ datosUsuario }) => {
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
        <ProfileCard datosUsuario={datosUsuario} />
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