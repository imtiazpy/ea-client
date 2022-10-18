import { useState } from "react";

export interface IPasswordField extends React.ComponentPropsWithoutRef<'input'> {
    placeholder: string;
    name: string;
    id: string;
}


const PasswordField: React.FC<IPasswordField> = (
    { className, placeholder, name, id, ...inputProps }
) => {

    const [showPass, setShowPass] = useState<boolean>(true);

    const togglePassword = () => {
        setShowPass(!showPass);
    };

    return (
        <div className="relative">
            <input 
                {...inputProps}
                className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
                type={showPass ? "password" : "text"}
                placeholder={placeholder}
                required
                name={name}
                id={id}
            />
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
                ): (
                <i className="fas fa-eye"></i>
                )}
            </a>
        </div>
    );
};

export default PasswordField;