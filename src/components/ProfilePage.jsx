import Navbar from './Navbar';
import PostShowcase from './PostShowcase';
import ProfileCard from './ProfileCard';

const ProfilePage = () => {
  return (
    <div className="two-columns">
      <div className="left-column">
        <Navbar />
        <div className="collections">
          <div style={{ backgroundColor: '#EBEBEB', height: '100%', width: '50%' }}>
          </div>
          <div style={{ backgroundColor: '#EBEBEB', height: '100%', width: '50%' }}>
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