import { Link } from "react-router-dom";

export default function GenreListPage() {
  const genres = [
    { id: 28, name: "Ação" },
    { id: 35, name: "Comédia" },
    { id: 18, name: "Drama" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Gêneros</h1>
      <ul className="flex space-x-4">
        {genres.map(genre => (
          <li key={genre.id}>
            <Link to={`/generos/${genre.id}`} className="bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-400 transition-all duration-300">
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
