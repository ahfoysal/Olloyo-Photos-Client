import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.tsx';
import { Provider } from 'react-redux';
import { NextUIProvider } from '@nextui-org/react';

import store from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
);
