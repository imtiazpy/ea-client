import { createContext, useEffect, useState, useReducer } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { deleteAllCookies } from '../../utility/';
import { useApiHelper } from '../../utility';
import CoreConstraint from '../../coreConstraint';
import reducer from './AuthReducer';

export interface IAuthContext {
  state: any;
  dispatch: any;
  logout: () => any;
  handleSignUpSuccess: () => any;
  validationErrorCB: (error: object) => any;
  loginSuccessCB: (response: object) => any;
}

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

  const loginSuccessCB = (response: any) => {
    if (response?.access) {
      Cookies.set('accessToken', response.access);
      dispatch({ type: 'LOGIN_SUCCESS' })

      // Checking and setting the user type in cookies
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

  const handleSignUpSuccess = () => {
    toast.success('your registration Done');
    dispatch({ type: 'SIGNUP_SUCCESS' })
    router.push('/activation');
  };

  useEffect(() => {
    // decide if authenticated or not
    if (Cookies.get('accessToken')) {
      return dispatch({ type: 'CHECK_AUTH_STATUS', payload: true })
    } else {
      return dispatch({ type: 'CHECK_AUTH_STATUS', payload: false })
    }
  }, []);

  useEffect(() => {
    // check the user type
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
