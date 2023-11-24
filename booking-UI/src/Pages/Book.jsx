import React from 'react';
import Forms from '../components/Forms';

function Book() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="container mx-auto bg-slate-800 flex flex-col items-center">
        <h1 className="font-sans text-slate-200 text-3xl text-center font-bold ">
          Input user details
        </h1>
        <Forms />
      </div>
    </div>
  );
}

export default Book;
