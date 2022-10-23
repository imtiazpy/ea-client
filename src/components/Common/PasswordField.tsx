import { useContext, useState } from 'react';

import AuthContext from '../../context/Auth/AuthContext';
import { FormError } from '../Common';

export interface IPasswordField
  extends React.ComponentPropsWithoutRef<'input'> {
  placeholder: string;
  name: string;
  id?: string;
}

const PasswordField: React.FC<IPasswordField> = ({
  className,
  placeholder,
  name,
  id,
  ...inputProps
}) => {
  const [showPass, setShowPass] = useState<boolean>(true);

  const gContext = useContext(AuthContext);

  const togglePassword = () => {
    setShowPass(!showPass);
  };

  return (
    <>
      {gContext.validationError && (
        <FormError formError={gContext.validationError} name={name} />
      )}
      <div className="relative mb-8">
        <input
          {...inputProps}
          className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-blue-600"
          type={showPass ? 'password' : 'text'}
          placeholder={placeholder}
          required
          name={name}
          id={id}
        />

        <label
          htmlFor="password"
          className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
        >
          Password
        </label>
        <a
          href="#"
          className="absolute top-2.5 right-0 mr-6 text-black"
          onClick={(e) => {
            e.preventDefault();
            togglePassword();
          }}
        >
          {!showPass ? (
            <i className="fas fa-eye-slash"></i>
          ) : (
            <i className="fas fa-eye"></i>
          )}
        </a>
      </div>
    </>
  );
};

export default PasswordField;
