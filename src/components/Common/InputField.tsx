import { useContext } from 'react';
import AuthContext from '../../context/Auth/AuthContext';

import { FormError } from '../Common';

export interface IInputField extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  onChange?: any;
  required?: boolean;
}

const InputField: React.FC<IInputField> = ({
  className,
  label,
  type,
  name,
  id,
  placeholder,
  onChange,
  required,
  ...inputProps
}) => {
  const gContext = useContext(AuthContext);

  return (
    <>
      {gContext.validationError && (
        <FormError formError={gContext.validationError} name={name} />
      )}

      <div className="relative mb-8">
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-blue-600 ${className}`}
          required
        />

        <label
          htmlFor={id}
          className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
        >
          {label}
        </label>
      </div>
    </>
  );
};

export default InputField;
