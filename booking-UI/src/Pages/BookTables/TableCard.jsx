import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import TableIcon from "./TableIcon";
import check from "./checkMark.svg"
import cross from "./crossMark.svg"
import nonVeg from "./nonVeg.svg"
import veg from "./veg.svg"
import { ACTIONS, TABLESTATES } from "./constants";
import { useRef } from "react";
//import { useBookingConext } from "./Book";

let reren = 0

export const TableCard = (({ tableInfo, state, dispatcherFunc }) => {

  console.log("-----------------------------------------")
  reren++
  console.log("Re-Render Card grid count:", reren)
  console.log("-----------------------------------------")

  if (tableInfo === undefined) {
    return
  }
  const tableInfoRef = useRef(tableInfo)
  if (state === undefined) {
    return
  }
  function handleClick(tableInfo) {
    console.log("CardCLicked with Status:", state.tableStatus)
    if (state.tableStatus === TABLESTATES.SELECTED) {
      //setIsSelected(!tableIsSelected)
      dispatcherFunc({ type: ACTIONS.DESELECT, payload: { tableInfo: tableInfo } })
      return
    }
    dispatcherFunc({ type: ACTIONS.SELECT, payload: { tableInfo: tableInfo } })
  }

  return (
    <Card key={tableInfoRef.current?.id} id={tableInfoRef.current.id}
      onClick={() => {
        //    console.log("Table Created with: ", tableInfoRef.current, "With state: ", state)
        handleClick(tableInfoRef.current)
      }}
      className="mt-6 w-60 h-80 p-4 bg-gray-700 text-slate-300 cursor-pointer rounded-lg border-1 
      hover:ring-2 hover:ring-cyan-400 drop-shadow-2xl shadow-lg shadow-slate-900 hover:shadow-xl hover:shadow-cyan-700/60">
      <CardHeader shadow={false} className="relative items-center bg-gray-700 text-gray-100">
        <Typography variant="h3" className="mb-2 text-center">
          Table
        </Typography>
      </CardHeader>
      <CardBody className="">
        <TableIcon status={state.tableStatus} />
        <div className="pt-8">
          <Typography variant="h5" >
            A/C: {tableInfoRef.current.ac ? (<img className="inline align-baseline px-1" src={check} width={20} />) :
              (<img className="inline align-baseline px-1" src={cross} width={18} />)}
          </Typography>
          <Typography variant="h5">
            Seats : {tableInfoRef.current.seats}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-1">
        {tableInfoRef.current.nonVeg ? (<img className="inline align-baseline px-1" src={nonVeg} width={35} />) :
          (<img src={veg} width={30} />)}
      </CardFooter>
    </Card>
  );
})
