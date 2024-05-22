import { useQuery } from '@tanstack/react-query';
import { getBookingsList } from '../API/api';
import { useAuth } from '../Context/AuthContext';
import BookingList from '../components/BookingList';
import Loading from '../components/Loading';
import { createFileRoute } from '@tanstack/react-router';

const useGetBookingList = () => {
  const { Context: appContext } = useAuth();
  const resp = useQuery({
    queryKey: ['bookings', appContext.token, appContext.claims.user],
    queryFn: getBookingsList,
    refetchInterval: 10000,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
  return resp;
};
export const Route = createFileRoute('/Home')({
  component: Home
})
function Home() {
  const { data, isError, isLoading, isSuccess } = useGetBookingList();
  return (
    <div className="bg-slate-900 min-h-screen py-2 px-2">
      <div className="container py-2 mx-auto  rounded-md bg-slate-800 flex flex-col items-center">
        {isLoading && <Loading />}
        {!isError && isSuccess && (
          <>
            <h2 className="font-sans py-1 text-slate-200 text-2xl text-center font-bold">
              Current Bookings
            </h2>
            <BookingList data={data} />
          </>
        )}
      </div>
    </div>
  );
}

