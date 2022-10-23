import { useContext } from 'react';
import AuthContext from '../../context/Auth/AuthContext';

import { FormError } from '../Common'


export interface IInputField extends React.ComponentPropsWithoutRef<'input'> {
    type: string;
    name: string;
    id: string;
    placeholder: string;
    onChange: any;
    required?: boolean;
}


const InputField: React.FC<IInputField> = (
    { className, type, name, id, placeholder, onChange, required, ...inputProps  }
) => {
    
    const gContext = useContext(AuthContext)
    

    return (
        <>
            {
                gContext.validationError && <FormError formError={gContext.validationError} name={name} />
            }
            
            <input 
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                onChange={onChange}
                className={className}
                required 
            />
        </>
    );
};

export default InputField;