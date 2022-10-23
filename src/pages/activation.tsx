
export interface IActivation extends React.ComponentPropsWithoutRef<'div'> {}


const Activation: React.FC<IActivation> = ({ className, ...divProps }) => {
    return (
        <div className="text-center text-yellow-600 mt-5 py-5 bg-slate-300">
            Account has been created. Please activate your account.
            An activation link has been sent to your email account.
        </div>
    );
};

export default Activation;