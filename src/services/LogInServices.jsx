const baseUrl = 'https://close-to-you-2.vercel.app/close-to-you/';

export const logIn = async (usuario, passwd) => {
  try {
    const response = await fetch(`${baseUrl}logIn.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario, passwd }),
    });

    const text = await response.text(); // Captura el texto de la respuesta
    if (!response.ok) {
      console.error('Error response:', text);
      throw new Error('Error al iniciar sesión');
    }
    const data = JSON.parse(text); // Intenta parsear el texto como JSON
    // Verifica si la respuesta es exitosa
    if (data.success) {
      return {
        message: data.message, // Mensaje de éxito
        token: data.token // Token JWT
      };
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    throw new Error('Error al iniciar sesión: ' + error.message);
  }
};

export const signUp = async (usuario, passwd, email, fotoPerfil) => {
  try {
    const response = await fetch(`${baseUrl}signUp.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario, passwd, email, fotoPerfil }),
    });

    const text = await response.text(); // Captura el texto de la respuesta
    if (!response.ok) {
      console.error('Error response:', text);
      throw new Error('Error al registrarse');
    }
    const data = JSON.parse(text); // Intenta parsear el texto como JSON
    // Verifica si la respuesta es exitosa
    if (data.success) {
      return {
        message: data.message, // Mensaje de éxito
      };
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    throw new Error('Error al registrarse: ' + error.message);
  }
};
