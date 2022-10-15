import { CustomLink } from '../../Common';

import React from 'react';
import { Transition } from '@headlessui/react';

import { DropDownMenu } from '../../Common';

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

const Header: React.FC<IHeader> = ({ className, ...headerProps }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header
      {...headerProps}
      className={className}
      //   className={`md:container w-full flex flex-row justify-between ${className}`}
    >
      <div>
        <nav className="shadow-sm w-full z-10">
          <div className="w-full">
            <div className="flex items-center h-20 w-full">
              <div className="flex items-center  mx-20  justify-between w-full">
                <div className="flex justify-center items-center flex-shrink-0 ">
                  <h1 className=" font-bold text-xl cursor-pointer">
                    <CustomLink to="/" scroll={false}>
                      Employee<span className="text-blue-500">Assessment</span>
                    </CustomLink>
                  </h1>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <CustomLink
                      to="/about"
                      scroll={false}
                      className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      About
                    </CustomLink>

                    <CustomLink
                      to="#"
                      scroll={false}
                      className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Assessments
                    </CustomLink>

                    <CustomLink
                      to="#"
                      scroll={false}
                      className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Contact
                    </CustomLink>

                    <DropDownMenu
                      title="Language"
                      items={['English', 'German']}
                    />

                    <CustomLink
                      to="#"
                      scroll={false}
                      className="cursor-pointer bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-black"
                    >
                      <i className="fas fa-sign-in-alt"></i>
                    </CustomLink>
                  </div>
                </div>
              </div>
              <div className="mr-10 flex md:hidden ">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-blue-600 inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <i className="fas fa-toggle-off"></i>
                  ) : (
                    <i className="fas fa-toggle-on"></i>
                  )}
                </button>
              </div>
            </div>
          </div>

          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {(ref) => (
              <div className="md:hidden" id="mobile-menu">
                <div
                  ref={ref}
                  className="flex flex-col bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3"
                >
                  <CustomLink
                      to="/about"
                      scroll={false}
                      className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      About
                    </CustomLink>

                    <CustomLink
                      to="#"
                      scroll={false}
                      className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Assessments
                    </CustomLink>

                    <CustomLink
                      to="#"
                      scroll={false}
                      className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Contact
                    </CustomLink>

                    <DropDownMenu
                      title="Language"
                      items={['English', 'German']}
                    />

                    <CustomLink
                      to="#"
                      scroll={false}
                      className="cursor-pointer bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-black"
                    >
                      <i className="fas fa-sign-in-alt"></i>
                    </CustomLink>
                </div>
              </div>
            )}
          </Transition>
        </nav>
      </div>
      {/* <div className="space-x-5 m-5">
        <CustomLink to="/" scroll={false}>
          EA-Assessment
        </CustomLink>
      </div>
      <div className="space-x-5 m-5">
        <button className="text-gray-700 inline-flex p-3 hover:bg-gray-900 rounded md:hidden ml-auto">
          <i className="fas fa-bars"></i>
        </button>

        <div
          className="hidden top-nav w-full md:inline-flex md:flex-grow md:w-auto"
          id="navigation"
        >
          <div className="md:inline-flex md:flex-row md:gap-2 md:ml-auto flex flex-col">
            <CustomLink
              to="/"
              scroll={false}
              className="md:border border-gray-700 md:inline-flex md:w-auto px-3 py-2 rounded text-gray-700 hover:text-white hover:bg-gray-700"
            >
              Home
            </CustomLink>
            <CustomLink
              to="/"
              scroll={false}
              className="md:border border-gray-700 md:inline-flex md:w-auto px-3 py-2 rounded text-gray-700 hover:text-white hover:bg-gray-700"
            >
              services
            </CustomLink>
            <CustomLink
              to="/"
              scroll={false}
              className="md:border border-gray-700 md:inline-flex md:w-auto px-3 py-2 rounded text-gray-700 hover:text-white hover:bg-gray-700"
            >
              about
            </CustomLink>
            <CustomLink
              to="/"
              scroll={false}
              className="md:border border-gray-700 md:inline-flex md:w-auto px-3 py-2 rounded text-gray-700 hover:text-white hover:bg-gray-700"
            >
              contact
            </CustomLink>
          </div>
        </div>
      </div> */}
    </header>
  );
};

export default Header;
