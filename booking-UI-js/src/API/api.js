import axios from 'axios';
const getBookingsList = async ({ queryKey }) => {
  const [_, authKey, user] = queryKey;
  let data;
  let API_GATEWAY = process.env.API_GATEWAY
  let API_PORT = process.env.API_PORT
  if (API_GATEWAY === "" || API_GATEWAY === "localhost") {
    API_GATEWAY = "http://localhost"
  }
  if (API_PORT === "") {
    API_PORT === "8080"
  }
  const resp = await axios
    .get(`/api/bookings`, {
      headers: {
        'Content-Type': 'application/type',
        Authorization: 'Bearer ' + authKey,
      },
      params: {
        user,
      },
    })
    .then((Response) => {
      data = Response.data;
    });

  return data;
};
const getUsersList = async () => {
  let data;
  const resp = await axios
    .get(`/api/user/info`, {
      headers: {
        'Content-Type': 'application/type',
      },
    })
    .then((Response) => {
      data = Response.data;
    });

  return data;
};

const putBookings = async (user, tickets, authKey) => {
  let data;
  const resp = await axios
    .post(
      `$/api/bookings`,
      {
        user: user,
        tickets: tickets,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authKey,
        },
      }
    )
    .then((Response) => {
      data = Response.data;
    });

  return data;
};
const userSignup = async (user, email, pass, isadmin) => {
  let data;
  const resp = await axios
    .post(
      `$/api/user/signup`,
      {
        user: user,
        email: email,
        pass: pass,
        isadmin: isadmin,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((Response) => {
      data = Response.data;
    });

  return data;
};

const userLogin = async (user, pass) => {
  let data;
  const resp = await axios
    .post(
      `/api/user/signin`,
      {
        user: user,
        pass: pass,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((Response) => {
      // console.log(Response.data)
      data = Response.data;
    });

  return data;
};

export { getBookingsList, getUsersList, putBookings, userLogin, userSignup };
