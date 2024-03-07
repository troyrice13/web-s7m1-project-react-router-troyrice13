import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function SavedList(props) {
  const navigate = useNavigate()
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {props.list.map(movie => movie && (
        <Link to={`/movies/${movie.id}`} key={movie.id} className="saved-movie">{movie.title}</Link>
      ))}
      <div className="home-button" onClick={() => navigate('/')}>Home</div>
    </div>
  );
}
