import React from 'react';
import { Formik } from 'formik';

const callBookings = (val) => {};
const Forms = () => {
  return (
    <div className="container mx-auto">
      <Formik
        initialValues={{ name: 'sahil' }}
        onSubmit={(values) => callBookings(values)}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                User Name
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tickets
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
    </div>
  );
};

export default Forms;
