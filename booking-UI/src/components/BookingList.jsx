import React from 'react';
import { getBookingsList } from '../API/api';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';
import Table from './Table';

const useGetBookingList = () => {
  const resp = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookingsList,
  });
  return resp;
};

const BookingList = () => {
  const { data, isError, isLoading } = useGetBookingList();
  const columns = ['User', 'Tickets'];
  return (
    <div>
      {isLoading && <Loading />}
      {!isError && !isLoading && <Table data={data} columns={columns} />}
    </div>
  );
};

export default BookingList;
