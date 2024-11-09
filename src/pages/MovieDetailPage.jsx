import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToWatched, addToWatchLater, removeFromWatched, removeFromWatchLater } from "../utils/localStorage.js";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=c06259c19ce4ab594efb41273a945d05&language=pt-BR`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      }
    };

    const fetchMovieTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=c06259c19ce4ab594efb41273a945d05&language=pt-BR`
        );
        const data = await response.json();
        const trailerData = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailer(trailerData ? trailerData.key : null);
      } catch (error) {
        console.error("Erro ao buscar trailer do filme:", error);
      }
    };

    fetchMovieDetails();
    fetchMovieTrailer();
  }, [id]);

  const handleAddToWatched = () => {
    addToWatched(id);
    alert("Filme adicionado à lista de Assistidos!");
  };

  const handleAddToWatchLater = () => {
    addToWatchLater(id);
    alert("Filme adicionado à lista Ver Depois!");
  };

  const handleRemoveFromWatched = () => {
    removeFromWatched(id);
    alert("Filme removido da lista de Assistidos!");
  };

  const handleRemoveFromWatchLater = () => {
    removeFromWatchLater(id);
    alert("Filme removido da lista Ver Depois!");
  };

  if (!movieDetails) {
    return <p>Carregando detalhes do filme...</p>;
  }

  return (
    <div>
      <div
        className="min-h-96 bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
        }}
      ></div>
      <div className="bg-black bg-opacity-85 p-6 rounded-lg shadow-lg max-w-4xl w-full mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">{movieDetails.title}</h1>

        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {trailer ? (
            <div className="flex-1 max-w-[560px]">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${trailer}`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p className="text-center">Trailer não disponível.</p>
          )}

          <div className="flex-1 max-w-[560px] mt-6">
            <h2 className="text-2xl font-semibold mb-2">Sinopse</h2>
            <p>{movieDetails.overview}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleAddToWatched}
            className="bg-blue-500 text-sm p-3 rounded-full hover:bg-blue-900 transition-all"
          >
            Assistido
          </button>

          <button
            onClick={handleAddToWatchLater}
            className="bg-blue-500 text-sm p-3 rounded-full hover:bg-blue-600 transition-all"
          >
            Ver Depois
          </button>

          <button
            onClick={handleRemoveFromWatched}
            className="bg-red-500 text-sm p-3 rounded-full hover:bg-red-600 transition-all"
          >
            Remover de Assistidos
          </button>

          <button
            onClick={handleRemoveFromWatchLater}
            className="bg-red-500 text-sm p-3 rounded-full hover:bg-red-600 transition-all"
          >
            Remover de Ver Depois
          </button>
        </div>
      </div>
    </div>
  );
}
