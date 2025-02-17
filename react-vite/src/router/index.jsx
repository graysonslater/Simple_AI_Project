import { createBrowserRouter } from 'react-router-dom';

//layout is used in the case of modals/navigation bar -- for future use
// import Layout from './Layout';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello World</h1>
  },
]);