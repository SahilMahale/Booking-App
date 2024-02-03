import React from 'react';
import { TicketForm } from '../components/Forms';
function Book() {
  return (
    <div className="bg-slate-900 min-h-screen py-2 px-2">
      <div className="container mx-auto rounded-md bg-slate-800 flex flex-col items-center ">
        <h2 className="font-sans text-slate-200 tracking-tight text-3xl text-center font-bold ">
          Book Ticket
        </h2>
        <TicketForm />
      </div>
    </div>
  );
}

export default Book;
