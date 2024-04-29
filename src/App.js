import './index.css'
import ProfilePage from './components/ProfilePage';
import { useEffect } from 'react';

function App () {
  useEffect(() => {
    // Llamar a feather.replace() después de que el DOM se haya cargado completamente
    feather.replace();
  }, []);

  return (
    <>
      <ProfilePage />
    </>
  );
}

export default App;
