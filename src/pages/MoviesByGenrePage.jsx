import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function MoviesByGenrePage() {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=c06259c19ce4ab594efb41273a945d05&with_genres=${id}`
                );
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                console.error("Erro ao buscar filmes por gênero:", error);
            }
        };

        fetchMoviesByGenre();
    }, [id]);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold">Filmes do Gênero</h1>
            <div className="grid grid-cols-4 gap-4">
                {movies.map(movie => (
                    <MovieCard key={movie.id} id={movie.id} titulo={movie.title} imagem_destaque={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                ))}
            </div>
        </div>
    );
}
