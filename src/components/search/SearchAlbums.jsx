import { useEffect } from 'react';
import axios from 'axios';

const SearchAlbums = ({ search, setResponseData }) => {
  const API_KEY = '73ca2ef62d6bab497ca88979ab55584e';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${search}&api_key=${API_KEY}&format=json&limit=10`);
        if (response.data && response.data.results && response.data.results.albummatches && response.data.results.albummatches.album) {
          const matchingAlbums = response.data.results.albummatches.album;
          const formattedData = formatAlbumData(matchingAlbums);
          setResponseData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [search, setResponseData]);

  const formatAlbumData = (albums) => {
    return albums.map(album => ({
      title: album.name,
      authors: album.artist,
      description: album.wiki ? truncateDescription(album.wiki.summary) : '',
      image: getLargestImage(album.image),
    }));
  };

  const truncateDescription = (description) => {
    // Truncar la descripción a 600 caracteres sin cortar palabras
    if (description.length <= 600) {
      return description;
    }

    const truncatedDescription = description.substring(0, 600);
    // Encuentra el último espacio en blanco en el texto truncado
    const lastSpaceIndex = truncatedDescription.lastIndexOf(' ');
    if (lastSpaceIndex !== -1) {
      // Corta en el último espacio en blanco
      return truncatedDescription.substring(0, lastSpaceIndex) + '...';
    } else {
      // Si no se encontró un espacio en blanco, solo retorna el texto truncado
      return truncatedDescription + '...';
    }
  };

  const getLargestImage = (images) => {
    if (!images || !Array.isArray(images) || images.length === 0) {
      return '';
    }

    // Ordenar las imágenes por tamaño
    const sortedImages = images.sort((a, b) => {
      const sizeOrder = { 'small': 0, 'medium': 1, 'large': 2, 'extralarge': 3 };
      return sizeOrder[b.size] - sizeOrder[a.size];
    });

    // Devolver la URL de la imagen más grande
    return sortedImages[0]['#text'];
  };

  return null;
};

export default SearchAlbums;
