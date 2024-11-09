import { NavLink } from 'react-router-dom';
import Login from './Login';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogin = () => {
    setIsLogged(!isLogged);
  };

  // Função para monitorar a rolagem da página
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`${
        isScrolled ? 'bg-zinc-950/80' : 'bg-black'
      } text-white p-4 shadow-lg sticky top-0 z-50 transition duration-300 h-20`} // Altura do header fixada
    >
      <nav className="container mx-auto flex justify-between items-center h-full">
      <img src="/logo.png" alt="Logo" className="h-40" />
        
        {/* Menu de navegação */}
        <ul className="flex space-x-8 text-lg">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-blue-900 no-underline ${
                  isActive ? 'text-white font-bold' : ''
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/listaFilme"
              className={({ isActive }) =>
                `hover:text-blue-900 no-underline ${
                  isActive ? 'text-white font-bold' : ''
                }`
              }
            >
              Lista de Filmes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/generos"
              className={({ isActive }) =>
                `hover:text-blue-900 no-underline ${
                  isActive ? 'text-white font-bold' : ''
                }`
              }
            >
              Gêneros
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/watched"
              className={({ isActive }) =>
                `hover:text-blue-900 no-underline ${
                  isActive ? 'text-white font-bold' : ''
                }`
              }
            >
              Filmes Assistidos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/watch-later"
              className={({ isActive }) =>
                `hover:text-blue-900 no-underline ${
                  isActive ? 'text-white font-bold' : ''
                }`
              }
            >
              Ver Depois
            </NavLink>
          </li>
        </ul>
        <Login isLogged={isLogged} handleLogin={handleLogin} />
      </nav>
    </header>
  );
}
