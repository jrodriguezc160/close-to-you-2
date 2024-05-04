import { useEffect } from 'react';
import axios from 'axios';

const SearchMovies = ({ search, setResponseData }) => {
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
      description: item.volumeInfo.description || '',
    }));
  };

  return null;
};

export default SearchMovies;
