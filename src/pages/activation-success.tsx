export interface IActivationSuccess
  extends React.ComponentPropsWithoutRef<'div'> {}

const ActivationSuccess: React.FC<IActivationSuccess> = ({
  className,
  ...divProps
}) => {
  return (
    <div className="text-center text-yellow-600 mt-5 py-5 bg-slate-300">
      Account has been activated.
    </div>
  );
};

export default ActivationSuccess;
