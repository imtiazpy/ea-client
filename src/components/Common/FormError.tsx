

export interface IFormError extends React.ComponentPropsWithoutRef<'p'> {
    formError: any;
    name: string;
}


const FormError: React.FC<IFormError> = ({ className, formError, name, ...pProps }) => {
    return (
        <>
            {formError[name]?.map((item: any, index: any) => (
                <p key={index} className='bg-red-300 py-2 px-2 mb-1 rounded-lg'>{item}</p>
            ))}
        </>
    );
};

export default FormError;