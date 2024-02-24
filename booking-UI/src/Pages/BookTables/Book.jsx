import React, { useReducer } from 'react';
import { Button } from '@material-tailwind/react';
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
  selectedTables: [],
};
let reren = 0;


const BookTable = (bookInfo, selectedTablesArr = []) => {
  let selectedTablesInfo = new Map()
  selectedTablesArr.map((tableID) => {
    selectedTablesInfo.set(tableID, bookInfo[tableID])
  })
  let arr = []

  for (const tab of selectedTablesInfo.keys()) {
    arr.push(tab)
  }
  console.log("These tables are booked!", arr)
  return arr
}
// Refactor to match the new hashMap state
function tableReducer(tableState, action) {
  //console.log("DISPATCHING____________________________________________________")
  if (action.type === ACTIONS.SELECT) {
    const tableInfo = action.payload.tableInfo;
    if (!tableInfo.available || !tableState[tableInfo.id] || tableState[tableInfo.id].tableStatus === TABLESTATES.BOOKED) {
      alert("Table is already booked or is unavialable")
      return { ...tableState }
    }
    tableState[tableInfo.id].tableStatus = TABLESTATES.SELECTED;
    tableState.selectedTables?.push(tableInfo.id)
    /*react doesn't rerender for same object with mutation,
     * it needs a new object like a babyi */
    return { ...tableState }
  } else if (action.type === ACTIONS.DESELECT) {
    const tableInfo = action.payload.tableInfo;
    if (!tableState[tableInfo.id]) {
      return { ...tableState }
    }
    tableState[tableInfo.id].tableStatus = TABLESTATES.AVAILABLE
    tableState.selectedTables = tableState.selectedTables?.filter((elem) => {
      return elem !== tableInfo.id
    })
    return { ...tableState }
  } else if (action.type === ACTIONS.BOOK) {
    //change to use selectedTables array
    if (tableState.selectedTables?.length > 0) {
      const bookedTables = BookTable(tableState, tableState.selectedTables);
      console.log(typeof bookedTables, bookedTables)

      bookedTables.map((tId) => {
        // console.log("After fileter:", tableState.selectedTables)
        tableState[tId].tableStatus = TABLESTATES.BOOKED
      })

      tableState.selectedTables = []
      return { ...tableState }
    }
    return tableState
  }
  else if (action.type === ACTIONS.LOAD) {
    const tableInfo = action.payload.tableInfo;
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
    console.log("Cards selected", tablesStates.selectedTables)
  }, [tablesStates])
  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="container mx-auto rounded-md pb-10 bg-slate-700 flex flex-col items-center ">
        <div className='drop-shadow-2xl'>
          < h2 className="font-sans text-slate-200 tracking-tight text-3xl text-center font-bold " >
            Book Tables
          </h2 >
        </div>
        <div className='flex flex-col'>
          <div className=' mt-50 lg:grid lg:grid-cols-5 gap-5 md:flex md:flex-col'>
            {cardInfo && (cardInfo.tables.map((table) => {
              return (
                <TableCard key={table.id} tableInfo={table} state={tablesStates[table.id]} dispatcherFunc={dispatchTables} />
              )
            }))}
          </div>
          <div className='fixed lg:bottom-36 lg:right-44 sm:right-32 right-[1px] p-4 flex'>
            <Button
              variant='gradient'
              about='Button to book selected tables'

              onClick={() => {
                dispatchTables({ type: ACTIONS.BOOK })
              }}
              className={` ${(tablesStates.selectedTables?.length > 0) ? "bg-cyan-400 text-cyan-900" : "bg-gray-500 text-gray-200"}   rounded-full w-24  drop-shadow-2xl font-bold`}>
              <img src={icon} />
              Book
            </Button>
          </div>
        </div>
      </div >
    </div >
  );
}

export default Book;
