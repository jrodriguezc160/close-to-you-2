import React, { useState } from 'react';
import { logIn } from '../services/LogInServices';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn, setCurrentUser }) => {
  const [usuario, setUsuario] = useState('');
  const [passwd, setPasswd] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Llama a la función logIn con el usuario y la contraseña
      const { message, userId } = await logIn(usuario, passwd);

      if (message === 'Logged in successfully') {
        setIsLoggedIn(true);
        setCurrentUser(userId);
        sessionStorage.setItem('loggedIn', true);
        sessionStorage.setItem('currentUser', userId);
        navigate('/'); // Redirección a la página de Inicio cuando se inicia sesión con éxito
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='modal-screen visible'>
      <form className='modal' onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <label htmlFor="usuario">Usuario</label>
          <input type="text" placeholder='Enter usuario' value={usuario} onChange={e => setUsuario(e.target.value)} style={{ width: 'fit-content', padding: '0 8px', height: '24px', border: 'none ', outline: 'none' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <label htmlFor="passwd">Contraseña</label>
          <input type="password" placeholder='Enter passwd' value={passwd} onChange={e => setPasswd(e.target.value)} style={{ width: 'fit-content', padding: '0 8px', height: '24px', border: 'none ', outline: 'none' }} />
        </div>

        <button type="submit" style={{ width: '5rem' }}>Log in</button>
      </form>
    </div>
  )
}

export default Login;