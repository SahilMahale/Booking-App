import Table from './Table';

const BookingList = ({ data }) => {
  const columns = ['User', 'Tickets'];
  return (
    <div>
      <Table data={data} columns={columns} />
    </div>
  );
};

export default BookingList;
