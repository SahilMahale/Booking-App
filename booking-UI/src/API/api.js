import axios from 'axios'

const getBookingsList = async ()=> {
    let data
    const resp = await axios.get(`http://localhost:8080/bookings`,{
        headers:{
            "Content-Type":'application/type',
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Headers": "X-Requested-With"
        }
    }).then(Response=>{
        data = Response.data
    })

    return data

}


export  {getBookingsList}