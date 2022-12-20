import { useContext } from 'react';
import AuthContext from '../../../context/Auth/AuthContext';

export interface IAuthButton extends React.ComponentPropsWithoutRef<'button'> {
  signIn?: () => void;
}

const AuthButton: React.FC<IAuthButton> = ({
  className,
  signIn,
  ...buttonProps
}) => {
  const { state, logout } = useContext(AuthContext);

  return (
    <button
      onClick={state.authenticated ? logout : signIn}
      className={`${className} cursor-pointer bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-black`}
      {...buttonProps}
    >
      {state.authenticated ? (
        <i className="fas fa-sign-out-alt text-center">&nbsp;Sign Out</i>
      ) : (
        <i className="fas fa-sign-in-alt text-center">&nbsp;Sign In</i>
      )}
    </button>
  );
};

export default AuthButton;
