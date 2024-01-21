import React from 'react';
import { Link, Outlet, useMatch, useResolvedPath } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const AnchorLinks = ({ to, children, isTitle, ...props }) => {
  const resPath = useResolvedPath(to);
  const isActive = useMatch({ path: resPath.pathname, end: true });
  return (
    <Link
      to={to}
      className={`font-sans px-3 py-2.5 rounded-lg ${
        isTitle ? 'tracking-tighter text-4xl' : 'text-base'
      }  text-slate-200 text-center font-bold hover:ring-sky-300 hover:ring-4 ${
        isActive ? 'bg-slate-800' : ''
      }`}
      {...props}
    >
      {children}
    </Link>
  );
};

const LogoutButton = ({ logOutHandler }) => {
  return (
    <button
      className="font-sans px-3 py-2.5 rounded-lg text-base text-amber-200 text-center font-bold 
      hover:text-amber-500
      hover:ring-amber-500 hover:ring-4"
      onClick={logOutHandler}
    >
      Logout
    </button>
  );
};

const Navbar = ({ children }) => {
  const { appContext, LogOut } = useAuth();
  return (
    <div className=" bg-slate-900 mx-auto py-2">
      <nav className=" bg-slate-950 rounded-lg text-gray-200 container mx-auto flex flex-wrap items-center justify-between">
        <AnchorLinks to="/" isTitle={true}>
          Booking APP
        </AnchorLinks>
        <div className="px-2">
          {appContext.isLoggedIn ? (
            <>
              <AnchorLinks to="/book" isTitle={false}>
                Book Tickets
              </AnchorLinks>
              <AnchorLinks to="/users" isTitle={false}>
                Users
              </AnchorLinks>
              <LogoutButton logOutHandler={LogOut} />
            </>
          ) : (
            <>
              <AnchorLinks to="/login/user" isTitle={false}>
                Login
              </AnchorLinks>
              <AnchorLinks to="/signup/user" isTitle={false}>
                SignUp
              </AnchorLinks>
            </>
          )}
        </div>
      </nav>
      {children}
      <Outlet />
    </div>
  );
};
export default Navbar;
