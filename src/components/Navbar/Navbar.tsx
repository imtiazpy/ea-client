import { CustomLink } from "components/Common";



export interface INavbar {}

const Navbar = () => {
    return (
        <nav className="md:container flex items-center bg-white p-3 flex-wrap">
            {/* TODO: will add logo, add className in the Link */}
            <CustomLink
                to='/'
                scroll={false}
            >
                EA-Assessment
            </CustomLink>

            <button 
                className="text-gray-700 inline-flex p-3 hover:bg-gray-900 rounded md:hidden ml-auto"
            >
                <i className="fas fa-bars"></i>
            </button>

            <div className="hidden top-nav w-full md:inline-flex md:flex-grow md:w-auto" id="navigation">
                <div className="md:inline-flex md:flex-row md:gap-2 md:ml-auto flex flex-col">
                    <CustomLink
                        to='/'
                        scroll={false}
                        className='md:border border-gray-700 md:inline-flex md:w-auto px-3 py-2 rounded text-gray-700 hover:text-white hover:bg-gray-700' 
                    >
                        Home
                    </CustomLink>
                    <CustomLink
                        to='/'
                        scroll={false}
                        className='md:border border-gray-700 md:inline-flex md:w-auto px-3 py-2 rounded text-gray-700 hover:text-white hover:bg-gray-700'
                    >
                        services
                    </CustomLink>
                    <CustomLink
                        to='/'
                        scroll={false}
                        className='md:border border-gray-700 md:inline-flex md:w-auto px-3 py-2 rounded text-gray-700 hover:text-white hover:bg-gray-700'
                    >
                        about
                    </CustomLink>
                    <CustomLink
                        to='/'
                        scroll={false}
                        className='md:border border-gray-700 md:inline-flex md:w-auto px-3 py-2 rounded text-gray-700 hover:text-white hover:bg-gray-700'
                    >
                        contact
                    </CustomLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;