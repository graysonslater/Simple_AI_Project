import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import PoemJokeDemo from '../components/PoemJokeDemo/PoemJokeDemo';
import AutoResponseDemo from '../components/AutoResponseDemo/AutoResponseDemo';
import DatabaseIntegrationDemo from '../components/DatabaseIntegrationDemo/DatabaseIntegrationDemo';
import PokePage from '../components/PokePage/PokePage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/poemJokeDemo",
        element: <PoemJokeDemo />
      },
      {
        path:"/autoResponseDemo",
        element: <AutoResponseDemo />
      },
      {
        path:"/dataBaseIntegrationDemo",
        element: <DatabaseIntegrationDemo />
      },
      {
        path:"/pokemon/:pokeId",
        element: <PokePage />
      }
    ]
  }
]);