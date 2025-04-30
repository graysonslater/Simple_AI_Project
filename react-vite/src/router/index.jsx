import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import PoemJokeDemo from '../components/PoemJokeDemo/PoemJokeDemo';
import AutoResponseDemo from '../components/AutoResponseDemo/AutoResponseDemo';
//layout is used in the case of modals/navigation bar -- for future use
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
      }
    ]
  }
]);