const baseUrl = 'https://close-to-you-2.vercel.app/close-to-you/';

export const fetchPublicaciones = async () => {
  try {
    const response = await fetch(baseUrl + 'getPublicaciones.php');
    if (!response.ok) {
      throw new Error('Error al obtener las publicaciones');
    }
    const data = await response.json();
    // Verifica si la respuesta es exitosa
    if (data.success) {
      return data.data;
    } else {
      throw new Error('Error en la respuesta: ' + data.error);
    }
  } catch (error) {
    throw new Error('Error al obtener las publicaciones: ' + error.message);
  }
};

export const getPublicacionesUsuario = async (id_usuario) => {
  try {
    const response = await fetch(`${baseUrl}getPublicacionesUsuario.php?id_usuario=${id_usuario}`);
    if (!response.ok) {
      throw new Error('Error al obtener las publicaciones');
    }
    const data = await response.json();
    // Verifica si la respuesta es exitosa
    if (data.success) {
      return data.data;
    } else {
      throw new Error('Error en la respuesta: ' + data.error);
    }
  } catch (error) {
    throw new Error('Error al obtener las publicaciones: ' + error.message);
  }
};

export const addPublicacion = async (idUsuario, contenido) => {
  try {
    const formData = new FormData();
    formData.append('id_usuario', idUsuario);
    formData.append('contenido', contenido);

    const response = await fetch(baseUrl + 'addPublicacion.php', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al agregar la publicación');
    }

    const data = await response.json();

    if (data.success) {
      return data.message;
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    throw new Error('Error al agregar la publicación: ' + error.message);
  }
};