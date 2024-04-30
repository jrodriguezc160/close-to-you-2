import React, { useState } from 'react';
import { logIn } from '../services/LogInServices'; // Importa la función logIn del archivo de servicios

const Login = ({ onLoginSuccess, setCurrentUser }) => {
  const [usuario, setUsuario] = useState('');
  const [passwd, setPasswd] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Llama a la función logIn con el usuario y la contraseña
      const { message, userId } = await logIn(usuario, passwd);
      console.log(message); // Maneja la respuesta del servicio aquí
      console.log('ID seleccionado: ', userId);

      if (message === 'Logged in successfully') {
        setCurrentUser(userId);
        onLoginSuccess();
        sessionStorage.setItem('loggedIn', true);
        sessionStorage.setItem('currentUser', userId);
      }
    } catch (error) {
      console.error(error); // Maneja los errores aquí
    }
  }

  return (
    <div className='modal-screen visible'>
      <form className='modal' style={{ backgroundColor: 'lightgray', height: '50vh', display: 'flex', gap: '2vw', alignItems: 'center', borderRadius: '12px' }} onSubmit={handleSubmit}>
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