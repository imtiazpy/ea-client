import { createContext, useEffect, useState, useReducer } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { deleteAllCookies } from '../../utility/';
import { useApiHelper } from '../../utility';
import CoreConstraint from '../../coreConstraint';
import reducer from './AuthReducer';

/* Defining the interface of the AuthContext. */
export interface IAuthContext {
  state: any;
  dispatch: any;
  logout: () => any;
  handleSignUpSuccess: () => any;
  validationErrorCB: (error: object) => any;
  loginSuccessCB: (response: object) => any;
}


/* The default value of the context. */
const defaultValue: IAuthContext = {
  state: {},
  dispatch: () => undefined,
  logout: () => undefined,
  handleSignUpSuccess: () => undefined,
  validationErrorCB: () => undefined,
  loginSuccessCB: () => undefined,
};

const AuthContext = createContext<IAuthContext>(defaultValue);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultValue)

  const router = useRouter();
  const api = useApiHelper();


  /**
   * It clears the localStorage, deletes all cookies, dispatches a logout action, redirects to the home page, and displays a toast message
   */
  const logout = () => {
    localStorage.clear();
    deleteAllCookies();
    dispatch({ type: 'LOGOUT' })
    router.push('/');
    router.reload()
    toast.success("You're logged out");
  };


  // Error Callback Functions
  const validationErrorCB = (error: any) => {
    dispatch({ type: 'ERROR', payload: error?.response?.data })
  };



  /**
   * A callback function that is called when the login is successful.
   * @param {any} response - any - This is the response that we get from the API.
   */
  const loginSuccessCB = (response: any) => {
    if (response?.access) {
      Cookies.set('accessToken', response.access);
      dispatch({ type: 'LOGIN_SUCCESS' })

      /* This is checking the user type and setting the user type in cookies. */
      api
        .userType()
        .then((res: any) => {
          Cookies.set('userType', res.type);
          if (res.type === CoreConstraint.JOB_SEEKER) {
            dispatch({ type: 'USER_TYPE_JOB_SEEKER' })
          } else if (res.type === CoreConstraint.EMPLOYER) {
            dispatch({ type: 'USER_TYPE_EMPLOYER' })
          }
        })
        .catch((err) => {
          toast.error('User not found!');
        });


      toast.success('you are logged in');

      // don't uncomment this
      // router.push('/dashboard');
    }
  };


  /**
   * A function that is called when the user successfully registers.
   */
  const handleSignUpSuccess = () => {
    toast.success('your registration Done');
    dispatch({ type: 'SIGNUP_SUCCESS' })
    router.push('/activation');
  };


  /* Checking if the user is authenticated or not. */
  useEffect(() => {
    if (Cookies.get('accessToken')) {
      return dispatch({ type: 'CHECK_AUTH_STATUS', payload: true })
    } else {
      return dispatch({ type: 'CHECK_AUTH_STATUS', payload: false })
    }
  }, []);


  /* Checking the user type and dispatching the action accordingly. */
  useEffect(() => {
    if (Cookies.get('userType') === CoreConstraint.EMPLOYER) {
      return dispatch({ type: 'USER_TYPE_EMPLOYER' })
    } else if (Cookies.get('userType') === CoreConstraint.JOB_SEEKER) {
      return dispatch({ type: 'USER_TYPE_JOB_SEEKER' })
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        logout,
        handleSignUpSuccess,
        validationErrorCB,
        loginSuccessCB,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
