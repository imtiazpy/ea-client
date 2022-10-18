import { createContext, useState } from 'react';

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
  )

  const toggleSignUpModal = () => {
    setSignUpModalShow(!signUpModalShow);
  };

  const toggleSignInModal = () => {
    setSignInModalShow(!signInModalShow);
  };

  return (
    <ModalsContext.Provider value={
      { signUpModalShow, signInModalShow, toggleSignUpModal, toggleSignInModal }
    }>
      {children}
    </ModalsContext.Provider>
  );
};

export default ModalsContext;
