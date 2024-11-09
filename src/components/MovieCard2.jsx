import { Link } from "react-router-dom";

export default function MovieCard2({ id, titulo, imagem_destaque }) {
  return (
    <div className="w-72 bg-gray-950 text-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transform transition-all duration-300 flex-shrink-0">
      <Link to={`/listaFilme/${id}`}>
        <img 
          src={imagem_destaque} 
          alt={titulo} 
          className="w-full h-96 object-cover"
          loading="lazy"
        />
      </Link>
    </div>
  );
}
