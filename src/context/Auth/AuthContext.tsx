import { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { deleteAllCookies } from '../../utility/';

export interface IAuthContext {
  authenticated: false | true;
  login: () => void;
  logout: () => void;
}

const defaultValue: IAuthContext = {
  authenticated: false,
  login: () => undefined,
  logout: () => undefined,
};

const AuthContext = createContext<IAuthContext>(defaultValue);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    defaultValue.authenticated
  );
  const [validationError, setValidationError] = useState(null);

  const router = useRouter();

  const login = () => setAuthenticated(true);

  const logout = () => {
    localStorage.clear();
    deleteAllCookies();
    setAuthenticated(false);
  };

  // Error Callback Functions
  const validationErrorCB = (error: any) => {
    setValidationError(error?.response?.data?.detail);
  };

  const loginSuccessCB = (response: any) => {
    if (response?.access) {
      Cookies.set('accessToken', response.access);

      toast.success('you are logged in');
      setValidationError(null);
      router.push('/dashboard');
    }
  };

  const handleSignUpSuccess = (response: any) => {
    toast.success('your registration Done');
    setValidationError(null);
    router.push('/activation');
    // if (response?.token) {
    //   Cookies.set('accessToken', response.token);
    //   toast.success("your registration Done");
    //   setValidationError(null);
    //   router.push('/dashboard');
    // }
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
