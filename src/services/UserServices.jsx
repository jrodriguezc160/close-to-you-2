const baseUrl = 'https://localhost/close-to-you/';

export const getUsuarios = async () => {
  try {
    const response = await fetch(baseUrl + 'getUsuarios.php');
    if (!response.ok) {
      throw new Error('Error al obtener los usuarios');
    }
    const data = await response.json();
    // Verifica si la respuesta es exitosa
    if (data.success) {
      return data.data;
    } else {
      throw new Error('Error en la respuesta: ' + data.error);
    }
  } catch (error) {
    throw new Error('Error al obtener los usuarios: ' + error.message);
  }
};

export const getUsuarioData = async (id) => {
  try {
    const response = await fetch(`${baseUrl}getUsuarioData.php?id=${id}`);
    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }
    const data = await response.json();
    // Verifica si la respuesta es exitosa
    if (data) {
      return data.data[0];
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    throw new Error('Error al iniciar sesión: ' + error.message);
  }
};

export const editProfilePic = async (id, foto_perfil) => {
  try {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('foto_perfil', foto_perfil);

    const response = await fetch(baseUrl + 'editProfilePic.php', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }
    const data = await response.json();
    // Verifica si la respuesta es exitosa
    if (data) {
      return data.data[0];
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    throw new Error('Error al iniciar sesión: ' + error.message);
  }
};

export const editBanner = async (id, banner) => {
  try {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('banner', banner);

    const response = await fetch(baseUrl + 'editBanner.php', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }
    const data = await response.json();
    // Verifica si la respuesta es exitosa
    if (data) {
      return data.data[0];
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    throw new Error('Error al iniciar sesión: ' + error.message);
  }
};