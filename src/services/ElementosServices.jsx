const baseUrl = 'http://close-to-you.atwebpages.com/close-to-you/';

export const getElementosUsuario = async (id_usuario, id_coleccion, favorito) => {
  try {
    let url = `${baseUrl}getElementosUsuario.php?id_usuario=${id_usuario}&id_coleccion=${id_coleccion}`;
    if (favorito !== undefined) {
      url += `&favorito=${favorito}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al obtener los elementos');
    }
    const data = await response.json();
    // Verifica si la respuesta es exitosa
    if (data.success) {
      return data.data;
    } else {
      throw new Error('Error en la respuesta: ' + data.error);
    }
  } catch (error) {
    throw new Error('Error al obtener los elementos: ' + error.message);
  }
};

export const addElemento = async (id_usuario, id_coleccion, titulo, autor, imagen, id_api, favorito) => {
  try {
    const formData = new FormData();
    formData.append('id_usuario', id_usuario);
    formData.append('id_coleccion', id_coleccion);
    formData.append('titulo', titulo);
    formData.append('autor', autor);
    formData.append('imagen', imagen);
    formData.append('id_api', id_api);
    formData.append('favorito', favorito);

    const response = await fetch(baseUrl + 'addElemento.php', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al agregar el elemento');
    }

    const data = await response.json();

    if (data.success) {
      return data.message;
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    throw new Error('Error al agregar el elemento: ' + error.message);
  }
};

export const editElemento = async (id_usuario, id_api, id_coleccion, favorito) => {
  try {
    const formData = new FormData();
    formData.append('id_usuario', id_usuario);
    formData.append('id_api', id_api);
    formData.append('id_coleccion', id_coleccion);
    formData.append('favorito', favorito);

    const response = await fetch(baseUrl + 'editElemento.php', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al editar el elemento');
    }

    const data = await response.json();

    if (data.success) {
      return data.message;
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    throw new Error('Error al editar el elemento: ' + error.message);
  }
};

export const deleteElemento = async (id_usuario, id_api) => {
  try {
    const formData = new FormData();
    formData.append('id_usuario', id_usuario);
    formData.append('id_api', id_api);

    const response = await fetch(baseUrl + 'deleteElemento.php', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el elemento');
    }

    const data = await response.json();

    if (data.success) {
      return data.message;
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    throw new Error('Error al eliminar el elemento: ' + error.message);
  }
};