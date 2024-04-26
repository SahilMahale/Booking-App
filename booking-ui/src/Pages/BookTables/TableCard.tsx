import TableIcon from "./TableIcon";
import check from "./checkMark.svg"
import cross from "./crossMark.svg"
import nonVeg from "./nonVeg.svg"
import veg from "./veg.svg"
import { ACTIONS, TABLESTATES } from "./constants";
import { useRef } from "react";
import { Card, CardHeader, CardDescription, CardFooter, CardContent, CardTitle } from "@/components/ui/card";
import { TableInfo } from "./mockAPI";
import { TableState, TableStateActions } from "./Book";
//import { useBookingConext } from "./Book";

let reren = 0

export const TableCard = (({ tableInfo, state, dispatcherFunc }: { tableInfo: TableInfo, state: TableState, dispatcherFunc: React.Dispatch<TableStateActions> }) => {

  console.log("-----------------------------------------")
  reren++
  console.log("Re-Render Card grid count:", reren)
  console.log("-----------------------------------------")

  const tableInfoRef = useRef(tableInfo)

  function handleClick(tableInfo: TableInfo) {
    console.log("CardCLicked with Status:", state.tableStatus)
    try {
      if (state.tableStatus === TABLESTATES.SELECTED) {
        //setIsSelected(!tableIsSelected)
        dispatcherFunc({ type: ACTIONS.DESELECT, tableInfo: tableInfo })
        return
      }
      dispatcherFunc({ type: ACTIONS.SELECT, tableInfo: tableInfo })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Card key={tableInfoRef.current?.id} id={tableInfoRef.current.id.toString()}
      onClick={() => {
        //    console.log("Table Created with: ", tableInfoRef.current, "With state: ", state)
        handleClick(tableInfoRef.current)
      }}
      className="mt-6 w-60 h-80 p-4 bg-gray-700 text-slate-300 cursor-pointer rounded-lg border-1 
      hover:ring-2 hover:ring-cyan-400 drop-shadow-2xl shadow-lg shadow-slate-900 hover:shadow-xl hover:shadow-cyan-700/60">
      <CardHeader className="relative items-center bg-gray-700 text-gray-100">
        <CardTitle className="mb-2 text-center">
          Table
        </CardTitle>
        <CardDescription>
          Table Description
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <TableIcon status={state.tableStatus} />
        <div className="pt-8">
          <h5>
            A/C: {tableInfoRef.current.ac ? (<img className="inline align-baseline px-1" src={check} width={20} />) :
              (<img className="inline align-baseline px-1" src={cross} width={18} />)}
          </h5>
          <h5>
            Seats : {tableInfoRef.current.seats}
          </h5>
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        {tableInfoRef.current.nonVeg ? (<img className="inline align-baseline px-1" src={nonVeg} width={35} />) :
          (<img src={veg} width={30} />)}
      </CardFooter>
    </Card>
  );
})
