import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { deleteAllCookies } from '../../utility/';
import { useApiHelper } from '../../utility';
import CoreConstraint from '../../coreConstraint';

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
  loginSuccessCB: () => undefined,
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
    router.push('/');
    toast.success("You're logged out");
  };

  // Error Callback Functions
  const validationErrorCB = (error: any) => {
    setValidationError(error?.response?.data);
    toast.error('Submission failed');
  };

  const loginSuccessCB = (response: any) => {
    if (response?.access) {
      Cookies.set('accessToken', response.access);
      setAuthenticated(true);

      // Checking and setting the user type in cookies
      api
        .userType()
        .then((res: any) => {
          Cookies.set('userType', res.type);
        })
        .catch((err) => {
          toast.error('User not found!');
        });

      toast.success('you are logged in');
      setValidationError(null);
      // router.push('/dashboard');
    }
  };

  const handleSignUpSuccess = () => {
    toast.success('your registration Done');
    setValidationError(null);
    router.push('/activation');
  };

  useEffect(() => {
    // decide if authenticated or not
    if (Cookies.get('accessToken')) {
      return setAuthenticated(true);
    } else {
      return setAuthenticated(false);
    }
  });

  useEffect(() => {
    // check the user type
    if (Cookies.get('userType') === CoreConstraint.EMPLOYER) {
      return setIsEmployer(true);
    } else if (Cookies.get('userType') === CoreConstraint.JOB_SEEKER) {
      return setIsJobSeeker(true);
    }
  });

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
        loginSuccessCB,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
