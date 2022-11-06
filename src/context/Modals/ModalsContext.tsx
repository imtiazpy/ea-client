import { createContext, useContext, useState } from 'react';
import AuthContext from '../Auth/AuthContext';

export interface IModalsContext {
  signUpModalShow: true | false;
  signInModalShow: true | false;
  toggleSignUpModal: () => void;
  toggleSignInModal: () => void;
}

const defaultValue: IModalsContext = {
  signUpModalShow: false,
  signInModalShow: false,
  toggleSignInModal: () => undefined,
  toggleSignUpModal: () => undefined,
};

const ModalsContext = createContext<IModalsContext>(defaultValue);

export const ModalsProvider: React.FC<any> = ({ children }) => {
  const [signUpModalShow, setSignUpModalShow] = useState<boolean>(
    defaultValue.signUpModalShow
  );

  const [signInModalShow, setSignInModalShow] = useState<boolean>(
    defaultValue.signInModalShow
  );

  const { setValidationError } = useContext(AuthContext);

  const toggleSignUpModal = () => {
    setValidationError(null);
    setSignUpModalShow(!signUpModalShow);
  };

  const toggleSignInModal = () => {
    setValidationError(null);
    setSignInModalShow(!signInModalShow);
  };

  return (
    <ModalsContext.Provider
      value={{
        signUpModalShow,
        signInModalShow,
        toggleSignUpModal,
        toggleSignInModal,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};

export default ModalsContext;
