import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const RoutesProtector = () => {
  const { appContext } = useAuth();
  if (!appContext.isLoggedIn) {
    return <Navigate to="/login/user" />;
  }
  return <Outlet />;
};

export default RoutesProtector;
