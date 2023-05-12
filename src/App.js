import React, {useEffect, useState} from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites'
import RemoveFavourites from './components/RemoveFavourites';

function App() {

  const [movies, setMovies] = useState([])
  const [favourites, setFavourites] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const getMovieRecuest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`
    // const url = "http://www.omdbapi.com/?i=tt3896198&apikey=7edb1dc9"

    const response = await fetch(url)
    const responseJson = await response.json()


    if (responseJson.Search){
      setMovies(responseJson.Search)
    }
   

  }

  useEffect(() => {
    getMovieRecuest(searchValue)
  }, [searchValue])

  const addFavouriteMovie = (movie) => {
      const newFavouriteList = [...favourites, movie]
      setFavourites(newFavouriteList)
  }
  const removeFavouriteMovie = (movie) => {
      const newFavouriteList = favourites.filter(
        (favourite) => favourite.imdbID !== movie.imdbID)
      setFavourites(newFavouriteList)
  }

  
  return (
    <div className="App">
     <div className='row'>
      <MovieListHeading heading = 'Movies List' />
      <SearchBox searchValue = {searchValue}  setSearchValue = {setSearchValue}/>
     </div>
     <div className='row'>
    <MovieList movies = {movies} handleFavouritesClick={addFavouriteMovie}  FavouriteComponent = {AddFavourites}/>
     </div>

     <div className='row'>
      <MovieListHeading heading = 'Favourites' />
    
     </div>
     <div className='row'>

    <MovieList movies = {favourites} 
               handleFavouritesClick={removeFavouriteMovie}  
              FavouriteComponent = {RemoveFavourites}/>
     </div>
    
    </div>
  );
}

export default App;
