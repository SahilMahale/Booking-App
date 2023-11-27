import React from 'react';
import BookingList from '../components/BookingList';
import { getBookingsList } from '../API/api';
import Loading from '../components/Loading';
import { useQuery } from '@tanstack/react-query';

const useGetBookingList = () => {
  const resp = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookingsList,
    refetchInterval: 10000,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
  return resp;
};
const Root = () => {
  const { data, isError, isLoading, isSuccess } = useGetBookingList();
  return (
    <div className="bg-slate-900 min-h-screen py-2 px-2">
      <div className="container py-2 mx-auto  rounded-md bg-slate-800 flex flex-col items-center">
        {isLoading && <Loading />}
        {!isError && isSuccess && (
          <>
            <h2 className="font-sans py-1 text-slate-200 text-2xl text-center font-bold">
              Current Booking
            </h2>
            <BookingList data={data} />
          </>
        )}
      </div>
    </div>
  );
};

export default Root;
