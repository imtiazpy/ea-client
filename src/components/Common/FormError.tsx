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
            <p
              key={index}
              className="bg-red-300 py-1 px-2 rounded-lg text-sm"
              data-aos="fade-left"
              data-aos-delay="300"
              data-aos-easing="linear"
            >
              {item}
            </p>
          ))
        }

        {formError['detail'] && (
          <p
            className="bg-red-300 py-1 px-2 rounded-lg text-sm"
            data-aos="fade-left"
            data-aos-delay="300"
            data-aos-easing="linear"
          >
            {formError.detail}
          </p>
        )}
        {formError['non_field_errors'] && name === 'password' &&
          formError['non_field_errors']?.map((item: any, index: any) => (
            <p
              key={index}
              className="bg-red-300 py-1 px-2 rounded-lg text-sm"
              data-aos="fade-left"
              data-aos-delay="300"
              data-aos-easing="linear"
            >
              {item}
            </p>
          ))
        }
      </div>
    </>
  );
};

export default FormError;
