import { useEffect, useState, useRef } from "react";
import { addToWatchLater, addToWatched, getRecommendedMovies, getWatchedMovies, getWatchLaterMovies } from "../utils/localStorage";
import MovieCard2 from "../components/MovieCard2";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState(getWatchedMovies()); // Inicializando com dados do localStorage
  const [watchLaterMovies, setWatchLaterMovies] = useState(getWatchLaterMovies()); // Inicializando com dados do localStorage
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const popularMoviesRef = useRef(null);
  const upcomingMoviesRef = useRef(null);
  const recommendedMoviesRef = useRef(null);

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleAddToWatched = (movieId) => {
    addToWatched(movieId); 
    setWatchedMovies(getWatchedMovies()); 
    alert(`Filme com ID ${movieId} adicionado aos assistidos!`); 
  };

  const handleAddToWatchLater = (movieId) => {
    addToWatchLater(movieId); 
    setWatchLaterMovies(getWatchLaterMovies());
    alert(`Filme com ID ${movieId} adicionado à lista de ver depois!`); 
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularResponse = await fetch(
          'https://api.themoviedb.org/3/movie/popular?api_key=c06259c19ce4ab594efb41273a945d05&language=pt-br'
        );
        const popularMoviesData = await popularResponse.json();
        setPopularMovies(popularMoviesData.results);

        const upcomingResponse = await fetch(
          'https://api.themoviedb.org/3/movie/upcoming?api_key=c06259c19ce4ab594efb41273a945d05&language=pt-br'
        );
        const upcomingMoviesData = await upcomingResponse.json();
        setUpcomingMovies(upcomingMoviesData.results);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      const movies = await getRecommendedMovies();
      setRecommendedMovies(movies);
    };

    fetchRecommendedMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % popularMovies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [popularMovies]);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      const movies = await getRecommendedMovies();
      setRecommendedMovies(movies);
    };

    fetchRecommendedMovies();
  }, [watchedMovies, watchLaterMovies]); 

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Carrossel de Banners */}
      {popularMovies.length > 0 && (
        <div className="relative w-full h-[500px] overflow-hidden">
          {popularMovies.map((movie, index) => (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentBannerIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h2 className="text-4xl font-bold">{movie.title}</h2>
                <p className="mt-2 max-w-md">{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="p-4">
        {/* Seção de Recomendados para Você */}
        <div className="relative">
          <h1 className="text-2xl font-bold mb-4">Recomendados para Você</h1>
          <button 
            onClick={() => scrollLeft(recommendedMoviesRef)} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full z-10"
          >
            <FaChevronLeft size={24} />
          </button>
          <div ref={recommendedMoviesRef} className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {recommendedMovies.length > 0 ? (
              recommendedMovies.map((filme) => (
                <MovieCard2
                  key={filme.id}
                  id={filme.id}
                  titulo={filme.title}
                  imagem_destaque={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                  onWatched={() => handleAddToWatched(filme.id)}
                  onWatchLater={() => handleAddToWatchLater(filme.id)}
                  showRemoveButton={false}
                />
              ))
            ) : (
              <p>Nenhum filme recomendado no momento.</p>
            )}
          </div>
          <button 
            onClick={() => scrollRight(recommendedMoviesRef)} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full z-10"
          >
            <FaChevronRight size={24} />
          </button>
        </div>

        {/* Seção de Filmes Populares */}
        <div className="relative">
          <h1 className="text-2xl font-bold mb-4">Filmes Populares</h1>
          <button 
            onClick={() => scrollLeft(popularMoviesRef)} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full z-10"
          >
            <FaChevronLeft size={24} />
          </button>
          <div ref={popularMoviesRef} className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {popularMovies.map((filme) => (
              <MovieCard2
                key={filme.id}
                id={filme.id}
                titulo={filme.title}
                imagem_destaque={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                onWatched={() => handleAddToWatched(filme.id)}
                onWatchLater={() => handleAddToWatchLater(filme.id)}
                showRemoveButton={false}
              />
            ))}
          </div>
          <button 
            onClick={() => scrollRight(popularMoviesRef)} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full z-10"
          >
            <FaChevronRight size={24} />
          </button>
        </div>

        {/* Seção de Próximos Lançamentos */}
        <div className="relative">
          <h1 className="text-2xl font-bold mb-4">Próximos Lançamentos</h1>
          <button 
            onClick={() => scrollLeft(upcomingMoviesRef)} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full z-10"
          >
            <FaChevronLeft size={24} />
          </button>
          <div ref={upcomingMoviesRef} className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {upcomingMovies.map((filme) => (
              <MovieCard2
                key={filme.id}
                id={filme.id}
                titulo={filme.title}
                imagem_destaque={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                onWatched={() => handleAddToWatched(filme.id)}
                onWatchLater={() => handleAddToWatchLater(filme.id)}
                showRemoveButton={false}
              />
            ))}
          </div>
          <button 
            onClick={() => scrollRight(upcomingMoviesRef)} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full z-10"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
