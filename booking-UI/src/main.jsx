import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home, Book, Users, Login, Signup } from './Pages';
import './index.css';
import Navbar from './components/Navbar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/book',
        element: <Book />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/login',
        children: [
          {
            path: '/login/admin',
            element: <Login isAdmin={true} />,
          },
          {
            path: '/login/user',
            element: <Login />,
          },
        ],
      },
      {
        path: '/signup',
        children: [
          {
            path: '/signup/admin',
            element: <Signup isAdmin={true} />,
          },
          {
            path: '/signup/user',
            element: <Signup />,
          },
        ],
      },
    ],
  },
]);
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
