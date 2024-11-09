import { useEffect, useState } from 'react';
import { getWatchLaterMovies, removeFromWatchLater } from '../utils/localStorage';
import MovieCard from '../components/MovieCard';

export default function WatchLaterMoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const watchLaterMovieIds = getWatchLaterMovies();
      if (watchLaterMovieIds.length > 0) {
        const moviesData = await Promise.all(
          watchLaterMovieIds.map(async (id) => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c06259c19ce4ab594efb41273a945d05`);
            return response.json();
          })
        );
        setMovies(moviesData);
      }
    };

    fetchMovies();
  }, []);

  const handleRemove = (movieId) => {
    removeFromWatchLater(movieId);
    setMovies(movies.filter(movie => movie.id !== movieId));
  };

  if (movies.length === 0) return <p>Nenhum filme na lista para ver depois.</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Filmes para Ver Depois</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            id={movie.id} 
            titulo={movie.title} 
            imagem_destaque={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            onRemove={() => handleRemove(movie.id)}
          />
        ))}
      </div>
    </div>
  );
}
