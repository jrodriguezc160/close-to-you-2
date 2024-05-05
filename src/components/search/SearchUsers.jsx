import { useEffect } from 'react';
import { searchUsuarios } from '../../services/UserServices';

const SearchUsuarios = ({ search, setResponseData }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuarios = await searchUsuarios(search) // Llama a la función searchUsuarios con el término de búsqueda
        const formattedData = formatUsuariosData(usuarios); // Formatea los datos de los usuarios
        setResponseData(formattedData); // Establece los datos formateados en el estado
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [search, setResponseData]);

  const formatUsuariosData = (usuarios) => {
    return usuarios.map(usuario => ({
      title: usuario.nombre_mostrado,
      authors: usuario.usuario,
      description: usuario.descripcion || '',
      image: usuario.foto_perfil || '', // Aquí puedes modificar para obtener la URL correcta de la imagen del usuario
    }));
  };

  return null; // No se renderiza nada, ya que este componente solo se encarga de la lógica de búsqueda
};

export default SearchUsuarios;
