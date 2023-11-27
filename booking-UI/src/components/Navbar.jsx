import React from 'react';
import { Link, Outlet, useResolvedPath, useMatch } from 'react-router-dom';

const AnchorLinks = ({ to, children, isTitle, ...props }) => {
  const resPath = useResolvedPath(to);
  const isActive = useMatch({ path: resPath.pathname, end: true });
  return (
    <Link
      to={to}
      className={`font-sans px-2 py-2.5 rounded-lg ${
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

const Navbar = ({ children }) => {
  return (
    <div className=" bg-slate-900 mx-auto py-2">
      <nav className=" bg-slate-950 rounded-lg text-gray-200 container mx-auto flex flex-wrap items-center justify-between">
        <AnchorLinks to="/" isTitle={true}>
          Booking APP
        </AnchorLinks>
        <div className="px-2">
          <AnchorLinks to="/book" isTitle={false}>
            Book Tickets
          </AnchorLinks>
          <AnchorLinks to="/users" isTitle={false}>
            Users
          </AnchorLinks>
        </div>
      </nav>
      {children}
      <Outlet />
    </div>
  );
};
export default Navbar;
