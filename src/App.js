import './index.css';
import './styles/responsive.css';
import ProfilePage from './components/ProfilePage';
import { useEffect } from 'react';

function App () {
  useEffect(() => {
    // Llamar a feather.replace() después de que el DOM se haya cargado completamente
    // eslint-disable-next-line no-undef
    feather.replace();
  }, []);

  return (
    <>
      <ProfilePage />
    </>
  );
}

export default App;
