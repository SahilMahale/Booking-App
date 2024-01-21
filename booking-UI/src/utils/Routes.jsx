import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { Book, Home, Landing, Login, Signup, Users } from '../Pages';
import Navbar from '../components/Navbar';
import RoutesProtector from './RoutesProtector';

const Routes = () => {
  const { appContext } = useAuth();
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

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        ...publicRoutes,
        ...(!appContext.isLoggedIn ? unAuthenticatedRoutes : []),
        ...authenticatedRoutes,
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
