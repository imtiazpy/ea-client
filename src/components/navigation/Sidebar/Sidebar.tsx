import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import { CustomLink, DropDownMenu } from '../../Common';
import { JobSeekerMenuItems } from './SideMenuItems';
import AuthButton from '../../Buttons/Auth/AuthButton';
import AuthContext from 'src/context/Auth/AuthContext';

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const wrapperClass = classNames(
    'h-screen px-4 pt-8 pb-4 flex flex-col justify-between shadow-xl',
    {
      'w-80': !toggleCollapse,
      'w-20': toggleCollapse,
    }
  );

  const collapseIconClasses = classNames('rounded absolute right-0 text-xl', {
    'rotate-180': toggleCollapse,
  });

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const router = useRouter();
  const gContext = useContext(AuthContext);

  return (
    <nav
      className={wrapperClass}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: 'width 300ms cubic-bezier(0.2, 0, 0, 1) 0s' }}
    >
      {/* Brand and navigation links */}
      <div className="flex flex-col">
        {/* brand */}
        <div className="relative flex items-center justify-between">
          <div className="flex justify-center items-center">
            <h1 className=" font-bold text-base md:text-xl cursor-pointer">
              <CustomLink to="/" scroll={false}>
                {toggleCollapse && (
                  <span>
                    E<span className="text-blue-600">A</span>
                  </span>
                )}
                <span
                  className={classNames('font-bold', {
                    hidden: toggleCollapse,
                  })}
                >
                  Employee<span className="text-blue-600">Assessment</span>
                </span>
              </CustomLink>
            </h1>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <i className="fas fa-angle-double-left"></i>
            </button>
          )}
        </div>
        <hr className="my-4 md:min-w-full" />
        {/* Navigation */}
        <div className="flex flex-col items-start mt-8">
          {JobSeekerMenuItems.map(({ id, label, name, icon }) => (
            <CustomLink
              key={id}
              to={`/${name}`}
              scroll={false}
              className={`${
                router.pathname == `/${name}` ? 'text-blue-600' : 'text-black'
              } cursor-pointer hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2`}
            >
              <i className={`fas ${icon}`}></i>
              {!toggleCollapse && label}
            </CustomLink>
          ))}

          {toggleCollapse && (
            <i className="fas fa-language cursor-pointer hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"></i>
          )}

          <div className="mt-1">
            {!toggleCollapse && (
              <DropDownMenu title="Language" items={['English', 'German']} />
            )}
          </div>
        </div>
      </div>

      {/* sidebar footer */}
      <div>
        <hr className="my-4 md:min-w-full" />
        {toggleCollapse && (
          <i
            className="fas fa-sign-out-alt cursor-pointer hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
            onClick={gContext.logout}
          ></i>
        )}
        {!toggleCollapse && <AuthButton />}
      </div>
    </nav>
  );
};

export default Sidebar;
