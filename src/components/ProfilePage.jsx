import Navbar from './Navbar';
import PostShowcase from './PostShowcase';
import ProfileCard from './ProfileCard';

const ProfilePage = () => {
  return (
    <div className="two-columns">
      <div className="left-column">
        <div style={{ height: '2rem' }}></div>
        <div className="collections">
          <div style={{ backgroundColor: '#EBEBEB', height: '100%', width: '50%', borderRadius: '1rem' }}>
          </div>
          <div style={{ backgroundColor: '#EBEBEB', height: '100%', width: '50%', borderRadius: '1rem' }}>
          </div>
        </div>
        <ProfileCard />
      </div>
      <div className="right-column">
        <PostShowcase />
        <div className="albums">
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;