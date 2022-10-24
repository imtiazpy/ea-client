import { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { deleteAllCookies } from '../../utility/';
import { useApiHelper } from '../../utility';

export interface IAuthContext {
  authenticated: false | true;
  isEmployer: false | true;
  isJobSeeker: false | true;
  validationError: any;
  logout: () => void;
  handleSignUpSuccess: () => any;
  validationErrorCB: (error: object) => any;
  loginSuccessCB: (response: object) => any;
}

const defaultValue: IAuthContext = {
  authenticated: false,
  isEmployer: false,
  isJobSeeker: false,
  validationError: null,
  logout: () => undefined,
  handleSignUpSuccess: () => undefined,
  validationErrorCB: () => undefined,
  loginSuccessCB: () => undefined
};

const AuthContext = createContext<IAuthContext>(defaultValue);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    defaultValue.authenticated
  );
  const [isEmployer, setIsEmployer] = useState<boolean>(
    defaultValue.isEmployer
  );
  const [isJobSeeker, setIsJobSeeker] = useState<boolean>(
    defaultValue.isJobSeeker
  );

  const [validationError, setValidationError] = useState(
    defaultValue.validationError
  );

  const router = useRouter();
  const api = useApiHelper();


  const logout = () => {
    localStorage.clear();
    deleteAllCookies();
    setAuthenticated(false);
    router.push('/')
    toast.success("You're logged out")
  };

  // Error Callback Functions
  const validationErrorCB = (error: any) => {
    setValidationError(error?.response?.data);
    toast.error('Submission failed');
  };

  const loginSuccessCB = (response: any) => {
    if (response?.access) {
      Cookies.set('accessToken', response.access);
      api.userType().then((res: any) => {
        Cookies.set('userType', res.type);
        console.log(res)
      }).catch(err => {
        toast.error("User not found!");
      })
      toast.success('you are logged in');
      setValidationError(null);
      // router.push('/dashboard');
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
    <AuthContext.Provider
      value={{
        authenticated,
        isEmployer,
        isJobSeeker,
        validationError,
        logout,
        handleSignUpSuccess,
        validationErrorCB,
        loginSuccessCB
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
