import { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { deleteAllCookies } from '../../utility/';

export interface IAuthContext {
  authenticated: false | true;
  isEmployer: false | true;
  isJobSeeker: false | true;
  validationError: any;
  login: () => void;
  logout: () => void;
  handleSignUpSuccess: () => any;
  validationErrorCB: (error: object) => any;
}

const defaultValue: IAuthContext = {
  authenticated: false,
  isEmployer: false,
  isJobSeeker: false,
  validationError: null,
  login: () => undefined,
  logout: () => undefined,
  handleSignUpSuccess: () => undefined,
  validationErrorCB: () => undefined
};

const AuthContext = createContext<IAuthContext>(defaultValue);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    defaultValue.authenticated
  );
  const [isEmployer, setIsEmployer] = useState<boolean>(defaultValue.isEmployer);
  const [isJobSeeker, setIsJobSeeker] = useState<boolean>(defaultValue.isJobSeeker);

  const [validationError, setValidationError] = useState(defaultValue.validationError);

  const router = useRouter();

  const login = () => setAuthenticated(true);

  const logout = () => {
    localStorage.clear();
    deleteAllCookies();
    setAuthenticated(false);
  };

  // Error Callback Functions
  const validationErrorCB = (error: any) => {
    setValidationError(error?.response?.data);
    toast.error("Submission failed")
  };

  const loginSuccessCB = (response: any) => {
    if (response?.access) {
      Cookies.set('accessToken', response.access);
      Cookies.set('userType', response.user.type);

      toast.success('you are logged in');
      setValidationError(null);
      router.push('/dashboard');
    }
  };

  const handleSignUpSuccess = () => {
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
    <AuthContext.Provider value={{ authenticated, isEmployer, isJobSeeker, validationError, login, logout, handleSignUpSuccess, validationErrorCB }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
