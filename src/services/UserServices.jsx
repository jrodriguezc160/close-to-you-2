const baseUrl = 'https://close-to-you-2.vercel.app/close-to-you/';

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

export const searchUsuarios = async (searchString) => {
  try {
    const response = await fetch(`${baseUrl}searchUsuarios.php?string=${searchString}`);
    if (!response.ok) {
      throw new Error('Error al buscar usuarios');
    }
    const data = await response.json();
    // Verifica si la respuesta es exitosa
    if (data.success) {
      return data.data;
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    throw new Error('Error al buscar usuarios: ' + error.message);
  }
};

export const followUsuario = async (followed_id, follower_id) => {
  try {
    const formData = new FormData();
    formData.append('follower_id', follower_id);
    formData.append('followed_id', followed_id);

    const response = await fetch(`${baseUrl}followUsuario.php`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al seguir al usuario');
    }

    const data = await response.json();
    // Verifica si la respuesta es exitosa
    if (data.success) {
      return data;
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    throw new Error('Error al seguir al usuario: ' + error.message);
  }
};

export const unfollowUsuario = async (followed_id, follower_id) => {
  try {
    const formData = new FormData();
    formData.append('follower_id', follower_id);
    formData.append('followed_id', followed_id);

    const response = await fetch(`${baseUrl}unfollowUsuario.php`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al dejar de seguir al usuario');
    }

    const data = await response.json();
    // Verifica si la respuesta es exitosa
    if (data.success) {
      return data;
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    throw new Error('Error al dejar de seguir al usuario: ' + error.message);
  }
};

export const getUsuariosSeguidos = async (id_usuario) => {
  try {
    const response = await fetch(`${baseUrl}getUsuariosSeguidos.php?id_usuario=${id_usuario}`);
    if (!response.ok) {
      throw new Error('Error al obtener los usuarios seguidos');
    }
    const data = await response.json();
    // Verifica si la respuesta es exitosa
    if (data.success) {
      return data.data;
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    throw new Error('Error al obtener los usuarios seguidos: ' + error.message);
  }
};

export const editUserProfile = async (id, fotoPerfil, nombreMostrado, usuario, nombre, apellido1, apellido2, descripcion) => {
  try {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('fotoPerfil', fotoPerfil);
    formData.append('nombreMostrado', nombreMostrado);
    formData.append('usuario', usuario);
    formData.append('nombre', nombre);
    formData.append('apellido1', apellido1);
    formData.append('apellido2', apellido2);
    formData.append('descripcion', descripcion);

    const response = await fetch(baseUrl + 'editUser.php', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Error al editar el perfil de usuario');
    }

    const data = await response.json();
    // Verifica si la respuesta es exitosa
    if (data.success) {
      return data;
    } else {
      throw new Error('Error en la respuesta: ' + data.message);
    }
  } catch (error) {
    throw new Error('Error al editar el perfil de usuario: ' + error.message);
  }
};

