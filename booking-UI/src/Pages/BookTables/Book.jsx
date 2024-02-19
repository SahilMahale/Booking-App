import React, { useReducer } from 'react';
import { Button } from '@material-tailwind/react';
//import { TicketForm } from '../../components/Forms';
import { TableCard } from './TableCard';
import icon from './ButtonIcon.svg'
import { cardInfo } from './mockAPI';
import { TABLESTATES, ACTIONS } from './constants';
import { checkAvailable } from './utlis';
import { useEffect } from 'react';
const initialState = {
  0: {
    tableInfo: undefined,
    tableStatus: TABLESTATES.AVAILABLE
  },
  bookButtonEnabled: false,
  selectedTables: [],
};
let reren = 0;


const BookTable = () => {
  return setTimeout(() => { return TABLESTATES.BOOKED }, 5000)
}
// Refactor to match the new hashMap state
function tableReducer(tableState, action) {
  //console.log("DISPATCHING____________________________________________________")
  const tableInfo = action.payload.tableInfo;
  if (action.type === ACTIONS.SELECT) {
    if (!tableInfo.available || !tableState[tableInfo.id]) {
      alert("Table is already booked or is unavialable")
      return { ...tableState }
    }
    tableState[tableInfo.id].tableStatus = TABLESTATES.SELECTED;
    tableState.selectedTables?.push(tableInfo.id)
    tableState.bookButtonEnabled = true;
    /*react doesn't rerender for same object with mutation,
     * it needs a new object like a babyi */
    return { ...tableState }
  } else if (action.type === ACTIONS.DESELECT) {
    if (!tableState[tableInfo.id]) {
      return { ...tableState }
    }
    tableState[tableInfo.id].tableStatus = TABLESTATES.AVAILABLE
    tableState.selectedTables = tableState.selectedTables?.filter((elem) => {
      return elem !== tableInfo.id
    })
    tableState.bookButtonEnabled = false;
    return { ...tableState }
  } else if (action.type === ACTIONS.BOOK) {
    if (tableState[tableInfo.id].tableStatus === TABLESTATES.SELECTED) {
      tableState[tableInfo.id].tableStatus = BookTable();
      tableState.bookButtonEnabled = false;
      return { ...tableState }
    }
    return { ...tableState }
  }
  else if (action.type === ACTIONS.LOAD) {
    //console.log("start loading")
    if (tableInfo === undefined) {
      return tableState
    }
    tableState[tableInfo.id] = {
      tableInfo: tableInfo,
      tableStatus: checkAvailable(tableInfo.available)
    }
    // Do not want reRenders here just bulk loading everything in  
    return tableState
  } else {
    alert("Select a valid table to be booked")
  }
}
function Book() {
  console.log("-----------------------------------------")
  reren++
  console.log("Re-Render Book page count:", reren)
  console.log("-----------------------------------------")
  const [tablesStates, dispatchTables] = useReducer(tableReducer, initialState);
  // to avoid too many re-render
  useEffect(() => {
    cardInfo.tables.map((table) => {
      console.log("call load")
      dispatchTables({ type: ACTIONS.LOAD, payload: { tableInfo: table } })
    })
  }, [])
  useEffect(() => {
    console.log(tablesStates.selectedTables)
  }, [tablesStates])
  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="container mx-auto rounded-md bg-slate-700 flex flex-col items-center ">
        <div className='drop-shadow-2xl'>
          < h2 className="font-sans text-slate-200 tracking-tight text-3xl text-center font-bold " >
            Book Tables
          </h2 >
        </div>
        <div className='flex flex-col'>
          <div className=' mt-50 lg:grid lg:grid-cols-5 gap-5 md:flex md:flex-col'>
            {cardInfo && (cardInfo.tables.map((table) => {
              // const contextValue = [tablesStates, dispatchTables]
              //         console.log(contextValue, tablesStates)
              return (
                // <BookingContextProvider contextValue={contextValue}>
                <TableCard key={table.id} tableInfo={table} state={tablesStates[table.id]} dispatcherFunc={dispatchTables} />
                //</BookingContextProvider>
              )
            }))}
          </div>
          <div className='p-4 flex flex-row justify-end'>
            <Button variant='gradient' className={` ${tablesStates.bookButtonEnabled ? "bg-cyan-400" : "bg-gray-500"}  text-slate-200 rounded-full w-24  drop-shadow-2xl`}>
              <img src={icon} />
            </Button>
          </div>
        </div>
      </div >
    </div >
  );
}

export default Book;
