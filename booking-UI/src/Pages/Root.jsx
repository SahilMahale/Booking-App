import React from 'react';
import { useState } from 'react';
import BookingList from '../components/BookingList';
export default function Root() {
  const [showTable, setShowTable] = useState(false);
  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="container mx-auto bg-slate-800 flex flex-col items-center">
        <h1 className="font-sans text-slate-200 text-3xl text-center font-bold">
          Booking App
        </h1>
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 text-2xl focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          <a href="/book">Book Tickets</a>
        </button>
        <button
          type="button"
          onClick={() => setShowTable(!showTable)}
          className="text-white bg-gray-800 hover:bg-gray-900 text-2xl focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Toggle Bookings list
        </button>
        {showTable && (
          <>
            <h2 className="font-sans text-slate-200 text-2xl text-center font-bold">
              Table
            </h2>
            <BookingList />
          </>
        )}
      </div>
    </div>
  );
}
