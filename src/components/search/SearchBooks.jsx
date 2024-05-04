import { useEffect } from 'react';
import axios from 'axios';

const SearchBooks = ({ search, setResponseData }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU&maxResults=15`);
        const formattedData = formatBookData(response.data.items);
        setResponseData(formattedData);
        console.log(formattedData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [search, setResponseData]);

  const formatBookData = (data) => {
    return data.map((item) => ({
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
      image: item.volumeInfo.imageLinks?.thumbnail || '',
      description: truncateDescription(item.volumeInfo.description || ''),
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
  return null;
};

export default SearchBooks;
