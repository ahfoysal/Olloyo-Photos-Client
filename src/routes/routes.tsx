import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import App from '@/App';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
