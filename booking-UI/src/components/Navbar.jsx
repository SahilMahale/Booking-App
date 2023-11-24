import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navbar = ({ children }) => {
  return (
    <div className="bg-slate-900 mx-auto px-5 py-2.5 min-h-screen ">
      <nav className=" text-gray-200 container mx-auto flex flex-wrap items-center justify-between">
        <Link
          to="/"
          className="font-sans py-2.5 rounded-lg text-slate-200 text-3xl text-center font-bold hover:ring-sky-300 hover:ring-4 "
        >
          Booking APP
        </Link>
        <div className="px-2">
          <Link
            to="/book"
            className="font-sans px-2 py-2.5 rounded-lg text-slate-200 text-base text-center font-bold hover:ring-sky-300 hover:ring-4 "
          >
            Book Tickets
          </Link>
          <Link
            to="/users"
            className="font-sans px-2 py-2.5 rounded-lg text-slate-200 text-base text-center font-bold hover:ring-sky-300 hover:ring-4 "
          >
            Users
          </Link>
        </div>
      </nav>
      {children}
      <Outlet />
    </div>
  );
};
export default Navbar;
