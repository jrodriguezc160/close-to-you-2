import React, { useEffect, useState } from 'react';
import { logIn, signUp } from '../services/LogInServices';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = ({ setIsLoggedIn, setCurrentUser }) => {
  const [logInForm, setLogInForm] = useState(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [logInError, setLogInError] = useState('');

  const [usuario, setUsuario] = useState('');
  const [mail, setMail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');

  const [usuarioIsFocused, setUsuarioIsFocused] = useState(false);
  const [mailIsFocused, setMailIsFocused] = useState(false);
  const [confirmPasswordIsFocused, setConfirmPasswordIsFocused] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);
  const [fotoPerfilIsFocused, setFotoPerfilIsFocused] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 100);
  }, [logInForm, isLoading]);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmitLogIn = async (event) => {
    event.preventDefault();
    try {
      const { message, token } = await logIn(usuario, password);

      if (message === 'Inicio de sesión exitoso') {
        setIsLoading(true);
        sessionStorage.setItem('token', token);
        const decodedUser = jwtDecode(token);
        setCurrentUser(decodedUser.userId);

        setTimeout(() => {
          setIsLoggedIn(true);
          navigate('/');
        }, 1000);
      } else {
        setLogInError('Error: usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error(error);
      setLogInError('Error: usuario o contraseña incorrectos');
    }
  };

  const handleSubmitSignUp = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!validatePassword(password)) {
      alert('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y un carácter especial.');
      return;
    }

    if (!validateEmail(mail)) {
      alert('Por favor, introduce un correo electrónico válido');
      return;
    }

    try {
      const { message } = await signUp(usuario, password, mail, fotoPerfil);

      if (message === 'Usuario registrado correctamente') {
        alert('Registro exitoso. Por favor, inicia sesión.');
        setLogInForm(true);
      }
    } catch (error) {
      console.error(error);
      alert('Error al registrar: ' + error.message);
    }
  };

  return (
    <div className='modal-screen visible form-page'>
      {logInForm ? (
        <form className='modal' onSubmit={handleSubmitLogIn}>
          <h2>¡Bienvenido!</h2>
          <div className='form-fields'>
            <label htmlFor="usuario" className={usuarioIsFocused ? 'focused' : ''}>Usuario</label>
            <input type="text" placeholder='' value={usuario} onChange={e => setUsuario(e.target.value)} onFocus={() => setUsuarioIsFocused(true)} onBlur={() => { usuario === '' && setUsuarioIsFocused(false); }} autoFocus />
          </div>

          <div className='form-fields'>
            <label htmlFor="password" className={passwordIsFocused ? 'focused' : ''}>Contraseña</label>
            <input type="password" placeholder='' value={password} onChange={e => setPassword(e.target.value)} onFocus={() => setPasswordIsFocused(true)} onBlur={() => { password === '' && setPasswordIsFocused(false); }} />
          </div>

          {logInError && <div style={{ color: 'red', padding: '0' }}>{logInError}</div>}

          <button type="submit" style={{ width: '7rem', border: 'none' }} className='nav-button log-in'>
            {!isLoading && (<span>Iniciar sesión</span>)}
            {isLoading && (<i data-feather="loader" className='loader'></i>)}
          </button>

          <div className="change-form">
            <span>¿No tienes una cuenta?</span>
            <span className='register' onClick={() => setLogInForm(false)}>Regístrate ahora</span>
          </div>
        </form>
      ) : (
        <form className='modal' onSubmit={handleSubmitSignUp}>
          <div style={{ textAlign: 'center' }}>
            <h2>¡Hola!</h2><br />
            <p>Vamos a crearte un usuario</p>
          </div>

          <div className='form-fields'>
            <label htmlFor="usuario" className={usuarioIsFocused ? 'focused' : ''}>Usuario</label>
            <input type="text" placeholder='' value={usuario} onChange={e => setUsuario(e.target.value)} onFocus={() => setUsuarioIsFocused(true)} onBlur={() => { usuario === '' && setUsuarioIsFocused(false); }} />
          </div>

          <div className='form-fields'>
            <label htmlFor="mail" className={mailIsFocused ? 'focused' : ''}>Correo electrónico</label>
            <input type="text" placeholder='' value={mail} onChange={e => setMail(e.target.value)} onFocus={() => setMailIsFocused(true)} onBlur={() => { mail === '' && setMailIsFocused(false); }} />
          </div>

          <div className='form-fields'>
            <label htmlFor="password" className={passwordIsFocused ? 'focused' : ''}>Contraseña</label>
            <input type="password" placeholder='' value={password} onChange={e => setPassword(e.target.value)} onFocus={() => setPasswordIsFocused(true)} onBlur={() => { password === '' && setPasswordIsFocused(false); }} />
          </div>

          <div className='form-fields'>
            <label htmlFor="confirmPassword" className={confirmPasswordIsFocused ? 'focused' : ''}>Confirmar contraseña</label>
            <input type="password" placeholder='' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} onFocus={() => setConfirmPasswordIsFocused(true)} onBlur={() => { confirmPassword === '' && setConfirmPasswordIsFocused(false); }} />
          </div>

          {fotoPerfil !== '' && (
            <div className="profile-pic">
              <img src={fotoPerfil} alt="profile-pic" />
            </div>
          )}

          <div className='form-fields'>
            <label htmlFor="fotoPerfil" className={fotoPerfilIsFocused ? 'focused' : ''}>Pega aquí la url de tu foto de perfil</label>
            <input type="fotoPerfil" placeholder='' value={fotoPerfil} onChange={e => setFotoPerfil(e.target.value)} onFocus={() => setFotoPerfilIsFocused(true)} onBlur={() => { fotoPerfil === '' && setFotoPerfilIsFocused(false); }} />
          </div>

          <button type="submit" style={{ width: '6rem', border: 'none' }} className='nav-button'>Registrarse</button>

          <div className="change-form">
            <span>¿Ya estás registrado?</span>
            <span className='register' onClick={() => setLogInForm(true)}>Inicia sesión</span>
          </div>
        </form>
      )}
    </div>
  )
}

export default Login;
