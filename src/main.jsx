import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';
import Homepage from './pages/Home.jsx';
import ListaFilme from './pages/MovieListPage.jsx';
import Detalhesfilmes from './pages/MovieDetailPage.jsx';
import Genero from './pages/GenreListPage.jsx';
import Generofilmes from './pages/MoviesByGenrePage';
import WatchedMoviesPage from './pages/FilmesAssistidos.jsx';  // Importe a nova página
import WatchLaterMoviesPage from './pages/VerDepois.jsx';  // Importe a nova página

const router = createBrowserRouter([{
    path: '/', 
    element: <App />,
    children:[
      {
        index: true,
        element: <Homepage />
      },
      {
        path: '/listaFilme',
        element: <ListaFilme/>
      },
      {
        path: '/listaFilme/:id',
        element: <Detalhesfilmes/>
      },
      {
        path: '/generos',
        element: <Genero/>
      },
      {
        path: '/generos/:id',
        element: <Generofilmes/>
      },
      {
        path: '/watched', 
        element: <WatchedMoviesPage />
      },
      {
        path: '/watch-later',
        element: <WatchLaterMoviesPage />
      }
    ]
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);
