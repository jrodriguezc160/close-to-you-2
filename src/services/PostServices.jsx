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

export const deletePublicacion = async (id) => {
  try {
    const formData = new FormData();
    formData.append('id', id);

    const response = await fetch(baseUrl + 'deletePublicacion.php', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la publicación');
    }

    const data = await response.json();

    if (data.success) {
      return data.message;
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    throw new Error('Error al eliminar la publicación: ' + error.message);
  }
};


// Servicios para los likes
export const addLike = async (idUsuario, idPublicacion) => {
  try {
    const formData = new FormData();
    formData.append('id_usuario', idUsuario);
    formData.append('id_publicacion', idPublicacion);

    const response = await fetch(baseUrl + 'addLike.php', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al agregar el like');
    }

    const data = await response.json();

    if (data.success) {
      return data.message;
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    throw new Error('Error al agregar el like: ' + error.message);
  }
};

export const deleteLike = async (idUsuario, idPublicacion) => {
  try {
    const formData = new FormData();
    formData.append('id_usuario', idUsuario);
    formData.append('id_publicacion', idPublicacion);

    const response = await fetch(baseUrl + 'deleteLike.php', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el like');
    }

    const data = await response.json();

    if (data.success) {
      return data.message;
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    throw new Error('Error al eliminar el like: ' + error.message);
  }
};

export const checkUserLike = async (idUsuario, idPublicacion) => {
  try {
    const response = await fetch(`${baseUrl}checkUserLike.php?id_usuario=${idUsuario}&id_publicacion=${idPublicacion}`);
    if (!response.ok) {
      throw new Error('Error al verificar el like');
    }
    const data = await response.json();
    if (data.success) {
      return data.hasLiked;
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    throw new Error('Error al verificar el like: ' + error.message);
  }
};