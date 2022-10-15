export interface IFooter extends React.ComponentPropsWithoutRef<'footer'> {}

const Footer: React.FC<IFooter> = ({ className, ...footerProps }) => {
  return (
    <footer {...footerProps} className="bg-slate-100 text-slate-500">
      <div className={`md:container w-full p-5 ${className}`}>
        <p>Canada</p>
      </div>
    </footer>
  );
};

export default Footer;
