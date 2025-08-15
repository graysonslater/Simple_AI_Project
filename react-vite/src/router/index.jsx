import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import PoemJokeDemo from '../components/PoemJokeDemo/PoemJokeDemo';
import AutoResponseDemo from '../components/AutoResponseDemo/AutoResponseDemo';
import DatabaseIntegrationDemo from '../components/DatabaseIntegrationDemo/DatabaseIntegrationDemo';
import PokePage from '../components/PokePage/PokePage';
import PokemonGrid from '../components/PokePage/PokemonGrid';
import AgenticPokeSearch from '../components/AgenticPokeSearch/AgenticPokeSearch';
import SimpleImageGeneration from '../components/SimpleImageGeneration/SimpleImageGeneration';
import MonsterMaker from '../components/MonsterMaker/MonsterMaker';
import BattlePage from '../components/BattlePage/BattlePage';


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
        path:"/pokemon",
        element: <PokemonGrid />
      },
      {
        path:"/pokemon/:pokeId",
        element: <PokePage />
      },
      {
        path:"/agenticPokemonSearch",
        element: <AgenticPokeSearch />
      },
      {
        path:"/simpleImageGeneration",
        element: <SimpleImageGeneration />
      },
      {
        path:"/monsterMaker",
        element: <MonsterMaker />
      },
      {
        path:"/battleArena",
        element: <BattlePage />
      }
    ]
  }
]);