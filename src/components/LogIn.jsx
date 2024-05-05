import React, { useState } from 'react';
import { logIn } from '../services/LogInServices';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn, setCurrentUser }) => {
  const [usuario, setUsuario] = useState('');
  const [passwd, setPasswd] = useState('');
  const navigate = useNavigate();
  const [usuarioIsFocused, setUsuarioIsFocused] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Llama a la función logIn con el usuario y la contraseña
      const { message, userId } = await logIn(usuario, passwd);

      if (message === 'Logged in successfully') {
        setIsLoggedIn(true);
        setCurrentUser(userId);
        sessionStorage.setItem('isLoggedIn', true); // Guarda isLoggedIn como un booleano
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
        <h2>Iniciar sesión</h2>
        <div className='form-fields'>
          <label htmlFor="usuario" className={usuarioIsFocused ? 'focused' : ''}>Usuario</label>
          <input type="text" placeholder='' value={usuario} onChange={e => setUsuario(e.target.value)} onFocus={() => setUsuarioIsFocused(true)} onBlur={() => { usuario === '' && setUsuarioIsFocused(false) }} />
        </div>

        <div className='form-fields'>
          <label htmlFor="passwd" className={passwordIsFocused ? 'focused' : ''}>Contraseña</label>
          <input type="password" placeholder='' value={passwd} onChange={e => setPasswd(e.target.value)} onFocus={() => setPasswordIsFocused(true)} onBlur={() => { passwd === '' && setPasswordIsFocused(false) }} />
        </div>

        <button type="submit" style={{ width: '5rem', border: 'none' }} className='nav-button'>Log in</button>
      </form>
    </div>
  )
}

export default Login;
