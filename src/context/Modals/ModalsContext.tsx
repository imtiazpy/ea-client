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

  const { dispatch } = useContext(AuthContext)

  /**
   * The function toggles the sign up modal show state to the opposite of what it currently is
   */
  const toggleSignUpModal = () => {
    dispatch({ type: 'ERROR', payload: null })
    setSignUpModalShow(!signUpModalShow);
  };

  const toggleSignInModal = () => {
    dispatch({ type: 'ERROR', payload: null })
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
