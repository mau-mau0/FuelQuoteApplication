import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user:  null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      console.log("inside login start");
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
    //   console.log("inside login success");
    //   console.log("action.payload", action.payload);
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
    //   console.log("inside login failure");
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
    //   console.log("inside logout");
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }

};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  ) 
}

