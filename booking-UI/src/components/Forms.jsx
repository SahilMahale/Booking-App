import React from 'react';
import { Formik } from 'formik';

const callBookings = (val) => {};
const Forms = () => {
  return (
    <div className="container mx-auto px-20 py-2 flex flex-wrap items-center justify-between ">
      <Formik
        initialValues={{ name: 'sahil' }}
        onSubmit={(values) => callBookings(values)}
      >
        {(props) => (
          <form className="pl-10" onSubmit={props.handleSubmit}>
            <div className=" mb-6 ">
              <label
                htmlFor="username"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                User Name
              </label>
              <input
                className="bg-gray-50 border w-[300px] border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                name="name"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="tickets"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Tickets
              </label>
              <input
                className="bg-gray-50 w-[300px] border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.tickets}
                name="tickets"
              />
            </div>

            {props.errors.name && <div id="feedback">{props.errors.name}</div>}

            <button
              type="submit"
              className="bg-transparent hover:bg-slate-500 text-slate-300 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded"
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <div className="pr-20 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          className="h-96 w-96 object-contain fill-slate-700 stroke-slate-800"
        >
          <path d="M57.2 80.8c8.7 0 16.1-3.1 22.3-9.2 6.1-6.1 9.2-13.6 9.2-22.3 0-8.7-3.1-16.1-9.2-22.3-6.1-6.1-13.6-9.2-22.3-9.2-8.7 0-16.1 3.1-22.3 9.2-6.1 6.1-9.2 13.6-9.2 22.3 0 8.7 3.1 16.1 9.2 22.3 6.2 6.1 13.6 9.2 22.3 9.2zM94.6 129.9c9.2 9.2 20.3 13.8 33.4 13.8 13 0 24.2-4.6 33.4-13.8 9.2-9.2 13.8-20.3 13.8-33.4 0-13-4.6-24.2-13.8-33.4-9.2-9.2-20.3-13.8-33.4-13.8-13 0-24.2 4.6-33.4 13.8-9.2 9.2-13.8 20.3-13.8 33.4 0 13.1 4.6 24.2 13.8 33.4zM198.8 80.8c8.7 0 16.1-3.1 22.3-9.2 6.1-6.1 9.2-13.6 9.2-22.3 0-8.7-3.1-16.1-9.2-22.3-6.1-6.1-13.6-9.2-22.3-9.2s-16.1 3.1-22.3 9.2-9.2 13.6-9.2 22.3c0 8.7 3.1 16.1 9.2 22.3 6.2 6.1 13.6 9.2 22.3 9.2zM230.8 80.8c-.5 0-2.3.9-5.3 2.6s-7.1 3.5-12 5.2c-4.9 1.8-9.8 2.6-14.6 2.6-5.5 0-10.9-.9-16.4-2.8.4 3 .6 5.7.6 8.1 0 11.4-3.3 21.9-10 31.5 13.3.4 24.1 5.7 32.6 15.7h16.5c6.7 0 12.4-1.7 17-5s6.9-8.2 6.9-14.6c-.1-28.8-5.2-43.3-15.3-43.3z" />
          <path d="M212.4 180.2c-.9-4.8-2-9.2-3.3-13.3s-3.1-8.1-5.3-12c-2.2-3.9-4.7-7.2-7.6-9.9-2.9-2.7-6.4-4.9-10.5-6.6-4.1-1.6-8.7-2.5-13.7-2.5-.8 0-2.6.9-5.3 2.6-2.7 1.8-5.7 3.7-9 5.9s-7.7 4.1-13.2 5.9-11 2.6-16.6 2.6c-5.6 0-11.1-.9-16.6-2.6s-9.9-3.7-13.1-5.9c-3.3-2.2-6.3-4.1-9-5.9-2.7-1.8-4.5-2.6-5.3-2.6-5 0-9.6.8-13.7 2.5-4.1 1.6-7.6 3.8-10.5 6.6-2.9 2.7-5.4 6.1-7.6 9.9-2.2 3.9-4 7.9-5.3 12-1.3 4.1-2.4 8.5-3.3 13.3-.9 4.8-1.4 9.2-1.7 13.4-.3 4.1-.4 8.4-.4 12.7 0 9.8 3 17.6 9 23.3 6 5.7 13.9 8.5 23.8 8.5h107.4c9.9 0 17.9-2.8 23.8-8.5 6-5.7 9-13.5 9-23.3 0-4.3-.1-8.6-.4-12.7-.2-4.2-.7-8.6-1.6-13.4zM82.9 128c-6.6-9.6-9.9-20.1-9.9-31.5 0-2.4.2-5.1.6-8.1-5.4 1.9-10.9 2.8-16.4 2.8-4.8 0-9.7-.9-14.6-2.6s-8.9-3.5-12-5.2c-3.1-1.7-4.9-2.6-5.3-2.6-10.2 0-15.3 14.5-15.3 43.4 0 6.4 2.3 11.2 6.9 14.6 4.6 3.3 10.2 5 17 5h16.5c8.4-10.1 19.2-15.4 32.5-15.8z" />
        </svg>
      </div>
    </div>
  );
};

export default Forms;
