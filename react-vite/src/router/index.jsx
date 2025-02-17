import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
//layout is used in the case of modals/navigation bar -- for future use
// import Layout from './Layout';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
]);