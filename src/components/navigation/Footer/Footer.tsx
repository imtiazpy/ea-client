import AuthButton from "src/components/Buttons/Auth/AuthButton";
import { CustomLink } from "src/components/Common";

export interface IFooter extends React.ComponentPropsWithoutRef<'footer'> { }

const Footer: React.FC<IFooter> = ({ className, ...footerProps }) => {
  return (
    <footer {...footerProps} className="bg-slate-800 mt-auto p-5">
      <div className="md:container">
        <div className={`w-full p-5 flex justify-between ${className}`}>
          <div>
            <h1 className="text-2xl">Ace the Assessments and get hired</h1>
            <p>Join the network and connect with the best employers.</p>
          </div>
          <div>
            <AuthButton />
          </div>
        </div>
        <hr className="my-4 md:container" />
        <div className="grid grid-cols-3">
          <div>
            <h1 className=" font-bold text-xl cursor-pointer">
              <CustomLink to="/" scroll={false}>
                Employee<span className="text-blue-600">Assessment</span>
              </CustomLink>
            </h1>
            <p>Contact us at hello@ea.com</p>
            <p>follow us on this this that</p>
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-4">
              <div>
                <p>item</p>
                <p>item</p>
                <p>item</p>
                <p>item</p>
              </div>
              <div>
                <p>item</p>
                <p>item</p>
                <p>item</p>
                <p>item</p>
              </div>
              <div>
                <p>item</p>
                <p>item</p>
                <p>item</p>
                <p>item</p>
              </div>
              <div>
                <p>item</p>
                <p>item</p>
                <p>item</p>
                <p>item</p>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4 md:container" />
        <div className="flex justify-between">
          <p>© 2022 EA - The EA Platform</p>
          <div className="flex">
            <p>Cookies</p>
            <p>Privacy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
