import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

export default function MovieListPage() {
  const [search, setSearch] = useState('');
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=c06259c19ce4ab594efb41273a945d05&language=pt-br')
      .then(data => data.json())
      .then(data => setFilmes(data.results))
      .catch(erro => console.log(erro));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filmesFiltrados = filmes.filter(filme => 
    filme.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-white">Veja o catálogo completo de filmes</h2>
      
      <input
        className="w-full p-2 mb-6 rounded-full bg-zinc-900 text-white focus:ring-2 focus:ring-blue-900"
        type="text"
        placeholder="Buscar filme..."
        value={search}
        onChange={handleSearch}
      />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filmesFiltrados.length > 0 ? (
          filmesFiltrados.map(filme => (
            <MovieCard 
              key={filme.id} 
              id={filme.id} 
              titulo={filme.title} 
              imagem_destaque={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-lg text-gray-400">Nenhum filme encontrado.</p>
        )}
      </div>
    </div>
  );
}
