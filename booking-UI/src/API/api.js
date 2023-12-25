import axios from 'axios';

const getBookingsList = async () => {
  let data;
  const resp = await axios
    .get(`http://localhost:8080/bookings`, {
      headers: {
        'Content-Type': 'application/type',
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
    .get(`http://localhost:8080/user/info`, {
      headers: {
        'Content-Type': 'application/type',
      },
    })
    .then((Response) => {
      data = Response.data;
    });

  return data;
};

const putBookings = async (user, tickets) => {
  let data;
  const resp = await axios
    .post(
      `http://localhost:8080/bookings`,
      {
        user: user,
        tickets: tickets,
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
const userSignup = async (user,email,pass) => {
    let data;
    const resp = await axios
      .post(
        `http://localhost:8080/user/signup`,
        {
          user: user,
          email:email,
          pass: pass,
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

  const adminSignup = async (user,email,pass) => {
    let data;
    const resp = await axios
      .post(
        `http://localhost:8080/admin/signup`,
        {
          user: user,
          email:email,
          pass: pass,
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
        `http://localhost:8080/user/signin`,
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
        data = Response.data;
      });
  
    return data;
  };

  const adminLogin = async (user, pass) => {
    let data;
    const resp = await axios
      .post(
        `http://localhost:8080/admin/signin`,
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
        data = Response.data;
      });
  
    return data;
  };
  
export { getBookingsList, getUsersList, putBookings,userLogin,adminLogin,userSignup,adminSignup };
