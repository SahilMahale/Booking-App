import React from 'react';
import { getUsersList } from '../API/api';
import Loading from '../components/Loading';
import { useQuery } from '@tanstack/react-query';

const useGetUsersList = () => {
  const resp = useQuery({
    queryKey: ['usersInfo'],
    queryFn: getUsersList,
    refetchInterval: 10000,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
  return resp;
};

const Users = () => {
  const { data, isError, isLoading, isSuccess } = useGetUsersList();
  return (
    <div className="bg-slate-900 min-h-screen py-2 px-2">
      <div className=" container px-2 py-2  mx-auto bg-slate-800 rounded-md">
        <h1 className="text-3xl text-center font-bold text-slate-100">
          USERS!
        </h1>
        {isLoading && <Loading />}
        {isSuccess && (
          <div className="py-2 relative overflow-x-auto ">
            <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Users
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((tupl, i) => (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {tupl}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
