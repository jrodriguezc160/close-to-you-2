import React, { useEffect, useState } from 'react';
import { logIn, signUp } from '../services/LogInServices';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn, setCurrentUser }) => {
  const [logInForm, setLogInForm] = useState(true);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const [nombreApellidosCheck, setNombreApellidosCheck] = useState(false);
  const [mailCheck, setMailCheck] = useState(false);
  const [usuarioCheck, setUsuarioCheck] = useState(false);
  const [fotoPerfilCheck, setFotoPerfilCheck] = useState(false);

  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [ap1, setAp1] = useState('');
  const [ap2, setAp2] = useState('');
  const [nombreMostrado, setNombreMostrado] = useState('');
  const [mail, setMail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');


  const [usuarioIsFocused, setUsuarioIsFocused] = useState(false);
  const [nombreIsFocused, setNombreIsFocused] = useState(false);
  const [ap1IsFocused, setAp1IsFocused] = useState(false);
  const [ap2IsFocused, setAp2IsFocused] = useState(false);
  const [nombreMostradoIsFocused, setNombreMostradoIsFocused] = useState(false);
  const [mailIsFocused, setMailIsFocused] = useState(false);
  const [confirmPasswordIsFocused, setConfirmPasswordIsFocused] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);
  const [fotoPerfilIsFocused, setFotoPerfilIsFocused] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      feather.replace();
    }, 100);
  }, [logInForm, step])

  const handleSubmitLogIn = async (event) => {
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

  const handleSubmitSignUp = async (event) => {
    event.preventDefault();
    try {
      // Llama a la función signUp con los datos del usuario
      const { message } = await signUp(usuario, nombreMostrado, mail, password);

      if (message === 'Usuario registrado correctamente') {
        // Si el registro es exitoso, muestra un mensaje de éxito y redirige al usuario a la página de inicio de sesión
        alert('Registro exitoso. Por favor, inicia sesión.');
        setLogInForm(true);
      }
    } catch (error) {
      console.error(error);
      // Si hay un error durante el registro, muestra un mensaje de error al usuario
      alert('Error al registrar: ' + error.message);
    }
  }

  useEffect(() => {
    switch (step) {
      case 1:
        nombre !== '' && ap1 !== '' && setNombreApellidosCheck(true);
        break;

      case 2:
        usuario !== '' && nombreMostrado !== '' && (setUsuarioCheck(true));
        break;

      case 3:
        mail !== '' && password !== '' && confirmPassword === password && setMailCheck(true);
        break;

      default:
        break;
    }
  }, [step])

  return (
    <div className='modal-screen visible'>
      {logInForm ? (
        <form className='modal' onSubmit={handleSubmitLogIn}>
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
        </form>
      ) : (
        <form className='modal' onSubmit={handleSubmitSignUp}>
          {!nombreApellidosCheck && (
            <>
              <h2>¡Hola!</h2>
              <p>¿Cómo te llamas?</p>

              <div className='form-fields'>
                <label htmlFor="nombre" className={nombreIsFocused ? 'focused' : ''}>Nombre</label>
                <input type="text" placeholder='' value={nombre} onChange={e => setNombre(e.target.value)} onFocus={() => setNombreIsFocused(true)} onBlur={() => { nombre === '' && setNombreIsFocused(false) }} />
              </div>

              <div className='form-fields'>
                <label htmlFor="ap1" className={ap1IsFocused ? 'focused' : ''}>Primer apellido</label>
                <input type="text" placeholder='' value={ap1} onChange={e => setAp1(e.target.value)} onFocus={() => setAp1IsFocused(true)} onBlur={() => { ap1 === '' && setAp1IsFocused(false) }} />
              </div>

              <div className='form-fields'>
                <label htmlFor="ap2" className={ap2IsFocused ? 'focused' : ''}>Segundo apellido</label>
                <input type="text" placeholder='' value={ap2} onChange={e => setAp2(e.target.value)} onFocus={() => setAp2IsFocused(true)} onBlur={() => { ap2 === '' && setAp2IsFocused(false) }} />
              </div>

              <div className="nav-button no-text" onClick={() => setStep(1)}><i data-feather="arrow-right"></i></div>
            </>
          )}

          {nombreApellidosCheck && !usuarioCheck && (
            <>
              <h2>¡Hola, {nombre}!</h2>
              <p>Elige un usuario y un nombre para que se muestre en tu perfil</p>

              <div className='form-fields'>
                <label htmlFor="usuario" className={usuarioIsFocused ? 'focused' : ''}>Usuario</label>
                <input type="text" placeholder='' value={usuario} onChange={e => setUsuario(e.target.value)} onFocus={() => setUsuarioIsFocused(true)} onBlur={() => { usuario === '' && setUsuarioIsFocused(false) }} />
              </div>

              <div className='form-fields'>
                <label htmlFor="nombreMostrado" className={nombreMostradoIsFocused ? 'focused' : ''}>Nombre mostrado</label>
                <input type="text" placeholder='' value={nombreMostrado} onChange={e => setNombreMostrado(e.target.value)} onFocus={() => setNombreMostradoIsFocused(true)} onBlur={() => { nombreMostrado === '' && setNombreMostradoIsFocused(false) }} />
              </div>

              <div className="nav-button no-text" onClick={() => setStep(2)}><i data-feather="arrow-right"></i></div>
            </>
          )}

          {mailCheck && !fotoPerfilCheck && (
            <>
              <h2>Ya casi está, {nombre}</h2>
              <p>Introduce un email y la contraseña con la que entrarás a tu cuenta</p>

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
                <input type="password" placeholder='' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} onFocus={() => setConfirmPasswordIsFocused(true)} onBlur={() => { confirmPassword === '' && setConfirmPasswordIsFocused(false) }} />
              </div>

              <div className="nav-button no-text" onClick={() => setStep(3)}><i data-feather="arrow-right"></i></div>
            </>
          )}

          {fotoPerfilCheck && (
            <>
              <h2>Por último, ponte una foto de perfil</h2>
              <p>(opcional)</p>

              {fotoPerfil !== '' && (
                <div className="profile-pic">
                  <img src={fotoPerfil} alt="profile-pic" />
                </div>
              )}

              <div className='form-fields'>
                <label htmlFor="fotoPerfil" className={fotoPerfilIsFocused ? 'focused' : ''}>Pega aquí la url de tu foto de perfil</label>
                <input type="fotoPerfil" placeholder='' value={fotoPerfil} onChange={e => setFotoPerfil(e.target.value)} onFocus={() => setFotoPerfilIsFocused(true)} onBlur={() => { fotoPerfil === '' && setFotoPerfilIsFocused(false) }} />
              </div>

              <button type="submit" style={{ width: '6rem', border: 'none' }} className='nav-button'>Registrarse</button>
            </>
          )}

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
