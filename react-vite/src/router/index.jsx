import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import PoemJokeDemo from '../components/PoemJokeDemo/PoemJokeDemo';
import AutoResponseDemo from '../components/AutoResponseDemo/AutoResponseDemo';
import DatabaseIntegrationDemo from '../components/DatabaseIntegrationDemo/DatabaseIntegrationDemo';
import PokePage from '../components/PokePage/PokePage';
import AgenticPokeSearch from '../components/AgenticPokeSearch/AgenticPokeSearch';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/profile",
        element: <ProfilePage />
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
      },
      {
        path:"/agenticPokemonSearch",
        element: <AgenticPokeSearch />
      }
    ]
  }
]);