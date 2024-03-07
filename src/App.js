import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './Movies/MovieList'
import Movie from './Movies/Movie';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

import SavedList from './Movies/SavedList';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5001/api/movies') // Study this endpoint with Postman
        .then(response => {
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movies' slice of state
          setMovies(response.data)
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
    if (!saved.includes(id)) {
      setSaved([...saved, id])
    }
  };

  return (
    <div>
      <SavedList list={saved.map(id => movies.find(movie => movie.id === id)).filter(movie => movie !== undefined)} />

      <Routes>
        <Route path='/' element={<MovieList movies={movies}/>} />
        <Route path='/movies/:id' element={<Movie addToSavedList={addToSavedList} />} />
      </Routes>
    </div>
  );
}
