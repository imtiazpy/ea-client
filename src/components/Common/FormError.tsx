export interface IFormError extends React.ComponentPropsWithoutRef<'p'> {
  formError: any;
  name: string;
}

const FormError: React.FC<IFormError> = ({
  className,
  formError,
  name,
  ...pProps
}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-1">

        {formError[name] &&
          formError[name]?.map((item: any, index: any) => (
            <p key={index} className="bg-red-300 py-1 px-2 rounded-lg text-sm">
              {item}
            </p>
          ))
        }

        {formError['detail'] &&
          <p className="bg-red-300 py-1 px-2 rounded-lg text-sm">{formError.detail}</p>
        }

      </div>
    </>
  );
};

export default FormError;
