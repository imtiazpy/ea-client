import Sidebar from '../../navigation/Sidebar/Sidebar';
import Header from '../../navigation/Header/Header';
import { InputField, SearchBox } from '../../Common';
import { useRouter } from 'next/router';

export interface ISidebarLayout extends React.ComponentPropsWithoutRef<'div'> {}

const SidebarLayout: React.FC<ISidebarLayout> = ({
  className,
  children,
  ...divProps
}) => {

  const router = useRouter()

  return (
    <>
      <div className="flex flex-row justify-start">
        <aside className='h-screen sticky top-0'>
          <Sidebar />
        </aside>
        <main className="flex-1 h-screen">
          <div className="relative">
            <div className="top h-64 bg-slate-800 pt-8 px-10">
              <div className="flex flex-col md:flex-row justify-between items-center space-x-4">
                <h1 className="font-bold text-base md:text-xl text-white">My {router.asPath.toUpperCase().replace(/^\/+/, '')}</h1>
                <SearchBox />
              </div>
            </div>
            <div className='absolute top-32 px-10 pt-8'>{children}</div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SidebarLayout;