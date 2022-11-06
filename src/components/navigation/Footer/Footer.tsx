export interface IFooter extends React.ComponentPropsWithoutRef<'footer'> {}

const Footer: React.FC<IFooter> = ({ className, ...footerProps }) => {
  return (
    <footer {...footerProps} className="bg-slate-800 text-slate-500 mt-auto">
      <div className={`md:container w-full p-5 text-center ${className}`}>
        <p>Copyright © Imtiaz Ahmed, 2022. MIT Licensed.</p>
      </div>
    </footer>
  );
};

export default Footer;
