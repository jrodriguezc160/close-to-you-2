const SearchBooks = () => {
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU&maxResults=15`)
    .then(res => setBookData(res.data.items))
    .catch(err => console.log(err));
}

export default SearchBooks;