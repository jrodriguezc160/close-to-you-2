import { useEffect } from 'react';
import axios from 'axios';

const SearchMovies = ({ search, setResponseData }) => {
  useEffect(() => {
    const searchMovies = async () => {
      try {
        const response = await getMovieRequest(search);
        const formattedData = formatMovieData(response.data.results);
        console.log(response)
        setResponseData(formattedData);
      } catch (error) {
        console.error(error);
      }
    };
    searchMovies();
  }, [search, setResponseData]);

  const getMovieRequest = async (searchValue) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmRiY2QzMzRiYWI5MjViMjg5MTEwNDY1YTg4MDZkNiIsInN1YiI6IjY1NGRmM2I0NDFhNTYxMzM2YzVmYjU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HY7VrsbpUBeQtEhGzZC1NYNRrU29_KsLVW-NmyH_8EU',
      },
    };

    const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=es-ES&page=1`;
    return await axios.get(url, options);
  };

  const formatMovieData = (data) => {
    return data.map((movie) => ({
      title: movie.title,
      authors: movie.release_date,
      description: truncateDescription(movie.overview || ''),
      image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
    }));
  };

  const truncateDescription = (description) => {
    // Truncate description to 600 characters without cutting words
    if (description.length <= 600) {
      return description;
    }

    const truncatedDescription = description.substring(0, 600);
    const lastSpaceIndex = truncatedDescription.lastIndexOf(' ');
    if (lastSpaceIndex !== -1) {
      return truncatedDescription.substring(0, lastSpaceIndex) + '...';
    } else {
      return truncatedDescription + '...';
    }
  };

  return null;
};

export default SearchMovies;
