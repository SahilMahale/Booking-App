import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { Book, Home, Landing, Login, Signup, Users } from '../Pages';
import Navbar from '../components/Navbar';
import RoutesProtector from './RoutesProtector';
import { useEffect } from 'react';
import { useState } from 'react';

const Routes = () => {
  const { Context: appContext } = useAuth();
  const [childroutes, setChildRoutes] = useState([])
  const publicRoutes = [
    {
      path: '/service',
      element: <div className="bg-slate-900">Service Page</div>,
    },
    {
      path: '/about-us',
      element: <div className="bg-slate-900">About Us</div>,
    },
  ];
  const unAuthenticatedRoutes = [
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
  ];

  const authenticatedRoutes = [
    {
      path: '/',
      element: <RoutesProtector />,
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
      ],
    },
  ];

  useEffect(() => {
    console.log("Routes created", appContext)
    const newChildRoutes = [
      ...publicRoutes,
      ...(appContext.isLoggedIn ? authenticatedRoutes : unAuthenticatedRoutes),
    ]
    console.log("CREATED ROUTES:", childroutes)
    setChildRoutes([...childroutes, ...newChildRoutes])
  }, [])
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: childroutes,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
