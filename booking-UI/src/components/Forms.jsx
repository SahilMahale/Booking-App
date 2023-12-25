import React, { useState } from 'react';
import { Formik } from 'formik';
import { putBookings, userLogin } from '../API/api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const TicketForm = () => {
  const navigateTO = useNavigate();
  const { mutate, isPending, isPaused, isError, error } = useMutation({
    mutationFn: ({ user, tickets }) => {
      return putBookings(user, tickets);
    },
    onSuccess: () => {
      navigateTO('/');
    },
  });
  return (
    <>
      {(isPending || isPaused) && (
        <div className="container mx-auto px-20 py-2 flex flex-col items-center ">
          <Loading />
        </div>
      )}
      {!(isPending || isPaused) && (
        <div className="container mx-auto px-20 py-2 flex flex-wrap items-center justify-between ">
          <Formik
            initialValues={{ name: 'username' }}
            onSubmit={(vals) => {
              mutate({ user: vals.name, tickets: vals.tickets });
            }}
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
                    alt="From 1 to 50"
                    min={1}
                    max={50}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.tickets}
                    name="tickets"
                  />
                </div>

                {props.errors.name && (
                  <div id="feedback">{props.errors.name}</div>
                )}

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
              aria-label="ticketsSVG"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512.001 512.001"
              className="h-96 w-96 object-contain fill-slate-700 stroke-slate-800"
            >
              <path d="m378.473 104.189-28.348-19.626a8.349 8.349 0 0 0-9.504 13.728l28.348 19.626c3.754 2.599 9.018 1.638 11.615-2.111a8.35 8.35 0 0 0-2.111-11.617zM435.17 143.439l-28.348-19.625a8.349 8.349 0 0 0-11.616 2.111 8.347 8.347 0 0 0 2.11 11.616l28.348 19.625c3.611 2.5 8.978 1.699 11.616-2.111a8.349 8.349 0 0 0-2.11-11.616zM167.004 134.473l-33.566-7.877a8.35 8.35 0 0 0-3.815 16.255l33.566 7.877c.642.15 1.282.223 1.916.223a8.355 8.355 0 0 0 8.12-6.443c1.052-4.49-1.733-8.983-6.221-10.035zM234.138 150.227l-33.566-7.877a8.348 8.348 0 1 0-3.815 16.254l33.566 7.877c.642.15 1.282.223 1.916.223a8.35 8.35 0 0 0 1.899-16.477zM247.23 189.779l-76.055-17.847a8.348 8.348 0 1 0-3.815 16.254l67.928 15.94-54.804 233.553-126.857-29.768 54.803-233.553 25.824 6.059a8.348 8.348 0 0 0 3.813-16.254l-33.95-7.966c-4.478-1.052-8.979 1.731-10.034 6.22L35.465 412.224a8.348 8.348 0 0 0 6.22 10.034l143.11 33.582a8.35 8.35 0 0 0 10.036-6.22l58.619-249.807a8.35 8.35 0 0 0-6.22-10.034z" />
              <path d="M204.405 283.961a8.344 8.344 0 0 0-8.394-5.084l-31.233 2.619-12.142-28.894a8.348 8.348 0 0 0-15.824 1.328l-7.16 30.513-31.233 2.62a8.348 8.348 0 0 0-3.628 15.458l26.807 16.238-7.16 30.514a8.348 8.348 0 0 0 13.581 8.227l23.727-20.477 26.808 16.239a8.349 8.349 0 0 0 12.021-10.373l-12.142-28.895 23.728-20.477a8.346 8.346 0 0 0 2.244-9.556zm-43.711 30.908 4.539 10.801-10.022-6.071c-6.933-4.2-13.896 4.373-18.647 8.474l2.676-11.404a8.348 8.348 0 0 0-3.802-9.047l-10.02-6.071 11.674-.978c8.105-.68 8.676-11.727 10.105-17.817l4.538 10.799c3.159 7.516 13.816 4.63 20.068 4.106-4.815 4.158-14.348 9.5-11.109 17.208z" />
              <path d="M508.405 127.564c-7.115-4.925-9.523-14.443-5.604-22.14a8.348 8.348 0 0 0-2.687-10.651l-42.697-29.559a8.351 8.351 0 0 0-10.917 1.233c-3.271 3.583-7.951 5.638-12.836 5.638a17.23 17.23 0 0 1-9.858-3.09c-7.115-4.925-9.523-14.443-5.604-22.14a8.348 8.348 0 0 0-2.687-10.651L372.821 6.645a8.35 8.35 0 0 0-10.916 1.233c-3.272 3.583-7.953 5.636-12.837 5.638a17.235 17.235 0 0 1-9.859-3.09 8.35 8.35 0 0 0-11.615 2.111l-48.265 69.714a8.32 8.32 0 0 0-2.591-1.102l-50.557-11.862a8.349 8.349 0 0 0-9.705 5.147c-3.051 7.981-11.885 12.632-20.184 10.684-8.422-1.977-14.151-9.95-13.324-18.548a8.35 8.35 0 0 0-6.403-8.927L126.009 45.78a8.35 8.35 0 0 0-9.705 5.147c-3.05 7.972-11.892 12.631-20.184 10.685-4.483-1.053-8.979 1.732-10.034 6.22l-12.511 53.316L.223 433.747a8.348 8.348 0 0 0 6.22 10.034c8.424 1.977 14.152 9.951 13.325 18.548a8.35 8.35 0 0 0 6.402 8.927l50.555 11.863a8.344 8.344 0 0 0 9.705-5.146c7.029-18.385 35.387-11.661 33.51 7.863a8.35 8.35 0 0 0 6.403 8.927l50.555 11.863c4.017.939 8.23-1.289 9.705-5.148 2.549-6.668 9.057-11.149 16.195-11.149 3.682 0 6.845 1.572 10.295-.565a8.358 8.358 0 0 0 3.73-5.189l10.978-46.782 23.547 16.302c3.319 2.298 8.107 1.841 10.917-1.233 3.271-3.583 7.951-5.636 12.835-5.636 3.531 0 6.94 1.069 9.86 3.09a8.35 8.35 0 0 0 11.615-2.113l213.94-309.023a8.348 8.348 0 0 0-2.11-11.616zM226.923 368.429l-12.582 53.619-12.106 51.591c-11.276.189-21.692 6.063-27.813 15.258l-37.974-8.911c-1.744-13.841-11.972-25.654-26.021-28.95-13.723-3.22-28.369 2.629-36.177 14.356l-37.973-8.911c-1.398-11.089-8.241-20.878-18.133-26.026l69.784-297.387 8.128 1.907c.641.15 1.281.223 1.914.223a8.348 8.348 0 0 0 1.899-16.477l-8.126-1.907 8.927-38.043c11.276-.189 21.691-6.063 27.813-15.258l37.974 8.911c1.744 13.841 11.971 25.654 26.02 28.952 13.721 3.219 28.372-2.63 36.177-14.355l37.974 8.91c.108.027.349 2.19.397 2.429a34.17 34.17 0 0 0 2.34 7.25c3.139 6.953 8.614 12.832 15.395 16.351l-8.929 38.052-8.128-1.907c-4.479-1.052-8.979 1.731-10.034 6.22a8.348 8.348 0 0 0 6.221 10.034l8.126 1.907-13.276 56.578-1.451 6.184-9.748 41.54c-.001-.003-20.618 87.857-20.618 87.86zM470.382 167.82l-6.864-4.753c-3.789-2.625-8.991-1.678-11.615 2.111a8.347 8.347 0 0 0 2.112 11.616l6.863 4.752-173.869 251.135a33.853 33.853 0 0 0-11.913-2.154 34.205 34.205 0 0 0-19.562 6.16l-23.637-16.364 8.483-36.15 36.92 25.56c3.75 2.594 9.019 1.638 11.615-2.112L396.268 252.56a8.348 8.348 0 1 0-13.726-9.505L279.939 391.254l-35.461-24.551 16.277-69.365 29.321-10.271 18.995 24.93a8.349 8.349 0 0 0 14.987-5.25l-.715-31.333 29.58-10.361a8.347 8.347 0 0 0-.362-15.874l-30.021-9.005-.715-31.335a8.346 8.346 0 0 0-15.21-4.561l-17.838 25.768-11.43-3.428 21.491-91.583 10.519-15.194 107.133 74.171-14.526 20.984a8.348 8.348 0 1 0 13.726 9.505l19.278-27.845c2.582-3.73 1.603-9.044-2.11-11.616l-120.861-83.675c-3.752-2.598-9.023-1.635-11.616 2.111l-3.623 5.234c-.1-.027-.196-.062-.297-.086a17.42 17.42 0 0 1-10.204-6.902c-.018-.025-.033-.052-.051-.078l19.201-27.734s6.862 4.75 6.862 4.752c3.646 2.524 8.99 1.68 11.616-2.112a8.349 8.349 0 0 0-2.11-11.616l-6.863-4.752 22.241-32.125a33.858 33.858 0 0 0 11.914 2.154 34.196 34.196 0 0 0 19.561-6.161l32.065 22.2c-3.446 13.518 1.741 28.256 13.607 36.471 11.601 8.033 27.364 7.974 38.927-.102l32.065 22.2c-2.76 10.83.021 22.446 7.338 30.86l-22.248 32.141zM306.783 281.445s-7.098-9.314-7.101-9.32c-2.164-2.839-6.034-4-9.4-2.819l-11.056 3.872c3.639-5.257 11.529-12.768 6.445-19.443l-7.1-9.32 11.223 3.366c7.824 2.346 12.336-7.687 15.929-12.876l.267 11.712c.186 8.144 11.163 9.37 17.169 11.172l-11.057 3.872a8.347 8.347 0 0 0-5.586 8.07l.267 11.714z" />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

const LoginForm = () => {
  const navigateTO = useNavigate();
  const { mutate, isPending, isPaused, isError, error } = useMutation({
    mutationFn: ({ user, pass }) => {
      return userLogin(user, pass);
    },
    onSuccess: () => {
      navigateTO('/');
    },
  });
  return (
    <>
      {(isPending || isPaused) && (
        <div className="container mx-auto px-20 py-2 flex flex-col items-center ">
          <Loading />
        </div>
      )}
      {!(isPending || isPaused) && (
        <div className="container mx-auto px-20 py-2 flex flex-wrap items-center justify-between ">
          <Formik
            initialValues={{ name: 'sahil' }}
            onSubmit={(vals) => {
              mutate({ user: vals.name, pass: vals.pass });
            }}
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
                    Password
                  </label>
                  <input
                    className="bg-gray-50 w-[300px] border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.pass}
                    name="pass"
                  />
                </div>

                {props.errors.name && (
                  <div id="feedback">{props.errors.name}</div>
                )}

                <button
                  type="submit"
                  className="bg-transparent hover:bg-slate-500 text-slate-300 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded"
                >
                  Log in
                </button>
              </form>
            )}
          </Formik>
          <div className="pr-20 py-2">
            <svg
              aria-label="usersSVG"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="h-96 w-96 object-contain fill-slate-700 stroke-slate-800"
            >
              <path d="M57.2 80.8c8.7 0 16.1-3.1 22.3-9.2 6.1-6.1 9.2-13.6 9.2-22.3 0-8.7-3.1-16.1-9.2-22.3-6.1-6.1-13.6-9.2-22.3-9.2-8.7 0-16.1 3.1-22.3 9.2-6.1 6.1-9.2 13.6-9.2 22.3 0 8.7 3.1 16.1 9.2 22.3 6.2 6.1 13.6 9.2 22.3 9.2zM94.6 129.9c9.2 9.2 20.3 13.8 33.4 13.8 13 0 24.2-4.6 33.4-13.8 9.2-9.2 13.8-20.3 13.8-33.4 0-13-4.6-24.2-13.8-33.4-9.2-9.2-20.3-13.8-33.4-13.8-13 0-24.2 4.6-33.4 13.8-9.2 9.2-13.8 20.3-13.8 33.4 0 13.1 4.6 24.2 13.8 33.4zM198.8 80.8c8.7 0 16.1-3.1 22.3-9.2 6.1-6.1 9.2-13.6 9.2-22.3 0-8.7-3.1-16.1-9.2-22.3-6.1-6.1-13.6-9.2-22.3-9.2s-16.1 3.1-22.3 9.2-9.2 13.6-9.2 22.3c0 8.7 3.1 16.1 9.2 22.3 6.2 6.1 13.6 9.2 22.3 9.2zM230.8 80.8c-.5 0-2.3.9-5.3 2.6s-7.1 3.5-12 5.2c-4.9 1.8-9.8 2.6-14.6 2.6-5.5 0-10.9-.9-16.4-2.8.4 3 .6 5.7.6 8.1 0 11.4-3.3 21.9-10 31.5 13.3.4 24.1 5.7 32.6 15.7h16.5c6.7 0 12.4-1.7 17-5s6.9-8.2 6.9-14.6c-.1-28.8-5.2-43.3-15.3-43.3z" />
              <path d="M212.4 180.2c-.9-4.8-2-9.2-3.3-13.3s-3.1-8.1-5.3-12c-2.2-3.9-4.7-7.2-7.6-9.9-2.9-2.7-6.4-4.9-10.5-6.6-4.1-1.6-8.7-2.5-13.7-2.5-.8 0-2.6.9-5.3 2.6-2.7 1.8-5.7 3.7-9 5.9s-7.7 4.1-13.2 5.9-11 2.6-16.6 2.6c-5.6 0-11.1-.9-16.6-2.6s-9.9-3.7-13.1-5.9c-3.3-2.2-6.3-4.1-9-5.9-2.7-1.8-4.5-2.6-5.3-2.6-5 0-9.6.8-13.7 2.5-4.1 1.6-7.6 3.8-10.5 6.6-2.9 2.7-5.4 6.1-7.6 9.9-2.2 3.9-4 7.9-5.3 12-1.3 4.1-2.4 8.5-3.3 13.3-.9 4.8-1.4 9.2-1.7 13.4-.3 4.1-.4 8.4-.4 12.7 0 9.8 3 17.6 9 23.3 6 5.7 13.9 8.5 23.8 8.5h107.4c9.9 0 17.9-2.8 23.8-8.5 6-5.7 9-13.5 9-23.3 0-4.3-.1-8.6-.4-12.7-.2-4.2-.7-8.6-1.6-13.4zM82.9 128c-6.6-9.6-9.9-20.1-9.9-31.5 0-2.4.2-5.1.6-8.1-5.4 1.9-10.9 2.8-16.4 2.8-4.8 0-9.7-.9-14.6-2.6s-8.9-3.5-12-5.2c-3.1-1.7-4.9-2.6-5.3-2.6-10.2 0-15.3 14.5-15.3 43.4 0 6.4 2.3 11.2 6.9 14.6 4.6 3.3 10.2 5 17 5h16.5c8.4-10.1 19.2-15.4 32.5-15.8z" />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export { LoginForm, TicketForm };
