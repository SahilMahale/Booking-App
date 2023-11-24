import axios from 'axios'

const getBookingsList = async ()=> {
    let data
    const resp = await axios.get(`http://localhost:8080/bookings`,{
        headers:{
            "Content-Type":'application/type',
        }
    }).then(Response=>{
        data = Response.data
    })

    return data

}
const getUsersList = async ()=> {
    let data
    const resp = await axios.get(`http://localhost:8080/user/info`,{
        headers:{
            "Content-Type":'application/type',
        }
    }).then(Response=>{
        data = Response.data
    })

    return data

}



export  {getBookingsList,getUsersList}