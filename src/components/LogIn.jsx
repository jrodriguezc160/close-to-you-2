import React, { useState } from 'react';
import { logIn } from '../services/LogInServices';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn, setCurrentUser }) => {
  const [logInForm, setLogInForm] = useState(true);

  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [ap1, setAp1] = useState('');
  const [ap2, setAp2] = useState('');
  const [nombreMostrado, setNombreMostrado] = useState('');
  const [mail, setMail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [usuarioIsFocused, setUsuarioIsFocused] = useState(false);
  const [nombreIsFocused, setNombreIsFocused] = useState(false);
  const [ap1IsFocused, setAp1IsFocused] = useState(false);
  const [ap2IsFocused, setAp2IsFocused] = useState(false);
  const [nombreMostradoIsFocused, setNombreMostradoIsFocused] = useState(false);
  const [mailIsFocused, setMailIsFocused] = useState(false);
  const [confirmPasswordIsFocused, setConfirmPasswordIsFocused] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Llama a la función logIn con el usuario y la contraseña
      const { message, userId } = await logIn(usuario, password);

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
        {logInForm ? (
          <>
            <h2>Iniciar sesión</h2>
            <div className='form-fields'>
              <label htmlFor="usuario" className={usuarioIsFocused ? 'focused' : ''}>Usuario</label>
              <input type="text" placeholder='' value={usuario} onChange={e => setUsuario(e.target.value)} onFocus={() => setUsuarioIsFocused(true)} onBlur={() => { usuario === '' && setUsuarioIsFocused(false) }} />
            </div>

            <div className='form-fields'>
              <label htmlFor="password" className={passwordIsFocused ? 'focused' : ''}>Contraseña</label>
              <input type="password" placeholder='' value={password} onChange={e => setPassword(e.target.value)} onFocus={() => setPasswordIsFocused(true)} onBlur={() => { password === '' && setPasswordIsFocused(false) }} />
            </div>

            <button type="submit" style={{ width: '5rem', border: 'none' }} className='nav-button'>Log in</button>
            <div className="change-form">
              <span>¿No tienes una cuenta?</span>
              <span className='register' onClick={() => setLogInForm(false)}>Regístrate ahora</span>
            </div>
          </>
        ) : (
          <>
            <h2>Registrarse</h2>

            <div className='form-fields'>
              <label htmlFor="usuario" className={usuarioIsFocused ? 'focused' : ''}>Usuario</label>
              <input type="text" placeholder='' value={usuario} onChange={e => setUsuario(e.target.value)} onFocus={() => setUsuarioIsFocused(true)} onBlur={() => { usuario === '' && setUsuarioIsFocused(false) }} />
            </div>

            <div className='form-fields'>
              <label htmlFor="nombreMostrado" className={nombreMostradoIsFocused ? 'focused' : ''}>Nombre mostrado</label>
              <input type="text" placeholder='' value={nombreMostrado} onChange={e => setNombreMostrado(e.target.value)} onFocus={() => setNombreMostradoIsFocused(true)} onBlur={() => { nombreMostrado === '' && setNombreMostradoIsFocused(false) }} />
            </div>

            <div className='form-fields'>
              <label htmlFor="mail" className={mailIsFocused ? 'focused' : ''}>Correo electrónico</label>
              <input type="text" placeholder='' value={mail} onChange={e => setMail(e.target.value)} onFocus={() => setMailIsFocused(true)} onBlur={() => { mail === '' && setMailIsFocused(false) }} />
            </div>

            <div className='form-fields'>
              <label htmlFor="password" className={passwordIsFocused ? 'focused' : ''}>Contraseña</label>
              <input type="password" placeholder='' value={password} onChange={e => setPassword(e.target.value)} onFocus={() => setPasswordIsFocused(true)} onBlur={() => { password === '' && setPasswordIsFocused(false) }} />
            </div>

            <div className='form-fields'>
              <label htmlFor="confirmPassword" className={confirmPasswordIsFocused ? 'focused' : ''}>Confirmar contraseña</label>
              <input type="confirmPassword" placeholder='' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} onFocus={() => setConfirmPasswordIsFocused(true)} onBlur={() => { confirmPassword === '' && setConfirmPasswordIsFocused(false) }} />
            </div>

            <button type="submit" style={{ width: '5rem', border: 'none' }} className='nav-button'>Log in</button>
            <div className="change-form">
              <span>¿Ya estás registrado?</span>
              <span className='register' onClick={() => setLogInForm(true)}>Inicia sesión</span>
            </div>
          </>
        )}
      </form>
    </div>
  )
}

export default Login;
