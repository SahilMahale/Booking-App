import { jwtDecode } from 'jwt-decode';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

const ACTIONS = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  RECOVER: 'recover',
  RETURNSTATE: 'returnState',
};

const initialContext = {
  isLoggedIn: false,
  claims: null,
  token: '',
  isRecovered: false,
};

const reducer = (contextState, action) => {
  if (action.type === ACTIONS.LOGIN) {
    contextState.token = action.payload.token;
    contextState.claims = jwtDecode(action.payload.token);
    contextState.isLoggedIn = true;
    localStorage.setItem('authard', JSON.stringify(contextState));
    contextState.isRecovered = true;
    return { ...contextState };
  } else if (action.type === ACTIONS.RECOVER) {
    contextState = JSON.parse(localStorage.getItem('authard'));
    console.log("-----CONTEXT RECOVERED: ", contextState)
    if (contextState === null) {
      contextState = initialContext;
      localStorage.setItem('authard', JSON.stringify(contextState));
    }
    contextState.isRecovered = true;
    return { ...contextState };
  } else if (action.type === ACTIONS.LOGOUT) {
    contextState = initialContext;
    localStorage.setItem('authard', JSON.stringify(contextState));
    return { ...contextState };
  } else if (action.type === ACTIONS.RETURNSTATE) {
    return { ...contextState };
  } else {
    return console.error('INVALID ACTION FOR REDUCER');
  }
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [appContext, dispatch] = useReducer(reducer, initialContext);
  console.log("---------------AUTH RELOAD----------------")
  const SetToken = (jwtToken) => {
    dispatch({ type: ACTIONS.LOGIN, payload: { token: jwtToken } });
    window.location.replace('/');
  };
  const LogOut = () => {
    dispatch({ type: ACTIONS.LOGOUT });
  };
  useMemo(() => {

    console.log("---------------AUTH RECOVER BEGIN----------------")
    dispatch({ type: ACTIONS.RECOVER });

  }, []);
  const contextVal = useMemo(
    () => ({ appContext, SetToken, LogOut }),
    [appContext, SetToken, LogOut]
  );
  return (
    <AuthContext.Provider value={contextVal}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
