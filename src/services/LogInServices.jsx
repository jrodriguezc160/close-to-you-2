const baseUrl = 'https://localhost/close-to-you/';

export const logIn = async (usuario, passwd) => {
  try {
    const response = await fetch(`${baseUrl}logIn.php?usuario=${usuario}&passwd=${passwd}`);
    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }
    const data = await response.json();
    // Verifica si la respuesta es exitosa
    if (data.success) {
      return {
        message: data.message, // Mensaje de éxito
        userId: data.userId // ID del usuario
      };
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    throw new Error('Error al iniciar sesión: ' + error.message);
  }
};