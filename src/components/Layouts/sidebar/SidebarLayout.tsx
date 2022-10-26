import Sidebar from '../../navigation/Sidebar/Sidebar';
import Header from '../../navigation/Header/Header';
import { InputField, SearchBox } from '../../Common';

export interface ISidebarLayout extends React.ComponentPropsWithoutRef<'div'> {}

const SidebarLayout: React.FC<ISidebarLayout> = ({
  className,
  children,
  ...divProps
}) => {
  return (
    <>
      <div className="h-screen flex flex-row justify-start">
        <aside className='relative'>
          <Sidebar />
        </aside>
        <main className="flex-1 h-screen overflow-x-scroll">
          <div className="relative">
            <div className="top h-64 bg-slate-800 pt-8 px-10">
              <div className="flex flex-col md:flex-row justify-between items-center space-x-4">
                <h1 className=" font-bold text-base md:text-xl text-white">My Dashboard</h1>
                <SearchBox />
              </div>
            </div>
            <div className='absolute top-40 px-10 pt-8'>{children}</div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SidebarLayout;
